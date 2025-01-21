const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");
const router = express.Router();
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        db.query(checkEmailQuery, [email], async (err, results) => {
            if (err) {
                console.error("Error checking email in database:", err);
                return res.status(500).json({ error: "Server error" });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: "Email already exists" });
            }

            const userId = uuidv4();
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const insertUserQuery =
                "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";
            db.query(
                insertUserQuery,
                [userId, name, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.error(
                            "Error inserting user into database:",
                            err
                        );
                        return res.status(500).json({ error: "Server error" });
                    }

                    const token = jwt.sign({ id: userId }, JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    res.status(201).json({ token });
                    console.log("User registered successfully: ", userId);
                    console.log("User registered successfully: ", token);
                }
            );
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const getUserQuery = "SELECT * FROM users WHERE email = ?";
        db.query(getUserQuery, [email], async (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Server error" });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const user = results[0];
            console.log(user);

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET, {
                expiresIn: "1d",
            });
            res.status(201).json({ token });
            console.log("User logged in successfully: ", token);
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;
