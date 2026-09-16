from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import MedicalRecord, Patient
from ..schemas import (
    MedicalRecordCreate,
    MedicalRecordResponse,
)


router = APIRouter(
    prefix="/patients/{patient_id}/medical-records",
    tags=["Medical Records"]
)


@router.post(
    "/",
    response_model=MedicalRecordResponse,
    status_code=status.HTTP_201_CREATED
)
def create_medical_record(
    patient_id: int,
    record: MedicalRecordCreate,
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

    new_record = MedicalRecord(
        patient_id=patient_id,
        record_type=record.record_type,
        diagnosis=record.diagnosis,
        description=record.description,
        record_date=record.record_date,
        doctor_name=record.doctor_name
    )

    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return new_record


@router.get(
    "/",
    response_model=list[MedicalRecordResponse]
)
def get_medical_records(
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

    records = (
        db.query(MedicalRecord)
        .filter(
            MedicalRecord.patient_id == patient_id
        )
        .order_by(
            MedicalRecord.record_date.desc().nullslast(),
            MedicalRecord.created_at.desc()
        )
        .all()
    )

    return records


@router.delete(
    "/{record_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_medical_record(
    patient_id: int,
    record_id: int,
    db: Session = Depends(get_db)
):
    record = (
        db.query(MedicalRecord)
        .filter(
            MedicalRecord.id == record_id,
            MedicalRecord.patient_id == patient_id
        )
        .first()
    )

    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical record not found"
        )

    db.delete(record)
    db.commit()

    return None