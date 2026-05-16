import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    return isLoggedIn ? children : <Navigate to="/" />;

}

function ActivityLogs() {

    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        axios
            .get("http://127.0.0.1:5000/api/dashboard")

            .then((response) => {

                setLogs(response.data.logs);

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);
    
    const filteredLogs = logs.filter((log) =>

    log.employee_id.toString().includes(search) ||

    log.employee_department
        .toLowerCase()
        .includes(search.toLowerCase()) ||

    log.employee_position
        .toLowerCase()
        .includes(search.toLowerCase())

);

    return (

        <div className="container-fluid p-4 text-white">

            <h1 className="mb-4 fw-bold">

                Activity Logs

            </h1>

            <div className="card bg-dark p-4 shadow">

                <div className="table-responsive">
                    <input
                        type="text"
                            placeholder="Search employee, department, position..."
                                    value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            style={{
                        width: "100%",
                    padding: "12px",
                marginBottom: "20px",
            borderRadius: "8px",
        border: "none",
        fontSize: "16px"
    }}
/>

                    <table className="table table-dark table-hover">

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

                            {filteredLogs.map((log, index) => (

                                <tr key={index}>

                                    <td>{log.employee_id}</td>

                                    <td>{log.employee_department}</td>

                                    <td>{log.employee_position}</td>

                                    <td>{log.employee_campus}</td>

                                    <td>

                                        {log.status === "SAFE" && (

                                            <span className="badge bg-success">

                                                SAFE

                                            </span>

                                        )}

                                        {log.status === "MEDIUM RISK" && (

                                            <span className="badge bg-warning text-dark">

                                                MEDIUM RISK

                                            </span>

                                        )}

                                        {log.status === "HIGH RISK" && (

                                            <span className="badge bg-danger">

                                                HIGH RISK

                                            </span>

                                        )}

                                    </td>

                                    <td>{log.total_printed_pages}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default ActivityLogs;