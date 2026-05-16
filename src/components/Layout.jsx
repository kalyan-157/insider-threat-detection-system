import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div style={{ display: "flex", backgroundColor: "#020617", minHeight: "100vh" }}>
            <Sidebar />
            <div style={{ width: "100%" }}>
                <Navbar />
                <div style={{ marginLeft: "270px", width: "100%", padding: "20px" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
