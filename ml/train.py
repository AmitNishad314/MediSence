import os

import joblib
import pandas as pd

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score,
)
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


DATA_PATH = "ml/data/diabetes.csv"
MODEL_DIR = "ml/model"

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "diabetes_model.joblib"
)

SCALER_PATH = os.path.join(
    MODEL_DIR,
    "diabetes_scaler.joblib"
)


# =========================
# 1. Load dataset
# =========================

df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully.")
print(f"Shape: {df.shape}")


# =========================
# 2. Separate features and target
# =========================

X = df.drop("Outcome", axis=1)
y = df["Outcome"]


print("\nFeatures:")
print(X.columns.tolist())

print("\nTarget:")
print("Outcome")


# =========================
# 3. Train-test split
# =========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


print("\n========== TRAIN / TEST SPLIT ==========")

print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")


# =========================
# 4. Feature scaling
# =========================

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(
    X_train
)

X_test_scaled = scaler.transform(
    X_test
)


print("\n========== SCALING ==========")

print("Feature scaling completed.")


# =========================
# 5. Create model
# =========================

model = LogisticRegression(
    max_iter=1000,
    random_state=42
)


# =========================
# 6. Train model
# =========================

model.fit(
    X_train_scaled,
    y_train
)


print("\n========== MODEL TRAINING ==========")

print(
    "Logistic Regression model trained successfully."
)


# =========================
# 7. Predictions
# =========================

y_pred = model.predict(
    X_test_scaled
)

y_probability = model.predict_proba(
    X_test_scaled
)[:, 1]


# =========================
# 8. Model evaluation
# =========================

accuracy = accuracy_score(
    y_test,
    y_pred
)

roc_auc = roc_auc_score(
    y_test,
    y_probability
)

confusion = confusion_matrix(
    y_test,
    y_pred
)


print("\n========== MODEL EVALUATION ==========")

print(
    f"Accuracy: {accuracy:.4f}"
)

print(
    f"ROC-AUC: {roc_auc:.4f}"
)

print("\n========== CONFUSION MATRIX ==========")

print(confusion)

print("\n========== CLASSIFICATION REPORT ==========")

print(
    classification_report(
        y_test,
        y_pred
    )
)


# =========================
# 9. Create model directory
# =========================

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)


# =========================
# 10. Save model
# =========================

joblib.dump(
    model,
    MODEL_PATH
)

joblib.dump(
    scaler,
    SCALER_PATH
)


print("\n========== MODEL SAVING ==========")

print(
    f"Model saved to: {MODEL_PATH}"
)

print(
    f"Scaler saved to: {SCALER_PATH}"
)