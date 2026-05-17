from ml.predict import predict_threat
from database.db_config import connection, cursor
from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)


# =========================
# DASHBOARD API
# =========================

@app.route("/api/dashboard", methods=["GET"])
def dashboard():

    data = [
        {
            "employee_id": "EMP101",
            "employee_department": "IT",
            "employee_position": "Analyst",
            "employee_campus": "New York",
            "status": "HIGH RISK",
            "total_printed_pages": 120
        },
        {
            "employee_id": "EMP102",
            "employee_department": "HR",
            "employee_position": "Manager",
            "employee_campus": "California",
            "status": "SAFE",
            "total_printed_pages": 15
        },
        {
            "employee_id": "EMP103",
            "employee_department": "Finance",
            "employee_position": "Executive",
            "employee_campus": "Texas",
            "status": "MEDIUM RISK",
            "total_printed_pages": 60
        }
    ]

    return jsonify({
        "threat_alerts": 2,
        "suspicious_users": 2,
        "total_activities": 3,
        "logs": data
    })

# =========================
# AI PREDICTION API
# =========================

@app.route("/api/predict-threat")
def predict_ai_threat():
    sample_employee = {
        "has_criminal_record": 1,
        "has_foreign_citizenship": 1,
        "risk_travel_indicator": 1,
        "total_printed_pages": 200
    }

    prediction = predict_threat(sample_employee)
    status = "HIGH RISK" if prediction == 1 else "SAFE"

    return jsonify({
        "prediction": prediction,
        "status": status
    })
# =========================
# LOGIN API
# =========================

@app.route("/api/login", methods=["POST"])
def login():

        data = request.json

        username = data.get("username")
        password = data.get("password")

        if username == "admin" and password == "admin123":

            return jsonify({
            "success": True
        })

        return jsonify({
        "success": False
    })
        

# =========================
# RUN FLASK
# =========================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)