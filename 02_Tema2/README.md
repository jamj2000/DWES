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

- [1. NodeJS](#1-nodejs)
  - [1.1. Instalación del entorno de ejecución NodeJS](#11-instalación-del-entorno-de-ejecución-nodejs)
  - [1.2. Probando Node](#12-probando-node)
  - [1.3. Probando VSCode](#13-probando-vscode)
  - [1.4. Inicializar un proyecto](#14-inicializar-un-proyecto)
  - [1.5. Archivo package.json](#15-archivo-packagejson)
  - [1.6. Ejecución de paquetes sin necesidad de instalar](#16-ejecución-de-paquetes-sin-necesidad-de-instalar)
  - [1.7. Módulos incorporados (built-in) en Node](#17-módulos-incorporados-built-in-en-node)
- [2. Linter para Javascript (y también para CSS)](#2-linter-para-javascript-y-también-para-css)
- [3. Configuración de usuario en VSCode](#3-configuración-de-usuario-en-vscode)
  - [3.1. Atajos imprescindibles del teclado](#31-atajos-imprescindibles-del-teclado)
  - [3.2. Archivo settings.json](#32-archivo-settingsjson)
  - [3.3. Archivo keybindings.json](#33-archivo-keybindingsjson)
  - [3.4. Plugins](#34-plugins)
- [4. Framework Express](#4-framework-express)
- [5. Módulos externos](#5-módulos-externos)
  - [5.1. Instalación de módulos externos](#51-instalación-de-módulos-externos)
  - [5.2. Opciones de NPM](#52-opciones-de-npm)
  - [5.3. Desinstalación de módulos externos](#53-desinstalación-de-módulos-externos)
- [6. Módulos CommonJS](#6-módulos-commonjs)
- [7. Módulos ECMAScript](#7-módulos-ecmascript)
  - [7.1. Exportación e Importación](#71-exportación-e-importación)
    - [7.1.1. Ejemplo sin package.json](#711-ejemplo-sin-packagejson)
    - [7.1.2. Ejemplo con package.json](#712-ejemplo-con-packagejson)
- [8. Parámetros de URL](#8-parámetros-de-url)
  - [8.1. Parámetros de ruta (Path Parameters)](#81-parámetros-de-ruta-path-parameters)
  - [8.2. Parámetros de consulta (Query Parameters o Query Strings)](#82-parámetros-de-consulta-query-parameters-o-query-strings)
- [9. Fetch desde el servidor](#9-fetch-desde-el-servidor)
- [10. Creando nuestra propia API REST](#10-creando-nuestra-propia-api-rest)
  - [10.1. Herramientas para probar la API](#101-herramientas-para-probar-la-api)
  - [10.2. CORS](#102-cors)
  - [10.3. JWT (JSON Web Token)](#103-jwt-json-web-token)
  - [10.4. Documentación](#104-documentación)
- [11. Formularios](#11-formularios)
  - [11.1. application/x-www-form-urlencoded](#111-applicationx-www-form-urlencoded)
  - [11.2. multipart/form-data](#112-multipartform-data)
  - [11.3. JSON](#113-json)
- [12. Referencias](#12-referencias)


---




# 1. NodeJS


![node](assets/node.png)

Node.js es un **entorno en tiempo de ejecución** multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación **JavaScript**, asíncrono, con E/S de datos en una arquitectura orientada a eventos y **basado en el motor V8 de Google**.


![v8 engine](assets/v8-engine.png)

Este entorno nos permitirá desarrollar aplicaciones en el servidor usando Javascript. También es muy utilizado como plataforma de desarrollo para frameworks del lado cliente.

Posee un extenso repositorio de paquetes para prácticamente cualquier funcionalidad que deseemos. 

Trabajaremos con la version LTS, por ser más estable y tener soporte a largo plazo. 


Más adelante nos enfocaremos en el aspecto práctico usando el framework Express. También veremos como desarrollar una API REST con este framework.


## 1.1. Instalación del entorno de ejecución NodeJS

![Node download](assets/node-download.png)

La instalación de NodeJS es bastante sencilla. Existen instaladores para Windows y Mac. 

En el caso de Linux lo haremos desde el terminal de texto. Aquí tienes los comandos. Es copiar y pegar.

```bash
# instalamos nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# descargamos e instalamos Node.js (después necesitarás reiniciar el terminal)
nvm install 24
```

Los versiones instaladas se guardarán en la carpeta del usuario, en `~/.nvm/versions/node/`


Una vez realizada la instalación dispondremos de 3 utilidades:

- **node**:  es el entorno de ejecución propiamente dicho.
- **npm**:  es el gestor de paquetes.
- **npx**:  es el lanzador de paquetes ejecutables.

Podemos comprobar que se han instalado correctamente y la version de cada utilidad:

```bash
node --version
npm  --version
npx  --version
nvm  --version
```

Si nos muestra la versión de cada uno, es que la instalación fue exitosa.


## 1.2. Probando Node

Podemos lanzar el intérprete de node, simplemente ejecutando en un terminal el comando `node`:

```bash
node 
Welcome to Node.js v24.16.0.
Type ".help" for more information.
> 
```

Algunos comandos: 


```javascript
console.log("Hola mundo")
```

```javascript
for (let i=0; i<10; i++) console.log (i)
```

```javascript
let desarrolladores = [
    { nombre: 'Juan', tipo: 'móvil', edad: 24 },
    { nombre: 'Inma', tipo: 'móvil', edad: 31 },
    { nombre: 'Ana',  tipo: 'web',   edad: 25 },
    { nombre: 'Eva',  tipo: 'web',   edad: 30 },
    { nombre: 'José', tipo: 'móvil', edad: 33 }
];

console.table(desarrolladores)
```

```javascript
const fs = require('fs')

// Creación de archivo leeme.txt
const datos = `
Este contenido ha sido generado desde Javascript
y escrito en un archivo desde NodeJS.

Chao.
`

fs.writeFile ("leeme.txt", datos, (error) => {
  if (error)
    console.log(error);
  else 
    console.log("Archivo creado exitosamente");
})
```

```javascript
const fs = require('fs')

// Lectura de archivo leeme.txt
fs.readFile('leeme.txt', 'utf8', (error, datos) => {
  if (error) 
    console.error(error);
  else
    console.log(datos);
})
```


> **ACTIVIDAD**
>
> Escribe `os.` y pulsa tabulador 2 veces
>
> Te aparecerán todas las propiedades y métodos disponibles en este módulo.
>
> Ejecuta los siguientes y haz una captura de pantalla:
> 
> `os.type()`
> 
> `os.platform()`
> 
> `os.arch()`
>
> `os.release()`
>
> `os.cpus()`
>
> `os.totalmem()`
>
> `os.freemem()`
>
> `os.uptime()`
>
> `os.networkInterfaces()`
>
> `os.userInfo()`


> **ACTIVIDAD**
>
> Escribe `process.` y pulsa tabulador 2 veces
>
> Te aparecerán todas las propiedades y métodos disponibles en este módulo.
>
> Ejecuta los siguientes y haz una captura de pantalla:
>
> `process.env`
>
> `process.pid`
>
> `process.ppid`
> 
> `process.uptime()`


Para salir de Node, escribimos `.exit` o pulsamos las teclas `Ctrl+D`.

## 1.3. Probando VSCode

La manera anterior de trabajar es muy incómoda. Nos sirve para tareas muy simples, pero si deseamos trabajar más cómoda podemos hacer uso de un editor o IDE. En la captura de más abajo se muestra un ejemplo de uso de VSCode. En el terminal lanzamos **`node  --watch  codigo.js`**, lo cual dejará a Node escuchando los cambios en el archivo `codigo.js`, y cada vez que guardemos los cambios a disco se ejecutará su código.

![node --watch](assets/node--watch.png)


## 1.4. Inicializar un proyecto

Normalmente, node no se suele ejecutar de la forma que hemos realizado previamente, sino que se crean proyectos que se ejecutan en node.

Para crear un proyecto, creamos una carpeta, entramos en ella y ejecutamos `npm init -y`
```bash
mkdir proyecto-node  &&  cd proyecto-node

npm  init  -y 
```

> [!TIP]
> 
> La opción -y (--yes) de `npm init` crea un archivo **package.json** con opciones por defecto, sin hacer preguntas al usuario.

> [!IMPORTANT]
> 
> El comando `npm` (**Node Package Manager**) es muy importante. Nos permitirá:
> - Inicializar proyectos. 
> - Instalar paquetes.
> - Desinstalar paquetes.
> - Ejecutar diversos scripts: lanzamiento de entorno de desarrollo, generación de la compilación, tests, ...


## 1.5. Archivo package.json

Una vez inicializado un proyecto, se nos generará un archivo parecido al siguiente:

```json
{
  "name": "proyecto-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
Podemos instalar módulos externos con `npm`. Por ejemplo:

```console
npm install express     # Dependencia de aplicación
npm install nodemon -D  # Dependencia de desarrollo (dev)
```

Al realizar las instalaciones anteriores, se insertarán automáticamente las siguientes líneas en el archivo anterior:

```json
  "dependencies": {
    "express": "^4.16.4"
  },
  "devDependencies": {
    "nodemon": "^1.18.4"
  }
```

> [!NOTE]
> 
> La versión de cada paquete puede diferir de la que tu tengas.



El archivo `package.json` contiene los metadatos del proyecto, entre estos están 3 cosas muy importantes:

- **scripts**:  tareas que podremos invocar, por ejemplo `npm run test` 
- **dependencies**: paquetes que nuestra aplicación necesita para ofrecer la funcionalidad deseada y serán incorporados a la aplicación final. 
- **devDependencies**: paquetes que sólo usaremos durante el desarrollo, no se incorporan a la aplicación final.



## 1.6. Ejecución de paquetes sin necesidad de instalar

Si no tenemos permisos para instalar paquetes en el sistema, podemos usar la herramienta **npx**. Características:

- Es una herramienta de ejecución de paquetes.
- **Ejecuta** paquetes ejecutables de `node.js` sin necesidad de instalarlos.
- Es más cómodo que usar `sudo npm install -g ...`
- Ejemplo (lanzar servidor web):
  
**Usando `sudo npm install -g ...`**

  ```bash
  sudo npm  install  -g  http-server
  http-server
  ```
**Usando `npx  ...`**
 
  ```bash
  npx  http-server
  ```

**Ejemplos**

```
npx  serve                     # Inicia un servidor web
npx  http-server               # Inicia otro servidor web
npx  live-server               # Inicia otro servidor web con recarga de archivos modificados
npx  servor                    # Inicia otro servidor web con recarga de archivos modificados

npx  @angular/cli  new         nombre-proyecto  # Iniciar proyecto de Angular 
npx  create-react-app          nombre-proyecto  # Iniciar proyecto de React 
npx  @vue/cli  create          nombre-proyecto  # Iniciar proyecto de Vue
npx  degit  sveltejs/template  nombre-proyecto  # Iniciar proyecto de Svelte   
```


## 1.7. Módulos incorporados (built-in) en Node

- No es necesario instalarlos.
- Ya vienen con node.js.
- Ejemplos:
  - **fs**:  Sistema de archivos
  - **http**:  Servidor HTTP
  - **https**:  Servidor HTTPS
  - **os**:  Sistema operativo
  - **path**:  Rutas de archivos
  - **process**:  Información y control del proceso actual
  - ...

Mas info: https://www.w3schools.com/nodejs/ref_modules.asp


# 2. Linter para Javascript (y también para CSS)

Un linter es un software que se encarga de examinar el código del programador y lo ayuda cuando detecta errores de sintaxis, código incorrecto, malas prácticas o incluso promueve a seguir unas normas de estilo. 

Dos linter muy conocidos son:
- **eslint** (para Javascript)
- **stylelint** (para CSS)


Podemos configurar un linter básico de Javascript haciendo:

```javascript
npm  init  -y               # Inicialización de proyecto
npm  init  @eslint/config   # Asistente de configuración de ESLint
```

Más información en https://lenguajejs.com/javascript/calidad-de-codigo/eslint/

Otra forma más directa, aunque menos configurable, es realizar:

```javascript
npm  init  -y                                        # Inicialización de proyecto
npm  install -D standard  stylelint-config-standard  # Instalamos el conjunto de reglas standard
```

E insertamos en `package.json`

```json
"eslintConfig": {
  "extends": [ "standard" ]
},
"stylelint": {
  "extends": "stylelint-config-standard",
  "rules": {
     "indentation": 2
  }
},
``` 

# 3. Configuración de usuario en VSCode

## 3.1. Atajos imprescindibles del teclado

- `Ctrl+K`, `Ctrl+S`: Configuración de atajos del teclado
- `Ctrl+,`: Prefeencias del usuario
- `Ctrl+P`: Ir a archivo, ...
- `Ctrl+Shift+P`: Paleta de comandos

**Referencias**:

- [keyboard-shortcuts-windows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
- [keyboard-shortcuts-linux](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf)
- [keyboard-shortcuts-macos](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)



## 3.2. Archivo settings.json

La configuración de usuario se guarda en un archivo **`settings.json`**, dentro de la carpeta del usuario, en la subcarpeta `.config/Code/User`.

Para acceder al archivo anterior y realizar las configuraciones deseadas, pulsamos **`Ctrl+Shift+P`** para acceder a la paleta de comandos de VSCode, y luego escribimos `user settings json`. Abrimos el archivo, y editamos las opciones de configuración deseadas. 

Por ejemplo, mi configuración es la siguiente:

```json
{
    "workbench.colorTheme": "Default Light+",
    "workbench.iconTheme": "material-icon-theme",
    // Tailwind autofold 
    "tailwind-fold.autoFold": true,
    // Actualizar etiquetas de cierre de HTML y JSX
    "editor.linkedEditing": true,
    // Fuente con ligaduras
    "editor.fontLigatures": true,
    "editor.fontVariations": false,
    "editor.fontFamily": "'Fira Code', monospace",
    "svg.preview.mode": "svg",
    // Desactivamos validación CSS por defecto de VSCode
    "css.validate": false,
    "less.validate": false,
    "scss.validate": false,
    // Activamos stylelint para CSS
    "stylelint.enable": true,
    // linters: activamos eslint para Javascript
    "javascript.validate.enable": true,
    "eslint.validate": [
        "javascript"
    ],
    "eslint.enable": true,
    // linters: arreglamos código CSS + Javascript al guardar a disco
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.fixAll.stylelint": true,
    },
    // Desactivamos la opción siguiente para no interferir con los linters
    // "editor.formatOnSave": true,
    "extensions.ignoreRecommendations": true,
    // Permite la edición simultánea de inicio y cierre de etiquetas HTML y JSX
    "editor.linkedEditing": true,
    // Soporte de Emmet para JSX
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    }
}
```

Básicamente, la configuración hace lo siguiente:

- Se usa fuente con ligaduras [`Fira Code`](https://github.com/tonsky/FiraCode). Dicha fuente tiene que estar instalada previamente en el sistema.
- Se activa el [`lint`](https://es.wikipedia.org/wiki/Lint) para CSS y Javascript.
- Al guardar los cambios a disco, se arregla ( *fix* ) el código. Algunos errores requerirán la intervención del usuario al no poder solucionarse automáticamente.
- Se activa la edición enlazada, que permite modificar las 2 etiqueta HTML de una sola vez.   

> [!IMPORTANT] 
>
> Para que la configuración anterior sea efectiva es necesario cumplir los 3 requisitos siguientes:
> - Tener la fuente Fira Code instalada en el sistema.
> - Tener el plugin ESLint instalado en VSCode
> - Tener el plugin Stylelint instalado en VSCode


## 3.3. Archivo keybindings.json

La configuración de usuario para atajos de teclado se guarda en un archivo **`keybindings.json`**, dentro de la carpeta del usuario, en la subcarpeta `.config/Code/User`.


Por ejemplo, mi configuración es la siguiente:

```json
// Coloque sus atajos de teclado en este archivo para sobreescribir los valores predeterminados
[
    {
        "key": "ctrl+l",
        "command": "editor.action.insertSnippet",
        "when": "editorTextFocus",
        "args": {
          "snippet": "console.log(${TM_SELECTED_TEXT}$1);"
        }
      }
]
```

Esta configuración me permite seleccionar un texto o variable y envolverla dentro de `console.log`. Es muy útil para realizar tareas de depuración.


> [!NOTE]
>
> Los archivos de configuración de VSCode en realidad no son JSON, sino **JSONC** (JSON con comentarios). JSONC no es un estándar oficial. A continuación se muestra una tabla comparativa de características de JSON, JSONC y JSON5. 
> 
>
> | Característica              | JSON | JSONC         | JSON5         |
> |----------------------------|------|---------------|---------------|
> | Comentarios                | ❌   | ✅            | ✅            |
> | Claves sin comillas        | ❌   | ❌            | ✅            |
> | Comillas simples           | ❌   | ❌            | ✅            |
> | Notación JS extra          | ❌   | ❌            | ✅ (`NaN`, etc.) |
> | Coma en la última línea    | ❌   | ❌            | ✅            |
> | Compatible con APIs        | ✅   | ❌            | ❌ (generalmente) |
> | Soporte general            | 🔥   | 😐            | 😐            |
>
> Por otro lado, JSON5 es poco usuado y no es nativamente compatible con todos los lenguajes. Para usarlo necesitas una librería que lo interprete.


## 3.4. Plugins

Existen numerosos plugins para VSCode que nos permiten adaptar el entorno de desarrollo a nuestras necesidades. Para el desarrollo web suelen ser habituales, aunque pueden instalarse muchos otros, los siguientes:

**Spanish Language Pack for Visual Studio Code**

Para cambiar el idioma de VSCode a español. 


**Material Icon Theme**

Permite mostrar un icono por cada carpeta y archivo.


**Multiple cursor case preserve**

Nos permite preservar mayúsculas y minúsculas cuando editamos con cursor múltiple (Ctrl+D)


**ESLint**

Para hacer *lint* de Javascript.


**Stylelint**

Para hacer *lint* de CSS.


**Error Lens** 

Para mostrar los errores en la línea en la que ocurren.
Este plugin puede considerarse opcional, según el caso. De cualquier modo, una vez instalado, puede deshabilitarse si lo consideramos intrusivo.


**Console Ninja**

Este plugin es opcional, pero recomendado para realizar tareas de depuración de código. Nos permite mostrar dentro del propio VSCode los mensajes producidos por `console.log()` sin tener que recurrir al terminal constantemente.


**REST Client**

Este plugin es opcional. Es útil cuando deseamos *testear endpoints* de una API REST.


**Svg Preview**

Este plugin es opcional, pero recomendado si trabajamos con imagenes vectoriales `.svg`. Permite su visualización gráfica.


**Markdown All in One**

Este plugin es opcional, pero recomendado si trabajamos con Markdown. Permite numerar automáticamente los títulos y crear índice de contenido, entre otras funcionalidades.


**ES7+ React/Redux/React-Native snippets**

Este plugin es opcional, pero recomendado si trabajamos con React y/o NextJS.


**Prisma**

Este plugin es opcional. Recomendado si trabajamos con ORM Prisma.


**Tailwind CSS IntelliSense** y **Tailwind Fold**

Plugins opcionales. Recomentados si trabajamos con framework CSS Tailwind.





# 4. Framework Express

Node.js nos permite desarrollar un servidor web desde cero. Para ello puede usarse los módulos incorporados `http` y `https`.

Sin embargo es más recomendable, por su sencillez, usar el **framework `express`**.


[Express](https://expressjs.com/) es un framework minimalista de backend para NodeJS.   
Usando algún [motor de plantillas](https://expressjs.com/en/guide/using-template-engines.html) com `Pug` o similar podemos desarrollar [aplicaciones web con distintas funcionalidades](https://expressjs.com/en/starter/examples.html). 

Pero, si en algo destaca, es la facilidad con la que puede desarrollarse una API de tipo REST usando este framework.  



# 5. Módulos externos

NodeJS viene con numerosos módulos internos incorporados (built-in): `fs`, `os`, `process`, `path`, `http`, `https`, ...

Además NodeJS permite la instalación de módulos externos. Algunos de ellos, bastante populares, son `express`, `node-fetch`, `cors`, `live-server`, `react`, `react-dom`, ... Pueden consultarse en https://www.npmjs.com.

Para instalar estos módulos externos usamos la herramienta `npm`.

> [!IMPORTANT] 
> 
> Antes de instalar módulos deberemos haber inicializado previamente el proyecto con
>
> `npm  init  -y`
>


## 5.1. Instalación de módulos externos

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

## 5.2. Opciones de NPM

**-S,  --save**
- dependencia de aplicación. Añade entrada en archivo `package.json`. En las últimas versiones de `npm` no es necesaria esta opción.

**-D,  --save-dev**
- dependencia de desarrollo. Añade entrada en archivo `package.json`.

**-g,  --global**
- instala en el sistema de forma global. Se usa normalmente para paquetes ejecutables.


## 5.3. Desinstalación de módulos externos
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

# 6. Módulos CommonJS

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

# 7. Módulos ECMAScript

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

## 7.1. Exportación e Importación

Cuando usamos `ESM (ECMAScript Modules)`, un archivo puede exportar e importar:

- Constantes
- Variables (Objetos, Arrays, ...)
- Funciones
- ...
  
A la hora de exportar, deberemos tener en cuenta que **un archivo**

- **sólo puede exportar por defecto un único elemento**
- puede exportar varios elementos que no sean por defecto


### 7.1.1. Ejemplo sin package.json

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


### 7.1.2. Ejemplo con package.json

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


# 8. Parámetros de URL

Los parámetros de URL o **`URL Parameters`** son partes de la URL en las cuales los valores que aparecen pueden variar de una petición a otra, aunque la estructura de la URL se mantiene.

Existen 2 tipos:

- **Parámetros de ruta** `Path Parameters`
- **Parámetros de consulta** `Query Parameters` o `Query Strings`

> [!NOTE]
> 
> A menudo se usa el término `Query Strings` como sinónimo de `URL Parameters`, lo cual no es del todo cierto como se acaba de ver y provoca confusiones.


## 8.1. Parámetros de ruta (Path Parameters)

Son parámetros que están incorporados dentro de la ruta de la URL. Son parámetros de solicitud adjuntos a una URL que apuntan a un recurso de `API REST` específico.

![Path Parameter](assets/path-parameter.png)

Los parámetros de ruta son parte del *endpoint* y son obligatorios. Por ejemplo en `/users/{id}`, `{id}` es el parámetro de ruta del *endpoint* `/users`; apunta a un registro de usuario específico. 

Un *endpoint* puede tener varios parámetros de ruta, como en el ejemplo `/organizations/{orgId}/members/{memberId}`. Esto apuntaría al registro de un miembro específico dentro de una organización específica, y tanto `{orgID}` como `{memberID}` requerirían variables.

Los parámetros de ruta son muy usados en `API REST`.

![API REST](assets/api-url.png)


## 8.2. Parámetros de consulta (Query Parameters o Query Strings)

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


# 9. Fetch desde el servidor


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

# 10. Creando nuestra propia API REST

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

## 10.1. Herramientas para probar la API

Para comprobar el correcto funcionamiento de la API, tenemos muchas herramientas. Las más conocidas son:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Rest Client (plugin para VSCode)](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)


Una herramienta muy interesante es [HTTPie](https://httpie.io/), en especial su [CLI](https://httpie.io/cli), debido a su accesibilidad e inmediatez.

![httpie-cli](assets/httpie-cli.png)

Aunque también dispone de su versión [GUI](https://httpie.io/desktop)

![httpie-gui](assets/httpie-gui.png)

## 10.2. CORS

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

## 10.3. JWT (JSON Web Token)

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


## 10.4. Documentación

- [Documentación de Express](https://expressjs.com/en/4x/api.html)



# 11. Formularios

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


## 11.1. application/x-www-form-urlencoded

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

## 11.2. multipart/form-data

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


## 11.3. JSON

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


# 12. Referencias

- [Apuntes de Javascript](https://github.com/jamj2000/Javascript)
- [CommonJS vs ES Modules](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/)
- [Código fuente de API con MongoDB](codigo/api-mongodb/)
- [Código fuente de API con JWT](codigo/api-jwt/)
- [Código fuente de API con Swagger](codigo/api-jwt-swagger/)
- [API de ejemplo: Cat as a Service](https://cataas.com/doc.html)
- [API de ejemplo: Dummy JSON](https://dummyjson.com/docs)