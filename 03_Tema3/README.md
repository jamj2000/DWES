> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 3: CONTENIDO ESTÁTICO <!-- omit in toc -->
> Programación basada en lenguajes de marcas con código embebido  
> App Router, JSX, Tailwind

**[`PROYECTOS DE EJEMPLO`](PROYECTOS.md)**

<img src="assets/nextdotjs.svg" width="80" height="80">

---
- [1. Introducción a NextJS](#1-introducción-a-nextjs)
  - [1.1. Creación de un proyecto](#11-creación-de-un-proyecto)
  - [1.2. Carpetas y archivos del proyecto](#12-carpetas-y-archivos-del-proyecto)
- [2. JSX](#2-jsx)
  - [2.1. Valores, constantes y variables](#21-valores-constantes-y-variables)
  - [2.2. Estructuras de iteración y de condición](#22-estructuras-de-iteración-y-de-condición)
    - [2.2.1. Estructura de iteración](#221-estructura-de-iteración)
    - [2.2.2. Estructuras de condición](#222-estructuras-de-condición)
  - [2.3. Propiedades](#23-propiedades)
    - [2.3.1. Propiedades de un layout](#231-propiedades-de-un-layout)
    - [2.3.2. Propiedades de una paǵina](#232-propiedades-de-una-paǵina)
    - [2.3.3. Propiedades de un componente](#233-propiedades-de-un-componente)
    - [2.3.4. Resumen](#234-resumen)
  - [2.4. Aplicar estilos](#24-aplicar-estilos)
- [3. Componentes](#3-componentes)
  - [3.1. Componentes del Servidor](#31-componentes-del-servidor)
  - [3.2. Componentes del Cliente](#32-componentes-del-cliente)
  - [3.3. Comparativa. Cuándo usar cada tipo](#33-comparativa-cuándo-usar-cada-tipo)
  - [3.4. Componentes proporcionados por React](#34-componentes-proporcionados-por-react)
  - [3.5. Componentes proporcionados por NextJS](#35-componentes-proporcionados-por-nextjs)
  - [3.6. Componentes proporcionados por terceros](#36-componentes-proporcionados-por-terceros)
    - [3.6.1. Iconos](#361-iconos)
    - [3.6.2. Spinners](#362-spinners)
    - [3.6.3. Toast](#363-toast)
    - [3.6.4. UI](#364-ui)
- [4. App Router](#4-app-router)
  - [4.1. Segmentos de ruta](#41-segmentos-de-ruta)
  - [4.2. Creando rutas](#42-creando-rutas)
  - [4.3. Organización del proyecto](#43-organización-del-proyecto)
- [5. Referencias](#5-referencias)






---


# 1. Introducción a NextJS

Next es un **framework fullstack JavaScript**, que emplea **React** para crear componentes. Y ya no solo componentes de frontend. Gracias a los "**React Server Components (RSC)**" podemos tener componentes que sólo se ejecuten en un entorno de servidor o backend.
Con Next hacemos aplicaciones **Server Side Rendering (SSR)**, y con los RSC lo que tenemos es Streaming-SSR, una evolución del mismo que nos permite mezclar lo mejor de muchos "mundos".


> **IMPORTANTE**
>
> **Usaremos la versión NextJS 13 o superior.**
>
> En Internet hay mucha documentación de versiones anteriores, pero la forma de trabajar en ellas es ligeramente diferente.


## 1.1. Creación de un proyecto

Para crear proyecto llamado `miapp`

```bash
npx  create-next-app  miapp
```

Nos aparecerá un asistente solicitando las funcionalidades con las que vamos a trabajar. En principio, pulsaremos `Intro` para todo. Se instalarán 3 dependencias: `react`, `react-dom` y `next`.

![create next app](assets/create-next-app.png)

> [!NOTE]
>
> Otra forma de crear una nueva aplicación, evitando el uso del asistente, es la siguiente:
>
> ```sh
> npx create-next-app  --typescript  --eslint  --tailwind  --src-dir  --app   miapp
>```


Para entrar dentro del proyecto

```bash
cd  miapp
```

Para editar el código con VSCode

```bash
code  .
```

## 1.2. Carpetas y archivos del proyecto

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



# 2. JSX

En NextJS, se hace uso de JSX (JavaScript Syntax Extension) en los siguientes elementos:

- Layouts
- Páginas
- Componentes

JSX (JavaScript Syntax Extension y ocasionalmente denominada JavaScript XML) es una extensión de JavaScript que permite la creación de árboles DOM utilizando una sintaxis similar a XML. Creado inicialmente por Facebook para su uso con React, JSX ha sido adoptado por múltiples frameworks.

JSX te permite escribir marcado similar a HTML dentro de un archivo JavaScript, manteniendo la lógica de renderizado y el contenido en el mismo lugar. En ocasiones será deseable añadir un poco de lógica en JavaScript o referenciar una propiedad dinámica dentro del marcado. En esta situación, puedes utilizar llaves en tu JSX para «abrir una ventana» hacia JavaScript.

**Referencias**: 
- https://es.react.dev/learn/writing-markup-with-jsx
- https://es.legacy.reactjs.org/docs/jsx-in-depth.html


El código escrito en JSX requiere conversión con una herramienta como *Babel* antes de que los navegadores web puedan entenderlo. Este procesamiento generalmente se realiza durante un proceso de construcción de software antes de deslplegar la aplicación .

**Ejemplo**:

```javascript
const App = () => {
   return (
     <div>
       {/* Esto es un comentario de JSX */}
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


## 2.1. Valores, constantes y variables

**En JSX podemos insertar valores, constantes y variables** colocándolas entre llaves **`{ }`**. 

Por ejemplo, para valores simples ...

```js
{true}
{42}
{"cadena de texto"}  // en este caso las llaves son opcionales
{'cadena de texto'}  // en este caso las llaves son opcionales
{`cadena de texto`}  
```

## 2.2. Estructuras de iteración y de condición

Todos los frameworks web disponen de algún mecanismo para generar las vistas que enviarán al usuario o cliente web. Para esto lo más habitual es el uso de **plantillas**.

Las plantillas son una especie de HTML al que se le añade:

- estructuras de iteración
- estructuras de condición

Esto es debido a que HTML carece de ellas, y **cuando trabajamos con datos obtenidos de forma dinámica**, es habitual necesitar estas funcionalidades.

Algunos ejemplos de plantillas muy conocidas son:

| Lenguaje | Framework | Plantilla            |
| -------- | --------- | -------------------- |
| PHP      | Symfony   | Twig                 |
| PHP      | Laravel   | Blade                |
| Java     | Spring    | Thymeleaf            |
| Python   | Django    | DTL                  |
| NodeJS   | Express   | Handlebars, EJS, ... |


En React/Next las vistas se generan mediante JSX y las estructuras de iteración y condición se indican mediante el uso de **expresiones**. **Estas expresiones deben aparecer entre llaves {}**.  Son las que aparecen a continuación.


### 2.2.1. Estructura de iteración

Es muy usado el método *array*.**map**, aunque hay otros métodos que pueden usarse como *array*.**filter**.

> [!NOTE]
> 
> Dentro de JSX no se permite el uso de sentencias del tipo for, while, ...


**Método map**

```js
{
  array.map ( (item) => (
    // React.ReactNode 
  ))
}
```

> [!NOTE]
>
> El tipo **[React.ReactNode](https://reactnative.dev/docs/react-node)** es un tipo general para cualquier cosa que se pueda representar: elementos, cadenas, números, fragmentos, nulos, booleanos y arrays que contienen estos tipos.


Ejemplo de método map

```js
{
  people.map(person => (

     <p key={person.id}>
       <b>{person.name}:</b>  {' ' + person.profession + ' '}
     </p>

  ))
}
```

*Por cada persona del array people, mostramos su nombre y profesión.*


> **IMPORTANTE:** 
>
> Cada elemento dentro del método map debe tener una propiedad **key**, que debe ser única.




### 2.2.2. Estructuras de condición

Existen varias expresiones que podemos usar. Las más habituales son:

- Operador ternario  
- Operador &&
- Operador ??
- Operador || (es menos usado)

> [!NOTE] 
> 
> Dentro de JSX no se permite el uso de sentencias del tipo if, switch.


**Operador ternario**

```js
{
  condición 
  ? // React.ReactNode si la condición es truthy
  : // React.ReactNode si la condición es falsy
}
```

Ejemplo de operador ternario

```js
{
  isTaskDone 
    ? <p> {task.name + ' ✅'} </p>
    : <p> {task.name} </p>
}
```

*Si la tarea se ha finalizado mostramos su nombre y un check, sino sólo mostramos su nombre.*


**Operador &&**

```js
{
  condición &&  // React.ReactNode a mostrar si el valor de la condición es truthy
}
```


Ejemplo de operador &&

```js
{
  role === "ADMIN" && <AdminDashboard /> 
}
```
*Si el rol es ADMIN entonces mostramos componente AdminDashboard*



**Operador ??**

```js
{
  condición ??  // React.ReactNode a mostrar si el valor de la condición es nullish
}
```


Ejemplo de operador ??

```js
{
  session ??  <Dashboard />
}
```

*Si session es distinto a null y undefined entonces mostramos componente Dashboard*


**Un ejemplo con estructuras de iteración y de condición**


```js
{
  ciudades &&
    ciudades
        .sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
        .map((ciudad) => (
            <Ciudad key={ciudad.id} ciudad={ciudad} />
        ))
}   
```


## 2.3. Propiedades


### 2.3.1. Propiedades de un layout

Todos los *layouts* deben tener una propiedad **children**, que situaremos dentro del código JSX, justo en el lugar donde queremos que se rendericen las páginas.

```js
function Layout({children}) {
    // ...

    return (
      // JSX
      {children}
      // JSX
    )
}

export default Layout
```

### 2.3.2. Propiedades de una paǵina

Como hemos indicado antes, JSX se usa tanto en layouts, como páginas y componentes. En estos casos es posible el paso de argumentos, llamados también propiedades. 

Las propiedades más importantes que puede recibir una página son **`params`** y **`searchParams`**. A través de ellas podemos acceder a los **parámetros de ruta** y los **parámetros de consulta** correspondientes

La estructura básica de la página es la siguiente:

```js
function Page({ params, searchParams}) {
    // ...

    return (
      // JSX
    )
}

export default Page
```

Para un descripción más detallada de estos parámetros consultar más adelante.


### 2.3.3. Propiedades de un componente

A los componentes también se les puede pasar información mediante las propiedades. A diferencia de las páginas, cuyas propiedades son recurrentes, en los componentes el nombre de las propiedades suele ser muy variado. La única propiedad que tiene un nombre reservado es **`children`** que representa los elementos hijos del componente, es decir los elementos que irán insertados entre la etiqueta de inicio y la etiqueta de cierre.

La estructura básica de la página es la siguiente:

```js
function Component({ children, /* otras propiedades */}) {
    // ...

    return (
      // JSX
    )
}

export default Component
```

En los componentes debemos distinguir 2 aspectos:

1. La **definición** del componente
2. El **uso** del componente


**1. DEFINICIÓN**

En la definición del componente establecemos su funcionalidad y las propiedades que aceptará. En el siguiente ejemplo, el componente *Productos* aceptará 3 **propiedades**: *children*, *productos* y *categoria*. No aceptará ninguna otra propiedad.

```js
function Productos ({ children, productos, categoria }) {
    // ...

    return (
      // JSX
    )
}

export default Productos 
```

Si desarrollamos un poco más el componente anterior, podríamos encontrarnos con código semejante al siguiente:

```js
function Productos ({ children, productos, categoria }) {

    return (
      <div>
          <h1>{categoria}</h1>
          {children}  
          {// recorrer lista de productos
          productos.map ( producto =>
              <p>{producto.name}</p>
              // ...       
          )
          }
      </div>
    )
}

export default Productos 
```



**2. USO**

Una vez definido el componente, podemos usarlo tantas veces como deseemos dentro de páginas o de otros componentes.

Por ejemplo, para hacer uso del componente anterior en una página, podemos encontrar:


```js
import Productos from '@/components/Productos'
import { getProductos } from '@/lib/actions'

async function page() {
    // hacer consulta a la base de datos y obtener productos de la categoría deseada
    const productos = await getProductos()

    return (
      <Productos productos={productos} categoria={'teclados'}>
        <h2>Productos de esta categoría</h2>
        <p> /* ... */ </p>
      </Productos>
    )
}

export default page
```


Observa que hemos usado el componente como si de un elemento HTML se tratara:

```js
<Productos productos={productos} categoria={'teclados'}>
  <h2>Productos de esta categoría</h2>
  <p> /* ... */ </p>
</Productos>
```

Aunque hay 2 pequeñas diferencias:

- En HTML el nombre de las etiquetas suele ir en minúsculas. En los componentes, la primera letra es mayúsculas.
- En HTML las etiquetas tienen atributos. En los componentes se les llama propiedades.


En la etiqueta de inicio `<Productos>` pasamos los valores de las propiedades que acepta el componente. En este caso son las propiedades *productos* y *categoria*.

Los elementos que aparecen entre la etiqueta de inicio `<Productos>` y la etiqueta de cierre `</Productos>` corresponden a la propiedad `children` y se colocarán en la posición en la cual fue definida dicha propiedad.


También podemos encontrar componentes sin elementos insertados `children`, en cuyo caso deberíamos hacer uso de la siguiente manera:

```js
 // IMPORTANTE: Colocar / al final para indicar el cierre del elemento
 <Productos productos={productos} categoria={'teclados'} />
```

Si un componente no tiene propiedades, hacemos uso de él de la siguiente forma:

```js
 // IMPORTANTE: Colocar / al final para indicar el cierre del elemento
 <Productos />
```


### 2.3.4. Resumen


La forma que adquieren las propiedades para *layouts*, *páginas* y *componentes* son las siguientes:

```js
function Layout ( {children} )

function Page ( {params, searchParams} )

function Component ( {children, /* otras propiedades */})
```


## 2.4. Aplicar estilos

Existen múltiples formas de aplicar estilos a JSX. Estas formas no se excluyen entre sí.

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

> [!NOTE]
> 
>  Observa que las **propiedades** se escriben en **camelCase** y el separador es la coma.



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

Existen muchos sitios que proporcionan componentes basados en Tailwind. Algunos de ellos son:

- [Shadcn](https://ui.shadcn.com/)
- [Flowbite](https://flowbite.com/)
- [DaisyUI](https://daisyui.com/)
- [WindUI](https://wind-ui.com/)
- [HyperUI](https://www.hyperui.dev/)

Muchos más recursos relacionados con Tailwind en

- [Awesome Tailwind CSS](https://github.com/aniftyco/awesome-tailwindcss)


# 3. Componentes

Los componentes son uno de los conceptos esenciales de los modernos frameworks de Javascript. Constituyen los cimientos sobre los que construyes interfaces de usuario (UIs por sus siglas en inglés). 

Un componente permite combinar tu marcado HTML, CSS y JavaScript en «componentes» personalizados, elementos reutilizables de UI para tu aplicación.

- Referencia: https://es.react.dev/learn/your-first-component


## 3.1. Componentes del Servidor

NextJS es un framework destinado al desarrollo Fullstack centrado principalmente en el lado servidor. La mayoría de componentes que desarrollaremos serán `Server React Components`.

De forma predeterminada, Next.js usa componentes de servidor. Esto permite implementar automáticamente el renderizado del servidor (`SSR`) sin configuración adicional y optar por utilizar componentes del cliente sólo cuando sea necesario

En Next.js, el trabajo de renderizado se divide por segmentos de ruta para permitir el streaming y el renderizado parcial, y existen tres estrategias de renderizado de servidor diferentes:

- Renderizado estático
- Renderizado dinámico
- Streaming

**Beneficios del renderizado en el servidor**

Hay una serie de beneficios al realizar el trabajo de renderizado en el servidor, que incluyen:

- **Recuperación de datos (fetch)**: los componentes del servidor permiten mover la recuperacón de datos al servidor, más cerca de su fuente de datos. Esto puede mejorar el rendimiento al reducir el tiempo que lleva recuperar los datos necesarios para el renderizado y la cantidad de solicitudes que el cliente debe realizar.
- **Seguridad**: los componentes del servidor permiten mantener datos y lógica confidenciales en el servidor, como tokens y claves API, sin el riesgo de exponerlos al cliente.
- **Almacenamiento en caché**: al renderizar en el servidor, el resultado se puede almacenar en caché y reutilizar en solicitudes posteriores y entre usuarios. Esto puede mejorar el rendimiento y reducir los costos al reducir la cantidad de procesamiento y obtención de datos realizados en cada solicitud.
- **Tamaños de paquetes**: los componentes del servidor le permiten mantener en el servidor grandes dependencias que anteriormente afectarían el tamaño del paquete de JavaScript del cliente. Esto es beneficioso para los usuarios con Internet más lento o dispositivos menos potentes, ya que el cliente no tiene que descargar, analizar ni ejecutar ningún JavaScript para los componentes del servidor.
- **Carga de página inicial y primer renderizado con contenido**: En el servidor, podemos generar HTML para permitir a los usuarios ver la página inmediatamente, sin esperar a que el cliente descargue, analice y ejecute el JavaScript necesario para representar la página.
- **Optimización de motores de búsqueda y capacidad de compartir en redes sociales**: los robots de los motores de búsqueda pueden utilizar el HTML renderizado para indexar sus páginas y los robots de las redes sociales para generar vistas previas de tarjetas sociales para sus páginas.
- **Streaming**: los componentes del servidor le permiten dividir el trabajo de renderizado en partes y transmitirlas al cliente a medida que estén listas. Esto permite al usuario ver partes de la página antes sin tener que esperar a que se represente toda la página en el servidor.


## 3.2. Componentes del Cliente

Los componentes del cliente permiten escribir una interfaz de usuario interactiva que se puede renderizar en el cliente (`CSR: Client Side Rendering`) en el momento de la solicitud. En Next.js, la renderización en el cliente es opcional, lo que significa que debe decidir explícitamente qué componentes React serán renderizados en el cliente.

**Beneficios del renderizado en el cliente**

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


> [!IMPORTANT]
>
> **Deberemos colocar al inicio del archivo la directiva `use cliente`, si un componente o una página contiene alguno de los siguientes elementos:** 
>
> - **eventos (click, change, ...)**
> - **apis del navegador (window, document, navigator, fetch, localStorage, ...)**
> - **funciones de React del lado cliente como `useState`, `useEffect`,...**
>

**Proyecto de ejemplo**

A continuación se muestra un proyecto que hace uso de componentes de cliente.

- [Carrito de compra: código](https://github.com/jamj2000/nxcart)
- [Carrito de compra: demo](https://nxcart.vercel.app)


## 3.3. Comparativa. Cuándo usar cada tipo


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




## 3.4. Componentes proporcionados por React

[React y ReactDOM proporcionan numerosos componentes](https://react.dev/reference/react-dom/components). Algunos de ellos son:

- [form](https://react.dev/reference/react-dom/components/form)
- [select](https://react.dev/reference/react-dom/components/select)
- [input](https://react.dev/reference/react-dom/components/input)
- [progress](https://react.dev/reference/react-dom/components/progress)

## 3.5. Componentes proporcionados por NextJS

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


## 3.6. Componentes proporcionados por terceros

### 3.6.1. Iconos

**Lucide** ( [sitio oficial](https://lucide.dev/) )

```sh
npm  install  lucide-react
```

```js
import {
  Smile,
  ThumbsUp,
  Bold,
  Italic
} from 'lucide-react'


export default function page () {
  return (
    <div className="app">
      <Smile size={64} color='#3e9392' strokeWidth={4} >
    </div>
  )
}
```

**HeroIcons** ( [sitio oficial](https://heroicons.com/) )

```sh
npm  install  @heroicons/react
```


```js
import { BeakerIcon } from '@heroicons/react/24/solid'

export default function MyComponent() {
  return (
    <div>
      <BeakerIcon className="size-6 text-blue-500" />
    </div>
  )
}
```


**Radix UI** ( [sitio oficial](https://www.radix-ui.com/icons) )

```sh
npm  install  @radix-ui/react-icons
```


```js
import { FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons'

function MyComponent () {
  return (
    <div>           
      <FaceIcon />
      <SunIcon />
      <ImageIcon />
    </div>
  )
}
```

**React Icons**  ( [sitio oficial](https://react-icons.github.io/react-icons/) )

Se trata de un **megaconjunto de iconos, el cual incluye muchos subconjuntos, entre los que están los que hemos visto anteriormente**.

![react icons](assets/react-icons.png)


```sh
npm  install  react-icons
```

```js
import { FaBeer } from 'react-icons/fa';

class Question extends React.Component {
  render() {
    return <h3> Lets go for a <FaBeer size='1rem' color='orange' />? </h3>
  }
}
``` 

### 3.6.2. Spinners

**React Spinners** ( [sitio oficial](https://www.davidhu.io/react-spinners/) )

Un *spinner* es algo similar a un icono animado. Se utiliza frecuentemente para indicar al usuario que debe esperar a que finalice una operación que está realizando la aplicación.

Esta biblioteca debe usarse en un componente cliente, puesto que es necesario que admita el estado `loading`.


```sh
npm  install  react-spinners
```

```js
'use client'
import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

const styles = {
  display: "block",
  margin: "0 auto",
};

function Spinner() {
  let [loading, setLoading] = useState(true);

  return (
      <RingLoader
        color={'blue'}
        loading={loading}
        cssOverride={styles}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
}

export default Spinner;
``` 

- Ejemplo y documentación disponibles en: https://www.npmjs.com/package/react-spinners


> [!NOTE]
>
> Otra forma mucho más simple de crear un spinner es usar un icono y aplicar una animación. 
> 
> En el siguiente ejemplo, usamos el icono **`Loader2`** y le aplicamos la clase **`animate-spin`** de Tailwind:
>
> ```js
>"use client";
>
>import { useFormStatus } from "react-dom";
>import { Loader2 } from "lucide-react";
>
>export function SubmitButton() {
>  const { pending } = useFormStatus();
>  return (
>    <>
>      {pending ? (
>        <button disabled>
>          <Loader2 className="size-4 mr-2 animate-spin" /> Submitting...
>        </button>
>      ) : (
>        <button type="submit">Submit Message</button>
>      )}
>    </>
>  );
>}
> ```



> [!TIP]
>
> No todo son cosas desagradables, como esperar que una operación finalice. También tenemos hueco para cosas agradables, que podemos celebrar con **[confetti](https://github.com/alampros/react-confetti#readme)**.
>


### 3.6.3. Toast

Un *toast* es un pequeño mensaje flotante que aparece para informar al usuario de un suceso. Este mensaje desaparece tras un tiempo.

> [!IMPORTANT]
> 
> Para mostrar un toast usamos la función **toast**. Esta función **sólo puede ejecutarse desde un componente cliente**.
>
> Distintas formas de la función:
>
> ```js
> toast('Mensaje')
> toast.success('Mensaje de éxito')
> toast.error('Mensaje de error')
> toast.warning('Mensaje de aviso')
> toast.promise( promesa,
>   {
>    loading: 'Loading',
>    success: 'Got the data',
>    error: 'Error when fetching',
>   })
> ```
>
> Componente cliente de ejemplo:
>
>```js
>'use client'
>
>export default function ClientComponent() {
>  //...
>  toast.success('Mensaje de éxito')
>  //...
>}
>```


**sonner** ( [sitio oficial](https://sonner.emilkowal.ski/) )

```sh
npm  install  sonner
```


> [!IMPORTANT]
> 
> Debemos usar un componente **`Toaster`** en el archivo `src/app/layout.js`. Si no lo hacemos, los toasts no serán visibles al usuario.
>


```js
// src/app/layout.js   
import { Toaster } from "sonner";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {/* ... */}

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
```

> [!TIP]
>
> - La propiedad `richColors` hace que los toasts tengan color.
> - La propiead `position` puede tomar uno de los siguientes valores:
>   - `top-left`
>   - `top-center`
>   - `top-right`
>   - `bottom-left`
>   - `bottom-center`
>   - `bottom-right`


**red-hot-toast** ( [sitio oficial](https://react-hot-toast.com/) )

```sh
npm  install  react-hot-toast
```


> [!IMPORTANT]
> 
> Debemos usar un componente **`Toaster`** en el archivo `src/app/layout.js`. Si no lo hacemos, los toasts no serán visibles al usuario.
>


```js
// src/app/layout.js   
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {/* ... */}

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
```

> [!TIP]
>
> - La propiead `position` puede tomar uno de los siguientes valores:
>   - `top-left`
>   - `top-center`
>   - `top-right`
>   - `bottom-left`
>   - `bottom-center`
>   - `bottom-right`





### 3.6.4. UI

**Shadcn/UI** ( [sitio oficial](https://ui.shadcn.com/) )

Es un *kit* de componentes que nos permite su descarga y personalización. Es uno de los más completos y potentes, pero con una curva de aprendizaje mayor que otras librerías de componentes.

```sh
# Inicialización
npx  shadcn-ui@latest  init
```

```sh
# Instalación de componente
npx  shadcn-ui@latest  add  skeleton
```

```js
// Uso del componente
import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

> [APP ONLINE para generar componentes](https://app.layouts.dev/)



**Fluent UI React** ( [sitio oficial](https://react.fluentui.dev/) )

Biblioteca desarrollada por Microsoft muy completa. Dispone de numerosos componentes, además de iconos y otro tipo de elementos.


```sh
npm  install @fluentui/react-components
```

```js
import * as React from "react";
import { Button } from "@fluentui/react-components";

export const Default = (props) => (
  <Button {...props}>Example</Button>
);
```

> [!TIP]
>
> Fluent UI también dispone de un catálogo de iconos que podemos importar desde el paquete **`@fluentui/react-icons`**
>
>```js
> import { AddCircleFilled, AddCircleRegular, DismissSquareRegular } from '@fluentui/react-icons';
>
>
> function MyComponent () {
>  return (
>    <div>           
>      <DismissSquareRegular />
>      <AddCircleRegular />
>      <AddCircleFilled />
>    </div>
>  )
> }
>```


**HeadlessUI** ( [sitio oficial](https://headlessui.com/) )

Posee una dificultad de uso media, aunque no parece disponer de muchos componentes.

```sh
npm  install  @headlessui/react
```

```js
import { Button } from '@headlessui/react'

export default function Example() {
  return (
    <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
      Save changes
    </Button>
  )
}
```

**WindUI** ( [sitio oficial](https://wind-ui.com/) )

Es la librería de componentes que puede resultar de más fácil uso para principiantes. No es necesario instalar nada. Basta con copiar y pegar desde el sitio oficial.

```js
// Copiado de https://wind-ui.com/components/buttons/
import React from "react"

export default function ButtonRoundedFullBasePrimaryAnimated() {
  return (
    <>
      {/*<!-- Component: Base primary button with animation  --> */}
      <button className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded-full whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
        <span>Animated</span>
        <span className="relative only:-mx-5">
          <svg
            className="w-5 h-5 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            role="graphics-symbol"
            aria-labelledby="title-41 desc-41"
          >
            <title id="title-41">Icon title</title>
            <desc id="desc-41">A more detailed description of the icon</desc>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      </button>
      {/*<!-- End Base primary button with animation  --> */}
    </>
  )
}
```

**DaisyUI**  ( [sitio oficial](https://daisyui.com/) )

Es la librería de componentes muy popular y con un gran número de componentes y posibilidades de personalización pero sin dejar de ser amigable para principiantes. Es similar a la anterior a la hora de su uso: basta con copiar y pegar desde el sitio oficial. Pero hay que realizar una instalación y configuración previa.

```sh
npm  install  daisyui@latest  -D
```


```js
// tailwind.config.js
module.exports = {
  //...
  plugins: [   
    require('daisyui'),
  ],
}
```

```js
export default function Skeleton() {
  return (
    <div className="flex flex-col gap-4 w-52">
       <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
    </div>
  )
}
```

**Aceternety Ui** ( [sitio oficial](https://ui.aceternity.com/) )

Otra librería más de compoenentes basados en Tailwind. En este caso, la [lista de componentes](https://ui.aceternity.com/components) que tenemos a nuestra disposición son estéticamente muy conseguidos e **incluyen efectos y transiciones**. Se parece a la librería anterior puesto que basta con copiar y pegar desde el sitio oficial. Pero también hay que realizar una instalación y configuración previa.

```sh
npm i framer-motion clsx tailwind-merge
```

Dependiendo de los componentes utilizados, puede no ser necesario instalar alguno de los paquetes anteriores, o por el contrario, ser necesario instalar algún paquete adicional.

También es necesario, realizar una configuración en el archivo `tailwind.config.ts`. Consulta las [instrucciones generales](https://ui.aceternity.com/docs/add-utilities) y la documentación de cada componente.  

La forma de usar los componentes, grosso modo, se basa en copiar el código del componente a la carpeta `components`

<details>
<summary>Código fuente de ejemplo</summary>

```js
// components/ui/background-gradient-animation.tsx
"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
    }

    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center]`,
            `animate-first`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-200px)]`,
            `animate-fourth`,
            `opacity-70`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth`,
            `opacity-100`
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};
```
</details>
  
  
Y luego usar dicho componente:


```js
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
 
export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Gradients X Animations
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
}
```

Puedes consultar los siguientes recursos para aprender como hacer uso de algunos de los numerosos componentes disponibles. Se trata de un portfolio con una única página.

- [Vídeo: creación de un Portfolio](https://youtu.be/FTH6Dn3AyIQ?si=PMpHbdk3lMRCFbQz)
- [Código fuente del vídeo anterior](https://github.com/adrianhajdin/portfolio)



# 4. App Router

En la versión 13, Next.js introdujo un nuevo `App Router` construido sobre `React Server Components` , que admite diseños compartidos, enrutamiento anidado, estados de carga, manejo de errores y más.

App Router funciona en un nuevo directorio llamado `app` (en versiones anteriores se usaba `pages`). 

![Terminología](assets/terminology-component-tree.avif)

![Anatomía de URL](assets/terminology-url-anatomy.avif)

**Conceptos**

- **Segmento de URL**: Parte de la ruta de la URL delimitada por barras.
- **Ruta URL**: Parte de la URL que viene después del dominio (compuesta por segmentos).

## 4.1. Segmentos de ruta

Cada carpeta en una ruta representa un segmento de ruta. Cada segmento de ruta se asigna a un segmento correspondiente en una ruta URL.

![Segmentos de ruta](assets/route-segments-to-path-segments.avif)

Dentro de `app`, las subcarpetas definen rutas, pero solo los contenidos devueltos por `page.js` o `route.js` son direccionables públicamente.

Esto significa que los archivos de proyecto se pueden colocar de forma segura dentro de segmentos de ruta en el directorio `app` sin que se puedan enrutar accidentalmente.

![colocación](assets/project-organization-colocation.avif)

- Referencia: https://nextjs.org/docs/app/building-your-application/routing

## 4.2. Creando rutas

Next.js utiliza un enrutador basado en un sistema de archivos donde se utilizan carpetas para definir rutas.

Cada carpeta representa un segmento de ruta que se asigna a un segmento de URL. Para crear una ruta anidada, puede anidar carpetas una dentro de otra.

![Segmentos de ruta a segmentos de ruta](assets/route-segments-to-path-segments.avif)

Se utiliza un archivo especial **`page.js`** para hacer que los segmentos de ruta sean accesibles públicamente.

![Definición de rutas](assets/defining-routes.avif)

En este ejemplo, la ruta URL `/dashboard/analytics` no es accesible públicamente porque no tiene un archivo `page.js` correspondiente. Esta carpeta podría usarse para almacenar componentes, hojas de estilo, imágenes u otros archivos colocados.


## 4.3. Organización del proyecto

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

**Referencias:**

Un muy video donde se explica la estructura de un proyecto en NextJS y los archivos más habituales es el siguiente:

- [Project Structure and File Conventions in NextJs 14](https://youtu.be/i6Fa5Oyr59k?si=Y3IVfA8ZuMV38ndo)


# 5. Referencias

- [Documentación de NextJS](https://nextjs.org/docs)
- [Video: Introduction to Next.js and React](https://youtu.be/h2BcitZPMn4)