const express = require("express");
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const mysql = require('mysql2');


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'attendance',
});

var subName;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/get/subjects/:week/:day", (req, res) => {
  const week = req.params.week;
  const day = req.params.day;
  const sqlSelect = `SELECT * FROM ${day}`;

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(`データの取得中にエラーが発生しました。`);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});


app.get("/api/get/category/:subject", (req, res) => {
  const subject = req.params.subject;
  const sqlSelect = `SELECT * FROM ${subject}`;

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(`データの取得中にエラーが発生しました。`);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.put("/api/update/category/:subject/:id", (req, res) => {
  const subject = req.params.subject;
  const categoryId = req.params.id;
  const { newStatus } = req.body;

  const sqlUpdate = `UPDATE ${subject} SET Status = ? WHERE id = ?`;

  db.query(sqlUpdate, [newStatus, categoryId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("データベースの更新中にエラーが発生しました。");
    } else {
      console.log(result);
      res.send("更新が成功しました。");
    }
  });
});

app.post("/api/add/student/:subject", (req, res) => {
  const subject = req.params.subject;
  const { Number, Name } = req.body;

  const sqlInsert = `INSERT INTO ${subject} (Number, Name, Status) VALUES (?, ?, 0)`;

  db.query(sqlInsert, [Number, Name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("データベースへの追加中にエラーが発生しました。");
    } else {
      console.log(result);
      res.send("学生の追加が成功しました。");
    }
  });
});

app.put("/api/update/studentStatus", (req, res) => {
  const { Number, subject } = req.body;

  const sqlUpdate = `UPDATE ${subject} SET Status = '1' WHERE Number = ?`;

  db.query(sqlUpdate, [Number], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating student status in the database.");
    } else {
      console.log(result);
      res.send("Student status updated successfully.");
    }
  });
});

app.get("/api/get/category/Students", (req, res) => {
  const sqlSelect = "SELECT * FROM Students";

  db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/api/get/TimeTable", (req, res) => {
  const sqlSelect = "SELECT * FROM Subjects";

  db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.send(result);
  });
});


app.listen(3001, () => {
  console.log('running on port 3001');
});
