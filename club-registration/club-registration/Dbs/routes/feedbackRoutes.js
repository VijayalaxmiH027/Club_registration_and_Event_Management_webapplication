const express = require("express");
const router = express.Router();

// Add new feedback
router.post("/", (req, res) => {
    const db = req.app.get('db'); // Access database connection from app
    const { name, email, club, comments } = req.body;
    const sql = "INSERT INTO feedback (name, email, club, comments) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, club, comments], (err, result) => {
        if (err) {
            console.error("Error saving feedback:", err);
            res.status(500).send("Error saving feedback.");
        } else {
            res.status(201).send("Feedback saved successfully!");
        }
    });
});

// Get all feedback
router.get("/", (req, res) => {
    const db = req.app.get('db'); // Access database connection from app
    const sql = "SELECT * FROM feedback";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching feedback:", err);
            res.status(500).send("Error fetching feedback.");
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
