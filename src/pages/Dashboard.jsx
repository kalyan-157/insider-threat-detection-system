import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";

import {
    Bar,
    Pie,
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {

    const [logs, setLogs] = useState([]);
    const [aiPrediction, setAiPrediction] = useState({});
    const [soundEnabled, setSoundEnabled] = useState(false);

    const [dashboardData, setDashboardData] = useState({
        threat_alerts: 0,
        suspicious_users: 0,
        total_activities: 0,
    });
    <button

    onClick={() => setSoundEnabled(true)}

    className="btn btn-success mb-3"

>

    Enable Alert Sound

   </button>

    useEffect(() => {
        // DASHBOARD API
        axios
            .get("https://insider-threat-detection-system-1.onrender.com")
            .then((response) => {
                console.log(response.data);
                setDashboardData(response.data);
                setLogs(response.data.logs);

                const highRiskUsers = response.data.logs.filter(
                    (user) => user.status === "HIGH RISK"
                );

                if (highRiskUsers.length > 0) {
                  const audio = new Audio("/sounds/alert.mp3");

                  audio.volume = 1;

                  audio.currentTime = 0;

                  audio.play()
                 .then(() => {

        console.log("Alert sound played");

    })
    .catch((error) => {

        console.log("Audio Error:", error);

    });
                   toast.error(
                        `⚠ ${highRiskUsers.length} High Risk Users Detected`,
                        {
                            position: "top-right",
                            autoClose: 4000
                            ,theme: "dark"
                        }
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });

        // AI PREDICTION API
        axios
            .get("http://127.0.0.1:5000/api/predict-threat")
            .then((response) => {
                setAiPrediction(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    // BAR CHART
    const barData = {

        labels: [
            "Threat Alerts",
            "Suspicious Users",
            "Activities"
        ],

        datasets: [
            {
                label: "Security Overview",

                data: [
                    dashboardData.threat_alerts,
                    dashboardData.suspicious_users,
                    dashboardData.total_activities
                ],

                backgroundColor: [
                    "red",
                    "orange",
                    "green"
                ]
            }
        ]
    };

    // PIE CHART
    const pieData = {

        labels: [
            "Suspicious",
            "Safe"
        ],

        datasets: [
            {
                data: [
                    dashboardData.suspicious_users,
                    dashboardData.total_activities -
                    dashboardData.suspicious_users
                ],

                backgroundColor: [
                    "red",
                    "blue"
                ]
            }
        ]
    };

    // LINE CHART
    const lineData = {

        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri"
        ],

        datasets: [
            {
                label: "Weekly Activities",

                data: [5, 8, 6, 10, 7],

                borderColor: "blue",

                tension: 0.4
            }
        ]
    };

    return (

        <Layout>
            <ToastContainer />

            <h1 className="mb-4">
                Dashboard Overview
            </h1>

            {/* DASHBOARD CARDS */}

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card bg-danger text-white p-4 shadow">

                        <h4>Threat Alerts</h4>

                        <h2>
                            {dashboardData.threat_alerts}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card bg-warning text-dark p-4 shadow">

                        <h4>Suspicious Users</h4>

                        <h2>
                            {dashboardData.suspicious_users}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card bg-success text-white p-4 shadow">

                        <h4>Total Activities</h4>

                        <h2>
                            {dashboardData.total_activities}
                        </h2>

                    </div>

                </div>

            </div>
            {/* AI PREDICTION CARD */}

<div className="row">

    <div className="col-md-4 mb-4">

        <div
            className={
                aiPrediction.status === "HIGH RISK"
                    ? "card bg-danger text-white p-4 shadow"
                    : "card bg-success text-white p-4 shadow"
            }
        >

            <h4>🤖 AI Prediction</h4>

            <h2>
                {aiPrediction.status}
            </h2>

        </div>

    </div>

</div>

            {/* CHARTS */}

            <div className="row mt-4">

                <div className="col-md-6 mb-4">

                    <div className="card p-3 shadow">

                        <h4>Threat Analysis</h4>

                        <Bar data={barData} />

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card p-3 shadow">

                        <h4>Suspicious Activity</h4>

                        <Pie data={pieData} />

                    </div>

                </div>

            </div>

            {/* LINE GRAPH */}

            <div className="card p-4 mt-4 shadow">

                <h4>Weekly Activity Graph</h4>

                <Line data={lineData} />

            </div>

            {/* LIVE EMPLOYEE MONITORING */}

            <div className="card mt-5 p-4 bg-dark text-white shadow">
                

                <h3>Live Employee Monitoring</h3>

                <table className="table table-dark table-bordered table-hover mt-4">

                    <thead>

                        <tr>
                            <th>Employee ID</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Campus</th>
                            <th>Status</th>
                            <th>Printed Pages</th>
                        </tr>

                    </thead>

                    <tbody>

                        {logs.map((log, index) => (

                            <tr key={index}>

                                <td>{log.employee_id}</td>

                                <td>{log.employee_department}</td>

                                <td>{log.employee_position}</td>

                                <td>{log.employee_campus}</td>

                                <td>

                                    <span
                                        className={
                                            log.status === "HIGH RISK"
                                                ? "badge bg-danger"
                                                : log.status === "MEDIUM RISK"
                                                ? "badge bg-warning text-dark"
                                                : "badge bg-success"
                                        }
                                    >
                                        {log.status}
                                    </span>

                                </td>

                                <td>{log.total_printed_pages}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </Layout>
    );
}

export default Dashboard;