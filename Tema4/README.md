> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 4: Desarrollo de aplicaciones Web utilizando código embebido <!-- omit in toc -->
> NEXTJS, APP ROUTER, ROUTE HANDLERS, COOKIES

- [1. Introducción](#1-introducción)
- [2. NextJS](#2-nextjs)
  - [2.1. Creación de un proyecto](#21-creación-de-un-proyecto)
  - [2.2. Carpetas y archivos del proyecto](#22-carpetas-y-archivos-del-proyecto)
- [3. Componentes](#3-componentes)
  - [3.1. JSX](#31-jsx)
  - [3.2. Aplicar estilos](#32-aplicar-estilos)
- [4. Componentes del Servidor](#4-componentes-del-servidor)
  - [4.1. Beneficios del renderizado en el servidor](#41-beneficios-del-renderizado-en-el-servidor)
  - [4.2. Funciones dinámicas](#42-funciones-dinámicas)
- [5. Componentes del Cliente](#5-componentes-del-cliente)
  - [5.1. Beneficios del renderizado en el cliente](#51-beneficios-del-renderizado-en-el-cliente)
- [6. Componentes del Servidor VS Componentes del Cliente](#6-componentes-del-servidor-vs-componentes-del-cliente)
  - [6.1. ¿Cuándo utilizar componentes de servidor y cliente?](#61-cuándo-utilizar-componentes-de-servidor-y-cliente)
  - [6.2. Componentes de NextJS](#62-componentes-de-nextjs)
- [7. App Router](#7-app-router)
  - [7.1. Segmentos de ruta](#71-segmentos-de-ruta)
  - [7.2. Creando rutas](#72-creando-rutas)
  - [7.3. Organización del proyecto](#73-organización-del-proyecto)
- [8. Route Handlers](#8-route-handlers)
  - [8.1. Métodos HTTP admitidos](#81-métodos-http-admitidos)
  - [8.2. Creación de API REST](#82-creación-de-api-rest)
  - [8.3. API REST con datos en memoria RAM](#83-api-rest-con-datos-en-memoria-ram)
  - [8.4. API REST con datos en BD MongoDB](#84-api-rest-con-datos-en-bd-mongodb)
- [9. Cookies](#9-cookies)
  - [9.1. Tipos de cookies](#91-tipos-de-cookies)
  - [9.2. Generar Cookies](#92-generar-cookies)
  - [9.3. Leer Cookies](#93-leer-cookies)
  - [9.4. Eliminar Cookies](#94-eliminar-cookies)
- [10. Referencias](#10-referencias)



--- 

# 1. Introducción



# 2. NextJS

Next es un **framework fullstack JavaScript**, que emplea **React** para crear componentes. Y ya no solo componentes de frontend. Gracias a los "**React Server Components (RSC)**" podemos tener componentes que sólo se ejecuten en un entorno de servidor o backend.
Con Next hacemos aplicaciones **Server Side Rendering (SSR)**, y con los RSC lo que tenemos es Streaming-SSR, una evolución del mismo que nos permite mezclar lo mejor de muchos "mundos".


> **IMPORTANTE**
>
> **Usaremos la versión NextJS 13 o superior.**
>
> En Internet hay mucha documentación de versiones anteriores, pero la forma de trabajar en ellas es ligeramente diferente.


## 2.1. Creación de un proyecto

Para crear proyecto llamado `miapp`

```bash
npx  create-next-app  miapp
```

Nos aparecerá un asistente solicitando las funcionalidades con las que vamos a trabajar. En principio, pulsaremos `Intro` para todo, instalando sólo 3 dependencias: `react`, `react-dom` y `next`.

![create next app](assets/create-next-app.png)
 

Para entrar dentro del proyecto

```bash
cd  miapp
```

Para editar el código con VSCode

```bash
code  .
```

## 2.2. Carpetas y archivos del proyecto

![lista archivos](assets/tree.png)

Los archivos que aparecen dentro de la carpeta `src/app` son:

- `favicon.ico`: icono de la aplicación
- `globals.css`: estilos CSS globales
- `layout.js`: plantilla o layout de la aplicación
- `page.js`: página inicial
- `page.module.css`: estilos CSS para la página principal

Otros archivos opcionales que podemos añadir son:

- `loading.js`: mensaje mientras se carga la página
- `error.js`: mensaje de error, si se da el caso
- `not-found.js`: mensaje de página no encontrada, si se da el caso



# 3. Componentes

Los componentes son uno de los conceptos esenciales de los modernos frameworks de Javascript. Constituyen los cimientos sobre los que construyes interfaces de usuario (UIs por sus siglas en inglés). 

Un componente permite combinar tu marcado HTML, CSS y JavaScript en «componentes» personalizados, elementos reutilizables de UI para tu aplicación.

- Referencia: https://es.react.dev/learn/your-first-component


## 3.1. JSX

**Referencias**: 
- https://es.react.dev/learn/writing-markup-with-jsx
- https://es.legacy.reactjs.org/docs/jsx-in-depth.html

JSX (JavaScript Syntax Extension y ocasionalmente denominada JavaScript XML) es una extensión de JavaScript que permite la creación de árboles DOM utilizando una sintaxis similar a XML. Creado inicialmente por Facebook para su uso con React, JSX ha sido adoptado por múltiples frameworks.

JSX te permite escribir marcado similar a HTML dentro de un archivo JavaScript, manteniendo la lógica de renderizado y el contenido en el mismo lugar. En ocasiones será deseable añadir un poco de lógica en JavaScript o referenciar una propiedad dinámica dentro del marcado. En esta situación, puedes utilizar llaves en tu JSX para «abrir una ventana» hacia JavaScript.

El código escrito en JSX requiere conversión con una herramienta como *Babel* antes de que los navegadores web puedan entenderlo. Este procesamiento generalmente se realiza durante un proceso de construcción de software antes de deslplegar la aplicación .

**Ejemplo**:

```javascript
const App = () => {
   return (
     <div>
       <p>Header</p>
       <p>Content</p>
       <p>Footer</p>
     </div>
   ); 
}
```

**Características de JSX**

- JSX simula ser HTML, pero en el fondo no lo es.
- Obligatoriamente, todas las etiquetas tienen que tener cierre.
- No se puede hacer `return` de varias etiquetas. 
  - Debemos insertar varias etiquetas en una etiqueta padre. 
  - O podemos usar un fragmento `<>` ... `</>`
- No se permite el atributo HTML `class`. En su lugar hay que usar **`className`**
- Necesidad de usar atributo **`key`** en lista de elementos similares.


## 3.2. Aplicar estilos

**en línea**

```javascript 
function Test () {
  return (
    <div style={{ backgroundColor: "yellow", fontSize: "24px" }}> 
      Hola 
    </div>
  )
}

export default Test;
```

**interno**

```javascript
const style = {
  backgroundColor: "yellow",
  fontSize: "24px"
}

function Test () {
  return <div style={style}> Hola </div>
}

export default Test;
```

También es válido lo siguiente:

```javascript
function Test () {
  return <div style={{ backgroundColor: "yellow", fontSize: "24px" }}> Hola </div>
}

export default Test;
```

> **NOTA:** Observa que las **propiedades** se escriben en **camelCase** y el separador es la coma.


**externo en módulo CSS**

```css
/* Test.module.css */
.clase {
  background-color: "yellow";
  font-size: 24px;
}
```

```javascript
import style from 'Test.module.css'

function Test () {
  return <div className={style.clase}> Hola </div>
}

export default Test;
```

Para aplicar múltiples clases:

```javascript
import styles from "./App.module.css"

export const App = () => {
  return(
      <button className={`${styles.buttonClass} ${styles.buttonColor}`}>CSS Styles</button>
  )
}
export default App
```

**externo en CSS global**

```css
/* globals.css */

.bg-lavanda {
  background-color: Lavender;
}

.borde {
  border: solid 1px LightSlateGray;
}

.relleno {
  padding: 30px;
}
```

```javascript
import './globals.css'

export default function Home() {
  return (
    <main className="borde relleno bg-lavanda">
      <h1>Inicio</h1>
    </main>
  )
}
```


**Tailwind**

```css
/* globals.css */ 

@tailwind base;
@tailwind components;
@tailwind utilities;
```


```javascript
import "./globals.css"

function Home () {
  return <div className="bg-yellow-100  text-2xl"> Hola </div>
}

export default Home;
```

Tailwind es un framework CSS bastante popular y muy peculiar. 

Sitios que proporcionan componentes basados en Tailwind:

- [Shadcn](https://ui.shadcn.com/)
- [flowbite](https://flowbite.com/)


# 4. Componentes del Servidor

NextJS es un framework destinado al desarrollo Fullstack centrado principalmente en el lado servidor. La mayoría de componentes que desarrollaremos serán `Server React Components`.

De forma predeterminada, Next.js usa componentes de servidor. Esto permite implementar automáticamente el renderizado del servidor (`SSR`) sin configuración adicional y optar por utilizar componentes del cliente sólo cuando sea necesario

En Next.js, el trabajo de renderizado se divide por segmentos de ruta para permitir el streaming y el renderizado parcial, y existen tres estrategias de renderizado de servidor diferentes:

- Renderizado estático
- Renderizado dinámico
- Streaming

## 4.1. Beneficios del renderizado en el servidor

Hay una serie de beneficios al realizar el trabajo de renderizado en el servidor, que incluyen:

- **Recuperación de datos (fetch)**: los componentes del servidor permiten mover la recuperacón de datos al servidor, más cerca de su fuente de datos. Esto puede mejorar el rendimiento al reducir el tiempo que lleva recuperar los datos necesarios para el renderizado y la cantidad de solicitudes que el cliente debe realizar.
- **Seguridad**: los componentes del servidor permiten mantener datos y lógica confidenciales en el servidor, como tokens y claves API, sin el riesgo de exponerlos al cliente.
- **Almacenamiento en caché**: al renderizar en el servidor, el resultado se puede almacenar en caché y reutilizar en solicitudes posteriores y entre usuarios. Esto puede mejorar el rendimiento y reducir los costos al reducir la cantidad de procesamiento y obtención de datos realizados en cada solicitud.
- **Tamaños de paquetes**: los componentes del servidor le permiten mantener en el servidor grandes dependencias que anteriormente afectarían el tamaño del paquete de JavaScript del cliente. Esto es beneficioso para los usuarios con Internet más lento o dispositivos menos potentes, ya que el cliente no tiene que descargar, analizar ni ejecutar ningún JavaScript para los componentes del servidor.
- **Carga de página inicial y primer renderizado con contenido**: En el servidor, podemos generar HTML para permitir a los usuarios ver la página inmediatamente, sin esperar a que el cliente descargue, analice y ejecute el JavaScript necesario para representar la página.
- **Optimización de motores de búsqueda y capacidad de compartir en redes sociales**: los robots de los motores de búsqueda pueden utilizar el HTML renderizado para indexar sus páginas y los robots de las redes sociales para generar vistas previas de tarjetas sociales para sus páginas.
- **Streaming**: los componentes del servidor le permiten dividir el trabajo de renderizado en partes y transmitirlas al cliente a medida que estén listas. Esto permite al usuario ver partes de la página antes sin tener que esperar a que se represente toda la página en el servidor.

## 4.2. Funciones dinámicas

Las funciones dinámicas se basan en información que sólo se puede conocer en el momento de la solicitud, como las cookies del usuario, los encabezados de las solicitudes actuales o los parámetros de ruta y consulta de la URL. En Next.js, estas funciones dinámicas son:

- `cookies()` y `headers()`: al usarlos en un componente de servidor optará por toda la ruta hacia el renderizado dinámico en el momento de la solicitud.
- `useSearchParams()` (**parámetros de consulta**): En componentes del cliente, el uso de esta función omitirá la renderización estática y en su lugar se realizará renderizado en el cliente (`CSR: Client Side Rendering`) de todos los componentes del cliente hasta el *Suspense* padre más cercano.
Recomendamos envolver el componente del cliente que utilice useSearchParams() en un <Suspense/>. Esto permitirá que cualquier componente del cliente que se encuentre encima se renderice estáticamente. 
- `searchParams` (**parámetros de consulta**): El uso de esta propiedad en las `props` de una página habilitará la página para el renderizado dinámico en el momento de la solicitud.

**Ejemplo:**

```javascript
// src/app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// params: Parámetros de ruta
// searchParams: Párametros de consulta
function Page({params, searchParams}: Props) {
  return <h1>My Page</h1>
}

export default Page
```

El uso de cualquiera de estas funciones optará por toda la ruta hacia la representación dinámica en el momento de la solicitud.

**Referencias:**

- https://nextjs.org/docs/app/building-your-application/rendering/server-components
- https://nextjs.org/docs/app/api-reference/file-conventions/page
- https://nextjs.org/docs/app/api-reference/functions/use-params
- https://nextjs.org/docs/app/api-reference/functions/use-search-params


# 5. Componentes del Cliente

Los componentes del cliente permiten escribir una interfaz de usuario interactiva que se puede renderizar en el cliente (`CSR: Client Side Rendering`) en el momento de la solicitud. En Next.js, la renderización en el cliente es opcional, lo que significa que debe decidir explícitamente qué componentes React serán renderizados en el cliente.

## 5.1. Beneficios del renderizado en el cliente

Hay un par de beneficios al realizar el trabajo de renderizado en el cliente, que incluyen:

- **Interactividad**: los componentes del cliente pueden hacer uso de `state`, `effects` , and `event listeners`, lo que significa que pueden proporcionar retroalimentación inmediata al usuario y actualizar la interfaz de usuario.
- **API del navegador**: los componentes del cliente tienen acceso a las API del navegador, como la geolocalización o el almacenamiento local, lo que le permite crear una interfaz de usuario para casos de uso específicos.

```javascript
'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Referencia: https://nextjs.org/docs/app/building-your-application/rendering/client-components


# 6. Componentes del Servidor VS Componentes del Cliente

## 6.1. ¿Cuándo utilizar componentes de servidor y cliente?

A continuación se ofrece un resumen rápido de los diferentes casos de uso de los componentes de servidor y cliente:

| ¿Qué hay que hacer?                                                                                     | Componente del servidor | Componente del cliente |
| ------------------------------------------------------------------------------------------------------- | :---------------------: | :--------------------: |
| Obtener datos                                                                                           |            ✅            |           ❌            |
| Acceder a recursos backend (directamente)                                                               |            ✅            |           ❌            |
| Mantener información confidencial en el servidor (tokens de acceso, claves API, etc.)                   |            ✅            |           ❌            |
| Mantener grandes dependencias en el servidor/Reducir JavaScript del lado del cliente                    |            ✅            |           ❌            |
| Añadir interactividad y detectores de eventos ( onClick(), onChange(), etc.)                            |            ❌            |           ✅            |
| Utilizar efectos de estado y ciclo de vida ( useState(), useEffect(), etc.)                             |            ❌            |           ✅            |
| Utilizar API solo para navegador                                                                        |            ❌            |           ✅            |
| Utilizar enlaces personalizados que dependan del estado, los efectos o las API exclusivas del navegador |            ❌            |           ✅            |


## 6.2. Componentes de NextJS

**Link**

`<Link>` es un componente de React que extiende el elemento HTML <a>para proporcionar *pre-fetching* y navegación del lado del cliente entre rutas. Es la forma principal de navegar entre rutas en Next.js.

Ejemplo:

```javascript
import Link from 'next/link'
 
export default function Page() {
  return (
    <>
      <Link href="/">Home</Link><br/>
      <Link href="/dashboard">Dashboard</Link>
    </>
  )
}
```

- Referencia: https://nextjs.org/docs/app/api-reference/components/link

**Image**

El componente `<Image>` de Next.js amplía el elemento <img> de HTML con funciones para la optimización automática de imágenes. Funcionalidades:

- **Optimización de tamaño**: proporciona automáticamente imágenes del tamaño correcto para cada dispositivo, utilizando formatos de imagen modernos como WebP y AVIF.
- **Estabilidad visual**: evita el cambio de diseño automáticamente cuando se cargan las imágenes.
- **Cargas de página más rápidas**: las imágenes solo se cargan cuando ingresan a la ventana gráfica mediante la carga diferida del navegador nativo, con marcadores de posición borrosos opcionales.
- **Flexibilidad de recursos**: cambio de tamaño de imágenes bajo demanda, incluso para imágenes almacenadas en servidores remotos


- Referencia: https://nextjs.org/docs/app/api-reference/components/image


> **IMPORTANTE**: Tanto si usamos el componente `Image` proporcionado por NextJS, como si usamos la etiqueta `img` de HTML, deberemos indicar en el archivo **`next.config.js`** los dominios desde los cuales recuperamos imágenes. Por ejemplo, si usamos imágenes alojadas en cloudinary, escribiremos:
>
>
> ```js
> /** @type {import('next').NextConfig} */
> const nextConfig = {
>   images: {
>     remotePatterns: [
>       {
>         protocol: 'https',
>         hostname: '**.cloudinary.com',
>       },
>     ],
>   }
> }
> module.exports = nextConfig 
>```
>
> Así podremos usar 
> ```html
> <img src="https://res.cloudinary.com/dk30psegu/image/upload/v1694772098/sample.jpg" />
> ```

- Más información: https://nextjs.org/docs/app/api-reference/components/image#configuration-options


# 7. App Router

En la versión 13, Next.js introdujo un nuevo `App Router` construido sobre `React Server Components` , que admite diseños compartidos, enrutamiento anidado, estados de carga, manejo de errores y más.

App Router funciona en un nuevo directorio llamado `app` (en versiones anteriores se usaba `pages`). 

![Terminología](assets/terminology-component-tree.avif)

![Anatomía de URL](assets/terminology-url-anatomy.avif)

**Conceptos**

- **Segmento de URL**: Parte de la ruta de la URL delimitada por barras.
- **Ruta URL**: Parte de la URL que viene después del dominio (compuesta por segmentos).

## 7.1. Segmentos de ruta

Cada carpeta en una ruta representa un segmento de ruta. Cada segmento de ruta se asigna a un segmento correspondiente en una ruta URL.

![Segmentos de ruta](assets/route-segments-to-path-segments.avif)

Dentro de `app`, las subcarpetas definen rutas, pero solo los contenidos devueltos por `page.js` o `route.js` son direccionables públicamente.

Esto significa que los archivos de proyecto se pueden colocar de forma segura dentro de segmentos de ruta en el directorio `app` sin que se puedan enrutar accidentalmente.

![colocación](assets/project-organization-colocation.avif)

- Referencia: https://nextjs.org/docs/app/building-your-application/routing

## 7.2. Creando rutas

Next.js utiliza un enrutador basado en un sistema de archivos donde se utilizan carpetas para definir rutas.

Cada carpeta representa un segmento de ruta que se asigna a un segmento de URL. Para crear una ruta anidada, puede anidar carpetas una dentro de otra.

![Segmentos de ruta a segmentos de ruta](assets/route-segments-to-path-segments.avif)

Se utiliza un archivo especial **`page.js`** para hacer que los segmentos de ruta sean accesibles públicamente.

![Definición de rutas](assets/defining-routes.avif)

En este ejemplo, la ruta URL `/dashboard/analytics` no es accesible públicamente porque no tiene un archivo `page.js` correspondiente. Esta carpeta podría usarse para almacenar componentes, hojas de estilo, imágenes u otros archivos colocados.


## 7.3. Organización del proyecto

Aparte de las convenciones de enrutamiento de carpetas y archivos, Next.js no tiene opiniones sobre cómo organizar y colocar los archivos de su proyecto.

A continuación se muesran **3 estratégias válidas**:

**Archivos de proyecto fuera de `app`**

Esta estrategia almacena todo el código de la aplicación en carpetas compartidas en la raíz de su proyecto y mantiene el directorio `app` únicamente con fines de enrutamiento.

![](assets/project-organization-project-root.avif)

**Archivos del proyecto en carpetas de nivel superior dentro de `app`**

Esta estrategia almacena todo el código de la aplicación en carpetas compartidas en la raíz del directorio `app`.

![](assets/project-organization-app-root.avif)

**Archivos de proyecto divididos por característica o ruta**

Esta estrategia almacena el código de aplicación compartido globalmente en el directorio raíz `app` y divide el código de aplicación más específico en los segmentos de ruta que los utilizan.

![](assets/project-organization-app-root-split.avif)


# 8. Route Handlers

Los `controladores de ruta` le permiten crear controladores de solicitudes personalizados para una ruta determinada mediante las APIs web [`Request`](https://developer.mozilla.org/docs/Web/API/Request) y [`Response`](https://developer.mozilla.org/docs/Web/API/Response).

Los controladores de ruta sólo están disponibles dentro del directorio `app`. A menudo se suelen utilizar para la creación de `APIs REST`.

![route-special-file](assets/route-special-file.avif)

Los controladores de ruta se definen en un archivo `route.js|ts` dentro del directorio `app`:

```typescript
// app/api/route.ts
export async function GET(request: Request) {}
```

## 8.1. Métodos HTTP admitidos

Los siguientes métodos HTTP son compatibles: **GET**, **POST**, **PUT**, **PATCH**, **DELETE**, **HEAD**, y **OPTIONS**. Si se llama a un método no compatible, Next.js devolverá una respuesta *405 Method Not Allowed*.


**Referencias:**

- https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- https://nextjs.org/docs/app/api-reference/functions/next-request
- https://nextjs.org/docs/app/api-reference/functions/next-response


## 8.2. Creación de API REST

Como se ha comentado anteriormente, la principal aplicación que tienen los route handlers (`controladores de ruta`) es la implentación de APIs. Suele ser habitual el intercambio de información mediante el formato JSON.

A continuación tienes 2 proyectos donde se implementa una API sencilla de este tipo. En ambos casos, los *endpoints* disponibles son:

- `/api/users` Métodos **GET** y **POST**
- `/api/users/[id]` Métodos **GET**, **PUT** y **DELETE**

**Estructura de archivos en `app`**

```
app
├── api
│   └── users
│       ├── [id]
│       │   └── route.js
│       └── route.js
├── favicon.ico
├── globals.css
├── layout.js
└── page.js

```


## 8.3. API REST con datos en memoria RAM

**Estructura de archivos en `src`**

```
.
├── app
│   ├── api
│   │   └── users
│   │       ├── [id]
│   │       │   └── route.js
│   │       └── route.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
└── lib
    └── users.js
```

Gestión de datos en archivo `lib/users.js`.

- [Código fuente](https://github.com/jamj2000/nxapi-memory)


## 8.4. API REST con datos en BD MongoDB

**Estructura de archivos en `src`**

```
.
├── app
│   ├── api
│   │   └── users
│   │       ├── [id]
│   │       │   └── route.js
│   │       └── route.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
└── lib
    └── mongodb.js
```

Gestión de datos en archivo `lib/mongodb.js`.

- [Código fuente](https://github.com/jamj2000/nxapi-mongodb)


# 9. Cookies

Una cookie es un fichero de datos que una página web le envía a tu ordenador o móvil cuando la visitas. 

Las cookies suelen utilizarse principalmente para dos finalidades principales: **recordar accesos** y **conocer hábitos de navegación**. Las cookies hacen que las páginas web puedan identificar tu ordenador, y por lo tanto, si vuelves a entrar a ellas podrán recordar quién eres y qué has hecho antes dentro de ellas.

Gracias a las cookies la página web podrá recordar que eres tú, y por lo tanto podrá permitirte seguir en el perfil con el que iniciases sesión sin tener que volver a escribir tus credenciales.

Y no sólo para iniciar sesión. Imagínate que entras en Amazon y colocas muchos archivos en tu cesta de la compra sin tener una cuenta, pero luego te vas. Entonces, cuando vuelvas a entrar, gracias a tu IP y los otros identificadores que miran las cookies, Amazon sabrá quién eres y qué hiciste antes, y muy posiblemente todavía podrá recordar lo que tenías en la cesta de la compra para que no tengas que volver a meterlo.

## 9.1. Tipos de cookies

- **Cookies persistentes**: pueden llegar a almacenarse en el dispositivo del cliente durante meses o años. A menudo, la única manera de impedirlo es haciendo un borrado manual. Es importante que lo hagas sobre todo cuando uses un ordenador público. 
- **Cookies de sesión**: siempre se borran cuando finalizas la sesión en un sitio de Internet. Lo normal es que esto suceda de forma automática cuando cierras el navegador. 

A continuación se muestra como trabjar con cookies desde NextJS.

## 9.2. Generar Cookies 

**`cookies().set(name, value, options)`**

> **IMPORTANTE:** 
>
> Sólo es posible generar cookies en un `Server Action` o un `Route Handler`.
> HTTP no permite generar cookies después del comienzo de la respuesta.

```javascript
'use server'
 
import { cookies } from 'next/headers'

const oneDay = 1000 * 60 * 60 * 24  // ms

async function create(data) {
  cookies().set('usuario', 'jose')
  // o
  cookies().set('usuario', 'jose', { secure: true })
  // o
  cookies().set({
    name: 'usuario',
    value: 'jose', 
    httpOnly: true,
    path: '/',
    expires: Date.now() + oneDay 
    })
}
```
> **NOTA:** Para crear una cookie de sesión debes omitir la opción `expires`. 
> 

```javascript
// damecookie/route.js  => http://localhost:3000/damecookie

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export async function GET() {
    // Creamos cookie
    cookies().set("token", JSON.stringify({ id: 1, user: "Pepe", fecha: new Date() }))

    // Leemos cookie
    const data = cookies().get('token').value
    const cookie = JSON.parse(data)
    cookie.fecha = new Date(cookie.fecha)

    // Mostramos información de la cookie
    console.log(
        cookie.id,
        cookie.user,
        cookie.fecha.getDate(), 
        cookie.fecha.getMonth() + 1,
        cookie.fecha.getFullYear(),
        cookie.fecha.getHours(),
        cookie.fecha.getMinutes(),
        cookie.fecha.getSeconds()
        )

    return NextResponse.json({ mensaje: 'Cookie enviada' })
}
```

## 9.3. Leer Cookies 

**cookies().get(name)**

```javascript
import { cookies } from 'next/headers'
 
export default function Page() {
  const usuario = cookies().get('usuario')

  return '<h1>Bienvendio {usuario}</h1>'
}
```


## 9.4. Eliminar Cookies

**cookies().delete(name)**

> **IMPORTANTE:** 
>
> Sólo es posible eliminar cookies en un `Server Action` o un `Route Handler`.

```javascript
'use server'
 
import { cookies } from 'next/headers'
 
async function create(data) {
  cookies().delete('usuario')
}
```

Referencia: https://nextjs.org/docs/app/api-reference/functions/cookies



# 10. Referencias

- [Documentación de NextJS](https://nextjs.org/docs)
- [Listado de APIs públicas](https://publicapis.dev)
