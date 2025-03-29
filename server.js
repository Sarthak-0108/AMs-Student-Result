const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Add student result
app.post("/add", (req, res) => {
  const { name, roll, percentage } = req.body;
  db.run(
    "INSERT INTO students (name, roll, percentage) VALUES (?, ?, ?)",
    [name, roll, percentage],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Student added!" });
    }
  );
});

// Get all results
app.get("/results", (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
