// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors()); //  Enable's CORS for all origins
app.use(bodyParser.json());

app.use(bodyParser.json());

// Configure MySQL connection
const db = mysql.createConnection({
  host: "mysql-svc",       // Service name of MySQL in Kubernetes
  user: "myuser",          // MySQL username (set in MySQL Deployment)
  password: "mypassword",  // MySQL password (set in MySQL Deployment)
  database: "mydb"         // Database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1); // Exit container if DB connection fails
  }
  console.log("✅ Connected to MySQL database");
});

// POST /register endpoint
app.post("/register", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  const sql = "INSERT INTO students (name, course) VALUES (?, ?)";
  db.query(sql, [name, course], (err, result) => {
    if (err) {
      console.error("❌ Error inserting data:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Student registered successfully!" });
  });
});

// Start server on port 5000
app.listen(5000, () => {
  console.log(" Backend server running on port 5000");
});

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});
