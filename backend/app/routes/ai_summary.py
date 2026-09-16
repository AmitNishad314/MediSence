from fastapi import APIRouter, Depends, HTTPException, status
from openai import OpenAIError
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import MedicalDocument, Patient
from ..services.ai_summary import generate_medical_summary


router = APIRouter(
    prefix="/patients/{patient_id}",
    tags=["AI Summary"]
)


@router.post("/ai-summary")
def generate_patient_ai_summary(
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
        .filter(
            MedicalDocument.patient_id == patient_id,
            MedicalDocument.extracted_text.isnot(None),
            MedicalDocument.extracted_text != ""
        )
        .order_by(MedicalDocument.uploaded_at.asc())
        .all()
    )

    if not documents:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="No extracted medical text available for this patient"
        )

    medical_text = "\n\n".join(
        f"DOCUMENT: {document.file_name}\n\n{document.extracted_text}"
        for document in documents
    )

    try:
        summary = generate_medical_summary(
            patient_name=patient.name,
            age=patient.age,
            gender=patient.gender,
            medical_text=medical_text
        )
    except OpenAIError as error:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI summary service unavailable: {error}"
        ) from error

    patient.ai_summary = summary
    db.commit()
    db.refresh(patient)

    return {
        "patient_id": patient.id,
        "summary": patient.ai_summary
    }


@router.get("/ai-summary")
def get_patient_ai_summary(
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

    return {
        "patient_id": patient.id,
        "summary": patient.ai_summary
    }
