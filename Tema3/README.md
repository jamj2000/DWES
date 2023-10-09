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
- [6. Parámetros de URL](#6-parámetros-de-url)
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

# 6. Parámetros de URL

**Parámetros de ruta** (Path Parameters)


**Parámetros de consulta** (Query Parameters o Query Strings)


https://www.abstractapi.com/api-glossary/path-parameters
https://www.botify.com/learn/basics/what-are-url-parameters
https://ahrefs.com/blog/url-parameters/



# 7. Fetch desde el servidor

Se entiende `fetch` como la recuperación de datos solicitados a un servidor. Es habitual que el formato de los datos sea `JSON`.

La [`API fetch`](https://developer.mozilla.org/es/docs/Web/API/Fetch_API), que se introdujo en 2015 como un reemplazo más contemporáneo de XMLHttpRequest, desde entonces se ha convertido en el estándar de facto para la realización de llamadas asincrónicas en aplicaciones web.

Aunque la `API Fetch` lleva tiempo disponible para su uso en navegadores web en el lado cliente, no estaba disponible para su uso desde el lado servidor debido a varias limitaciones.

Desde NodeJS v17.5.0, `fetch` se hizo disponible como función experimental para su uso desde la lado servidor.

https://reqres.in/
https://jsonplaceholder.typicode.com/
https://randomuser.me


https://randomuser.me/documentation

fetch('https://randomuser.me/api/?results=10&nat=es&inc=name,location,phone').then(res => res.json(res)).then(data => console.log(...data.results))




# 8. Referencias

- [Apuntes de Javascript](https://github.com/jamj2000/Javascript)
- [CommonJS vs ES Modules](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/)