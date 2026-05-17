import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
            "https://insider-threat-detection-system-1.onrender.com/login",
    {
        username,
        password
    }
);

            if (response.data.success) {
                
                localStorage.setItem("isLoggedIn", "true");

                setMessage("Login Successful");

                navigate("/dashboard");

}

            else {

                setMessage("Invalid Username or Password");

            }

        }

        catch (error) {

            console.log(error);

            setMessage("Server Error");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-4">

                    <div className="card p-4 shadow">

                        <h2 className="text-center mb-4">

                            Insider Threat Login

                        </h2>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">

                                <label>Username</label>

                                <input

                                    type="text"

                                    className="form-control"

                                    value={username}

                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }

                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input

                                    type="password"

                                    className="form-control"

                                    value={password}

                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }

                                />

                            </div>

                            <button
                                className="btn btn-primary w-100"
                            >

                                Login

                            </button>

                        </form>

                        <p className="mt-3 text-center">

                            {message}

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;