const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load students data from db.json
const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));

// Get all students
app.get("/students", (req, res) => {
  res.json(db.students);
});

// Get student by id
app.get("/students/:id", (req, res) => {
  const student = db.students.find(s => s.id === parseInt(req.params.id));
  if (student) res.json(student);
  else res.status(404).json({ error: "Student not found" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

