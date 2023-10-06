# Library: Gestión de Biblioteca

**Library** es una aplicación web desarrollada para gestionar los datos de una biblioteca. Permite llevar un seguimiento de los socios, volúmenes de libros, ediciones y los préstamos realizados.

## Descripción 📘

Con esta aplicación se puede gestionar la información detallada de:

- **Socios**: Registro de cada socio con un código único, DNI, dirección, teléfono, nombre y apellidos.
- **Volúmenes**: Registro de cada copia física de un libro. Se puede marcar si un volumen está deteriorado o no.
- **Libros**: Guardado de detalles esenciales como el título del libro y el año en que fue escrito. Un libro puede tener múltiples volúmenes y ediciones.
- **Ediciones**: Información de cada edición de un libro, incluyendo el año de edición y la editorial.
- **Editados**: Relación de libros con sus respectivas ediciones.
- **Alquilan**: Registro de cada préstamo. Se almacena la fecha de préstamo, fecha límite de devolución (15 días después) y la fecha real de devolución.

## Desarrollo 🛠️

### Diseño de la Base de Datos

Se diseñó una estructura de base de datos en MySQL con tablas para "Socios", "Alquilan", "Volúmenes", "Libros", "Ediciones" y "Editados". Se establecieron relaciones y restricciones entre estas tablas para mantener la integridad de los datos.

### Backend

El backend se desarrolló con **Node.js**, creando una API que interactúa con la base de datos. Se proporcionan endpoints para operaciones CRUD en cada tabla. Se utilizó **Express.js** como framework para facilitar el desarrollo.

### Frontend

La interfaz de usuario se diseñó y desarrolló utilizando **Angular**. Esta interfaz permite a los usuarios interactuar con la información de la biblioteca. Se definieron clases de interfaz en Angular para mantener la consistencia entre el frontend y el backend.

## Instalación y Configuración 📥

### Pre-requisitos 📋

Asegúrate de tener **MySQL**, **Node.js** y **Angular** instalados en tu máquina. 

```bash
# Verificar instalaciones
mysql --version
node -v
ng version 
```
Configuración de Base de Datos 🔧
Accede a MySQL y crea la base de datos.

```sql
USE db_library;
```
Ejecuta los comandos SQL proporcionados para crear las tablas y llenarlas con datos iniciales.
[...
use db_library;
CREATE TABLE socios (
    codigo_socio int(10) AUTO_INCREMENT,
    dni VARCHAR(20) unique,
    direccion VARCHAR(255),
    tlf VARCHAR(20),
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    CONSTRAINT socios_pk PRIMARY KEY(codigo_socio)
);

CREATE TABLE libros (
	id INT AUTO_INCREMENT,
    titulo VARCHAR(255),
    editorial VARCHAR(100),
    autor VARCHAR(255),
    ano_escrito YEAR,
    CONSTRAINT libros_pk PRIMARY KEY(id) 
);

CREATE TABLE volumenes (
    id INT AUTO_INCREMENT,
    id_libro INT NOT NULL,
    estado VARCHAR(100),
    CONSTRAINT volumenes_pk PRIMARY KEY(id),
    CONSTRAINT volumenes_fk FOREIGN KEY(id_libro) REFERENCES libros(id) ON DELETE CASCADE
);


CREATE TABLE alquilan (
    codigo_socio int(10) ,
    id_volumen INT,
    f_prestamo DATE,
    f_devolucion DATE,
    f_limite DATE,
    CONSTRAINT alquilan_pk PRIMARY KEY(codigo_socio,id_volumen),
    CONSTRAINT alquilan_fk FOREIGN KEY(codigo_socio) REFERENCES socios(codigo_socio),
    CONSTRAINT alquilan2_fk FOREIGN KEY(id_volumen) REFERENCES volumenes(id) ON DELETE CASCADE
);

CREATE TABLE ediciones (
  ISBN VARCHAR(20) NOT NULL,
  editorial VARCHAR(255),
  CONSTRAINT ediciones_pk PRIMARY KEY (ISBN)
);

CREATE TABLE editados (
    id_libro int REFERENCES libros(id),
    ISBN VARCHAR(20) REFERENCES ediciones(ISBN),
    ano_editado YEAR,
    CONSTRAINT editados_pk PRIMARY KEY (id_libro, ISBN),
    CONSTRAINT editados_fk FOREIGN KEY (id_libro) REFERENCES libros(id) ON DELETE CASCADE,
    CONSTRAINT editados_fk2 FOREIGN KEY (ISBN) REFERENCES ediciones(ISBN)
);
INSERT INTO socios (dni, direccion, tlf, nombre, apellidos) VALUES 
('12345678A', 'Calle Primera 1', '987654321', 'Juan', 'Pérez'),
('23456789B', 'Calle Segunda 2', '876543212', 'Ana', 'Martínez'),
('34567890C', 'Calle Tercera 3', '765432134', 'Luis', 'Rodríguez'),
('45678901D', 'Calle Cuarta 4', '654321234', 'Sara', 'Fernández'),
('56789012E', 'Calle Quinta 5', '543212345', 'Pablo', 'García');

INSERT INTO libros (titulo, editorial, autor, ano_escrito) VALUES 
('El libro 1', 'Editorial 1', 'Autor 1', 1995),
('El libro 2', 'Editorial 2', 'Autor 2', 2000),
('El libro 3', 'Editorial 3', 'Autor 3', 2005),
('El libro 4', 'Editorial 4', 'Autor 4', 2010),
('El libro 5', 'Editorial 5', 'Autor 5', 2015);

INSERT INTO Volumenes (id, id_libro, estado) VALUES 
('1', '1', 'disponible'),
('2', '2', 'disponible'),
('3', '3', 'disponible'),
('4', '4', 'disponible'),
('5', '5', 'disponible');





INSERT INTO ediciones (ISBN, editorial) VALUES 
('123-456789-1', 'Editorial A'),
('123-456789-2', 'Editorial B'),
('123-456789-3', 'Editorial C'),
('123-456789-4', 'Editorial D'),
('123-456789-5', 'Editorial E');


INSERT INTO alquilan (codigo_socio, id_volumen, f_prestamo, f_devolucion, f_limite) VALUES 
(1, 1, '2023-09-01', NULL, '2023-09-30'),
(1, 2, '2023-09-01', NULL, '2023-09-30'),
(2, 2, '2023-08-01', '2023-08-15', '2023-08-31'),
(3, 3, '2023-07-01', NULL, '2023-07-31'),
(4, 4, '2023-06-01', '2023-06-15', '2023-06-30'),
(5, 5, '2023-05-01', '2023-05-15', '2023-05-31');


INSERT INTO editados (id_libro, ISBN, ano_editado) VALUES 
(1, '123-456789-1', 2022),
(2, '123-456789-2', 2021),
(3, '123-456789-3', 2020),
(4, '123-456789-4', 2019),
(5, '123-456789-5', 2018);

...]

Autores ✒️
Kiran Vazquez
David Perez
Aridane de Jesus
Licencia 📄


Expresiones de Gratitud 🎁
Comparte este proyecto con otros 📢
Invita una cerveza 🍺 o un café ☕ a uno de los autores.
Agradece públicamente 🤓.
⌨️ con ❤️ por el equipo de Library 😊


