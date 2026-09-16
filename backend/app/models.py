from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String, Text
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
        ForeignKey("patients.id", ondelete="CASCADE"),
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