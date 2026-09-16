import os
import shutil

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import MedicalDocument, Patient

router = APIRouter(
    prefix="/patients/{patient_id}/medical-documents",
    tags=["Medical Documents"]
)

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")


@router.post("/", status_code=status.HTTP_201_CREATED)
def upload_medical_document(
    patient_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Check patient
    patient = (
        db.query(Patient)
        .filter(Patient.id == patient_id)
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

    # Create patient-specific folder
    patient_upload_dir = os.path.join(
        UPLOAD_DIR,
        f"patient_{patient_id}"
    )

    os.makedirs(
        patient_upload_dir,
        exist_ok=True
    )

    # Use original filename
    file_path = os.path.join(
        patient_upload_dir,
        file.filename
    )

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Get file size
    file_size = os.path.getsize(file_path)

    # Save metadata in database
    document = MedicalDocument(
        patient_id=patient_id,
        file_name=file.filename,
        file_path=file_path,
        file_type=file.content_type,
        file_size=file_size
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return {
        "message": "Medical document uploaded successfully",
        "document": {
            "id": document.id,
            "patient_id": document.patient_id,
            "file_name": document.file_name,
            "file_type": document.file_type,
            "file_size": document.file_size,
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
        .filter(Patient.id == patient_id)
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )

    documents = (
        db.query(MedicalDocument)
        .filter(MedicalDocument.patient_id == patient_id)
        .order_by(MedicalDocument.uploaded_at.desc())
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


@router.get("/{document_id}/view")
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

    if not os.path.exists(document.file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical document file not found"
        )

    return FileResponse(
        path=document.file_path,
        media_type="application/pdf",
        filename=document.file_name,
        content_disposition_type="inline"
    )


@router.get("/{document_id}/download")
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

    if not os.path.exists(document.file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical document file not found"
        )

    return FileResponse(
        path=document.file_path,
        media_type="application/pdf",
        filename=document.file_name,
        content_disposition_type="attachment"
    )