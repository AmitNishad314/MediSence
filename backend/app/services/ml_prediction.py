import os

import joblib
import pandas as pd


# =========================
# Model paths
# =========================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.dirname(
                os.path.abspath(__file__)
            )
        )
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "model",
    "diabetes_model.joblib"
)

SCALER_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "model",
    "diabetes_scaler.joblib"
)


# =========================
# Load model and scaler
# =========================

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"ML model not found: {MODEL_PATH}"
    )

if not os.path.exists(SCALER_PATH):
    raise FileNotFoundError(
        f"ML scaler not found: {SCALER_PATH}"
    )


model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


# =========================
# Prediction function
# =========================

def predict_diabetes_risk(
    pregnancies: int,
    glucose: float,
    blood_pressure: float,
    skin_thickness: float,
    insulin: float,
    bmi: float,
    diabetes_pedigree_function: float,
    age: int
):
    """
    Predict diabetes risk using the trained
    Logistic Regression model.
    """

    # Create input DataFrame.
    # Column order MUST match the training data.
    input_data = pd.DataFrame(
        [
            {
                "Pregnancies": pregnancies,
                "Glucose": glucose,
                "BloodPressure": blood_pressure,
                "SkinThickness": skin_thickness,
                "Insulin": insulin,
                "BMI": bmi,
                "DiabetesPedigreeFunction":
                    diabetes_pedigree_function,
                "Age": age,
            }
        ]
    )

    # Apply the same scaler used during training.
    input_scaled = scaler.transform(
        input_data
    )

    # Predict class.
    prediction = model.predict(
        input_scaled
    )[0]

    # Predict probability of class 1.
    probability = model.predict_proba(
        input_scaled
    )[0][1]

    return {
        "prediction": int(prediction),
        "probability": float(probability)
    }