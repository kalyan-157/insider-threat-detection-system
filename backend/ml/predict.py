import joblib
import pandas as pd

# LOAD TRAINED MODEL

model = joblib.load("ml/threat_model.pkl")

print("AI Model Loaded Successfully")


def predict_threat(data):

    df = pd.DataFrame([data])

    prediction = model.predict(df)

    return int(prediction[0])