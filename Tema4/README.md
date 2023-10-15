> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 4: Desarrollo de aplicaciones Web utilizando código embebido <!-- omit in toc -->
> APP ROUTER, ROUTE HANDLERS, COOKIES
> 
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
- [4.3. Componentes del Cliente](#43-componentes-del-cliente)
  - [4.4. Beneficios del renderizado en el cliente](#44-beneficios-del-renderizado-en-el-cliente)
- [5. Componentes del Servidor VS Componentes del Cliente](#5-componentes-del-servidor-vs-componentes-del-cliente)
  - [5.1. ¿Cuándo utilizar componentes de servidor y cliente?](#51-cuándo-utilizar-componentes-de-servidor-y-cliente)
- [6. App Router](#6-app-router)
- [7. Route Handlers](#7-route-handlers)
- [8. Cookies](#8-cookies)
  - [8.1. Generar Cookies](#81-generar-cookies)
  - [8.2. Leer Cookies](#82-leer-cookies)
  - [8.3. Eliminar Cookies](#83-eliminar-cookies)





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

**externo**

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


**Tailwind**

```javascript
import style from 'Test.module.css'

function Test () {
  return <div className="bg-yellow-100  text-2xl"> Hola </div>
}

export default Test;
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
- `useSearchParams()` (**parámetros de consulta**): En componentes del cliente, el uso de esta función omitirá la renderización estática y en su lugar se realizará renderizado en el cliente (`CSR: Client Side Rendering`) de todos los componentes del cliente hasta el Suspense padre más cercano.
Recomendamos envolver el componente del cliente que utilice useSearchParams() en un <Suspense/>. Esto permitirá que cualquier componente del cliente que se encuentre encima se renderice estáticamente. 
- `searchParams` (**parámetros de consulta**): El uso de esta propiedad en las `props` de una página habilitará la página para el renderizado dinámico en el momento de la solicitud.

**Ejemplo:**

```javascript
// src/app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

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


# 4.3. Componentes del Cliente

Los componentes del cliente permiten escribir una interfaz de usuario interactiva que se puede renderizar en el cliente (`CSR: Client Side Rendering`) en el momento de la solicitud. En Next.js, la renderización en el cliente es opcional, lo que significa que debe decidir explícitamente qué componentes React serán renderizados en el cliente.

## 4.4. Beneficios del renderizado en el cliente

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


# 5. Componentes del Servidor VS Componentes del Cliente

## 5.1. ¿Cuándo utilizar componentes de servidor y cliente?

A continuación se ofrece un resumen rápido de los diferentes casos de uso de los componentes de servidor y cliente:

¿Qué hay que hacer?	 | Componente del servidor | Componente del cliente
---------------------|:-----------------------:|:----------------------:
Obtener datos		| ✅ | ❌
Acceder a recursos backend (directamente)	| ✅ | ❌
Mantener información confidencial en el servidor (tokens de acceso, claves API, etc.)	| ✅	| ❌
Mantener grandes dependencias en el servidor/Reducir JavaScript del lado del cliente	| ✅	| ❌
Añadir interactividad y detectores de eventos ( onClick(), onChange(), etc.)|	❌ | ✅
Utilizar efectos de estado y ciclo de vida ( useState(), useEffect(), etc.)	|	❌ | ✅
Utilizar API solo para navegador 	| ❌ | ✅
Utilizar enlaces personalizados que dependan del estado, los efectos o las API exclusivas del navegador	| ❌ | ✅



# 6. App Router


# 7. Route Handlers

**Referencias:**

- https://nextjs.org/docs/app/api-reference/functions/next-request
- https://nextjs.org/docs/app/api-reference/functions/next-response


# 8. Cookies


## 8.1. Generar Cookies 

**`cookies().set(name, value, options)`**

> **IMPORTANTE:** 
>
> Sólo es posible generar cookies en un `Server Action` o un `Route Handler`.
> HTTP no permite generar cookies después del comienzo de la respuesta.

```javascript
'use server'
 
import { cookies } from 'next/headers'
 
async function create(data) {
  cookies().set('usuario', 'jose')
  // or
  cookies().set('usuario', 'jose', { secure: true })
  // or
  cookies().set({
    name: 'usuario',
    value: 'jose',
    httpOnly: true,
    path: '/',
    expires: Date.now() + oneDay 
  })
}
```


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

## 8.2. Leer Cookies 

**cookies().get(name)**

```javascript
import { cookies } from 'next/headers'
 
export default function Page() {
  const cookieStore = cookies().get('usuario')

  return '...'
}
```


## 8.3. Eliminar Cookies

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