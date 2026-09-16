from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


# -------------------------
# Patient schemas
# -------------------------

class PatientBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)

    age: int = Field(
        ...,
        ge=0,
        le=150
    )

    gender: str = Field(
        ...,
        min_length=1,
        max_length=20
    )

    blood_group: str | None = Field(
        default=None,
        max_length=10
    )


class PatientCreate(PatientBase):
    pass


class PatientUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=1,
        max_length=100
    )

    age: int | None = Field(
        default=None,
        ge=0,
        le=150
    )

    gender: str | None = Field(
        default=None,
        min_length=1,
        max_length=20
    )

    blood_group: str | None = Field(
        default=None,
        max_length=10
    )


class PatientResponse(PatientBase):
    id: int
    patient_code: str
    created_at: datetime | None = None
    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )


# -------------------------
# Medical record schemas
# -------------------------

class MedicalRecordCreate(BaseModel):
    record_type: str = Field(
        ...,
        min_length=1,
        max_length=50
    )

    diagnosis: str | None = Field(
        default=None,
        max_length=255
    )

    description: str | None = None

    record_date: date | None = None

    doctor_name: str | None = Field(
        default=None,
        max_length=100
    )


class MedicalRecordResponse(MedicalRecordCreate):
    id: int
    patient_id: int
    created_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )


# -------------------------
# ML prediction schemas
# -------------------------

class DiabetesPredictionRequest(BaseModel):
    patient_id: int = Field(
        ...,
        gt=0
    )

    pregnancies: int = Field(
        ...,
        ge=0
    )

    glucose: float = Field(
        ...,
        ge=0
    )

    blood_pressure: float = Field(
        ...,
        ge=0
    )

    skin_thickness: float = Field(
        ...,
        ge=0
    )

    insulin: float = Field(
        ...,
        ge=0
    )

    bmi: float = Field(
        ...,
        ge=0
    )

    diabetes_pedigree_function: float = Field(
        ...,
        ge=0
    )

    age: int = Field(
        ...,
        ge=0,
        le=150
    )


class DiabetesPredictionResponse(BaseModel):
    id: int
    patient_id: int

    prediction: int
    probability: float

    created_at: datetime | None = None