> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 4: CONTENIDO DINÁMICO <!-- omit in toc -->
> Desarrollo de aplicaciones Web utilizando código embebido  
> PARAMS, SEARCHPARAMS, COOKIES

**[`PROYECTOS DE EJEMPLO`](PROYECTOS.md)**

<img src="assets/nextdotjs.svg" width="80" height="80">

---

- [1. Introducción](#1-introducción)
- [2. Renderizado en el Servidor vs Renderizado en el Cliente](#2-renderizado-en-el-servidor-vs-renderizado-en-el-cliente)
- [4. Características dinámicas](#4-características-dinámicas)
- [3. Parámetros de URL](#3-parámetros-de-url)
  - [Parámetros de ruta](#parámetros-de-ruta)
  - [Parámetros de consulta](#parámetros-de-consulta)
  - [3.1. Parámetros de ruta vs Parámetros de consulta.](#31-parámetros-de-ruta-vs-parámetros-de-consulta)
- [5. Cookies](#5-cookies)
  - [5.1. Tipos de cookies](#51-tipos-de-cookies)
  - [5.2. Generar Cookies](#52-generar-cookies)
  - [5.3. Leer Cookies](#53-leer-cookies)
  - [5.4. Eliminar Cookies](#54-eliminar-cookies)
- [6. Middleware](#6-middleware)
- [7. ANEXO: Parámetros de ruta y consulta en página de cliente](#7-anexo-parámetros-de-ruta-y-consulta-en-página-de-cliente)
- [8. Referencias](#8-referencias)


--- 


# 1. Introducción

En este tema veremos las características que nos proporciona NextJS para la gestión de contenido dinámico. Normalmente este contenido suele provenir de una **Base de Datos** o de una **API REST**.

Cuando trabajamos con este tipo de contenido, suele asaltarnos la duda de si debería renderizarse en el lado servidor o en el lado cliente. Así que en el siguiente apartado trataremos este asunto. Una vez visto un ejemplo que muestra los distintos tipos de renderizado, dedicaremos el resto del tema a trabajar desde el lado servidor.

Al crear páginas que gestionan contenido dinámico suele ser habitual la necesidad de pasarle parámetros, a los que NextJS denomina `params` y `searchParams`. Veremos ejemplos de uso más adelante en este tema.

Después de haber estudiado los parámetros de las páginas dinámicas, pasaremos a trabajar las `cookies`, que es también una información gestionada de forma dinámica en cada petición/respuesta.

Por último, aunque no está directamente relacionado con el contenido de este tema, haremos una breve incursión al `middleware`.


# 2. Renderizado en el Servidor vs Renderizado en el Cliente

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

| SSR                                                                                          | CSR                                                                             |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| SSR significa Renderizado del lado del servidor                                              | CSR significa Renderizado del lado del cliente                                  |
| Representa la página en el lado del servidor                                                 | Representa la página en el lado del cliente                                     |
| Es más amigable con el SEO                                                                   | Es menos compatible con SEO                                                     |
| La interactividad del usuario es limitada                                                    | La interactividad del usuario es altamente interactiva                          |
| Consume los recursos del servidor                                                            | Consume los recursos del cliente                                                |
| Ofrece un mejor rendimiento en dispositivos de baja potencia                                 | Es posible que no ofrezca un mejor rendimiento en dispositivos de baja potencia |
| Es posible que se requieran más recursos del servidor para manejar las tareas de renderizado | No requiere más recursos del servidor para manejar las tareas de renderizado    |


# 4. Características dinámicas


Las características dinámicas se basan en información que sólo se puede conocer en el momento de la solicitud, como las cookies del usuario, los encabezados de las solicitudes actuales o los parámetros de ruta y consulta de la URL. En Next.js, estas características dinámicas son:

- `params` (**parámetros de ruta**): El uso de esta propiedad en las `props` de una página habilitará la página para el renderizado dinámico en el momento de la solicitud. 
- `searchParams` (**parámetros de consulta**): El uso de esta propiedad en las `props` de una página habilitará la página para el renderizado dinámico en el momento de la solicitud.
- `cookies()` (**cookies**):  al usarse en un componente de servidor optará por toda la ruta hacia el renderizado dinámico en el momento de la solicitud.
- `headers()` (**cabeceras**): al usarse en un componente de servidor optará por toda la ruta hacia el renderizado dinámico en el momento de la solicitud.


> **NOTA:** A partir de NextJS 15, deberemos hacer uso asíncrono de las características anteriores.
>
> ```js
> // Ejemplo
> import { cookies, headers } from 'next/headers'
>
> async function Page ( { params, searchParams }) {
>    const { id, slug } = await params
>    const { query, sort } = await searchParams
>
>    const cookieStore = await cookies()
>    const cabeceras = await headers()
>
>    // ...
> }
>
> export default Page
> ```


**Referencia:**

- https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-apis



# 3. Parámetros de URL


![anatomía de una url](assets/anatomy-of-url.png)

Los parámetros de URL o **`URL Parameters`** son partes de la URL en las cuales los valores que aparecen pueden variar de una petición a otra, aunque la estructura de la URL se mantiene.

En las páginas podemos acceder a los 2 tipos que existen:

- **Parámetros de ruta** `Path Parameters`
- **Parámetros de consulta** `Query Parameters` o `Query Strings` 

## Parámetros de ruta

![params folders](assets/params-folders.png)

![params view](assets/params-view.png)

## Parámetros de consulta

![searchparams view](assets/searchparams-view.png)



**Ejemplo**

Si tenemos la página `src/app/products/[store]/[category]/page.js` con el código siguiente:


```js
export default async function page({ params, searchParams }) {

    const { store, category } = await params    // parámetros de ruta
    const { sort, skip } = await searchParams   // parámetros de consulta

    console.log( store, category, sort, skip ) 

    // ...
}
```

Al acceder a la URL:

**`http://localhost:3000/products/bristol/books?sort=author&skip=1`**


Producirá la siguiente salida:

```
bristol books author 1
``` 



## 3.1. Parámetros de ruta vs Parámetros de consulta.

Los parámetros de ruta y los parámetros de consulta transportan información al servidor a través de la URL. Ambos se utilizan para el mismo propósito. Pero tienen algunas diferencias.

- Los parámetros de ruta, debes colocarlos individualmente dentro de la ruta y son obligatorios.
- Sólo puedes indicar los parámetros de ruta especificados en la URL y en el mismo orden estipulado.
- Los parámetros de consulta no modifican la ruta, debes agregarlos al final de la URL y son opcionales. 
- Puedes indicar tantos parámetros de consulta, y en el orden que quieras, después de la ruta.


Es posible expresar una URL dinámica tanto de una forma como de la otra.

![parámetros de url](assets/url-parameters.png)


Aunque, a la hora de decidir si usar parámetros de ruta o parámetros de consulta, se siguen los siguientes convenios:

- Los parámetros de ruta nos proporcionan una URL más limpia.
- **Usamos parámetros de ruta si dicha información debe ir siempre en la URL.**
- **Usamos parámetros de consulta si dicha información es opcional, como información de filtrado o búsqueda.**



# 5. Cookies

Una cookie es un fichero de datos que una página web le envía a tu ordenador o móvil cuando la visitas. 

Las cookies suelen utilizarse principalmente para dos finalidades principales: **recordar accesos** y **conocer hábitos de navegación**. Las cookies hacen que las páginas web puedan identificar tu ordenador, y por lo tanto, si vuelves a entrar a ellas podrán recordar quién eres y qué has hecho antes dentro de ellas.

Gracias a las cookies la página web podrá recordar que eres tú, y por lo tanto podrá permitirte seguir en el perfil con el que iniciases sesión sin tener que volver a escribir tus credenciales.

Y no sólo para iniciar sesión. Imagínate que entras en Amazon y colocas muchos archivos en tu cesta de la compra sin tener una cuenta, pero luego te vas. Entonces, cuando vuelvas a entrar, gracias a tu IP y los otros identificadores que miran las cookies, Amazon sabrá quién eres y qué hiciste antes, y muy posiblemente todavía podrá recordar lo que tenías en la cesta de la compra para que no tengas que volver a meterlo.

## 5.1. Tipos de cookies

- **Cookies persistentes**: pueden llegar a almacenarse en el dispositivo del cliente durante meses o años. A menudo, la única manera de impedirlo es haciendo un borrado manual. Es importante que lo hagas sobre todo cuando uses un ordenador público. 
- **Cookies de sesión**: siempre se borran cuando finalizas la sesión en un sitio de Internet. Lo normal es que esto suceda de forma automática cuando cierras el navegador. También existe la posibilidad de indicar un tiempo de expiración usando la propiedad `expires`, o usando la propiedad `maxAge`. 

> **NOTA:** A partir de NextJS 15, el manejo de cookies se realiza de forma asíncrona. Por tanto deberemos usar `await cookies()

A continuación se muestra como trabjar con cookies desde NextJS.

## 5.2. Generar Cookies 

**`const cookieStore = await cookies()`**  
**`cookieStore.set(name, value, options)`**
**`cookieStore.set( { name, value, /* options */ } )`**

> **IMPORTANTE:** 
>
> Sólo es posible generar cookies en un `Server Action` o un `Route Handler`.
> HTTP no permite generar cookies después del comienzo de la respuesta.

```javascript
import { cookies } from 'next/headers'

const oneDay = 1000 * 60 * 60 * 24  // ms

async function setCookie( name ) {
  const cookieStore = await cookies()

  // Ejemplos
  cookieStore.set( name, 'jose')
  cookieStore.set( name, JSON.stringify({ id: 1, user: "Pepe", loginDate: new Date() }))
  cookieStore.set( name, 'jose', { httpOnly: true, secure: true })
  cookieStore.set({ name: name, value: 'jose', httpOnly: true, secure: true })
  cookieStore.set({
    name: name,
    value: 'jose', 
    httpOnly: true,
    path: '/',
    expires: Date.now() + oneDay 
    })

}
```

> **NOTA:** Para crear una cookie de sesión que se elimine al cerrar la pestaña del navegador debes omitir la opción `expires`. 


## 5.3. Leer Cookies 

**`const cookieStore = await cookies()`**  
**`cookieStore.get(name)`**

```javascript
import { cookies } from 'next/headers'

export async function getCookie(name) {
    const cookieStore = await cookies()

    // Leemos cookie
    const cookie = cookieStore.get( name )?.value

    return cookie
}
```


## 5.4. Eliminar Cookies

**`const cookieStore = await cookies()`**  
**`cookieStore.delete(name)`**

> **IMPORTANTE:** 
>
> Sólo es posible eliminar cookies en un `Server Action` o un `Route Handler`.

```javascript
import { cookies } from 'next/headers'
 
async function deleteCookie( name ) {
  const cookieStore = await cookies()
  cookieStore.delete(name)

  // Otras formas de eliminar una cookie
  cookieStore.set( { name, "", expires: new Date(0) } );
  cookieStore.set( { name, "", maxAge: 0 } );
}
```

**Ejemplo práctico**

A continuación tienes el código fuente para trabajar los conceptos anteriores.

- [Gestión de cookies y sesión](https://github.com/jamj2000/nxsession)

En el proyecto anterior también se hace uso de `middleware`. Consulta el apartado siguiente.

    
**Referencias**: 

- [Documentación de NextJS](https://nextjs.org/docs/app/api-reference/functions/cookies)


# 6. Middleware



# 7. ANEXO: Parámetros de ruta y consulta en página de cliente

También es posible obtener los parámetros de ruta y los de consulta en el lado cliente. Para ello deberemos usar los hooks **`useParams`** y **`useSearchParams`**. También disponemos del hook `usePathname`, que nos devuelve la ruta (incluyento los parámetros de ruta, si existen) 

Por ejemplo, si tenemos la página `src/app/product/[name]/page.js` con el siguiente código:

```js
'use client'
import { usePathname, useParams, useSearchParams } from 'next/navigation';

const Page = () => {
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

export default Page
```

y el usuario visita la URL `http://localhost:3000/product/laptop?provider=HP&screen=15`, entonces obtendrá el siguiente resultado

```
Ruta: /product/laptop
Parámetro de ruta: name -> laptop
Parámetro de consulta: provider -> HP
Parámetro de consulta: screen -> 15
```

**Referencias**:

- https://nextjs.org/docs/app/api-reference/functions/use-params
- https://nextjs.org/docs/app/api-reference/functions/use-search-params
 


# 8. Referencias

- [Listado de APIs públicas](https://publicapis.dev)

