import { useEffect, useState } from "react";

import axios from "axios";

function ThreatAlerts() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {

        axios
            .get("http://127.0.0.1:5000/api/dashboard")

            .then((response) => {

                // ONLY HIGH RISK USERS

                const highRiskUsers = response.data.logs.filter(

                    (user) => user.status === "HIGH RISK"

                );

                setAlerts(highRiskUsers);

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (

        <div className="container-fluid p-4">

            {/* PAGE TITLE */}

            <div className="mb-4">

                <h1 className="fw-bold text-danger">

                    🚨 Threat Alerts Center

                </h1>

                <p className="text-light">

                    AI-powered insider threat monitoring system

                </p>

            </div>


            {/* ALERT SUMMARY CARDS */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card bg-danger text-white shadow p-4">

                        <h5>Total High Risk Alerts</h5>

                        <h2>{alerts.length}</h2>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card bg-warning text-dark shadow p-4">

                        <h5>Critical Employees</h5>

                        <h2>{alerts.length}</h2>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card bg-dark text-white shadow p-4">

                        <h5>AI Threat Detection</h5>

                        <h2>ACTIVE</h2>

                    </div>

                </div>

            </div>


            {/* ALERT TABLE */}

            <div className="card bg-dark text-white shadow p-4">

                <h3 className="mb-4 text-danger">

                    🚨 Live Threat Alerts

                </h3>

                <div className="table-responsive">

                    <table className="table table-dark table-hover">

                        <thead>

                            <tr>

                                <th>Employee ID</th>

                                <th>Department</th>

                                <th>Position</th>

                                <th>Campus</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {alerts.map((user, index) => (

                                <tr key={index}>

                                    <td>{user.employee_id}</td>

                                    <td>{user.employee_department}</td>

                                    <td>{user.employee_position}</td>

                                    <td>{user.employee_campus}</td>

                                    <td>

                                        <span className="badge bg-danger">

                                            HIGH RISK

                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default ThreatAlerts;