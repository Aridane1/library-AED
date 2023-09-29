const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Permitir solicitudes CORS desde Angular
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true }));

// Conexión a MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test1234",
  database: "db_library",
});

connection.connect();

app.delete("/socios/:id", (req, res) => {
  let id = req.params.id;
  connection.query(
    `DELETE FROM socios where codigo_socio='${id}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.put("/socios/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  connection.query(
    `UPDATE SOCIOS SET DNI='${req.body.dni}',
    direccion='${req.body.direccion}',
    tIf='${req.body.tIf}',
    nombre='${req.body.nombre}',
    apellidos='${req.body.apellidos}' 
    where codigo_socio = '${id}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/socios", (req, res) => {
  connection.query(
    `INSERT INTO socios(dni,direccion,tIf,nombre,apellidos) 
    VALUES('${req.body.dni}',
    '${req.body.direccion}',
    '${req.body.tIf}',
    '${req.body.nombre}',
    '${req.body.apellidos}')`,
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
