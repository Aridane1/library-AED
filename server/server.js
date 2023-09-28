const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

// Permitir solicitudes CORS desde Angular
app.use(cors());

// Conexión a MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aridanejdr090503",
  database: "db_library",
});

connection.connect();

app.post("/socios", (req, res) => {
  const [dni, direccion, tIf, nombre, apellidos] = req.body;
  connection.query(
    `INSERT INTO socios (dni, direccion,tIf,nombre,apellidos) VALUES (${
      (dni, direccion, tIf, nombre, apellidos)
    })`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.get("/socios", (req, res) => {
  connection.query("SELECT * FROM socios", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/alquilan", (req, res) => {
  connection.query("SELECT * FROM alquilan", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/volumenes", (req, res) => {
  connection.query("SELECT * FROM volumenes", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/libros", (req, res) => {
  connection.query("SELECT * FROM libros", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/editados", (req, res) => {
  connection.query("SELECT * FROM editados", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/ediciones", (req, res) => {
  connection.query("SELECT * FROM ediciones", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
