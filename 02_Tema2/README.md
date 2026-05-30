> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 2: LENGUAJE PARA SERVIDOR <!-- omit in toc -->
> Inserción de código en páginas Web  
> JAVASCRIPT, EXPRESS

<div style="display: inline">
<img src="assets/javascript.svg" width="80" height="80">
<img src="assets/nodedotjs.svg" width="80" height="80">
<img src="assets/express.svg" width="80" height="80">
</div>

**[`CÓDIGO DE EJEMPLO`](codigo)**

---

- [1. Introducción](#1-introducción)
- [2. Declaración de variables y constantes](#2-declaración-de-variables-y-constantes)
- [3. Tipos de datos simples](#3-tipos-de-datos-simples)
  - [3.1. Booleanos](#31-booleanos)
  - [3.2. Numeros](#32-numeros)
  - [3.3. Texto](#33-texto)
- [4. Tipos de datos compuestos](#4-tipos-de-datos-compuestos)
  - [4.1. Arrays](#41-arrays)
  - [4.2. Objetos](#42-objetos)
- [5. Valores vs Referencias](#5-valores-vs-referencias)
- [6. Operaciones frecuentes con arrays](#6-operaciones-frecuentes-con-arrays)
  - [6.1. Inicializar](#61-inicializar)
  - [6.2. Insertar](#62-insertar)
  - [6.3. Eliminar](#63-eliminar)
  - [6.4. Modificar](#64-modificar)
  - [6.5. Copiar](#65-copiar)
  - [6.6. Obtener sección](#66-obtener-sección)
  - [6.7. Eliminar elementos duplicados](#67-eliminar-elementos-duplicados)
  - [6.8. Recorrer](#68-recorrer)
  - [6.9. Filtrar](#69-filtrar)
  - [6.10. Encontrar](#610-encontrar)
  - [6.11. Ordenar](#611-ordenar)
- [7. Operaciones frecuentes con objetos](#7-operaciones-frecuentes-con-objetos)
  - [7.1. Inicializar](#71-inicializar)
  - [7.2. Insertar](#72-insertar)
  - [7.3. Eliminar](#73-eliminar)
  - [7.4. Modificar](#74-modificar)
  - [7.5. Copiar](#75-copiar)
- [8. Framework Express](#8-framework-express)
- [9. Módulos externos](#9-módulos-externos)
  - [9.1. Instalación de módulos externos](#91-instalación-de-módulos-externos)
  - [9.2. Opciones de NPM](#92-opciones-de-npm)
  - [9.3. Desinstalación de módulos externos](#93-desinstalación-de-módulos-externos)
- [10. Módulos CommonJS](#10-módulos-commonjs)
- [11. Módulos ECMAScript](#11-módulos-ecmascript)
  - [11.1. Exportación e Importación](#111-exportación-e-importación)
    - [11.1.1. Ejemplo sin package.json](#1111-ejemplo-sin-packagejson)
    - [11.1.2. Ejemplo con package.json](#1112-ejemplo-con-packagejson)
- [12. Parámetros de URL](#12-parámetros-de-url)
  - [12.1. Parámetros de ruta (Path Parameters)](#121-parámetros-de-ruta-path-parameters)
  - [12.2. Parámetros de consulta (Query Parameters o Query Strings)](#122-parámetros-de-consulta-query-parameters-o-query-strings)
- [13. Fetch desde el servidor](#13-fetch-desde-el-servidor)
- [14. Creando nuestra propia API REST](#14-creando-nuestra-propia-api-rest)
  - [14.1. Herramientas para probar la API](#141-herramientas-para-probar-la-api)
  - [14.2. CORS](#142-cors)
  - [14.3. JWT (JSON Web Token)](#143-jwt-json-web-token)
  - [14.4. Documentación](#144-documentación)
- [15. Formularios](#15-formularios)
  - [15.1. application/x-www-form-urlencoded](#151-applicationx-www-form-urlencoded)
  - [15.2. multipart/form-data](#152-multipartform-data)
  - [15.3. JSON](#153-json)
- [16. Referencias](#16-referencias)









---
# 1. Introducción

En este tema necesitaras consultar los recursos que aparecen a continuación para entender los **Arrays**, **Objetos** y **Arrow functions**, requisito imprescindible para trabajar en NodeJS y Javascript:

- [SINTAXIS DE JAVASCRIPT](https://github.com/jamj2000/Javascript/blob/master/02.SINTAXIS.md)
- [FUNCIONES](https://github.com/jamj2000/Javascript/blob/master/03.FUNCIONES.md)
- [ARRAYS](https://github.com/jamj2000/Javascript/blob/master/04.ARRAYS.md)
- [OBJETOS](https://github.com/jamj2000/Javascript/blob/master/05.OBJETOS.md)


> [!IMPORTANT]
> 
> Los apartados que aparecen a continuación son un resumen muy breve del contenido de los enlaces anteriores y no es suficiente para entender con cierta profundidad el lenguaje Javascript, por lo que se recomienda encarecidamente la consulta de dichos enlaces.
>

Más adelante nos enfocaremos en el aspecto práctico usando el framework Express. También veremos como desarrollar una API REST con este framework.



# 2. Declaración de variables y constantes

```js
let a;        // Valor inicial undefined, tipo undefined
const b = 0;  // Obligatorio asignar un valor inicial 
```

# 3. Tipos de datos simples

## 3.1. Booleanos

```js
a = true; 
typeof a;   // boolean
```

## 3.2. Numeros

```js
a = 23;
typeof a;   // number

a = 23.01;  
typeof a;   // number 
```

**Conversión de número a string**

```js
let a = 4.095001;

a.toString();
```

**Redondeo a 2 decimales**

```js
let a = 4.095001;

+a.toFixed(2);      // Redondeo a 2 decimales 
```

## 3.3. Texto

```js
a = "hola mundo";
typeof a;   // string
```

**Conversión de número a string**

```js
let a = 4.095001';

a.toFixed(2);      // Redondeo a 2 decimales 
```
 

# 4. Tipos de datos compuestos

## 4.1. Arrays


```js
const array = [ 1, 2, 3 ];
```


## 4.2. Objetos


```js
const objeto = { nombre: 'Juan', edad: 20 };
```


# 5. Valores vs Referencias

- **Los datos simples (number, string, boolean) son tratados como valores.**
- **Los datos compuestos (arrays, objetos) son tratados como referencias.**

![Valores vs Referencias](assets/valor-referencia.png)

# 6. Operaciones frecuentes con arrays

Las operaciones más frecuentes con arrays son las siguientes:

## 6.1. Inicializar

```js
// Crea nueva referencia y asigna memoria dinámica
const array = [ 1, 2, 3, 4, 5 ]
```

## 6.2. Insertar

**Un elemento al final**

```js
const array = [ 1, 2, 3, 4, 5 ]

array.push(6)  // [ 1, 2, 3, 4, 5, 6 ]
```

**Uno o varios elementos en cualquier posición**


```js
const array = [ 1, 2, 3 ]

// en pos 0 sustituimos 0 elementos por 9
const sus = array.splice(0, 0, 9)  // sus = [], array = [ 9, 1, 2, 3 ]
```

```js
const array = [ 1, 2, 3 ]

// en pos 1 sustituimos 0 elementos por 9, 8, 7
const sus = array.splice(1, 0, 9, 8, 7)  // sus = [], array = [ 1, 9, 8, 7, 2, 3 ]
```

## 6.3. Eliminar

**Un elemento al final**

```js
const array = [ 1, 2, 3, 4, 5 ]

const num = array.pop()  // num = 5, array = [ 1, 2, 3, 4 ]
```

**Uno o varios elementos en cualquier posición**

```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 0 extraemos 1 elemento
const ex = array.splice(0, 1)  // ex = [1], array = [ 2, 3, 4, 5 ]
```

```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 1 extraemos 3 elementos
const ex = array.splice(1, 3)  // ex = [2, 3, 4], array = [ 1, 5 ]
```


```js
const array = [ 1, 2, 3, 4, 5 ]

// Deja un hueco
delete array[1]  // [ 1, <1 empty item>, 3, 4, 5 ]
```

## 6.4. Modificar

**Uno o varios elementos en cualquier posición**


```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 0 sustituimos 1 elemento por 9
array.splice(0, 1, 9)  // array = [ 9, 2, 3, 4, 5 ]
```
```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 0 sustituimos 1 elemento por 9, 8, 7
const sus = array.splice(0, 1, 9, 8 , 7)  // sus = [1],  array = [ 9, 8, 7, 2, 3, 4, 5 ]
```

```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 1 sustituimos 3 elementos por 9, 8, 7
const sus = array.splice(1, 3, 9, 8, 7)  // sus = [2, 3, 4], array = [ 1, 9, 8, 7, 5 ]
```

## 6.5. Copiar

```js
const numeros = [ 1, 2, [3, 4], [5, 6] ]

const copia_superficial = [ ...numeros ]

const copia_profunda1 = JSON.parse(JSON.stringify(numeros))
const copia_profunda2 = structuredClone(numeros);

// Test
copia_superficial[2][0] = 9 // numeros = [ 1, 2, [ 9, 4 ], [ 5, 6 ] ]
copia_profunda1[2][1] = 9   // numeros = [ 1, 2, [ 9, 4 ], [ 5, 6 ] ]
copia_profunda2[2][1] = 9   // numeros = [ 1, 2, [ 9, 4 ], [ 5, 6 ] ]
```


## 6.6. Obtener sección

```js
const array = [ 1, 2, 3, 4, 5 ]

const nuevoArray1 = a.slice(1)     // [ 2, 3, 4, 5 ]
const nuevoArray2 = a.slice(-2)    // [ 4, 5 ]
const nuevoArray3 = a.slice(0,3)   // [ 1, 2, 3 ]
```


## 6.7. Eliminar elementos duplicados

```js
// Al convertir el array original a conjunto (Set) se eliminan los duplicados
const array = [ 2, 20, 2, 1, 10, 1, 100 ];
const nuevoArray = Array.from( new Set(array) )  // [ 2, 20, 1, 10, 100 ]
```


## 6.8. Recorrer

> 🤔 Observa el uso de una **función flecha** como argumento de otra función

```js
const array = [ 1, 2, 3, 4, 5 ]

array.forEach( item => console.log (item) )
array.forEach( (item, pos) => console.log (pos, item) )
``` 


```js
const array = [ 1, 2, 3, 4, 5 ]

const nuevoArray1 = array.map( item => item * 2 )          // nuevoArray1 = [ 2, 4, 6, 8, 10 ]
const nuevoArray2 = array.map( (item, pos) => item * pos ) // nuevoArray2 = [ 0, 2, 6, 12, 20 ]
``` 

## 6.9. Filtrar 

> 🤔 Observa el uso de una **función flecha** como argumento de otra función

```js
const array = [ 1, 2, 3, 4, 5 ]
 
const nuevoArray1 = array.filter( item => item % 2 )          // nuevoArray1 = [ 1, 3, 5 ]  // números impares
const nuevoArray2 = array.filter( item => !(item % 2) )       // nuevoArray2 = [ 2 , 4 ]    // números pares
const nuevoArray3 = array.filter( (item, pos) => pos==1 || pos==4 ) // nuevoArray3 = [2, 5] // posiciones 1 y 4
``` 


## 6.10. Encontrar

> 🤔 Observa el uso de una **función flecha** como argumento de otra función

```js
const array = [ 1, 2, 3, 4, 5 ]
 
const num1 = array.find( item => item % 2 )        // num1 = 1  // el primer número impar
const num2 = array.find( item => !(item % 2) )     // num2 = 2  // el primer número par
const num3 = array.find( (item, pos) => pos == 4 ) // num3 = 5  //posición 4
```

> [!TIP]
>
> Si sólo deseamos saber si un elemento existe o no (`true` o `false`), una solución más simple es usar el método `includes`. Por ejemplo:
>
> ```js
> array.includes(5) // true
> array.includes(9) // false
> ```


> [!TIP]
>
> El método `includes` también se aplica a tipos `string`.
>
> Por ejemplo:
> 
> ```js
> "The quick brown fox jumps over the lazy dog".includes("dog")   // true
> "The quick brown fox jumps over the lazy dog".includes("bird")  // false
> ```



## 6.11. Ordenar

> 🤔 Observa el uso de una **función flecha** como argumento de otra función

```js
const array = [ 2, 20, 2, 1, 10, 1, 100 ];

array.sort();                         // [1, 1, 10, 100, 2, 2, 20]
array.sort( (a, b) => a - b );        // [1, 1, 2, 2, 10, 20, 100]  

const nuevoArray = array.toSorted( (a, b) => a - b );    // No modifica array original  

const ciudades = [ "Ávila", "Almeria", "Albacete", "Álava" ]

ciudades.sort()                               // [ 'Albacete', 'Almeria', 'Álava', 'Ávila' ]
ciudades.sort( (a,b) => a.localeCompare(b) )  // [ 'Álava', 'Albacete', 'Almeria', 'Ávila' ]

const nuevasCiudades = ciudades.toSorted( (a, b) => a.localeCompare(b) )  // No modifica array original
```


**Ejemplos de filtrado, ordenación y mapeo con métodos encadenados**

```js
const nombres = ["Ángel", "Anabel", "Eva", "Ana", "elena", "David" ]

const resultado = nombres
  .filter( nombre => nombre.length > 4 )   
  .sort( (a, b) => a.localeCompare(b) )
  .map( nombre => nombre.toUpperCase() )                          



const nums = [-10, 5, -3, 8, -7]

const resultado = nums
  .map(num => Math.abs(num))        
  .sort((a, b) => a - b) 



const jugadores = [
  { nombre: "Alicia", score: 4 },
  { nombre: "Roberto", score: 7 },
  { nombre: "Carlos", score: 9 },
  { nombre: "David", score: 3 }
]

const resultado = jugadores
  .filter(jugador => jugador.score > 5)  
  .map(jugador => jugador.nombre)          
  .sort( (a, b) => a.localeCompare(b) )   
```

> 🧐 
> 
> Los siguientes métodos NO modifican el array original
>
> - `map`, `filter`, `find`, `toSorted`
>
> El siguiente método SÍ modifica el array original
>
> - `sort`


# 7. Operaciones frecuentes con objetos

Las operaciones más frecuentes con objetos son las siguientes:

## 7.1. Inicializar

```js
// Crea nueva referencia y asigna memoria dinámica
const persona = { nombre: 'Juan', edad: 20 }
```

## 7.2. Insertar

```js
const persona = { nombre: 'Juan', edad: 20 }

persona.casado = false  // persona = { nombre: 'Juan', edad: 20, casado: false }
```

```js
const persona = { nombre: 'Juan', edad: 20 }

// Crea nueva referencia y asigna memoria dinámica
persona = { ...persona, casado: false }  // persona = { nombre: 'Juan', edad: 20, casado: false }
```

## 7.3. Eliminar

```js
const persona = { nombre: 'Juan', edad: 20 }

delete persona.edad  // persona = { nombre: 'Juan' }
```

## 7.4. Modificar

```js
const persona = { nombre: 'Juan', edad: 20 }

persona.edad = 21  // persona = { nombre: 'Juan', edad: 21 }
```

```js
const persona = { nombre: 'Juan', edad: 20 }

// Crea nueva referencia y asigna memoria dinámica
persona = { ...persona, edad: 21 } // persona = { nombre: 'Juan', edad: 21 }
```



## 7.5. Copiar


```js
const persona = { edad: 11, direccion: {calle: "nueva", num: 1} }

const copia_superficial = { ...persona }

const copia_profunda1 = JSON.parse(JSON.stringify(persona))
const copia_profunda2 = structuredClone(persona);

// Test
copia_superficial.direccion.num = 99 // persona = { edad: 11,  direccion: {calle: "nueva", num: 99} }
copia_profunda1.direccion.num = 88   // persona = { edad: 11,  direccion: {calle: "nueva", num: 99} }
copia_profunda2.direccion.num = 88   // persona = { edad: 11,  direccion: {calle: "nueva", num: 99} }
```




# 8. Framework Express

Node.js nos permite desarrollar un servidor web desde cero. Para ello puede usarse los módulos incorporados `http` y `https`.

Sin embargo es más recomendable, por su sencillez, usar el **framework `express`**.


[Express](https://expressjs.com/) es un framework minimalista de backend para NodeJS.   
Usando algún [motor de plantillas](https://expressjs.com/en/guide/using-template-engines.html) com `Pug` o similar podemos desarrollar [aplicaciones web con distintas funcionalidades](https://expressjs.com/en/starter/examples.html). 

Pero, si en algo destaca, es la facilidad con la que puede desarrollarse una API de tipo REST usando este framework.  



# 9. Módulos externos

NodeJS viene con numerosos módulos internos incorporados (built-in): `fs`, `os`, `process`, `path`, `http`, `https`, ...

Además NodeJS permite la instalación de módulos externos. Algunos de ellos, bastante populares, son `express`, `node-fetch`, `cors`, `live-server`, `react`, `react-dom`, ... Pueden consultarse en https://www.npmjs.com.

Para instalar estos módulos externos usamos la herramienta `npm`.

> [!IMPORTANT] 
> 
> Antes de instalar módulos deberemos haber inicializado previamente el proyecto con
>
> `npm  init  -y`
>


## 9.1. Instalación de módulos externos

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

## 9.2. Opciones de NPM

**-S,  --save**
- dependencia de aplicación. Añade entrada en archivo `package.json`. En las últimas versiones de `npm` no es necesaria esta opción.

**-D,  --save-dev**
- dependencia de desarrollo. Añade entrada en archivo `package.json`.

**-g,  --global**
- instala en el sistema de forma global. Se usa normalmente para paquetes ejecutables.


## 9.3. Desinstalación de módulos externos
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

# 10. Módulos CommonJS

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
app.get ('/hola', (request, response) => { 
    response.send ('Hola mundo') 
});

// Ruta /hola/loquesea, p. ej:  /hola/jose,  /hola/ana, ...
app.get ('/hola/:usuario', (request, response) => { 
    response.send (`<h1>Buenos días, ${request.params.usuario}</h1>`); 
});

app.listen (3000);
```

Ejecutaremos:

```bash
node  server
```


> [!NOTE]
> 
> Los objetos `request` y `response` son instancias de [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) y [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Request) respectivamente.
>
> Por tanto, poseen las propiedades y métodos correspondientes.

# 11. Módulos ECMAScript

Una forma de importar módulos más moderna y, que además es usada también en el lado cliente, es trabajar con **módulos ECMAScript**. En este caso para importar los módulos se hace con **`import`**. Es la forma recomendada de cara al futuro.


**Ejemplo de servidor con express y módulos ECMAScript**

```bash
npm init -y
```

Para poder trabajar con **módulos ES (ECMAScript)** debemos insertar la línea **`"type": "module"`** en `package.json` para indicar que trabajaremos con este tipo de módulos.

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
app.get('/hola', (request, response) => {
  response.send('Hola mundo')
})

// Ruta /hola/loquesea, p. ej:  /hola/jose,  /hola/ana, ...
app.get('/hola/:usuario', (request, response) => {
  response.send(`<h1>Buenos días, ${request.params.usuario}</h1>`)
})

app.listen(3000)
```

Para lanzar el servidor, hacemos:

```bash
npm run dev
```

## 11.1. Exportación e Importación

Cuando usamos `ESM (ECMAScript Modules)`, un archivo puede exportar e importar:

- Constantes
- Variables (Objetos, Arrays, ...)
- Funciones
- ...
  
A la hora de exportar, deberemos tener en cuenta que **un archivo**

- **sólo puede exportar por defecto un único elemento**
- puede exportar varios elementos que no sean por defecto


### 11.1.1. Ejemplo sin package.json

Si no usamos archivo `package.json`, deberemos colocar a nuestros archivos la extensión `.mjs` (Module JavaScript)

**`archivo1.mjs`**

```js
const NADA = 0
export default NADA 

export const UNO = 1
export const DOS = 2
export const TRES = 3
```

**`archivo2.mjs`**

```js
import POR_DEFECTO, { UNO as uno, DOS, TRES } from './archivo1.js'

console.log (POR_DEFECTO)
console.log (uno, DOS, TRES)
```

Para ejecutar hacemos:

```sh
node archivo2.mjs
```


### 11.1.2. Ejemplo con package.json

En este caso indicamos que nuestro proyecto es de `"type": "module"`. En este caso, los archivos ya no llevarán las extensión `.mjs` sino **`.js`**.

**`package.json`**

```json
{
  "type": "module"
}
```


**`archivo1.js`**

```js
const NADA = 0
export default NADA 

export const UNO = 1
export const DOS = 2
export const TRES = 3
```

**`archivo2.js`**

```js
import POR_DEFECTO, { UNO as uno, DOS, TRES } from './archivo1.js'

console.log (POR_DEFECTO)
console.log (uno, DOS, TRES)
```

Para ejecutar hacemos:

```sh
node  archivo2.js
```

**La exportación por defecto se puede importar con cualquier nombre**.

La exportación normal se debe importar usando llaves `{` y `}`. Se puede importar con otro nombre si usamos `as`. 


# 12. Parámetros de URL

Los parámetros de URL o **`URL Parameters`** son partes de la URL en las cuales los valores que aparecen pueden variar de una petición a otra, aunque la estructura de la URL se mantiene.

Existen 2 tipos:

- **Parámetros de ruta** `Path Parameters`
- **Parámetros de consulta** `Query Parameters` o `Query Strings`

> [!NOTE]
> 
> A menudo se usa el término `Query Strings` como sinónimo de `URL Parameters`, lo cual no es del todo cierto como se acaba de ver y provoca confusiones.


## 12.1. Parámetros de ruta (Path Parameters)

Son parámetros que están incorporados dentro de la ruta de la URL. Son parámetros de solicitud adjuntos a una URL que apuntan a un recurso de `API REST` específico.

![Path Parameter](assets/path-parameter.png)

Los parámetros de ruta son parte del *endpoint* y son obligatorios. Por ejemplo en `/users/{id}`, `{id}` es el parámetro de ruta del *endpoint* `/users`; apunta a un registro de usuario específico. 

Un *endpoint* puede tener varios parámetros de ruta, como en el ejemplo `/organizations/{orgId}/members/{memberId}`. Esto apuntaría al registro de un miembro específico dentro de una organización específica, y tanto `{orgID}` como `{memberID}` requerirían variables.

Los parámetros de ruta son muy usados en `API REST`.

![API REST](assets/api-url.png)


## 12.2. Parámetros de consulta (Query Parameters o Query Strings)

Son parámetros que están al final de la ruta de la URL, tras el signo `?` y están separados unos de otros mediante `&`

Tienen la forma siguiente:

![Query Parameters](assets/query-parameters.png)

![Query Strings](assets/query-strings.png)

Los parámetros de consulta a menudo se utilizan para solicitar operaciones de clasificación, paginación, ordenación o filtrado.


**En una misma URL pueden aparecer tanto parámetros de ruta como parámetros de consulta.**

Ejemplos:

- **`https://api.github.com/orgs/{organización}/repos?{parámetros de consulta}`**
- `https://api.github.com/orgs/google/repos?per_page=10&page=1`
- `https://api.github.com/orgs/microsoft/repos?per_page=1&page=2`
- **`https://api.github.com/users/{usuario}/repos?{parámetros de consulta}`**
- `https://api.github.com/users/jamj2000/repos?sort=updated`
- `https://api.github.com/users/jamj2000/repos?sort=created&direction=asc`


# 13. Fetch desde el servidor


Se entiende **`fetch`** como la **recuperación de datos solicitados a un servidor**. Es habitual que el formato de los datos sea **`JSON`**.

La [`API fetch`](https://developer.mozilla.org/es/docs/Web/API/Fetch_API) se introdujo en 2015 como un reemplazo más contemporáneo de XMLHttpRequest. Desde entonces se ha convertido en el estándar de facto para la realización de llamadas asincrónicas en aplicaciones web.

Aunque la `API Fetch` lleva tiempo disponible para su uso en navegadores web en el lado cliente, no estaba disponible para su uso desde el lado servidor debido a varias limitaciones.

Desde NodeJS v17.5.0, `fetch` se hizo disponible como función experimental para su uso desde el lado servidor.

Existen incontables APIs de tipo REST de innumerables tipos de las que podemos obtener información en formato JSON.

Algunos ejemplos de APIs muy minimalistas para realizar pruebas son:

- https://reqres.in/
- https://jsonplaceholder.typicode.com/
- https://randomuser.me
- https://dummyjson.com

Un listado más extenso de APIs profesionales puede encontrarse en:

- https://github.com/public-apis/public-apis
- https://rapidapi.com/collection/list-of-free-apis


**Ejemplo**

```javascript
// Recuperación de datos de https://randomuser.me
// Documentación: https://randomuser.me/documentation 
fetch('https://randomuser.me/api/?results=4&nat=es&inc=name,location,phone,picture').
  then(res => res.json()).
  then(data => console.log(data.results))
```

**Ejemplo completo**

> **Aplicación para realizar consultas a la API de Github**
> - Documentación: https://docs.github.com/en/rest/repos/repos
> - Código: https://github.com/jamj2000/query-github

```javascript
import express from 'express'

const app = express()

/* Ejemplos
- http://localhost:3000/github/microsoft?pag=1
- http://localhost:3000/github/oracle?pag=2
- http://localhost:3000/github/google?pag=20
*/
app.get('/github/:organizacion', async (req, res) => {
    const org = req.params.organizacion  // Path parameter
    const pag = req.query.pag            // Query parameter (Query string)
    const data = await fetch(`https://api.github.com/orgs/${org}/repos?per_page=100&page=${pag}`)
    const json = await data.json()
    if (json.message) {
        // Ocurrió algún evento, como límite de peticiones excedido
        res.send(`<h1>${json.message}</h1> <h2>${json.documentation_url}</h2>`)
    } else {
        res.send(`
        <h1>Página ${pag}, ${json.length ?? 0} repositorios.</h1>
        <small>Máximo de resultados: 100</small><hr>              
        ${json.length
            &&
            json.map(repo => `
                <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                <em>${repo.language}: </em>  <strong>${repo.description}</strong>
                <br><small>Creado en ${repo.created_at}. Último push en ${repo.pushed_at} </small>
                `)
                .join('<br><hr>')
            ||
            'Nada por aquí'
            }
        `)
    }
})

app.listen(3000)
```

# 14. Creando nuestra propia API REST

Con NodeJS+Express es realmente sencillo crear una `API REST`. 

A continuación se muestra un ejemplo de una `API REST` que proporciona respuestas en formato `JSON` y ofrece funcionalidad básica **`CRUD`**. Lo normal es que la información se registre en una base de datos. Pero, por simplificar, en este ejemplo se trabaja con memoria primaria.

| Operación  | Método HTTP | Descripción                                                   |
| ---------- | ----------- | ------------------------------------------------------------- |
| **C**reate | **POST**    | Crear un recurso. Equivale a INSERT en una base de datos      |
| **R**ead   | **GET**     | Leer un recurso. Equivale a SELECT en una base de datos       |
| **U**pdate | **PUT**     | Actualizar un recurso. Equivale a UPDATE en una base de datos |
| **D**elete | **DELETE**  | Eliminar un recurso. Equivale a DELETE en una base de datos   |

```javascript
import express from "express";
const app = express()

let Users = [
    { id: 0, nombre: "Jose", edad: 20 },
    { id: 1, nombre: "Juan", edad: 21 },
    { id: 2, nombre: "Eva", edad: 22 }
]

app.use(express.json())  // IMPORTANTE

// GET
app.get('/api/users', (request, response) => response.json(Users))

// POST 
app.post('/api/users', (request, response) => {
    if ( !request.is('json') )
        return response.json({ message: 'Debes proporcionar datos JSON' })

    let sig = Math.max( ...Users.map( u => u.id ))+1

    const { nombre, edad } = request.body
    Users.push({ id: sig, nombre, edad })
    return response.json(Users)
})

// GET 
app.get('/api/users/:id', (request, response) => {
    let usuario = Users.find(user => user.id == request.params.id)

    if (usuario !== undefined) { // Si es encontrado    
        return response.json(usuario)
    } else {
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})

// PUT
app.put('/api/users/:id', (request, response) => {
    if ( !request.is('json') )
        return response.json({ message: 'Debes proporcionar datos JSON' })

    const { id } = request.params
    const { nombre, edad } = request.body

    // Obtenemos posición    
    const pos = Users.findIndex(user => user.id == id)

    if (pos != -1) { // Si es encontrado
        Users.splice(pos, 1, { id, nombre, edad })
        return response.json(Users)
    } else { // Sino
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})

// DELETE
app.delete('/api/users/:id', (request, response) => {
    // Obtenemos posición    
    const pos = Users.findIndex(user => user.id == request.params.id)

    if (pos != -1) { // Si es encontrado
        Users.splice(pos, 1)
        return response.json(Users)
    } else { // Sino
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})


app.listen(3000)
```

## 14.1. Herramientas para probar la API

Para comprobar el correcto funcionamiento de la API, tenemos muchas herramientas. Las más conocidas son:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Rest Client (plugin para VSCode)](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)


Una herramienta muy interesante es [HTTPie](https://httpie.io/), en especial su [CLI](https://httpie.io/cli), debido a su accesibilidad e inmediatez.

![httpie-cli](assets/httpie-cli.png)

Aunque también dispone de su versión [GUI](https://httpie.io/desktop)

![httpie-gui](assets/httpie-gui.png)

## 14.2. CORS

El **intercambio de recursos entre orígenes** -Cross-Origin Resource Sharing (CORS)- es una característica de seguridad que te permite controlar qué sitios pueden acceder a tus recursos. 

Por defecto, sólo se permite el acceso a los datos de la API si se solicitan desde el mismo dominio. Por ejemplo, si nuestra API está desplegada en el dominio `http://example.com`, sólo las páginas cliente que estén bajo este dominio serán capaces de acceder a los datos.

Si deseamos que nuestros datos sean accesibles desde otros dominios deberemos habilitar CORS. Una forma sencilla de hacerlo para todos los *`endpoints`* es la siguiente:

```sh
npm  install  cors
```


```js
import express from "express"
import cors from "cors"  // <------

const app = express()
app.use(express.json())  // IMPORTANTE: SOPORTE PARA JSON
app.use(cors())          // <------ Para habilitar CORS 
// ...
```

Podemos también indicar qué dominios queremos que tengan acceso a nuestra API. Por ejemplo:

```js
app.use(cors({
  origin: [ 'http://localhost:5731', 'http://example.com' ]
}))

```


**Referencia:**

- [CORS con Express](https://expressjs.com/en/resources/middleware/cors.html)

## 14.3. JWT (JSON Web Token)

Un aspecto muy importante a tener en cuenta es la seguridad. En el caso de trabajar con APIs REST es muy común el uso de [JWT](https://jwt.io/) para la autenticación de los usuarios. En concreto, se suelen utilizar los llamados **`Bearer Tokens`**.  

El **JWT** es un formato de tokens que permite transmitir información de forma segura entre dos partes como un objeto JSON.

En el proyecto [codigo/api-jwt/](codigo/api-jwt/) se muestra cómo usar JWT para autenticar usuarios en una API REST.

Es obligatorio protegar al menos los endpoints de tipo:

- `POST`
- `PUT`
- `DELETE`

Y en algunos casos también podemos desear proteger otros endpoints de tipo `GET`, para que no haya fuga de información.

A grandes rasgos, la protección de los endpoints se realiza de la siguiente manera:

1. El cliente inicia sesión (envía sus credenciales).
2. El servidor le proporciona un **token** (JWT).
3. El cliente proporciona el token en cada solicitud (en la cabecera `Authorization`).
4. El servidor verifica el token.
5. El servidor proporciona los datos.

Para ello hemos implementado el endpoint:

- **POST `/api/login`**

En el que se el usuario deberá autenticarse proporcionando sus credenciales (usuario y contraseña).

Si la autenticación es exitosa, el servidor le proporcionará un **token**, que estará firmado digitalmente por el servidor mediante un *secreto*.

Ejemplo de respuesta:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzE1NjI3OTQ4fQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

![jwt-login](assets/jwt-login.png)


En cada petición del usuario, el token deberá ser enviado en la cabecera `Authorization` con el prefijo `Bearer `:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzE1NjI3OTQ4fQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

El servidor verificará que el token sea correcto y si lo es, le proporcionará los datos solicitados. En caso contrario, le devolverá un error 403 Forbidden.


![jwt-delete](assets/jwt-delete.png)


## 14.4. Documentación

- [Documentación de Express](https://expressjs.com/en/4x/api.html)



# 15. Formularios

Los formularios es el método principal para enviar información al servidor desde el lado cliente o navegador. Los formularios únicamente pueden enviar esta información mediante 2 métodos:

- `GET`
- `POST`

El método `POST` es el recomendado, puesto que no tiene limitación en la longitud del contenido y los valores transferidos no se muestran en la `url`.

Cuando se envía información desde un formulario, ésta puede codificarse de 3 maneras distintas:


| enctype                               | Descripción                                                                                                                                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **application/x-www-form-urlencoded** | **Codificación por defecto**. No es necesario hacerla explícita. Todos los caracteres se codifican antes del envío (los espacios se convierten en símbolos "+" y los caracteres especiales se convierten en valores ASCII HEX) |
| **multipart/form-data**               | Esta codificación es necesaria si el usuario desea **subir un archivo** a través del formulario.                                                                                                                               |
| **text/plain**                        | **Desaconsejada**. Envía datos sin ningún tipo de codificación.                                                                                                                                                                |
| *application/json*                    | *No disponible*.                                                                                                                                                                                                               |


> **Referencias**: 
> - https://codex.so/handling-any-post-data-in-express
> - https://blog.jim-nielsen.com/2022/browsers-json-formdata/


## 15.1. application/x-www-form-urlencoded

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

## 15.2. multipart/form-data

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

> [!NOTE]
> 
> Para gestionar los archivos subidos al servidor usaremos el paquete [`multer`](https://github.com/expressjs/multer/blob/master/doc/README-es.md)


## 15.3. JSON

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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( { username: username } )
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

> [!NOTE]
>
> Esta última forma es usada frecuentemente en Aplicaciones de Página Única (SPA - Single Page Applications) para enviar datos al servidor. Ofrece mayor libertad y flexibilidad que las anteriores, puesto que:
>
> 
> - No es necesario usar la etiqueta `form` de HTML. Basta con tener los `input` necesarios y recoger sus valores en variables.
> - No está restringido a los métodos `GET` y `POST`. Se pueden usar otros métodos como `PUT`, `PATCH`, `DELETE`, ...
>


# 16. Referencias

- [Apuntes de Javascript](https://github.com/jamj2000/Javascript)
- [CommonJS vs ES Modules](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/)
