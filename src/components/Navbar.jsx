import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  return (
    <div
      className="bg-black text-white p-3 d-flex justify-content-between"
      style={{
        marginLeft: "250px",
      }}
    >
      <h4>Insider Threat Detection Dashboard</h4>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}

export default Navbar;