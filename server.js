const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const port = 80;

// Add middleware
app.use(express.json());
app.use(cors());

// Create connection to database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// A route to check if the server is running
app.get("/healthcheck", (req, res) => res.send("OK"));

// A route to get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// A route to get a user by id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  // check if id is valid
  if (!id || isNaN(id)) {
    res.status(400).send({
      error: {
        code: 400,
        message: "Invalid id",
      },
    });
    return;
  }

  // send the query result
  db.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
    // if not exist
    if (result.length === 0) {
      res.status(403).send({
        error: {
          code: 403,
          message: "User not found",
        },
      });
      return;
    }

    // if exist, send the result
    const user = {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
    };

    res.send({
      data: {
        user,
        "request-date": req.get("request-date"),
      },
    });
  });
});

//  Funtion to check if name, email, password are valid
function isValidName(name) {
  return /^[a-zA-Z0-9]+$/.test(name);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  let passwordTypes = 0;
  if (/[a-z]/.test(password)) {
    passwordTypes++;
  }
  if (/[A-Z]/.test(password)) {
    passwordTypes++;
  }
  if (/[0-9]/.test(password)) {
    passwordTypes++;
  }
  if (/[~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    passwordTypes++;
  }
  if (passwordTypes < 3) {
    return false;
  }
  return true;
}

// Function to transform timestamp into YYYY-MM-DD HH:MM:SS format
function timestampFormatTransform(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const formatedTimestamp = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  return formatedTimestamp;
}

// A route to create a new user
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  // check if name, email, password are valid
  if (!isValidName(name)) {
    res.status(400).send({
      error: {
        code: 400,
        message: "Invalid name",
      },
    });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).send({
      error: {
        code: 400,
        message: "Invalid email",
      },
    });
    return;
  }

  if (!isValidPassword(password)) {
    res.status(400).send({
      error: {
        code: 400,
        message: "Invalid password",
      },
    });
    return;
  }

  // check if email already exists
  db.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        // send code 409 if email already exists
        res.status(409).send({
          error: {
            code: 409,
            message: "Email already exists",
          },
        });
        return;
      } else {
        // if email not exists, insert into database

        // get UTC+8 Taipei time
        const timestamp = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Taipei",
        });

        // transform into YYYY-MM-DD HH:MM:SS format
        const formatedTimestamp = timestampFormatTransform(timestamp);

        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // insert into database
        db.query(
          "INSERT INTO user (name, email, password, created_at) VALUES (?, ?, ?, ?)",
          [name, email, hashedPassword, formatedTimestamp],
          (err, result) => {
            if (err) {
              // send code 500 if database error
              res.status(500).send({
                error: {
                  code: 500,
                  message: err.message,
                },
              });
              return;
            }

            // send result if success
            res.send({
              data: {
                user: {
                  id: result.insertId,
                  name: name,
                  email: email,
                },
                "request-date": req.get("request-date"),
              },
            });
            return;
          }
        );
      }
    }
  );
});

// Open server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
