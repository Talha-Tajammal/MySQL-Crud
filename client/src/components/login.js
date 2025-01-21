import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./style.css";

const UserLogin = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/users/login", {
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            
            navigate("/userDashboard");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <h1>User Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">User Login</button>
            </form>
            <br />
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    );
};

export default UserLogin;
