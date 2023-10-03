> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 3: Programación basada en lenguajes de marcas con código embebido <!-- omit in toc -->
> NODE, MÓDULOS EXTERNOS, EXPRESS, FETCH, APIs

---

# Introducción

Este tema hace uso de los siguientes recursos para el uso de **Arrays**, **Objetos** y **Arrow functions**:

- [SINTAXIS DE JAVASCRIPT](https://github.com/jamj2000/Javascript/blob/master/02.SINTAXIS.md)
- [FUNCIONES](https://github.com/jamj2000/Javascript/blob/master/03.FUNCIONES.md)
- [ARRAYS](https://github.com/jamj2000/Javascript/blob/master/04.ARRAYS.md)
- [OBJETOS](https://github.com/jamj2000/Javascript/blob/master/05.OBJETOS.md)
- [AJAX](https://github.com/jamj2000/Javascript/blob/master/07.AJAX.md)



# Módulos externos

NodeJS viene con numerosos módulos internos incorporados (built-in): `fs`, `os`, `process`, `path`, `http`, `https`, ...

Además NodeJS permite la instalación de módulos externos. Algunos de ellos, bastante populares, son `express`, `node-fetch`, `cors`, `live-server`, `react`, `react-dom`, ... Pueden consultarse en https://www.npmjs.com.

Para instalar estos módulos externos usamos la herramienta `npm`.

> **IMPORTANTE:** Antes de instalar módulos deberemos haber inicializado previamente el proyecto con
>
> `npm  init  -y`
>


## 2.5. Instalación de módulos externos

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

## 2.6. Opciones de NPM

**-S,  --save**
- dependencia de aplicación. Añade entrada en archivo `package.json`. En las últimas versiones de `npm` no es necesaria esta opción.

**-D,  --save-dev**
- dependencia de desarrollo. Añade entrada en archivo `package.json`.

**-g,  --global**
- instala en el sistema de forma global. Se usa normalmente para paquetes ejecutables.


## 2.7. Desinstalación de módulos externos
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


# EXPRESS

- Node.js nos permite desarrollar un servidor web desde cero.
- Para ello puede usarse los módulos incorporados `http` y `https`.
- Sin embargo es más recomendable, por su sencillez, usar el **framework `express`**.


**Un servidor web sencillo**

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

