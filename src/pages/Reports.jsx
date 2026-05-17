import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        let mounted = true;
        axios
            .get("https://insider-threat-detection-system-1.onrender.com")
            .then((response) => {
                if (mounted) setLogs(response.data.logs || []);
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            mounted = false;
        };
    }, []);

    const safeCount = logs.filter((user) => user.status === "SAFE").length;
    const mediumCount = logs.filter((user) => user.status === "MEDIUM RISK").length;
    const highCount = logs.filter((user) => user.status === "HIGH RISK").length;

    const downloadPDF = () => {

    const doc = new jsPDF();

    // TITLE

    doc.setFontSize(20);

    doc.text(
        "Insider Threat Detection Report",
        20,
        20
    );

    // SUMMARY

    doc.setFontSize(12);

    doc.text(`SAFE Users: ${safeCount}`, 20, 40);

    doc.text(`MEDIUM Risk Users: ${mediumCount}`, 20, 50);

    doc.text(`HIGH RISK Users: ${highCount}`, 20, 60);

    // TABLE

    autoTable(doc, {

        startY: 80,

        head: [[
            "Employee ID",
            "Department",
            "Position",
            "Campus",
            "Status"
        ]],

        body: logs.map((user) => [

            user.employee_id,
            user.employee_department,
            user.employee_position,
            user.employee_campus,
            user.status

        ])

    });

    // SAVE PDF

    doc.save("Threat_Report.pdf");
};

    return (
        <div className="container-fluid p-4 text-white">
          <button
            onClick={downloadPDF}
            className="btn btn-danger mb-4"
        >

    Download PDF Report

</button>
            <h1 className="mb-4 fw-bold">Security Reports Dashboard</h1>

            {/* REPORT CARDS */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card bg-success text-white p-4 shadow">
                        <h5>SAFE USERS</h5>
                        <h2>{safeCount}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-warning text-dark p-4 shadow">
                        <h5>MEDIUM RISK</h5>
                        <h2>{mediumCount}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-danger text-white p-4 shadow">
                        <h5>HIGH RISK</h5>
                        <h2>{highCount}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-primary text-white p-4 shadow">
                        <h5>TOTAL ACTIVITIES</h5>
                        <h2>{logs.length}</h2>
                    </div>
                </div>
            </div>

            {/* REPORT TABLE */}
            <div className="card bg-dark text-white p-4 shadow">
                <h3 className="mb-4">Employee Threat Report</h3>

                <div className="table-responsive">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Employee ID</th>
                                <th>Department</th>
                                <th>Position</th>
                                <th>Campus</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((user, index) => (
                                <tr key={user.employee_id ?? index}>
                                    <td>{index + 1}</td>
                                    <td>{user.employee_id}</td>
                                    <td>{user.employee_department}</td>
                                    <td>{user.employee_position}</td>
                                    <td>{user.employee_campus}</td>
                                    <td>{user.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Reports;