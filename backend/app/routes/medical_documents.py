import shutil
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import MedicalDocument, Patient

router = APIRouter(
    prefix="/patients/{patient_id}/medical-documents",
    tags=["Medical Documents"]
)

PROJECT_DIR = Path(__file__).resolve().parents[3]
UPLOAD_DIR = PROJECT_DIR / "uploads"


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

    # Only allow PDF files for now
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed"
        )

    # Create patient-specific folder
    patient_upload_dir = UPLOAD_DIR / (
        f"patient_{patient_id}"
    )

    patient_upload_dir.mkdir(parents=True, exist_ok=True)

    # Prevent duplicate filename issues
    file_path = patient_upload_dir / Path(file.filename or "document.pdf").name

    # Save file
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Get file size
    file_size = os.path.getsize(file_path)

    # Save metadata in database
    document = MedicalDocument(
        patient_id=patient_id,
        file_name=file.filename,
        file_path=str(file_path),
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