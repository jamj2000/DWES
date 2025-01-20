> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 6: BASES DE DATOS <!-- omit in toc -->
> Utilización de técnicas de acceso a datos  
> BASES DE DATOS sin ORM. BASES DE DATOS con ORM, PRISMA

**[`PROYECTOS DE EJEMPLO`](PROYECTOS.md)**

<img src="assets/nextdotjs.svg" width="80" height="80">
<img src="assets/mysql.svg" width="80" height="80">
<img src="assets/sqlite.svg" width="80" height="80">
<img src="assets/postgresql.svg" width="80" height="80">
<img src="assets/prisma.svg" width="80" height="80">

---- 

- [1. Introducción](#1-introducción)
- [2. SQLite](#2-sqlite)
  - [2.1. Proyecto](#21-proyecto)
  - [2.2. Otros aspectos](#22-otros-aspectos)
- [3. MySQL](#3-mysql)
  - [3.1. Proyecto](#31-proyecto)
  - [3.2. Otros aspectos](#32-otros-aspectos)
- [4. MySQL (Serverless)](#4-mysql-serverless)
  - [4.1. Proyecto](#41-proyecto)
  - [4.2. Otros aspectos](#42-otros-aspectos)
- [5. Postgres](#5-postgres)
  - [5.1. Proyecto](#51-proyecto)
  - [5.2. Otros aspectos](#52-otros-aspectos)
- [6. Postgres (Vercel)](#6-postgres-vercel)
  - [6.1. Proyecto](#61-proyecto)
  - [6.2. Otros aspectos](#62-otros-aspectos)
- [7. Primeros pasos con ORM Prisma](#7-primeros-pasos-con-orm-prisma)
  - [7.1. Instalación del paquete prisma](#71-instalación-del-paquete-prisma)
  - [7.2. Comandos disponibles](#72-comandos-disponibles)
  - [7.3. Inicialización](#73-inicialización)
- [8. Definiendo el Modelo de Datos](#8-definiendo-el-modelo-de-datos)
  - [8.1. Escribir el modelo de datos manualmente](#81-escribir-el-modelo-de-datos-manualmente)
    - [8.1.1. Modelos](#811-modelos)
    - [8.1.2. Relaciones](#812-relaciones)
    - [8.1.3. Sincronizando el esquema con la base de datos](#813-sincronizando-el-esquema-con-la-base-de-datos)
  - [8.2. Generar el modelo de datos mediante introspección](#82-generar-el-modelo-de-datos-mediante-introspección)
- [9. Consultas](#9-consultas)
  - [9.1. Consultas CRUD](#91-consultas-crud)
    - [9.1.1. Create](#911-create)
    - [9.1.2. Read](#912-read)
    - [9.1.3. Update](#913-update)
    - [9.1.4. Delete](#914-delete)
  - [9.2. Otras consultas](#92-otras-consultas)
    - [9.2.1. count](#921-count)
    - [9.2.2. groupBy](#922-groupby)
- [10. Ver datos de las tablas](#10-ver-datos-de-las-tablas)
- [11. Cómo organizar el código](#11-cómo-organizar-el-código)
  - [11.1. Obtener datos](#111-obtener-datos)
  - [11.2. Mutar datos](#112-mutar-datos)
- [12. Despliegue en Vercel](#12-despliegue-en-vercel)
- [13. ANEXO: CRUD en una única página](#13-anexo-crud-en-una-única-página)
- [14. Referencias](#14-referencias)










--- 

# 1. Introducción

En temas anteriores hemos trabajado un poco con bases de datos no relacionales, también llamadas noSQL. En concreto, en el tema 4, creamos una aplicación que proporcionaba una API REST hacia una base de datos documental como MongoDB. En adelante nos centraremos en las bases de datos relacionales. 

En la primera parte de este tema trabajaremos con algunas de estas bases de datos relacionales de uso habitual mediante comandos SQL. En concreto usaremos las bases de datos MySQL/MariaDB, SQLite y Postgres.

En la segunda parte de este tema trabajaremos con las mismas bases de datos, pero haciendo uso de ORM (Object-Relational Mapping), que es una técnica que nos permite realizar un mapeo objeto-relacional y evitar así tener que trabajar con el SQL específico de cada base de datos. Usaremos el ORM Prisma.

En cualquier caso, siempre usaremos bases de datos del lado servidor. 

> CURIOSIDAD:
>
> En el lado cliente también disponemos de almacenamiento gestionado por el navegador. Por ejemplo:
> - [Local storage](https://es.javascript.info/localstorage)
> - [Session storage](https://es.javascript.info/localstorage)
> - [IndexedDB](https://es.wikipedia.org/wiki/Indexed_Database_API)
> 
> ![indexedDB](assets/indexedDB.png)
>


# 2. SQLite

**SQLite es una biblioteca** en proceso que implementa un motor de base de datos SQL transaccional , autónomo y sin configuración . El código de SQLite es de dominio público y, por lo tanto, se puede utilizar de forma gratuita para cualquier fin, comercial o privado.

**SQLite es un motor de base de datos SQL integrado**. A diferencia de la mayoría de las otras bases de datos SQL, **SQLite no tiene un proceso de servidor separado**. SQLite lee y escribe directamente en archivos de disco normales. Una base de datos SQL completa con múltiples tablas, índices, activadores y vistas está contenida en un único archivo de disco. El formato del archivo de la base de datos es multiplataforma: puede copiar libremente una base de datos entre sistemas de 32 y 64 bits o entre arquitecturas big-endian y little-endian . 

Usaremos el driver **`sqlite3`**.

## 2.1. Proyecto

La estructura del proyecto es la siguiente:

![Archivos de CRUD SQLite](assets/tree-sqlite-crud.png)

El código fuente completo puede obtenerse desde el siguiente enlace:

- [Código fuente](https://github.com/jamj2000/nxsqlite-crud)

Los archivos directamente relacionados con la Base de Datos, son:

- `src/database/db.js`
- `src/lib/sqlite.js`
- `src/lib/actions.js`


```javascript
// src/database/db.js
const sqlite3 = require("sqlite3").verbose();

const createTable = `CREATE TABLE IF NOT EXISTS articulos (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./db.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => { if (err) return console.error(err.message); console.log("Connected to the SQlite database."); }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items of table if it doesn't exist
  db.run(createTable,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created items table.");

    // ...
    }
  );
});
```

```javascript
// src/lib/sqlite.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
        filename: "./src/database/db.sqlite", // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
}

export default db;
```

```javascript
'use server'
// src/lib/actions.js
import db from '@/lib/sqlite'


export async function getArticulos() {

    // ...
    const results = await db.all('select * from articulos');
    // ...

}

export async function createArticulo(formData) {

    // ...
    const query = 'insert into articulos(nombre,descripcion,precio) values (?, ?, ?)';
    const results = await db.run(query, [nombre, descripcion, precio]);
    // ...

}


export async function updateArticulo(formData) {

    // ...
    const query = 'update articulos set nombre = ?, descripcion = ?, precio = ? where id = ? ';
    const results = await db.run(query, [nombre, descripcion, precio, id]);
    // ...

}

export async function deleteArticulo(formData) {

    // ...
    const query = 'delete from articulos where id = ?';
    const results = await db.run(query, [id]);
    // ...

}
```



## 2.2. Otros aspectos

SQLite nos permite trabajar sin necesidad de instalar un SGBD, puesto que trabaja directamente con el archivo en disco. Por tanto, esta base de datos es muy adecuada cuando deseamos realizar pruebas sin la necesidad de instalar un sistema gestor de bases de datos.



# 3. MySQL

MySQL/MariaDB es un sistema gestor de bases de datos ampliamente usado hoy en día. Para trabajar con él los haremos con el driver **`mysql2`** y usando un entorno de desarrollo local, es decir un servidor de base de datos en `localhost:3306`. El driver `mysql2` es el más usado para trabajar con bases de datos de este tipo. Tiene varios millomes de descargas semanales según el sitio [npmjs.com](https://www.npmjs.com/package/mysql2).

Este driver permite disponer de un **pool** (o grupo de conexiones) de conexiones, lo cual es muy útil cuando estamos trabajando en una aplicación web u otro software que realiza consultas frecuentes. Puedes consultar en https://sidorares.github.io/node-mysql2/docs#using-connection-pools.


## 3.1. Proyecto

La estructura del proyecto es la siguiente:

![Archivos de CRUD MySQL](assets/tree-mysql-crud.png)

El código fuente completo puede obtenerse desde el siguiente enlace:

- [Código fuente](https://github.com/jamj2000/nxmysql-crud)

Los archivos directamente relacionados con la Base de Datos, son:

- `src/database/db.sql`
- `src/lib/mysql.js`
- `src/lib/actions.js`


```sql
-- src/database/db.sql
CREATE TABLE articulos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion VARCHAR(200),
    precio DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALTER TABLE articulos ADD COLUMN imagen VARCHAR(200) AFTER descripcion;
```

```javascript
// src/lib/mysql.js
import mysql from 'mysql2/promise';

// Para inicializar una conexión
export const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'test',
});

// Para inicializar un pool de conexiones
export const const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'test',

  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
```


```javascript
'use server'
// src/lib/actions.js
import { pool } from '@/lib/mysql'


export async function getArticulos() {

    const connection = await pool.getConnection();
    // ...
    const sql = 'select * from `articulos`';
    const [rows] = await connection.execute(sql);
    // ...
    connection.release();

}

export async function createArticulo(formData) {

    const connection = await pool.getConnection();
    // ...
    const sql = 'insert into `articulos` (`nombre`, `descripcion`, `precio`) values (?, ?, ?)'
    const values = [nombre, descripcion, precio];
  
    const [result, fields] = await connection.execute(sql, values)
    // ...
    connection.release();

}


export async function updateArticulo(formData) {

    const connection = await pool.getConnection();
    // ...
    const sql = 'update `articulos` set `nombre` = ?, `descripcion` = ?, `precio` = ? where `id` = ?'
    const values = [nombre, descripcion, precio, id];
  
    const [result, fields] = await connection.execute(sql, values)
    // ...
    connection.release();

}

export async function deleteArticulo(formData) {

    const connection = await pool.getConnection();
    // ...
    const sql = 'delete from articulos where id = ?'
    const values = [ id ]
  
    const [result, fields] = await connection.execute(sql, values);
    // ...
    connection.release();

}
```

El driver `mysql2` permite 2 tipos de consultas:

1. Consultas simples
2. Sentencias preparadas

Si vamos a ejecutar muchas veces el mismo tipo de consulta, aunque sea con datos distintos, nos interesará usar sentencias preparadas, puesto que se 
almacenará en caché para un mejor rendimiento.      

Para mayor información acerca de como realizar consultas preparadas, dispones de la siguiente documentación:

- [SELECT](https://sidorares.github.io/node-mysql2/docs/examples/queries/prepared-statements/insert)
- [SELECT](https://sidorares.github.io/node-mysql2/docs/examples/queries/prepared-statements/select)
- [SELECT](https://sidorares.github.io/node-mysql2/docs/examples/queries/prepared-statements/update)
- [SELECT](https://sidorares.github.io/node-mysql2/docs/examples/queries/prepared-statements/delete)


Por otro lado, hemos usado conexiones obtenidas de un *pool*, por lo cual necesitamos las sentencias:

```js
import { pool } from '@/lib/mysql'
// ...  

const connection = await pool.getConnection();

// query

connection.release();
```

Si no hacemos uso del *pool*, bastaría con hacer

```js
import { db } from '@/lib/mysql'
// ...

const [rows, fields] = await db.query(sql);
```


## 3.2. Otros aspectos

Debemos resaltar que el código anterior es interesante por los siguientes motivos:

- No sólo es posible acceder a la base de datos desde `server actions`. También es posible hacerlo desde otros componentes del servidor como, por ejemplo, `src/app/articulos/update/page.js` y `src/app/articulos/delete/page.js`
- El componente `src/components/Articulo.js` acepta propiedades, entre ellas el famoso **`children`**, que nos permite incrustar contenido JSX.
- El componente `src/components/Form.js` también acepta propiedades pero, en este caso, lo interesante es observar como el contenido JSX difiere del HTML tradicional.  


**src/components/Articulo.js**

Dentro del JSX, donde aparece `{children}`, podremos insertar botones a la hora de usar el componente `Articulo`.

```javascript
// src/components/Articulo.js
function Articulo({ children, articulo }) {
    return (
        <div style={{ 'border': '1px solid lightgrey', 'padding': '50px' }}>
            <p><strong>{articulo.nombre}</strong></p>
            <p>{articulo.descripcion}</p>
            <p>{articulo.precio} €</p>
            {children}
        </div>
    )
}

export default Articulo
```

**src/components/Form.js**

Cuando trabajamos con JSX es frecuente olvidar que no se trata de código HTML. Los siguientes atributos JSX son distintos a los usados en HTML:

| Etiqueta | atributo HTML | atributo JSX       |
| -------- | ------------- | ------------------ |
| `label`  | for           | **htmlFor**        |
| `input`  | autofocus     | **autoFocus**      |
| `input`  | value         | **defaultValue**   |
| `input`  | checked       | **defaultChecked** |


```javascript
// src/components/Form.js
function Form({ action, title, articulo, disabled }) {

    return (
        <form action={action} >
            <input type='hidden' name='id' value={articulo?.id} />
            <fieldset disabled={disabled}>
                <label htmlFor='nombre'>Nombre</label>
                <input type='text' id='nombre' name='nombre'
                    placeholder='Nombre'
                    defaultValue={articulo?.nombre} autoFocus ></input>
                <label htmlFor='descripcion'>Descripción</label>
                <input type='text' id='descripcion' name='descripcion'
                    placeholder='Descripción'
                    defaultValue={articulo?.descripcion} />
                <label htmlFor='precio'>Precio</label>
                <input type='number' id='precio' name='precio' min='0' step={0.01}
                    placeholder='precio'
                    defaultValue={articulo?.precio} />
            </fieldset>
            <button type='submit'>{title}</button>
        </form>
    )
}

export default Form
```



# 4. MySQL (Serverless)

MySQL/MariaDB es un sistema gestor de bases de datos ampliamente usado hoy en día. Para trabajar con él los haremos con el driver **`serverless-mysql`** y usando un entorno de desarrollo local, es decir un servidor de base de datos en `localhost:3306`.


## 4.1. Proyecto

La estructura del proyecto es la siguiente:

![Archivos de CRUD MySQL](assets/tree-mysql-crud-serverless.png)

El código fuente completo puede obtenerse desde el siguiente enlace:

- [Código fuente](https://github.com/jamj2000/nxmysql-crud-serverless)

Los archivos directamente relacionados con la Base de Datos, son:

- `src/database/db.sql`
- `src/lib/mysql.js`
- `src/lib/actions.js`


```sql
-- src/database/db.sql
CREATE TABLE articulos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion VARCHAR(200),
    precio DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALTER TABLE articulos ADD COLUMN imagen VARCHAR(200) AFTER descripcion;
```

```javascript
// src/lib/mysql.js
import mysql from 'serverless-mysql'

Podemos inicializar la conexión de esta manera
export const db = mysql({
    config: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'crud'
    }
})

// También podemos inicializar la conexión de esta otra manera
// export const db = mysql('mysql://root:root@localhost:3306/crud')
```

```javascript
'use server'
// src/lib/actions.js
import { db } from '@/lib/mysql'


export async function getArticulos() {

    // ...
    const results = await db.query('select * from articulos');
    // ...

}

export async function createArticulo(formData) {

    // ...
    const query = 'insert into articulos(nombre,descripcion,precio) values (?, ?, ?)';
    const results = await db.query(query, [nombre, descripcion, precio]);
    // ...

}


export async function updateArticulo(formData) {

    // ...
    const query = 'update articulos set ? where id = ? ';
    const results = await db.query(query, [{nombre, descripcion, precio}, id]);
    // ...

}

export async function deleteArticulo(formData) {

    // ...
    const query = 'delete from articulos where id = ?';
    const results = await db.query(query, [id]);
    // ...

}
```

## 4.2. Otros aspectos

El proyecto anterior, aunque simple, es muy adecuado desde un punto de vista didáctico, pues no sólo se muestra como trabajar con MySQL, sino que lo hace con un *driver* que permite acceso a base de datos *serverless*, lo cual es cada día más habitual. Por ejemplo, desde [PlanetScale](https://planetscale.com/features) podemos leer lo siguiente:

> *PlanetScale is a MySQL-compatible serverless database that brings you scale, performance, and reliability — without sacrificing developer experience.*



# 5. Postgres

[Postgres](https://es.wikipedia.org/wiki/PostgreSQL) es un sistema gestor de bases de datos que está ganando bastante aceptación últimamente. Esto es debido principalmente a numerosos factores:

- Es software de código abierto.
- Uso gratuito, lo que la convierte en una opción rentable para muchas organizaciones. 
- Sigue de forma bastante fidedigna el estándar SQL.
- Ofrece amplia funcionalidad: transacciones, lenguaje procedimental, ...
- Existe bastante documentación.
- Cada vez existen más proveedores en la nube de este DBaaS.

Para trabajar con él los haremos con el driver **`pg`** y usando un entorno de desarrollo local, es decir un servidor de base de datos en `localhost:5432`.


## 5.1. Proyecto

La estructura del proyecto es la siguiente:

![Archivos de CRUD MySQL](assets/tree-postgres-crud.png)

El código fuente completo puede obtenerse desde el siguiente enlace:

- [Código fuente](https://github.com/jamj2000/nxpostgres-crud)

Los archivos directamente relacionados con la Base de Datos, son:

- `src/database/config.mjs`
- `src/database/seed.mjs`
- `src/lib/postgres.js`
- `src/lib/actions.js`


```javascript
// src/database/config.mjs
const config = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
}

export default config
```


```javascript
// src/database/seed.mjs
import pg from 'pg'
import config from './config.mjs'

const { Client } = pg
const client = new Client(config)


const load = async () => {
    try {
        await client.connect()

        let result = await client.query(`
        CREATE TABLE IF NOT EXISTS articulos (
            id SERIAL PRIMARY KEY,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            precio DECIMAL(10,2)
            );
        `)
        console.log("Creada tabla artículos");

        result = await client.query(`
        INSERT INTO articulos (nombre, descripcion, precio)
        VALUES 
           ('PC', 'Ordenador de sobremesa', 999.99),
           ('Impresora', 'Impresora Epson', 55.99),
           ('Teclado', 'Teclado USB', 19.91);
        `)
        console.log("Insertados varios artículos");

    } catch (error) {
        console.log(error);
    } finally {
        await client.end()
    }
}

load()
```


```js
// src/lib/postgres.js
import pg from 'pg'
import config from '../database/config.mjs'

const { Pool } = pg

export const pool = new Pool(config)

/*
// OTRA FORMA DE CREAR EL POOL
import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: "postgres://usuario:contraseña@host:5432/basedatos?sslmode=require"
})
```


```javascript
'use server'
// src/lib/actions.js
import { pool } from '@/lib/postgres'


export async function getArticulos() {

    // ...
    const results = await pool.query('select * from articulos');
    // ...

}

export async function createArticulo(formData) {

    // ...
    const query = 'insert into articulos(nombre,descripcion,precio) values ($1, $2, $3)';
    const results = await pool.query(query, [nombre, descripcion, precio]);
    // ...

}


export async function updateArticulo(formData) {

    // ...
    const query = 'update articulos set nombre=$1, descripcion=$2, precio=$3 where id=$4';
    const results = await pool.query(query, [nombre, descripcion, precio, id]);
    // ...

}

export async function deleteArticulo(formData) {

    // ...
    const query = 'delete from articulos where id=$1';
    const results = await pool.query(query, [id]);
    // ...

}
```


## 5.2. Otros aspectos

[El driver *`pg`* es uno de los más descargados](https://www.npmjs.com/package/pg), con más de 5M de descargas semanales. Este driver permite disponer de un **pool** (o grupo de conexiones) de conexiones, lo cual es muy útil cuando estamos trabajando en una aplicación web u otro software que realiza consultas frecuentes. 

Otro driver similar es [`postgres`](https://www.npmjs.com/package/postgres), aunque con muchas menos descargas.



# 6. Postgres (Vercel)

A diferencia del apartado anterior, en el que hemos trabajado con Postgres en un entorno local, en este apartado usaremos Postgres en la nube.

Aunque usaremos la base de datos Postgres proporcionada por [Vercel](https://vercel.com/docs/storage/vercel-postgres), también disponemos de otras como [Neon.tech](https://neon.tech/) o [Supabase](https://supabase.com/docs/guides/database/overviews)

Para trabajar con él los haremos con el driver **`@vercel/postgres`** y usando el [DBaaS proporcionado por Vercel](https://vercel.com/storage/postgres).


## 6.1. Proyecto


La estructura del proyecto es la siguiente:

![Archivos de CRUD Postgres](assets/tree-postgres-crud-vercel.png)

El código fuente completo puede obtenerse desde el siguiente enlace:

- [Código fuente](https://github.com/jamj2000/nxpostgres-crud-vercel)

Los archivos directamente relacionados con la Base de Datos, son:

- `.env`
- `src/database/seed.mjs`
- `src/lib/actions.js`

El driver `@vercel/postgres` trabaja con la variable de entorno `POSTGRES_URL`, por lo tanto es importante que la indiquemos en el archivo **`.env`**, en este caso lo haremos en 2 sitios con el mismo formato:

```
POSTGRES_URL="postgres://usuario:password@host:5432/basedatos"
```

```javascript
// src/database/seed.mjs
import { sql } from '@vercel/postgres';


const load = async () => {
    try {
        let result = await sql`
        CREATE TABLE IF NOT EXISTS articulos (
            id SERIAL PRIMARY KEY,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            precio DECIMAL(10,2)
            );
        `;
        console.log("Creada tabla artículos");

        result = await sql`
        INSERT INTO articulos (nombre, descripcion, precio)
        VALUES 
           ('PC', 'Ordenador de sobremesa', 999.99),
           ('Impresora', 'Impresora Epson', 55.99),
           ('Teclado', 'Teclado USB', 19.91);
        `;
        console.log("Insertados varios artículos");

        await sql.end()

    } catch (error) {
        console.log(error);
    }
}

load();
```


```javascript
'use server'
// src/lib/actions.js
import { sql } from '@vercel/postgres';


export async function getArticulos() {

    // ...
    const { rows } = await sql`select * from articulos;`
    // ...

}

export async function createArticulo(formData) {

    // ...
    const results = await sql`
    insert into articulos(nombre,descripcion,precio) values (${nombre}, ${descripcion}, ${precio});
    `
    // ...

}


export async function updateArticulo(formData) {

    // ...
    const results = await sql` 
    update articulos set nombre=${nombre}, descripcion=${descripcion}, precio=${precio} where id = ${id};
    `
    // ...

}

export async function deleteArticulo(formData) {

    // ...
    const results = await sql`delete from articulos where id = ${id};`
    // ...

}
```


## 6.2. Otros aspectos

Por supuesto, un prerrequisito para que todo ello funcione es tener creada una base de datos en Vercel. Puedes hacerlo desde tu `dashboard` en `Add New...`, `Storage`.

![Vercel Create Storage](assets/vercel-create-storage.png)

Luego pulsaremos en el botón `Create Database`.

![Vercel Create Database](assets/create-database.png)


A la hora de desplegar en Vercel la aplicación deberemos configurar las variables de entorno, en este caso `POSTGRES_URL`.

![Vercel Create Env var](assets/env-var.png)

> **NOTA**: Además de Vercel, otros proveedores de DBaaS Postgres son:
> - [Neon.tech](https://neon.tech/)
> - [Supabase](https://supabase.com/)




# 7. Primeros pasos con ORM Prisma

Un **ORM**, o **Object Relational Mapper**, es una pieza de software diseñada para traducir entre las representaciones de datos utilizadas por las bases de datos y las utilizadas en la programación orientada a objetos.

Desde la perspectiva de un desarrollador, un ORM le permite trabajar con datos respaldados por bases de datos utilizando las mismas estructuras y mecanismos orientados a objetos que usaría para cualquier tipo de datos internos. En general, los ORM sirven como una capa de abstracción entre la aplicación y la base de datos. 

Cada lenguaje/framework tiene su propio ORM. A continuación se muestran los más conocidos:

- Doctrine (PHP/Symfony)
- Eloquent (PHP/Laravel)
- JPA (Java)
- Hibernate (Java/Spring)
- Sequelize (Node.js)
- Prisma (Node.js)

En este tema veremos el ORM **Prisma**, disponible para Javascript/Typescript y que soporta las siguientes bases de datos:

- PostgreSQL
- MySQL
- SQLite
- SQL Server
- MongoDB
- CockroachDB

En general, las tareas básicas a la hora de gestionar la persistencia de datos son tres:

1. **Crear la base de datos**: reserva de espacio en un DBaaS o similar.
2. **Migrar** (`migrate`): creación de tablas.
3. **Sembrar** (`seed`): inserción de datos iniciales.

Las dos primeras tareas son obligatorias. La tercera tarea es opcional.


## 7.1. Instalación del paquete prisma

```sh 
npm install prisma -D
npm install @prisma/client
``` 

## 7.2. Comandos disponibles

`npx prisma`

## 7.3. Inicialización

`npx prisma init`

> **NOTA**: Podemos indicar el proveedor de datos en la inicialización. Por ejemplo:
>
> ```sh
> npx prisma init --datasource-provider postgresql
> npx prisma init --datasource-provider mysql
> npx prisma init --datasource-provider sqlite
> ```   


Este comando hace dos cosas:

1. crea un nuevo directorio y archivo llamados **`prima/schema.prisma`**, que contiene el esquema de Prisma con la variable de conexión de su base de datos.
2. añade al archivo **`.env`** en el directorio raíz del proyecto la variable de entorno `DATABASE_URL`, que debeás posteriormente editar manualmente para apuntar a tu base de datos.


**`prisma/schema.prisma`**

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Como `provider` del `datasource` tenemos los siguientes: 

- sqlite
- postgresql
- mysql
- sqlserver
- mongodb
- cockroachdb


**`.env`**

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

> **NOTA**: El formato de la variable de entorno `DATABASE_URL` es el siguiente:
>
> `DATABASE_URL='<provider>://<user>:<pass>@<host>:<port>/<db>'`


# 8. Definiendo el Modelo de Datos

Hay dos formas alternativas de definir un modelo de datos:

1. **Escribir el modelo de datos manualmente y usar Prisma Migrate**: puedes escribir tu modelo de datos manualmente y asignarlo a tu base de datos usando Prisma Migrate. En este caso, el modelo de datos es la única fuente de verdad para los modelos de tu aplicación.

2. **Generar el modelo de datos mediante introspección**: cuando tienes una base de datos existente o prefieres migrar el esquema de tu base de datos con SQL, genera el modelo de datos mediante una introspección de tu base de datos. En este caso, el esquema de la base de datos es la única fuente de verdad para los modelos de tu aplicación.


Nosotros usaremos la primera forma, aunque se explica la segunda forma de manera somera más adelante.


## 8.1. Escribir el modelo de datos manualmente

En este caso, tenemos una base de datos totalmente vacía, sin tablas creadas previamente. Para generar el modelo desde cero, editamos el archivo **`prisma/schema.prisma`** para añadir los modelos deseados. Una vez hecho lo anterior ejecutamos:

```sh
npx prisma migrate dev   
```

Si no ha habido cambios se mostrará un mensaje similar al siguiente:

![prisma migrate sin cambios](assets/migrate-dev1.png)

Si ha habido algún cambio al esquema, entonces nos solicitará un nombre para la migración:

![prisma migrate con cambios](assets/migrate-dev2.png)

> **NOTA:**
>
> Una operación muchos más cómoda y directa, es hacer:
>
> **`npx  prisma  db  push`**
>



### 8.1.1. Modelos

- [Modelos en Prisma](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)


**Reglas de nombrado para Modelos:**

- Los nombres de los modelos deben cumplir con la siguiente expresión regular: `[A-Za-z][A-Za-z0-9_]*`
- Los nombres de los modelos deben comenzar con una letra y normalmente se escriben en **PascalCase**
- Los nombres de los modelos deben usar la forma singular (por ejemplo, `Usuario` en lugar de usuario, usuarios o Usuarios)

> **NOTA**: Puede utilizar el atributo `@@map` para asignar un modelo (por ejemplo, `Usuario`) a una tabla con un nombre diferente que no coincide con las convenciones de nomenclatura del modelo (por ejemplo, usuarios).


**Reglas de nombrado para Campos**

Reglas de nombrado:

- Debe cumplir con la siguiente expresión regular: [A-Za-z][A-Za-z0-9_]*
- Debe comenzar con una letra y normalmente se escriben en **camelCase**
  
> **NOTA**: Puede utilizar el atributo `@map` para asignar un nombre de campo a una columna con un nombre diferente que no coincida con las convenciones de nomenclatura de campos: p. ej. `miCampo @map("mi_campo")`.


**Ejemplo**:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Articulo {
  id          Int       @id @default(autoincrement())
  nombre      String
  descripcion String?
  precio      Decimal?  

  @@map("articulos")
}
```

> NOTA: El signo **`?`** significa que el valor no es requerido, es decir admite NULL.


**Tipos de datos**

Prisma define los siguientes tipos de datos:

- [String](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#string)
- [Boolean](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#boolean)
- [Int](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#int)
- [BigInt](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#bigint)
- [Float](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#float)
- [Decimal](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#decimal)
- [DateTime](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datetime)
- [Json](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#json)

Estos tipos de datos son mapeados a los tipos nativos de cada base de datos según se muestra en la siguiente tabla:

| Prisma      | String         | Boolean    | Int     | BigInt  | Float            | Decimal        | DateTime     | Json                               |
| ----------- | -------------- | ---------- | ------- | ------- | ---------------- | -------------- | ------------ | ---------------------------------- |
| PostgreSQL  | text           | boolean    | integer | bigint  | double precision | decimal(65,30) | timestamp(3) | jsonb                              |
| SQL Server  | nvarchar(1000) | tinyint    | int     | int     | float(53)        | decimal(32,16) | datetime2    | Not supported                      |
| MySQL       | varchar(191)   | TINYINT(1) | INT     | BIGINT  | DOUBLE           | DECIMAL(65,30) | DATETIME(3)  | JSON                               |
| MongoDB     | String         | Bool       | Int     | Long    | Double           | Not supported  | Timestamp    | A valid BSON object (Relaxed mode) |
| SQLite      | TEXT           | INTEGER    | INTEGER | INTEGER | REAL             | DECIMAL        | NUMERIC      | Not supported                      |
| CockroachDB | STRING         | BOOL       | INT     | INTEGER | DOUBLE PRECISION | DECIMAL        | TIMESTAMP    | JSONB                              |



### 8.1.2. Relaciones 

- [Relaciones en Prisma](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations)

![Esquema de ejemplo](assets/sample-database.png)

**[Uno a Uno](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-one-relations)**

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique  // campo escalar (usado en atributo `@relation`)
}
```

**[Uno a Muchos](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-many-relations)**

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int  // campo escalar (usado en atributo `@relation`)
}
```

Una relación uno-muchos puede ser opcional.

En el siguiente ejemplo, se permite crear un Post sin asignar un User. Observar el signo **`?`** en los 2 últimos campos.


```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int   @id @default(autoincrement())
  author   User? @relation(fields: [authorId], references: [id])
  authorId Int?
}
```

**[Muchos a Muchos](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations)**

```prisma
model Post {
  id         Int       @id @default(autoincrement())
  title      String
  categories CategoriesOnPosts[]
}

model Category {
  id    Int            @id @default(autoincrement())
  name  String
  posts CategoriesOnPosts[]
}

model CategoriesOnPosts {
  post       Post     @relation(fields: [postId], references: [id])
  postId     Int     // campo escalar (usado en atributo `@relation`)
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId Int     // campo escalar (usado en atributo `@relation`)
  assignedAt DateTime @default(now())
  assignedBy String

  @@id([postId, categoryId])
}
```

Si en la tabla intermedia no tenemos campos propios, Prisma nos permite simplificar el esquema, que quedaría así:

```prisma
model Post {
  id         Int         @id @default(autoincrement())
  title      String
  categories Category[]
}

model Category {
  id    Int              @id @default(autoincrement())
  name  String
  posts Post[]
}
```

Esto se conoce como relación implícita de muchos a muchos. Esta relación todavía se manifiesta en una tabla de relaciones en la base de datos subyacente. Sin embargo, Prisma gestiona esta tabla de relaciones.


### 8.1.3. Sincronizando el esquema con la base de datos


Siempre que actualices tu esquema Prisma, deberás actualizar el esquema de tu base de datos utilizando `npx prisma migrate dev` o `npx prisma db push`. Esto mantendrá el esquema de tu base de datos sincronizado con tu esquema Prisma. Los comandos también regenerarán Prisma Client.


Para ello ejecutaremos:

```sh
npx prisma migrate dev --name nombremigracion
```

o, en su lugar, ejecutaremos:


```sh
npx prisma db push
```

> **IMPORTANTE**: La operación `npx prisma db push` eliminará todas las tablas previas en la base de datos que no aparezcan registradas en `prisma/schema.prisma`. 



## 8.2. Generar el modelo de datos mediante introspección

En el caso de que dispongamos de tablas previamente creadas en la base de datos y deseemos mantener la información, podemos generar el modelo a partir de dichas tablas. Para ello ejecutamos:

```sh
npx prisma db pull    
npx prisma generate
```

> **IMPORTANTE**: La operación `npx prisma db pull` borra el modelo previo de `prisma/schema.prisma`. 

![prisma db pull](assets/introspect.png)

![prisma generate](assets/generate.png)


# 9. Consultas

- [Consultas con Prisma](https://www.prisma.io/docs/orm/prisma-client/queries)


## 9.1. Consultas CRUD

CRUD es el acrónimo para:

- **Create**
- **Read**
- **Update**
- **Delete**

Estas son las 4 operaciones básicas necesarias para la gestión de información.

- [Consultas CRUD con Prisma](https://www.prisma.io/docs/orm/prisma-client/queries/crud)

A continuación, a menudo, usaremos ejemplos con valores explícitos. Usaremos el siguiente esquema:

![diagrama ER](assets/prisma-erd.png)

<details>
<summary>Esquema Prisma</summary>

<pre>

model User {
  id           Int       @id 
  name         String?
  email        String    @unique
  password     String
  age          Int?
  country      String?
  profileViews Int
  role         Role      @default(USER)
  coinflips    Boolean[]
  posts        Post[]
  profile      Profile?
}

model Post {
  id        Int     @id 
  title     String
  published Boolean @default(true)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id        Int    @id 
  biography String
  user      User   @relation(fields: [userId], references: [id])
  userId    Int    @unique
}

enum Role {
  USER
  ADMIN
}

</pre> 
</details>

### 9.1.1. Create

```javascript
const user = await prisma.user.create({
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
  },
})
```


**Insertar user y algunos posts asociados**

```javascript 
const user = await prisma.user.create({
  data: {
    email: 'ariadne@prisma.io',
    name: 'Ariadne',
    posts: {
      create: [
        {
          title: 'My first day at Prisma',
        },
        {
          title: 'How to connect to a SQLite database',          
        },
      ],
    },
  },
})
```


### 9.1.2. Read

**Encontrar un registro por ID**

```javascript
const user = await prisma.user.findUnique({
  where: {
    id: 1,
  },
})
```  

**Encontrar el primer registro por nombre**

```javascript
const user = await prisma.user.findFirst({
  where: {
    name: 'Lenny',
  },
})
```  

**Encontrar todos los registros**

```javascript
const users = await prisma.user.findMany()
const users = await prisma.user.findMany({}) // equivalente a la anterior
```


**Estructura general de consultas find**


> **NOTA**: **Cada una de las siguentes propiedades es opcional y puede colocarse en cualquier orden.**

Podemos usar esta forma

```javascript
const users = await prisma.user.findMany({
  select: { /*...*/},
  where: { /*...*/},
  orderBy: {/*...*/},
  skip: /*...*/,        // corresponde al LIMIT de SQL
  take: /*...*/,        // corresponde al OFFSET de SQL
})
```

o, también podemos usar

```javascript
const users = await prisma.user.findMany({
  include: { /*...*/},  // corresponde al JOIN de SQL
  where: { /*...*/},
  orderBy: {/*...*/},
  skip: /*...*/,        // corresponde al LIMIT de SQL
  take: /*...*/,        // corresponde al OFFSET de SQL
})
```

> **IMPORTANTE**: NO SE PERMITE USAR `select` E `include` A LA VEZ EN EL MISMO NIVEL.
>
> **INCORRECTO**
> 
> ![ko - skip & take](assets/ko-select-include.png)
>
> **CORRECTO**
> 
> ![ok - skip & take](assets/ok-select-include.png)


**Ejemplo**

```javascript
const getUser = await prisma.user.findMany({
  select: {
    email: true,
    name: true,
    age: true,
    posts: true,     // todos los campos de posts
    // posts: {
    //   select: {   // sólo algunos campos de posts
    //     id: true,
    //     title: true,
    //     published: true,
    //   },
    // }
  },
  where: {
    name: {
      not: 'Lenny',
      contains: 'le',  
      // startsWith: 'le',
      // endsWith: 'le',
      mode: 'insensitive',  // no diferencia entre mayúsculas y minúsculas
    },
    age: {
      gt: 30,     // gte, lt, lte, not
    }
  },
  orderBy: {
    age: 'desc',  //  'asc'
  },
  skip: 100,      // ignoramos los primeros 100 registros
  take: 25,       // obtenenos sólo 25 registros 
})
```

Si deseamos obtener todos los campos de `user` y todos los campos de `posts`, podemos simplificar la consulta

```javascript
const getUser = await prisma.user.findMany({
  include: { 
    posts: true,
  }
  where: {
    name: {
      not: 'Lenny',
      contains: 'le',  
      // startsWith: 'le',
      // endsWith: 'le',
      mode: 'insensitive',  // no diferencia entre mayúsculas y minúsculas
    },
    age: {
      gt: 30,     // gte, lt, lte, not
    }
  },
  orderBy: {
    age: 'desc',  //  'asc'
  },
  skip: 100,      // ignoramos los primeros 100 registros
  take: 25,       // obtenenos sólo 25 registros 
})
```


![skip & take](assets/skip-take.png)


> **NOTA**: la documentación referida a **operadores** y **condiciones de filtrado** está accesible en
>
> https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators


### 9.1.3. Update

**Actualizar un registro por ID**

La forma de esta consulta es muy similar a `create`. La única diferencia, aparte del uso de **`update`**, es que es necesario usar una propiedad `where`.

```javascript
const user = await prisma.user.update({
  where: {
    id: 1,
  }
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
  },
})
```

### 9.1.4. Delete

**Elimnar un registro por ID**

Esta es una de las consultas más sencillas de expresar.

```javascript
const deleteUser = await prisma.user.delete({
  where: {
    id: 1,
  },
})
```

## 9.2. Otras consultas

### 9.2.1. count

Usaremos **`count()`** para contar la cantidad de registros o valores de campos no nulos. La siguiente consulta de ejemplo cuenta todos los usuarios:

```js
const userCount = await prisma.user.count()
```

Para contar cuantos usuarios tienen el campo `profileViews` igual o superior a 100.

```js
const userCount = await prisma.user.count({
  where: {
    profileViews: {
      gte: 100,
    },
  },
})
```

### 9.2.2. groupBy

El uso de **`groupBy()`** nos permite agrupar registros por uno o más valores de campo, como país o país y ciudad, y realizar agregaciones en cada grupo, como encontrar la edad promedio de las personas que viven en una ciudad en particular.

Para agregar valores usaremos:

- `_count`
- `_sum`
- `_avg`
- `_min`
- `_max`


```js
const groupUsers = await prisma.user.groupBy({
  by: ['country'],
  where: {
    country: {
      notIn: ['Sweden', 'Ghana'],
    },
  },
  _sum: {
    profileViews: true,
  },
  having: {
    profileViews: {
      _min: {
        gte: 10,
      },
    },
  },
})
```

Documentación disponible en:

- [Aggregation, Grouping, Summarizing](https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing)


# 10. Ver datos de las tablas

Ejecutamos

```sh
npx prisma studio
```

y abrimos en el navegador la URL http://localhost:5555

![prisma studio 1](assets/studio1.png)

![prisma studio 2](assets/studio2.png)


# 11. Cómo organizar el código

En la mayoría de frameworks tradicionales el código se organiza según el [patrón MVC](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador). 

Sin embargo, Next.js trabaja por componentes y no sigue este patrón. Aunque este framework deja bastante libertad a la hora de organizar nuestro código, una propuesta recomendable es la siguiente. 

1. Como mínimo, **trabaja con 3 carpetas: app, components y lib**


```
src
├── app           (Páginas)
├── components    (Componentes de servidor y de cliente)
└── lib           (Conexión a BD, leer BD, modificar BD)
```

2. Como mínimo, coloca **2 archivos en la carpeta lib: data.js y action.js**

```
src/lib
├── actions.js    (Mutar Datos)
└── data.js       (Obtener datos) 
```

A continuación se muestra como organizar los archivos en una aplicación que trabaja con Productos.

<details>
<summary>
  Esquema de Prisma
</summary>

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  // provider = "postgresql"
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Producto {
  id     Int    @id @default(autoincrement())
  nombre String
}
```
</details>


```
src
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.jsx
│   ├── page.jsx
│   └── productos
│       ├── [id]
│       │   └── page.jsx
│       └── page.jsx
├── components
│   ├── Producto.jsx
│   └── Productos.jsx
└── lib
    ├── actions.js
    └── data.js
```




## 11.1. Obtener datos

Todas las operaciones para realizar consultas de lectura en la BD las colocaremos en el archivo **lib/data.js**

```js
// src/lib/data.js
'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()



export async function obtenerProductos() {
    const produtos = await prisma.producto.findMany()
    return produtos
}



export async function obtenerProducto(id) {
    const producto = await prisma.producto.findUnique({
        where: {
            id: +id
        }
    })
    return producto
}

```

A la hora de recuperar datos de la BD lo haremos dentro de un componente de servidor, esto nos permite envolver dicho componente dentro de **Suspense** y que la página cargue inmediatamente sin esperar a recibir todos los datos.


```js
// src/app/productos/page.jsx
import { obtenerProductos } from "@/lib/data";
import { Suspense } from "react";

export default function ProductosPage() {
    return (
        <div>
            <h1>Listado</h1>

            <Suspense fallback={"..."}>
                <Productos />
            </Suspense>

        </div>
    );
}

// --------------------- Componente de servidor -------------------

async function Productos() {
    const productos = await obtenerProductos()

    return (
        <div>
            {productos.map(producto =>
                <p key={producto.id}>
                    {producto.nombre}
                </p>
            )}
        </div>

    );
}
```



```js
// src/app/productos/[id]/page.jsx
import { obtenerProducto } from "@/lib/data";
import { Suspense } from "react";

export default async function ProductoPage({ params }) {

    const { id } = await params

    return (
        <div>
            <h1>Producto #{id}</h1>

            <Suspense fallback={"..."}>
                <Producto id={id} />
            </Suspense>

        </div>
    );
}

// --------------------- Componente de servidor -------------------

async function Producto({ id }) {

    const producto = await obtenerProducto(id)

    return (
        <div>
            {producto.nombre}
        </div>

    );
}
```


> **NOTA:**
>
> Aunque **Next.js recomienda usar páginas y componentes del lado servidor cuando recuperamos y mostramos datos**, también es posible usar para el mismo fin una página del lado cliente. A continuación tienes el código fuente para hacer un listado de Productos:
>
> ```js
> 'use client'
> 
> import { useEffect, useState } from "react";
> import { obtenerProductos } from "@/lib/data";
> 
> 
> function ClientPage() {
> 
>    const [productos, setProductos] = useState([])
> 
>    async function obtenerDatos() {
>        const productos = await obtenerProductos()
>        setProductos(productos)
>    }
> 
>    useEffect(() => {
>        // esto equivale a hacer fetch pero sin la necesidad de disponer de una API 
>        obtenerDatos()  
>    }, [])
> 
> 
>    return (
>        <div>
>            {/* Si desas interactividad descomenta las siguientes líneas */}
>            {/*
>            <div onClick={obtenerDatos}>
>                Obtener datos
>            </div>
>            */}
> 
>            <h1>Listado</h1>
> 
>            {productos.map(producto =>
>                <p key={producto.id}>
>                    {producto.nombre}
>                </p>
>            )}
>        </div>
>    );
> } 
>
> export default ClientPage;
> ```



## 11.2. Mutar datos

Entendemos por mutación datos a las operaciones de:

- Insertar
- Modificar
- Eliminar

Todas las operaciones para realizar consultas de mutación en la BD las colocaremos en el archivo **lib/actions.js**




# 12. Despliegue en Vercel


Vercel almacenará en caché automáticamente las dependencias durante el despliegue. Para la mayoría de las aplicaciones, esto no causará ningún problema. Sin embargo, para Prisma, puede resultar en una versión obsoleta de Prisma Client si se cambia su esquema de Prisma. 

Para evitar este problema, debemos añadir `prisma generate` al script `postinstall` en el archivo **`package.json`**:

```json
{
  ...
  "scripts" {
    ...
    "postinstall": "prisma generate"
  }
  ...
}
```

# 13. ANEXO: CRUD en una única página

Es posible realizar las 4 operaciones de CRUD desde una única página. Este caso es habitual cuando se trabaja con SPA (Single Page Applications). 

Desde NextJS también podemos ofrecer una funcionalidad prácticamente idéntica a la anterior. Para mostrar cómo se realiza, he desarrollado las 2 aplicaciones siguientes:

1. [Simple1: con componente de servidor](https://github.com/jamj2000/nxprisma-crud-simple1)
2. [Simple2: con componente de cliente](https://github.com/jamj2000/nxprisma-crud-simple2)

El primer ejemplo es mucho más sencillo, pero también dispone de menos funcionalidades. 

El segundo ejemplo es más complejo y dispone de mayor interactividad con el usuario. Después de obtener los datos desde el servidor, en el componente de cliente podemos realizar búsquedas por nombre y descripción y ordenar de forma ascendente y descendente por nombre y precio.



# 14. Referencias

- [Ejemplo con Prisma y Relación 1:N](https://github.com/jamj2000/nxprisma-crud-zoo)
- [Ejemplo con Prisma y Relación N:M](https://github.com/jamj2000/nxprisma-crud-negocio)
- [Video: Nextjs y Prisma ORM desde Cero usando Typescript](https://www.youtube.com/watch?v=5k7ZGhL3pI0&t=3938s)
- [Video: Prisma in Next.js](https://youtu.be/QXxy8Uv1LnQ)
- [MySQL API con NextJS](https://github.com/jamj2000/nxapi-mysql)
- [MySQL CRUD con NextJS](https://github.com/jamj2000/nxmysql-crud)
- [BD Serverless en PlanetScale](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)
- [Usando SQLite con NextJS 13](https://plainenglish.io/blog/using-sqlite-with-next-js-13)
- [Getting Started with Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart)
- [Get started with Prisma](https://www.prisma.io/docs/getting-started)
- [Prisma schema](https://www.prisma.io/docs/orm/prisma-schema)

