import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div
            style={{
                width: "250px",
                height: "100vh",
                backgroundColor: "#1e1e1e",
                color: "white",
                padding: "20px",
                position: "fixed",
                left: 0,
                top: 0
            }}
        >

            <h1 style={{ marginBottom: "40px" }}>
                Threat System
            </h1>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >

                <Link
                    to="/dashboard"
                    style={linkStyle}
                >
                    Dashboard
                </Link>

                <Link
                    to="/activity-logs"
                    style={linkStyle}
                >
                    Activity Logs
                </Link>

                <Link
                    to="/threat-alerts"
                    style={linkStyle}
                >
                    Threat Alerts
                </Link>

                <Link
                    to="/reports"
                    style={linkStyle}
                >
                    Reports
                </Link>

            </div>

        </div>
    );
}

const linkStyle = {

    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    backgroundColor: "#2563eb",
    padding: "12px",
    borderRadius: "8px"

};

export default Sidebar;