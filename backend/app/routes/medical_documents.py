import os
import tempfile

import boto3

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import MedicalDocument, Patient
from ..services.pdf_extractor import extract_text_from_pdf


router = APIRouter(
    prefix="/patients/{patient_id}/medical-documents",
    tags=["Medical Documents"]
)


S3_BUCKET_NAME = os.getenv(
    "S3_BUCKET_NAME"
)

if not S3_BUCKET_NAME:
    raise ValueError(
        "S3_BUCKET_NAME is not set"
    )


s3_client = boto3.client(
    "s3"
)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED
)
def upload_medical_document(
    patient_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Check patient
    patient = (
        db.query(Patient)
        .filter(
            Patient.id == patient_id
        )
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )

    # Only allow PDF files
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed"
        )

    # Read uploaded file
    file_content = file.file.read()

    file_size = len(file_content)

    # Create a unique S3 object key
    s3_key = (
        f"patients/{patient_id}/"
        f"{file.filename}"
    )

    # Upload to S3
    try:
        s3_client.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=s3_key,
            Body=file_content,
            ContentType="application/pdf"
        )

    except Exception as error:
        print(
            f"S3 upload failed: {error}"
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload medical document"
        )

    # Extract text from PDF
    extracted_text = ""

    temp_file_path = None

    try:
        with tempfile.NamedTemporaryFile(
            suffix=".pdf",
            delete=False
        ) as temp_file:

            temp_file.write(
                file_content
            )

            temp_file_path = temp_file.name

        extracted_text = extract_text_from_pdf(
            temp_file_path
        )

    except Exception as error:
        print(
            f"PDF extraction failed: {error}"
        )

        extracted_text = ""

    finally:
        if (
            temp_file_path
            and os.path.exists(temp_file_path)
        ):
            os.remove(
                temp_file_path
            )

    # Save document metadata + extracted text
    document = MedicalDocument(
        patient_id=patient_id,
        file_name=file.filename,
        file_path=s3_key,
        file_type=file.content_type,
        file_size=file_size,
        extracted_text=extracted_text
    )

    try:
        db.add(document)
        db.commit()
        db.refresh(document)

    except Exception as error:
        db.rollback()

        # Remove uploaded S3 object if
        # database operation fails
        try:
            s3_client.delete_object(
                Bucket=S3_BUCKET_NAME,
                Key=s3_key
            )
        except Exception as s3_error:
            print(
                f"S3 cleanup failed: {s3_error}"
            )

        print(
            f"Database save failed: {error}"
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save medical document"
        )

    return {
        "message": "Medical document uploaded successfully",
        "document": {
            "id": document.id,
            "patient_id": document.patient_id,
            "file_name": document.file_name,
            "file_type": document.file_type,
            "file_size": document.file_size,
            "extracted_text": document.extracted_text,
            "uploaded_at": document.uploaded_at
        }
    }


@router.get("/")
def get_medical_documents(
    patient_id: int,
    db: Session = Depends(get_db)
):
    patient = (
        db.query(Patient)
        .filter(
            Patient.id == patient_id
        )
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )

    documents = (
        db.query(MedicalDocument)
        .filter(
            MedicalDocument.patient_id == patient_id
        )
        .order_by(
            MedicalDocument.uploaded_at.desc()
        )
        .all()
    )

    return [
        {
            "id": document.id,
            "patient_id": document.patient_id,
            "file_name": document.file_name,
            "file_type": document.file_type,
            "file_size": document.file_size,
            "uploaded_at": document.uploaded_at
        }
        for document in documents
    ]


@router.get(
    "/{document_id}/view"
)
def view_medical_document(
    patient_id: int,
    document_id: int,
    db: Session = Depends(get_db)
):
    document = (
        db.query(MedicalDocument)
        .filter(
            MedicalDocument.id == document_id,
            MedicalDocument.patient_id == patient_id
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical document not found"
        )

    try:
        s3_object = s3_client.get_object(
            Bucket=S3_BUCKET_NAME,
            Key=document.file_path
        )

        file_content = s3_object[
            "Body"
        ].read()

    except Exception as error:
        print(
            f"S3 document retrieval failed: {error}"
        )

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical document file not found"
        )

    return StreamingResponse(
        iter([file_content]),
        media_type="application/pdf",
        headers={
            "Content-Disposition": (
                f'inline; filename="{document.file_name}"'
            )
        }
    )


@router.get(
    "/{document_id}/download"
)
def download_medical_document(
    patient_id: int,
    document_id: int,
    db: Session = Depends(get_db)
):
    document = (
        db.query(MedicalDocument)
        .filter(
            MedicalDocument.id == document_id,
            MedicalDocument.patient_id == patient_id
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical document not found"
        )

    try:
        s3_object = s3_client.get_object(
            Bucket=S3_BUCKET_NAME,
            Key=document.file_path
        )

        file_content = s3_object[
            "Body"
        ].read()

    except Exception as error:
        print(
            f"S3 document retrieval failed: {error}"
        )

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical document file not found"
        )

    return StreamingResponse(
        iter([file_content]),
        media_type="application/pdf",
        headers={
            "Content-Disposition": (
                f'attachment; filename="{document.file_name}"'
            )
        }
    )