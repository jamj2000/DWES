> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 3: Programación basada en lenguajes de marcas con código embebido <!-- omit in toc -->
> NODE, MÓDULOS EXTERNOS, EXPRESS, FETCH, APIs

- [1. Introducción](#1-introducción)
- [2. Módulos externos](#2-módulos-externos)
  - [2.1. Instalación de módulos externos](#21-instalación-de-módulos-externos)
  - [2.2. Opciones de NPM](#22-opciones-de-npm)
  - [2.3. Desinstalación de módulos externos](#23-desinstalación-de-módulos-externos)
- [3. El framework EXPRESS](#3-el-framework-express)
- [4. Módulos CommonJS](#4-módulos-commonjs)
- [5. Módulos ECMAScript](#5-módulos-ecmascript)
- [Formularios](#formularios)
  - [application/x-www-form-urlencoded](#applicationx-www-form-urlencoded)
  - [multipart/form-data](#multipartform-data)
  - [*JSON*](#json)
- [6. Parámetros de URL](#6-parámetros-de-url)
  - [Parámetros de ruta (Path Parameters)](#parámetros-de-ruta-path-parameters)
  - [Parámetros de consulta (Query Parameters o Query Strings)](#parámetros-de-consulta-query-parameters-o-query-strings)
- [7. Fetch desde el servidor](#7-fetch-desde-el-servidor)
- [8. Referencias](#8-referencias)


---

# 1. Introducción

En este tema necesitaras consultar los recursos que aparecen a continuación para entender los **Arrays**, **Objetos** y **Arrow functions**, requisito imprescindible para trabajar en NodeJS y Javascript:

- [SINTAXIS DE JAVASCRIPT](https://github.com/jamj2000/Javascript/blob/master/02.SINTAXIS.md)
- [FUNCIONES](https://github.com/jamj2000/Javascript/blob/master/03.FUNCIONES.md)
- [ARRAYS](https://github.com/jamj2000/Javascript/blob/master/04.ARRAYS.md)
- [OBJETOS](https://github.com/jamj2000/Javascript/blob/master/05.OBJETOS.md)
- [AJAX](https://github.com/jamj2000/Javascript/blob/master/07.AJAX.md)



# 2. Módulos externos

NodeJS viene con numerosos módulos internos incorporados (built-in): `fs`, `os`, `process`, `path`, `http`, `https`, ...

Además NodeJS permite la instalación de módulos externos. Algunos de ellos, bastante populares, son `express`, `node-fetch`, `cors`, `live-server`, `react`, `react-dom`, ... Pueden consultarse en https://www.npmjs.com.

Para instalar estos módulos externos usamos la herramienta `npm`.

> **IMPORTANTE:** Antes de instalar módulos deberemos haber inicializado previamente el proyecto con
>
> `npm  init  -y`
>


## 2.1. Instalación de módulos externos

```bash
     npm  install  express      -S  
     npm  install  nodemon      -D  
sudo npm  install  json-server  -g  
```

o de forma más corta

```bash
     npm  i  express     -S  
     npm  i  nodemon     -D  
sudo npm  i  json-server -g
```

## 2.2. Opciones de NPM

**-S,  --save**
- dependencia de aplicación. Añade entrada en archivo `package.json`. En las últimas versiones de `npm` no es necesaria esta opción.

**-D,  --save-dev**
- dependencia de desarrollo. Añade entrada en archivo `package.json`.

**-g,  --global**
- instala en el sistema de forma global. Se usa normalmente para paquetes ejecutables.


## 2.3. Desinstalación de módulos externos
```bash
     npm  remove  express
     npm  remove  nodemon     -D 
sudo npm  remove  json-server -g 
```   
o de forma más corta

```bash
     npm  r  express 
     npm  r  nodemon     -D  
sudo npm  r  json-server -g
```


# 3. El framework EXPRESS

- Node.js nos permite desarrollar un servidor web desde cero.
- Para ello puede usarse los módulos incorporados `http` y `https`.
- Sin embargo es más recomendable, por su sencillez, usar el **framework `express`**.


# 4. Módulos CommonJS

Tradicionalemente NodeJS trabajaba y aún trabaja con **módulos CommonJS**. En este caso, para importar los módulos se hace con **`require`**. 

**Ejemplo de servidor con express y módulos CommonJS**


```bash
npm init -y
npm install express
```


```javascript
// server.js
// --- IMPORTACIONES
const path     = require('path');
const express  = require('express');

const app      = express();

// Archivos estáticos. Deberás crear un archivo public/index.html para ver el resultado
app.use(express.static(path.join(__dirname , 'public')));

// Ruta /hola
app.get ('/hola', (req, res) => { 
    res.send ('Hola mundo') 
});

// Ruta /hola/loquesea, p. ej:  /hola/jose,  /hola/ana, ...
app.get ('/hola/:usuario', (req, res) => { 
    res.send (`<h1>Buenos días, ${req.params.usuario}</h1>`); 
});

app.listen (3000);
```

Ejecutaremos:

```bash
node  server
```


# 5. Módulos ECMAScript

Una forma de importar módulos más moderna y, que además es usada también en el lado cliente, es trabajar con **módulos ECMAScript**. En este caso para importar los módulos se hace con **`import`**. 

**Ejemplo de servidor con express y módulos ECMAScript**

```bash
npm init -y
```

Insertamos línea `"type": "module"` en `package.json` para indicar que trabajaremos con módulos ECMAScript.

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Instalamos las dependecias:

```bash
npm install express
npm install -D standard  # Para trabajar con el linter eslint de Javascript
```

Insertamos en `package.json` las siguientes líneas:

```json
  "scripts": {
    "dev": "node --watch server.js"
  },
  "eslintConfig": {
    "extends": [
      "standard"
    ]
  },
```

Con lo cual, el archivo `package.json` quedaría así:

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "node --watch server.js"
  },
  "eslintConfig": {
    "extends": [
      "standard"
    ]
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "standard": "^17.1.0"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

Y el archivo `server.js` quedaría así:

```javascript
// server.js
// --- IMPORTACIONES
import path from 'path'
import express from 'express'

const app = express()

// Archivos estáticos. Deberás crear un archivo public/index.html para ver el resultado
app.use(express.static(path.join(process.cwd(), 'public')))

// Ruta /hola
app.get('/hola', (req, res) => {
  res.send('Hola mundo')
})

// Ruta /hola/loquesea, p. ej:  /hola/jose,  /hola/ana, ...
app.get('/hola/:usuario', (req, res) => {
  res.send(`<h1>Buenos días, ${req.params.usuario}</h1>`)
})

app.listen(3000)
```

Para lanzar el servidor, hacemos:

```bash
npm run dev
```

# Formularios

Los formularios es el método principal para enviar información al servidor desde el lado cliente o navegador. Los formularios únicamente pueden enviar esta información mediante 2 métodos:

- `GET`
- `POST`

El método `POST` es el recomendado, puesto que no tiene limitación en la longitud del contenido y los valores transferidos no se muestran en la `url`.

Cuando se envía información desde un formulario, ésta puede codificarse de 3 maneras distintas:


enctype        | Descripción
---------------|------------------
**application/x-www-form-urlencoded**	| **Codificación por defecto**. No es necesario hacerla explícita. Todos los caracteres se codifican antes del envío (los espacios se convierten en símbolos "+" y los caracteres especiales se convierten en valores ASCII HEX)
**multipart/form-data**	| Esta codificación es necesaria si el usuario desea **subir un archivo** a través del formulario.
**text/plain** | **Desaconsejada**. Envía datos sin ningún tipo de codificación. 
*application/json* | *No disponible*.


> **Referencias**: 
> - https://codex.so/handling-any-post-data-in-express
> - https://blog.jim-nielsen.com/2022/browsers-json-formdata/


## application/x-www-form-urlencoded

```javascript
const express = require('express');
const app = express();

/** Decode Form URL Encoded data */
app.use(express.urlencoded());

/** Show page with a form */
app.get('/', (req, res, next) => {
  res.send(`<form method="POST" action="/" enctype="application/x-www-form-urlencoded">
  <input type="text" name="username" placeholder="username">
  <input type="submit">
</form>`);
});

/** Process POST request */
app.post('/', function (req, res, next) {
  res.send(JSON.stringify(req.body));
});

/** Run the app */
app.listen(3000);
```

## multipart/form-data

```javascript
const express = require('express');
const app = express();

/** Require multer */
const multer = require('multer');

/** Show page with a form with a specific enctype */
app.get('/', (req, res, next) => {
  res.send(`<form method="POST" action="/" enctype="multipart/form-data">
  <input type="text" name="username" placeholder="username">
  <input type="submit">
</form>`);
});

/** Process POST request with a mutter's middleware */
app.post('/', multer().none(), function (req, res, next) {
  res.send(JSON.stringify(req.body));
});

/** Run the app */
app.listen(3000);
```

## *JSON* 

No existe la codificación `application/json` (~~enctype="application/json"~~). [Hubo una propuesta](https://www.w3.org/TR/html-json-forms/), pero quedó en nada.

Por tanto, en este caso no hay otra solución que usar Javascript en el lado cliente para gestionar las peticiones al servidor. Lo más frecuente es hacer uso de `fetch`.


```javascript
const express = require('express');
const app = express();

/** Decode JSON data */
app.use(express.json());

/** Show page with a input field, button and javascript */
app.get('/', (req, res, next) => {
  res.send(`
<script>
var send = function() {
  var username = document.getElementById('username').value;
  
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
    body: { username: username }
  })
    .then(response => response.json())
    .then(data => console.log(data) )
    .catch(console.error);
}   
</script>

<input type="text" name="username" placeholder="username" id="username">
<button onclick="send()">Send</button>`);
});

/** Process POST request */
app.post('/', function (req, res, next) {
  res.send(JSON.stringify(req.body));
});

/** Run the app */
app.listen(3000);
```



# 6. Parámetros de URL




## Parámetros de ruta (Path Parameters)

Son parámetros que están incorporados dentro de la ruta de la URL. Son parámetros de solicitud adjuntos a una URL que apuntan a un recurso de `API REST` específico.

Los parámetros de ruta son parte del `endpoint` y son obligatorios. Por ejemplo, `/users/{id}`, `{id}` es el parámetro de ruta del `endpoint` `/users`; apunta a un registro de usuario específico. Un `endpoint` puede tener varios parámetros de ruta, como en el ejemplo `/organizations/{orgId}/members/{memberId}`. Esto apuntaría al registro de un miembro específico dentro de una organización específica, y tanto `{orgID}` como `{memberID}` requerirían variables.



## Parámetros de consulta (Query Parameters o Query Strings)

Son parámetros que están al final de la ruta de la URL, tras el signo `?` y están separados unos de otros mediante `&`

Tienen la forma siguiente:

![Query Parameters](assets/query-parameters.png)

Los parámetros de consulta a menudo se utilizan para solicitar operaciones de clasificación, paginación o filtrado.


- https://www.abstractapi.com/api-glossary/path-parameters
- https://www.botify.com/learn/basics/what-are-url-parameters
- https://ahrefs.com/blog/url-parameters/



# 7. Fetch desde el servidor

Se entiende `fetch` como la recuperación de datos solicitados a un servidor. Es habitual que el formato de los datos sea `JSON`.

La [`API fetch`](https://developer.mozilla.org/es/docs/Web/API/Fetch_API), que se introdujo en 2015 como un reemplazo más contemporáneo de XMLHttpRequest, desde entonces se ha convertido en el estándar de facto para la realización de llamadas asincrónicas en aplicaciones web.

Aunque la `API Fetch` lleva tiempo disponible para su uso en navegadores web en el lado cliente, no estaba disponible para su uso desde el lado servidor debido a varias limitaciones.

Desde NodeJS v17.5.0, `fetch` se hizo disponible como función experimental para su uso desde el lado servidor.

- https://reqres.in/
- https://jsonplaceholder.typicode.com/
- https://randomuser.me


- https://randomuser.me/documentation

```javascript
fetch('https://randomuser.me/api/?results=10&nat=es&inc=name,location,phone')
  .then(res => res.json(res))
  .then(data => console.log(data.results))
```



# 8. Referencias

- [Apuntes de Javascript](https://github.com/jamj2000/Javascript)
- [CommonJS vs ES Modules](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/)