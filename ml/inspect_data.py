import pandas as pd


DATA_PATH = "ml/data/diabetes.csv"


# Load dataset
df = pd.read_csv(DATA_PATH)


print("\n========== DATASET SHAPE ==========")
print(df.shape)


print("\n========== COLUMNS ==========")
print(df.columns.tolist())


print("\n========== FIRST 5 ROWS ==========")
print(df.head())


print("\n========== DATA TYPES ==========")
print(df.dtypes)


print("\n========== MISSING VALUES ==========")
print(df.isnull().sum())


print("\n========== BASIC STATISTICS ==========")
print(df.describe())


print("\n========== TARGET DISTRIBUTION ==========")
print(df["Outcome"].value_counts())


print("\n========== TARGET PERCENTAGE ==========")
print(df["Outcome"].value_counts(normalize=True) * 100)


print("\n========== ZERO VALUES ==========")

zero_columns = [
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
]

for column in zero_columns:
    zero_count = (df[column] == 0).sum()

    print(
        f"{column}: {zero_count} zero values"
    )