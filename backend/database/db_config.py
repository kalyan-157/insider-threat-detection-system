import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Rooj@156#12",
    database="insider_threat_db"
)

cursor = db.cursor(dictionary=True)

print("MySQL Connected Successfully")