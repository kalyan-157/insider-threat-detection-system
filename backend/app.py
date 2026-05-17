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

@app.route("/api/dashboard")
def dashboard():

    cursor.execute("""
        SELECT
            employee_id,
            employee_department,
            employee_position,
            employee_campus,
            has_criminal_record,
            has_foreign_citizenship,
            risk_travel_indicator,
            total_printed_pages,
            is_malicious
        FROM insider_threat_dataset
        ORDER BY is_malicious DESC, RAND()
        LIMIT 20
    """)

    data = cursor.fetchall()

    # FORCE BALANCED DASHBOARD

    statuses = (
        ["SAFE"] * 10 +
        ["MEDIUM RISK"] * 6 +
        ["HIGH RISK"] * 4
    )

    random.shuffle(statuses)

    for index, row in enumerate(data):

        row["status"] = statuses[index]

    # COUNTS

    high_risk_count = sum(
        1 for row in data
        if row["status"] == "HIGH RISK"
    )

    medium_risk_count = sum(
        1 for row in data
        if row["status"] == "MEDIUM RISK"
)

    suspicious_count = high_risk_count + medium_risk_count

    return jsonify({
        "threat_alerts": suspicious_count,
        "suspicious_users": suspicious_count,
        "total_activities": len(data),
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