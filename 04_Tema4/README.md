> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 4: CONTENIDO DINÁMICO <!-- omit in toc -->
> Desarrollo de aplicaciones Web utilizando código embebido  
> PARAMS, SEARCHPARAMS, COOKIES

**[`PROYECTOS DE EJEMPLO`](proyectos)**

---

- [1. Introducción](#1-introducción)
- [2. Parámetros de URL](#2-parámetros-de-url)
- [3. Funciones dinámicas](#3-funciones-dinámicas)
  - [3.1. Renderizado en el Servidor vs Renderizado en el Cliente](#31-renderizado-en-el-servidor-vs-renderizado-en-el-cliente)
- [4. Route Handlers](#4-route-handlers)
  - [4.1. Métodos HTTP admitidos](#41-métodos-http-admitidos)
  - [4.2. Parámetros de URL](#42-parámetros-de-url)
  - [4.3. Creación de API REST](#43-creación-de-api-rest)
  - [4.4. API REST con datos en memoria RAM](#44-api-rest-con-datos-en-memoria-ram)
  - [4.5. API REST con datos en BD MongoDB](#45-api-rest-con-datos-en-bd-mongodb)
  - [4.6. CORS](#46-cors)
- [5. Cookies](#5-cookies)
  - [5.1. Tipos de cookies](#51-tipos-de-cookies)
  - [5.2. Generar Cookies](#52-generar-cookies)
  - [5.3. Leer Cookies](#53-leer-cookies)
  - [5.4. Eliminar Cookies](#54-eliminar-cookies)
- [6. ANEXO: Parámetros de ruta y consulta en página de cliente](#6-anexo-parámetros-de-ruta-y-consulta-en-página-de-cliente)
- [7. Referencias](#7-referencias)







--- 


# 1. Introducción

# 2. Parámetros de URL

Los parámetros de URL o **`URL Parameters`** son partes de la URL en las cuales los valores que aparecen pueden variar de una petición a otra, aunque la estructura de la URL se mantiene.

En las páginas gestionadas por el `app router` también podemos acceder a los 2 tipos que existen:

- **Parámetros de ruta** `Path Parameters`
- **Parámetros de consulta** `Query Parameters` o `Query Strings` 


Si tenemos la siguiente ruta:

**`http://localhost:3000/products/bristol/books?sort=author&skip=1`**


Y el siguiente código en `src/app/products/[store]/[category]/page.js`


```js
export default function page({ params, searchParams }) {

    console.log( params.store )
    console.log( params.category )
    console.log( searchParams.sort )
    console.log( searchParams.skip )

    // ...
}
```

Producirá la siguiente salida:

```
bristol
books
author
1
``` 


# 3. Funciones dinámicas



Las funciones dinámicas se basan en información que sólo se puede conocer en el momento de la solicitud, como las cookies del usuario, los encabezados de las solicitudes actuales o los parámetros de ruta y consulta de la URL. En Next.js, estas funciones dinámicas son:

- `cookies()` y `headers()`: al usarlos en un componente de servidor optará por toda la ruta hacia el renderizado dinámico en el momento de la solicitud.
- `searchParams` (**parámetros de consulta**): El uso de esta propiedad en las `props` de una página habilitará la página para el renderizado dinámico en el momento de la solicitud.
- `useSearchParams()` (**parámetros de consulta**): En componentes del cliente, el uso de esta función omitirá la renderización estática y en su lugar se realizará renderizado en el cliente (`CSR: Client Side Rendering`) de todos los componentes del cliente hasta el *Suspense* padre más cercano. Recomendamos envolver el componente del cliente que utilice useSearchParams() en un <Suspense/>. Esto permitirá que cualquier componente del cliente que se encuentre encima se renderice estáticamente. 


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
 









NextJS, por defecto, hace *build* a contenido estático. Si deseamos que el contenido de una página sea dinámico deberemos indicarlo con el siguiente código. 


```js
export const dynamic = 'force-dynamic'
```

> **NOTA:**
>
> El contenido dinámico requiere de renderizado en el lado servidor, lo cual ralentiza la respuesta al usuario.
>  


## 3.1. Renderizado en el Servidor vs Renderizado en el Cliente

El renderizado es la **representación gráfica del contenido de una página**, es decir, el proceso necesario para mostrar una página web en un navegador.

Existen 2 tipos de renderizado:

1. Client-Side Rendering (CSR) 
2. Server-Side Rendering (SSR)

NextJS soporta ambos tipos de renderizado, aunque recomienda usar SSR siempre que se pueda. Podemos entender SSR como sinónimo de generación en el lado servidor de contenido dinámico.

Para indicar a NextJS que una página o componente será renderizado en el lado cliente debemos colocar la primera línea del archivo con el siguiente texto.

```js
'use client'
```

**Ejemplo práctico**

A continuación tienes el código fuente para trabajar los conceptos anteriores.

- [Static vs Dynamic / CSR vs SSR](https://github.com/jamj2000/nxrender)

Para realizar ***build*** ejecutamos: 

```sh
npm  run  build
```

![static vs dynamic](assets/static-vs-dynamic.png)

Para lanzar: 

```sh
npm  run  start
```

Diferencias entre SSR y CSR

SSR                                             | CSR
------------------------------------------------|---------------------------------
SSR significa Renderizado del lado del servidor | CSR significa Renderizado del lado del cliente
Representa la página en el lado del servidor    | Representa la página en el lado del cliente
Es más amigable con el SEO                      | Es menos compatible con SEO
La interactividad del usuario es limitada       | La interactividad del usuario es altamente interactiva
Consume los recursos del servidor               | Consume los recursos del cliente
Ofrece un mejor rendimiento en dispositivos de baja potencia | Es posible que no ofrezca un mejor rendimiento en dispositivos de baja potencia
Es posible que se requieran más recursos del servidor para manejar las tareas de renderizado | No requiere más recursos del servidor para manejar las tareas de renderizado


    
# 4. Route Handlers

Los `controladores de ruta` permiten crear controladores de solicitudes personalizados para una ruta determinada mediante las APIs web [`Request`](https://developer.mozilla.org/docs/Web/API/Request) y [`Response`](https://developer.mozilla.org/docs/Web/API/Response).

Los controladores de ruta sólo están disponibles dentro del directorio `app`. A menudo se suelen utilizar para la creación de `APIs REST`.

![route-special-file](assets/route-special-file.avif)

Los controladores de ruta se definen en un archivo `route.js|ts` dentro del directorio `app`:

```typescript
// app/api/route.ts
export async function GET(request: Request) {}
```

## 4.1. Métodos HTTP admitidos

Los siguientes métodos HTTP son compatibles: **GET**, **POST**, **PUT**, **PATCH**, **DELETE**, **HEAD**, y **OPTIONS**. Si se llama a un método no compatible, Next.js devolverá una respuesta *405 Method Not Allowed*.


**Referencias:**

- https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- https://nextjs.org/docs/app/api-reference/functions/next-request
- https://nextjs.org/docs/app/api-reference/functions/next-response


## 4.2. Parámetros de URL

Los parámetros de URL o **`URL Parameters`** son partes de la URL en las cuales los valores que aparecen pueden variar de una petición a otra, aunque la estructura de la URL se mantiene.

En los `route handlers` también podemos acceder a los 2 tipos que existen:

- **Parámetros de ruta** `Path Parameters`
- **Parámetros de consulta** `Query Parameters` o `Query Strings` 


Si tenemos la siguiente ruta:

**`http://localhost:3000/api/products/bristol/books?sort=author&skip=1`**


Y el siguiente código en `src/app/api/products/[store]/[category]/route.js`


```js
export function GET(request, { params }) {
    
    const sort = request.nextUrl.searchParams.get("sort")
    const skip = request.nextUrl.searchParams.get("skip")
    console.log( request.nextUrl.origin )
    console.log( request.nextUrl.pathname )
    console.log( params.store )
    console.log( params.category )
    console.log( sort )
    console.log( skip )

    // ...
}
```

Producirá la siguiente salida:

```
http://localhost:3000
/api/products/bristol/books
bristol
books
author
1
``` 



## 4.3. Creación de API REST

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


## 4.4. API REST con datos en memoria RAM

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


## 4.5. API REST con datos en BD MongoDB

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

## 4.6. CORS

El **intercambio de recursos entre orígenes** -Cross-Origin Resource Sharing (CORS)- es una característica de seguridad que te permite controlar qué sitios pueden acceder a tus recursos. Puedes configurar el encabezado `Access-Control-Allow-Origin` para permitir que un origen específico acceda a sus controladores de ruta.

En NextJS existen 2 formas de habilitar CORS:

1. [Usando la API Web estándar para un controlador de ruta](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors)
2. [Agregando encabezados CORS a múltiples controladores de ruta](https://nextjs.org/docs/app/api-reference/next-config-js/headers#cors)

A continuación se muestra como se haría de la primera forma:

```js
export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

Para la segunda forma, deberemos editar el archivo `next.config.mjs`. Esta última forma nos permite establecer CORS para múltiples rutas. Por ejemplo:

```js
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  }  
} 
```

**Referencia:**

- [CORS: Qué es y cómo funciona el Cross-Origin Resource Sharing](https://okitup.com/blog/que-es-y-como-funciona-el-cors)



# 5. Cookies

Una cookie es un fichero de datos que una página web le envía a tu ordenador o móvil cuando la visitas. 

Las cookies suelen utilizarse principalmente para dos finalidades principales: **recordar accesos** y **conocer hábitos de navegación**. Las cookies hacen que las páginas web puedan identificar tu ordenador, y por lo tanto, si vuelves a entrar a ellas podrán recordar quién eres y qué has hecho antes dentro de ellas.

Gracias a las cookies la página web podrá recordar que eres tú, y por lo tanto podrá permitirte seguir en el perfil con el que iniciases sesión sin tener que volver a escribir tus credenciales.

Y no sólo para iniciar sesión. Imagínate que entras en Amazon y colocas muchos archivos en tu cesta de la compra sin tener una cuenta, pero luego te vas. Entonces, cuando vuelvas a entrar, gracias a tu IP y los otros identificadores que miran las cookies, Amazon sabrá quién eres y qué hiciste antes, y muy posiblemente todavía podrá recordar lo que tenías en la cesta de la compra para que no tengas que volver a meterlo.

## 5.1. Tipos de cookies

- **Cookies persistentes**: pueden llegar a almacenarse en el dispositivo del cliente durante meses o años. A menudo, la única manera de impedirlo es haciendo un borrado manual. Es importante que lo hagas sobre todo cuando uses un ordenador público. 
- **Cookies de sesión**: siempre se borran cuando finalizas la sesión en un sitio de Internet. Lo normal es que esto suceda de forma automática cuando cierras el navegador. 

A continuación se muestra como trabjar con cookies desde NextJS.

## 5.2. Generar Cookies 

**`cookies().set(name, value, options)`**

> **IMPORTANTE:** 
>
> Sólo es posible generar cookies en un `Server Action` o un `Route Handler`.
> HTTP no permite generar cookies después del comienzo de la respuesta.

```javascript
'use server'
 
import { cookies } from 'next/headers'

const oneDay = 1000 * 60 * 60 * 24  // ms

async function createCookie() {
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

## 5.3. Leer Cookies 

**cookies().get(name)**

```javascript
import { cookies } from 'next/headers'
 
export default function Page() {
  const usuario = cookies().get('usuario')

  return '<h1>Bienvendio {usuario}</h1>'
}
```


## 5.4. Eliminar Cookies

**cookies().delete(name)**

> **IMPORTANTE:** 
>
> Sólo es posible eliminar cookies en un `Server Action` o un `Route Handler`.

```javascript
'use server'
 
import { cookies } from 'next/headers'
 
async function deleteCookie() {
  cookies().delete('usuario')
}
```

Referencias: 

- [Documentación de NextJS](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [Guía con ejemplos reales](https://blog.logrocket.com/guide-cookies-next-js/)


# 6. ANEXO: Parámetros de ruta y consulta en página de cliente

También es posible obtener los parámetros de ruta y los de consulta en el lado cliente. Para ello deberemos usar los hooks **`useParams`** y **`useSearchParams`**. También disponemos del hook `usePathname`, que nos devuelve la ruta (incluyento los parámetros de ruta, si existen) 

Por ejemplo, si tenemos la página `src/app/product/[name]/page.js` con el siguiente código:

```js
'use client'
import { usePathname, useParams, useSearchParams } from 'next/navigation';

const page = () => {
  const pathname = usePathname();
  const { name } = useParams();
  const searchParams = useSearchParams();

  const provider = searchParams.get('provider');
  const screen = searchParams.get('screen');

  return (
    <>
      <p> Ruta: {pathname} </p>
      <p> Parámetro de ruta: name -&gt; {name} </p>
      <p> Parámetro de consulta: provider -&gt; {provider} </p>
      <p> Parámetro de consulta: screen -&gt; {screen}  </p>
    </>
  )
};

export default page
```

y el usuario visita la URL `http://localhost:3000/product/laptop?provider=HP&screen=15`, entonces obtendrá el siguiente resultado

```
Ruta: /product/laptop
Parámetro de ruta: name -> laptop
Parámetro de consulta: provider -> HP
Parámetro de consulta: screen -> 15
```



# 7. Referencias

- [Documentación de NextJS](https://nextjs.org/docs)
- [Listado de APIs públicas](https://publicapis.dev)
