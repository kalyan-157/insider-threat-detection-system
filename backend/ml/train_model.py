import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score

import joblib

# LOAD DATASET

df = pd.read_csv("insider_threat_dataset.csv")

print(df.head())

# SELECT FEATURES

features = [

    "has_criminal_record",
    "has_foreign_citizenship",
    "risk_travel_indicator",
    "total_printed_pages"

]

X = df[features]

# TARGET COLUMN

y = df["is_malicious"]

# SPLIT DATA

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,
    test_size=0.2,
    random_state=42

)

# CREATE MODEL

model = RandomForestClassifier()

# TRAIN MODEL

model.fit(X_train, y_train)

# PREDICTION

y_pred = model.predict(X_test)

# ACCURACY

accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:", accuracy)

# SAVE MODEL

joblib.dump(model, "threat_model.pkl")

print("Model Saved Successfully")