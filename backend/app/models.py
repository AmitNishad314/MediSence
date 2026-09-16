from sqlalchemy import (
    Column,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.sql import func

from .database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    patient_code = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    age = Column(
        Integer,
        nullable=False
    )

    gender = Column(
        String(20),
        nullable=False
    )

    blood_group = Column(
        String(10),
        nullable=True
    )

    ai_summary = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    patient_id = Column(
        Integer,
        ForeignKey(
            "patients.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    record_type = Column(
        String(50),
        nullable=False
    )

    diagnosis = Column(
        String(255),
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    record_date = Column(
        Date,
        nullable=True
    )

    doctor_name = Column(
        String(100),
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class MedicalDocument(Base):
    __tablename__ = "medical_documents"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    patient_id = Column(
        Integer,
        ForeignKey(
            "patients.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    file_name = Column(
        String(255),
        nullable=False
    )

    file_path = Column(
        String(500),
        nullable=False
    )

    file_type = Column(
        String(100),
        nullable=True
    )

    file_size = Column(
        Integer,
        nullable=True
    )

    extracted_text = Column(
        Text,
        nullable=True
    )

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class DiabetesPrediction(Base):
    __tablename__ = "diabetes_predictions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    patient_id = Column(
        Integer,
        ForeignKey(
            "patients.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    pregnancies = Column(
        Integer,
        nullable=False
    )

    glucose = Column(
        Float,
        nullable=False
    )

    blood_pressure = Column(
        Float,
        nullable=False
    )

    skin_thickness = Column(
        Float,
        nullable=False
    )

    insulin = Column(
        Float,
        nullable=False
    )

    bmi = Column(
        Float,
        nullable=False
    )

    diabetes_pedigree_function = Column(
        Float,
        nullable=False
    )

    age = Column(
        Integer,
        nullable=False
    )

    prediction = Column(
        Integer,
        nullable=False
    )

    probability = Column(
        Float,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )