from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import DiabetesPrediction, Patient
from ..schemas import (
    DiabetesPredictionRequest,
    DiabetesPredictionResponse,
)
from ..services.ml_prediction import predict_diabetes_risk


router = APIRouter(
    prefix="/predictions",
    tags=["ML Predictions"]
)


@router.post(
    "/diabetes",
    response_model=DiabetesPredictionResponse,
    status_code=status.HTTP_201_CREATED
)
def predict_diabetes(
    data: DiabetesPredictionRequest,
    db: Session = Depends(get_db)
):
    # =========================
    # 1. Find patient
    # =========================

    patient = (
        db.query(Patient)
        .filter(
            Patient.id == data.patient_id
        )
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )


    # =========================
    # 2. Run ML prediction
    # =========================

    try:
        result = predict_diabetes_risk(
            pregnancies=data.pregnancies,
            glucose=data.glucose,
            blood_pressure=data.blood_pressure,
            skin_thickness=data.skin_thickness,
            insulin=data.insulin,
            bmi=data.bmi,
            diabetes_pedigree_function=(
                data.diabetes_pedigree_function
            ),
            age=data.age
        )

    except Exception as error:
        print(
            f"ML prediction failed: {error}"
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate ML prediction"
        )


    # =========================
    # 3. Save prediction
    # =========================

    prediction_record = DiabetesPrediction(
        patient_id=data.patient_id,

        pregnancies=data.pregnancies,

        glucose=data.glucose,

        blood_pressure=data.blood_pressure,

        skin_thickness=data.skin_thickness,

        insulin=data.insulin,

        bmi=data.bmi,

        diabetes_pedigree_function=(
            data.diabetes_pedigree_function
        ),

        age=data.age,

        prediction=result["prediction"],

        probability=result["probability"]
    )

    db.add(prediction_record)

    db.commit()

    db.refresh(prediction_record)


    # =========================
    # 4. Return saved prediction
    # =========================

    return prediction_record