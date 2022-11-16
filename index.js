const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

const mysql = require("mysql2");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.get("/insertbook", (req, res) => {
  const query = "SELECT*FROM books";

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;
    console.log(books);
  });
});

app.post("", (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const pages = req.body.pages;

  const query = `INSERT INTO books (title, pages) VALUES ('${title}', '${pages}')`;

  conn.query(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mysql1",
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }

  console.log("Conectado ao Mysql!");
  app.listen(port);
});
