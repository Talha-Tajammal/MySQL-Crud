import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./style.css";

const UserRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/users/register", {
                name,
                email,
                password
            });
            alert("User registered successfully");
            navigate("/userDashboard");
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="login-container">
            <h1>User Register</h1>
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">Register</button>
            </form>
            <br />
            <button onClick={() => navigate("/")}>Back to Login</button>
        </div>
    );
};

export default UserRegister;
