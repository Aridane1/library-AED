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
  password: "Aridanejdr090503",
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

app.delete("/alquilan/:id_socio/:id_volumen", (req, res) => {
  let id_socio = req.params.id_socio;
  let id_volumen = req.params.id_volumen;
  connection.query(
    `DELETE FROM alquilan where codigo_socio='${id_socio}' and id_volumen='${id_volumen}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.delete("/volumenes/:id", (req, res) => {
  let id = req.params.id;
  connection.query(`DELETE FROM volumenes where id='${id}'`, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/volumenes/:id", (req, res) => {
  let id = req.params.id;
  connection.query(
    `UPDATE volumenes SET id_libro='${req.body.id_libro}', estado='${req.body.estado}' where id='${id}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/volumenes", (req, res) => {
  connection.query(
    `INSERT INTO volumenes(id_libro, estado)
  VALUES('${req.body.id_libro}',
         '${req.body.estado}')`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.put("/alquilan/:id_socio/:id_volumen", (req, res) => {
  let id_socio = req.params.id_socio;
  let id_volumen = req.params.id_volumen;
  connection.query(
    `UPDATE ALQUILAN SET codigo_socio='${req.body.codigo_socio}',
    id_volumen='${req.body.id_volumen}',
    f_prestamo='${req.body.f_prestamo}',
    f_devolucion='${req.body.f_devolucion}',
    f_limite='${req.body.f_limite}'
    where codigo_socio = '${id_socio}' AND id_volumen='${id_volumen}' `,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/alquilan", (req, res) => {
  connection.query(
    `INSERT INTO alquilan(codigo_socio, id_volumen, f_prestamo, f_devolucion, f_limite)
       VALUES('${req.body.codigo_socio}',
              '${req.body.id_volumen}',
              '${req.body.f_prestamo}',
              '${req.body.f_devolucion}',
              '${req.body.f_limite}')`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.put("/socios/:id", (req, res) => {
  let id = req.params.id;
  connection.query(
    `UPDATE SOCIOS SET DNI='${req.body.dni}',
    direccion='${req.body.direccion}',
    tlf='${req.body.tlf}',
    nombre='${req.body.nombre}',
    apellidos='${req.body.apellidos}'
    where codigo_socio = '${id}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/editados", (req, res) => {
  connection.query(
    `INSERT INTO editados(ISBN, id_libro, ano_editado)
       VALUES('${req.body.ISBN}',
              '${req.body.id_libro}',
              '${req.body.ano_editado}')`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.put("/editados/:ISBN/:id_libro", (req, res) => {
  let ISBN = req.params.ISBN;
  let id_libro = req.params.id_libro;
  console.log(id_libro, ISBN);
  connection.query(
    `UPDATE editados SET
       id_libro='${req.body.id_libro}',
       ISBN='${req.body.ISBN}',
       ano_editado='${req.body.ano_editado}'
       WHERE ISBN='${ISBN}' AND id_libro='${id_libro}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.delete("/editados/:ISBN/:id_libro", (req, res) => {
  let ISBN = req.params.ISBN;
  let id_libro = req.params.id_libro;
  connection.query(
    `DELETE FROM editados where id_libro='${id_libro}' and ISBN='${ISBN}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/libros", (req, res) => {
  connection.query(
    `INSERT INTO libros(titulo, editorial, autor, ano_escrito)
       VALUES('${req.body.titulo}',
              '${req.body.editorial}',
              '${req.body.autor}',
              '${req.body.ano_escrito}')`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/ediciones", (req, res) => {
  connection.query(
    `INSERT INTO ediciones(ISBN, editorial)
       VALUES('${req.body.ISBN}',
              '${req.body.editorial}')`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.put("/ediciones/:id", (req, res) => {
  let id = req.params.id;
  connection.query(
    `UPDATE ediciones SET
       ISBN='${req.body.ISBN}',
       editorial='${req.body.editorial}'
       WHERE ISBN='${id}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.delete("/ediciones/:id", (req, res) => {
  let id = req.params.id;
  connection.query(
    `DELETE FROM ediciones WHERE ISBN='${id}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.put("/libros/:id", (req, res) => {
  let id = req.params.id;
  connection.query(
    `UPDATE libros SET
       titulo='${req.body.titulo}',
       editorial='${req.body.editorial}',
       autor='${req.body.autor}',
       ano_escrito='${req.body.ano_escrito}'
       WHERE id='${id}'`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.delete("/libros/:id", (req, res) => {
  let id = req.params.id;
  connection.query(`DELETE FROM libros WHERE id='${id}'`, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/socios", (req, res) => {
  connection.query(
    `INSERT INTO socios(dni,direccion,tlf,nombre,apellidos) 
    VALUES('${req.body.dni}',
    '${req.body.direccion}',
    '${req.body.tlf}',
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
