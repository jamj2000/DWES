> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 5: Generación dinámica de páginas Web  <!-- omit in toc -->
> SSG, SERVER ACTIONS, FORMULARIOS 


- [1. Introducción](#1-introducción)
- [2. SSG](#2-ssg)
- [3. Server Actions](#3-server-actions)
  - [3.1. Crear acciones del servidor](#31-crear-acciones-del-servidor)
  - [3.2. Ejecutar acciones del servidor](#32-ejecutar-acciones-del-servidor)
  - [3.3. ¿Qué hace la acción del servidor al finalizar?](#33-qué-hace-la-acción-del-servidor-al-finalizar)
- [4. Formularios](#4-formularios)
  - [4.1. useFormStatus](#41-useformstatus)
  - [4.2. useFormState](#42-useformstate)
  - [4.3. Usando un wrapper en lugar de useFormState](#43-usando-un-wrapper-en-lugar-de-useformstate)
  - [4.4. Varias acciones dentro de un formulario](#44-varias-acciones-dentro-de-un-formulario)
- [5. Validación de datos](#5-validación-de-datos)
  - [5.1. Validación en el cliente](#51-validación-en-el-cliente)
  - [5.2. Validación en el servidor](#52-validación-en-el-servidor)
    - [5.2.1. Ataques frecuentes](#521-ataques-frecuentes)
    - [5.2.2. Sea paranoico: nunca confíe en sus usuarios](#522-sea-paranoico-nunca-confíe-en-sus-usuarios)
    - [5.2.3. Resumen](#523-resumen)
- [6. Referencias](#6-referencias)




--- 

# 1. Introducción

El envío de información por parte del usuario al servidor se realiza a través de formularios. Por tanto su correcto manejo es de gran importancia.

En este tema veremos, principalmente, como trabajar con formularios en NextJS, lo cual requiere de un servidor que sea capaz de procesar los datos enviados desde ellos. Podemos hablar de proceamiento en el servidor, muchas veces también conocido como generación dinámica de páginas, en el caso que se devuelva al usuario una página de respuesta.

Como comparativa para constrastar, también incluimos en este tema la técnica `SSG`, que es lo contrario de la generación dinámica de páginas. Es la generación estática de páginas durante el despliegue o construcción de la aplicación. Después de generadas las páginas, el servidor no necesitará realizar procesamiento alguno y por tanto su función se limitará a servir contenido estático, lo cual aumenta el rendimiento y requiere de servidores más simples y menos costosos.


# 2. SSG

**Static Site Generat{ion,or,ed}**

Los generadores de sitios estáticos (SSG) son motores que utilizan archivos de entrada de texto (como Markdown , reStructuredText y AsciiDoc ) para generar páginas web estáticas. Los sitios estáticos generados por generadores de sitios estáticos no requieren un backend después de la generación del sitio, lo que los convierte en ciudadanos de primera clase en las redes de entrega de contenido (CDN). Algunos de los generadores de sitios estáticos más populares son:

Framework  | Lenguaje
-----------|----------
Jekyll     | Ruby
Hugo       | Go
Gatsby     | Javascript
Next.js    | Javascript
Astro      | Javascript

Una lista exhaustiva puede encontrarse en [jamjstack.org](https://jamstack.org/generators/)

**Los SSG suelen ser para contenido informativo que rara vez cambia**, como páginas de productos, sitios web de noticias, documentación (software), manuales y blogs.


**Ejemplo**

La estructura de carpetas del proyecto es la siguiente:

```sh
.
├── jsconfig.json
├── next.config.js
├── package.json
├── package-lock.json
├── posts
│   ├── markdown.md
│   ├── pre-rendering.md
│   └── ssg-ssr.md
├── public
│   ├── avatar.png
│   ├── next.svg
│   └── vercel.svg
├── README.md
└── src
    ├── app
    │   ├── about
    │   │   └── page.js
    │   ├── blog
    │   │   ├── layout.js
    │   │   ├── page.js
    │   │   └── [slug]
    │   │       ├── error.js
    │   │       └── page.js
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.js
    │   ├── not-found.js
    │   └── page.js
    └── components
        ├── getPosts.js
        └── PostPreview.js
```

Para convertir rutas, que en un principio son dinámicas (creadas mediante parámetros de ruta), necesitamos indicar qué rutas estaran finalmente disponibles. Para ello usamos **`generateStaticParams()`** (ver archivo `src/app/blog/[slug]/page.js`). Esta función permite generar de forma estática esas rutas durante el proceso de construcción (build time).

![SSG Blog build](assets/ssg-blog-build.png)

Un aspecto muy recomendable es disponer de los siguientes archivos:

- `not-found.js`
- `error.js`

En este ejemplo, se mostrará `No encontrado` cuando el usuario acceda a rutas distintas de las siguientes:

- ✅ / 
- ✅ /about
- ✅ /blog

Por ejemplo, rutas que mostrarán `No encontrado` son:

- ❌ /hola
- ❌ /acerca
- ❌ /posts

Se mostrará `Error` cuando el usario acceda a rutas distintas de las siguientes:

- ✅ /blog/markdown
- ✅ /blog/ssg-ssr
- ✅ /blog/pre-rendering

Por ejemplo, rutas que provocaran `Error` son:

- ❌ /blog/este-post-no-existe
- ❌ /blog/este-tampoco
  
**Enlaces**

- [Código fuente](https://github.com/jamj2000/nxblog)
- [Demo](https://jamblog.vercel.app/)


**Ejemplo 2**

En este ejemplo, nos ahorramos tener que utilizar `generateStaticParams()`. 

Para ello hacemos uso de [`MDX`](https://mdxjs.com/). Existe un tutorial en [dev.to](https://dev.to/mikeesto/next-js-mdx-w-code-highlighting-16fi)

La estructura de carpetas es la siguiente:

```
.
├── jsconfig.json
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── public
│   ├── next.svg
│   └── vercel.svg
├── README.md
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── mdx
│   │   │   └── page.mdx
│   │   └── page.js
│   └── mdx-components.tsx
└── tsconfig.json
```

**Enlaces**

- [Código fuente](https://github.com/jamj2000/nxmdx)
- [Demo](https://nxmdx.vercel.app/mdx)

# 3. Server Actions

Las acciones de servidor son funciones que serán ejecutadas en el servidor. Fueron introducidas en NextJS 13. 

**Se usan habitualmente para procesar, en el lado servidor, datos procedentes de un formulario.**

## 3.1. Crear acciones del servidor

Personalmente recomiendo, para mejor organización y con fin a obtener un código más legible, el colocar todas las `server actions` en un archivo o archivos separados. Un archivo puede contener varias acciones del servidor.

Al principio del archivo, debe colocarse la directiva `use server`, que evitará que dicho código sea enviado al cliente, lo cual resultaría en un problema de seguridad además de producir un fallo del funcionamiento esperado.

Una buena práctica es organizar los archivos de forma similar a la siguiente:

```
src
├── app
│   ├── dashboard
│   │   └── page.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components
│   ├── Login.jsx
│   └── Logout.jsx
└── lib
    ├── actions.js
    └── database.js

```

Debemos tener en cuenta que la finalidad de los `server actions` es ejecutar código en el servidor. Esto nos permite:

- Realizar algún tipo de procesamiento de datos del lado servidor.
- Acceder a bases de datos del lado servidor.
- Procesar datos enviados desde el cliente mediante un formulario.


**Ejemplo 1**

```js
// Archivo /lib/actions.js
'use server'

export function testData(formData) {
    const nombre = formData.get('nombre')
    const apellidos = formData.get('apellidos')

    // Este mensaje se mostrará en la consola del servidor.
    console.log(nombre, apellidos)
}

export async function uploadAvatar(formData) {
    const avatar = formData.get('avatar')
    
    // convertimos a array de bytes

    try {
        // guardamos en el servidor
        return { type: 'success', message: 'Datos guardados'}
    } catch (error) {
        return { type: 'error', message: error.message}
    }
}
```

**Ejemplo 2**

```js
'use server'

export async function login(formData) {
    const email = await formData.get('email')
    const password = await formData.get('password')

    // validamos datos de usuario

    if  ( /* usuario valido */ ) {
        // redirigimos al dashboard del usuario    
    }
    else {
        // redirigimos a página de inicio
    }
}


export async function logout() {
    // cerramos sesión
    // redirigimos a página de inicio
}
```

> **NOTA**:
>
> El `server action` recibe un argumento, habitualmente llamado `formData` con la información que ha recogido el formulario en el cliente. 
> Para acceder a la información de cada campo del formulario hacemos:
>
> `formData.get(nombre-del-campo)`
>
> Siendo *nombre-del-campo* el que aparece en el atributo `name` del input del formulario

## 3.2. Ejecutar acciones del servidor

Para invocar a una acción del servidor desde un formulario bastará con indicarlo con el atributo `action` del elemento `form`.

Por ejemplo, `<form action={login}>`. Esto invocará a la función (server action) con nombre login cuando pulsemos en el botón de submit.


```js
import { login } from '@/lib/actions'

function Login() {
    return (
        <form action={login}>
            <input type="text" name="email" placeholder="Introduce tu email" />
            <input type="password" name="password" placeholder="Introduce tu contraseña" />
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login
```

## 3.3. ¿Qué hace la acción del servidor al finalizar?

Básicamente, el `server action` al finalizar puede realizar alguna de las 3 operaciones siguientes:

- **Devolver un mensaje** de confirmación o de error, usando **`return`**
- **Redirigir a otra página**, p. ej. tras validar un usuario, usando **`redirect`**
- **Actualizar el contenido de una página**, usando **`revalidatePath`**.  

Las 2 últimas operaciones no son excluyentes entre sí.

**Ejemplo: devolver un mensaje**

```js
export async function uploadAvatar(formData) {
    const avatar = formData.get('avatar')
    
    const buffer = await avatar.arrayBuffer()
    const bytes = new Uint8Array(buffer)

    try {
        fs.writeFileSync('public/' + avatar.name, bytes, 'binary')
        return { type: 'success', message: 'Datos guardados'}
    } catch (error) {
        return { type: 'error', message: error.message}
    }
}
```


**Ejemplo: redirigir y/o actualizar página**
```js
'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { users } from '@/lib/users'

export async function login(formData) {
    const email = await formData.get('email')
    const password = await formData.get('password')

    const encontrado = users.filter((u) => (u.email === email && u.password === password))

    if (encontrado.length > 0) {
        cookies().set('usuario',  email) 
        revalidatePath('/dashboard');
        redirect('/dashboard')
    }
    else {
        redirect('/')
    }
}


export async function logout() {
    cookies().delete('usuario')

    redirect('/')
}
```

> **NOTA**: 
>
> - `redirect` se importa desde el paquete `next/navigation`
> - `revalidatePath` se importa desde el paquete `next/cache`

> **NOTA**:
>
> NextJS hace uso de una caché de contenido, por ello para volver a actualizar el contenido de una página, actualizando además la caché, necesitamos la función `revalidatePath`.


# 4. Formularios

NextJS tiene 2 funciones para mejorar la experiencia con formularios:

- Mostrar estados de carga en el cliente con `useFormStatus()`
- Capturar y mostrar errores del servidor con `useFormState()`

> **IMPORTANTE**: **Componentes del lado cliente**
>
> En React, y en NextJS, todas las funciones que comienzan por `use` se consideran `hooks` y deben ser ejecutadas en el cliente. También es necesario usar componentes del cliente si queremos hacer uso de eventos como onclick, onchange, ...

Supongamos que disponemos del siguiente `server action`:

**/app/actions.js**
```js                                                        
'use server'

export async function handle(formData) {
    const nombre = formData.get('nombre')
    const apellidos = formData.get('apellidos')
    
    // ...
 
}
```


## 4.1. useFormStatus

Este *hook* nos permite deshabilitar el botón de submit mientras el formulario se está procesando en el servidor. Esto evita que el usuario siga pulsando dicho botón para evitar sobrecargar de peticiones al servidor.


**/app/submitButton.js**

```js
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Enviando...' : "Enviar"}
    </button>
  )
}
```  


## 4.2. useFormState

Este *hook* permite al formulario recibir el mensaje generado por el `server action` tras su ejecución, y poder dar retroalimentación al usuario.

Esta técnica es la que aparece en la mayoría de tutoriales y documentación. Voy a pasar a exponerla para que puedas entienda su funcionamiento y la forma de aplicarla. Aunque yo personalmente considero que es muy engorrosa y que es bastante mejorable.

La documentación puede consultarse en https://react.dev/reference/react-dom/hooks/useFormState

**/app/formulario.js**
```js
'use client'
import { SubmitButton } from '@/app/submitButton'
import { handle } from '@/app/actions'
import { useFormState } from 'react-dom';


export function Formulario() {
    // El server action real es handle
    const [respuesta, formAction] = useFormState(handle, null);

    return (
        <form action={formAction}>
            <input type="text" required name="nombre" placeholder="Introduce tu nombre" />
            <input type="text" required name="apellidos" placeholder="Introduce tus apellidos" />
            <label htmlFor="avatar">
                Selecciona un avatar para enviar al servidor
            </label>
            <input type="file" required name="avatar" accept="image/*" />
            <SubmitButton />
            {respuesta?.message}
        </form>
    )
}
```
Un inconveniente de esta técnica es que debemos modificar el `server action` para que reciba 2 argumentos. Quedaría así:

**/app/actions.js**

```js                                                        
'use server'

export async function handle(prevState, formData) {
    const nombre = formData.get('nombre')
    const apellidos = formData.get('apellidos')
    
    // ...
 
}
```

## 4.3. Usando un wrapper en lugar de useFormState

Una técnica que considero más elegante que la anterior es usar un *wrapper* para envolver el `server action`. Esto nos permitirá realizar operaciones en el cliente, tanto antes como después de invocar la acción del servidor.

Como ventaja tiene que es más legible y que no tenemos que modificar el `server action` para recibir 2 argumentos. Además no rompe nada en NextJS. Simplemente estamos haciendo uso de funcionalidades que proporciona Javascript.


**/app/formulario.js**
```js
'use client'
import { SubmitButton } from '@/app/submitButton'
import { handle } from '@/app/actions'
import { toast } from 'react-hot-toast';


export function Formulario() {
    async function wrapper (data) {
        const {type, message} = await handle(data);
        if (type == 'success') toast.success(message)
        if (type == 'error') toast.error(message)
    }

    return (
        <form action={wrapper}>
            <input type="text" required name="nombre" placeholder="Introduce tu nombre" />
            <input type="text" required name="apellidos" placeholder="Introduce tus apellidos" />
            <label htmlFor="avatar">
                Selecciona un avatar para enviar al servidor
            </label>
            <input type="file" required name="avatar" accept="image/*" />
            <SubmitButton />
        </form>
    )
}
```

Si usamos esta técnica, no necesitamos modificar el `server action`, quedando éste de la siguiente manera:

**/app/actions.js**
```js                                                        
'use server'

export async function handle(formData) {
    const nombre = formData.get('nombre')
    const apellidos = formData.get('apellidos')
    
    // ...
 
}
```


[Código fuente con ejemplo completo](https://github.com/jamj2000/nxform)


## 4.4. Varias acciones dentro de un formulario

Quizás no mucha gente sepa que, en HTML, los `input` y `button` pueden tener un atributo [**`formAction`**](https://www.w3schools.com/tags/att_formaction.asp) . Con ello, dentro de un formulario podemos hacer llamadas a distintas acciones en el servidor.

NextJS, emplea una técnica similar, como se muestra en el siguiente código JSX:

```html
       <form key={user.id} style={{ 'padding': '30px', 'border': 'solid 1px gray', 'marginTop': '20px' }}>
          <input type='hidden' name='id' defaultValue={user.id}></input>
          <label htmlFor='nombre'>Usuario</label>
          <input type='text' id='nombre' name='nombre' defaultValue={user.nombre}></input>
          <label htmlFor='edad'>Edad</label>
          <input type='text' id='edad' name='edad' defaultValue={user.edad}></input>
          <button formAction={userUpdate}>Actualizar</button>
          <button formAction={userDelete}>Eliminar</button>
        </form>
```

Esto es muy útil si disponemos de un formulario con datos, por ejemplo de un usuario, y queremos realizar distintas acciones: actualizar, eliminar, ...


[Código fuente con ejemplo completo](https://github.com/jamj2000/nxfactions)


#  5. Validación de datos

La validación de datos es el proceso de garantizar que la entrada del usuario sea limpia, correcta y útil.

Las tareas de validación típicas son:

- ¿El usuario ha completado todos los campos obligatorios?
- ¿Ha introducido el usuario una fecha válida?
- ¿El usuario ha ingresado texto en un campo numérico?

En la mayoría de los casos, el propósito de la validación de datos es garantizar la entrada correcta del usuario.

La validación puede definirse mediante muchos métodos diferentes e implementarse de muchas maneras diferentes.

La **validación del lado del cliente** la realiza un navegador web, antes de enviar la entrada a un servidor web.

La **validación del lado del servidor** la realiza un servidor web, después de que la entrada se haya enviado al servidor.


## 5.1. Validación en el cliente

HTML5 introdujo un nuevo concepto de validación HTML llamado validación de restricciones .

La validación de restricciones HTML se basa en:

- Atributos de entrada HTML de validación de restricciones
- Pseudo selectores CSS de validación de restricciones
- Propiedades y métodos DOM de validación de restricciones


**Atributos HTML**

Atributo     | Descripción
-------------|-------------------------
`disabled`   | el elemento de entrada debe estar deshabilitado
`max`        | el valor máximo de un elemento de entrada
`min`        | el valor mínimo de un elemento de entrada
`pattern`    | el patrón de valor de un elemento de entrada
`required`   | el campo de entrada requiere un valor de entrada
`type`       | el tipo de un elemento de entrada


**Pseudoselectores CSS**

Selector     | Descripción
-------------|-------------------------
`:disabled`  | Selecciona elementos de entrada con el atributo "disabled" 
`:invalid`   | Selecciona elementos de entrada con valores no válido
`:optional`  | Selecciona elementos de entrada sin ningún atributo "required" 
`:required`  | Selecciona elementos de entrada con el atributo "required"
`:valid`     | Selecciona elementos de entrada con valores válidos.


## 5.2. Validación en el servidor

> **ADVERTENCIA**: nunca confíe en los datos pasados ​​a su servidor desde el cliente. Incluso si su formulario se valida correctamente y evita entradas con formato incorrecto en el lado del cliente, un usuario malintencionado aún puede alterar la solicitud de red.

Cada vez que envía datos a un servidor, debe considerar la seguridad. Los formularios HTML son, con diferencia, los vectores de ataque a servidores más comunes (lugares donde pueden ocurrir ataques). Los problemas nunca provienen de los formularios HTML en sí, sino de cómo el servidor maneja los datos.

### 5.2.1. Ataques frecuentes

En [este artículo](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security) se analiza en detalle varios ataques comunes y posibles defensas contra ellos. Es muy recomendable su lectura. Los ataques más conocidos son los siguientes:

**1. Cross-Site Scripting (XSS)**:

XSS es un término utilizado para describir una clase de ataques que permiten a un atacante inyectar scripts del lado del cliente a través del sitio web en los navegadores de otros usuarios. 

Históricamente, las vulnerabilidades XSS han sido más comunes que cualquier otro tipo de amenaza a la seguridad.

La mejor defensa contra las vulnerabilidades XSS es eliminar o deshabilitar cualquier marcado que potencialmente pueda contener instrucciones para ejecutar el código. Para HTML, esto incluye elementos como `<script>`, `<object>`, `<embed>` y `<link>`.

El proceso de modificar los datos del usuario para que no puedan usarse para ejecutar scripts o afectar la ejecución del código del servidor se conoce como **desinfección de entrada** (en inglés se conoce como **`sanitized`**). Muchos frameworks desinfectan automáticamente la entrada del usuario desde formularios HTML de forma predeterminada.

**2. SQL injection**

Las vulnerabilidades de inyección SQL permiten a usuarios malintencionados ejecutar código SQL arbitrario en una base de datos, lo que permite acceder, modificar o eliminar datos independientemente de los permisos del usuario.
  
**3. Cross-Site Request Forgery (CSRF)**

Los ataques CSRF permiten a un usuario malintencionado ejecutar acciones utilizando las credenciales de otro usuario sin el conocimiento o consentimiento de ese usuario.


### 5.2.2. Sea paranoico: nunca confíe en sus usuarios

Entonces, ¿cómo se lucha contra estas amenazas? Este es un tema que va mucho más allá de esta guía, pero hay algunas reglas a tener en cuenta. La regla más importante es: nunca confíes en tus usuarios, incluido tú mismo; Incluso un usuario de confianza podría haber sido secuestrado.

Todos los datos que llegan a su servidor deben ser verificados y desinfectados (en inglés se conoce como `sanitized`). Siempre. Sin excepción.

- **Escapa de personajes potencialmente peligrosos**. Los caracteres específicos con los que debes tener cuidado varían según el contexto en el que se utilizan los datos y la plataforma del servidor que empleas, pero todos los lenguajes del lado del servidor tienen funciones para esto. Lo que hay que tener en cuenta son las secuencias de caracteres que parecen código ejecutable (como comandos JavaScript o SQL).
- **Limite la cantidad de datos entrantes para permitir solo lo necesario**.
- **Archivos subidos a la zona de pruebas**. Guárdelos en un servidor diferente y permita el acceso al archivo sólo a través de un subdominio diferente o, mejor aún, a través de un dominio completamente diferente.
Debería poder evitar muchos o la mayoría de los problemas si sigue estas tres reglas, pero siempre es una buena idea que un tercero competente realice una revisión de seguridad. No asuma que ha visto todos los problemas posibles.

### 5.2.3. Resumen

Como mencionamos anteriormente, enviar datos de formularios es fácil, pero proteger una aplicación puede ser complicado. Solo recuerda que un desarrollador front-end no es quien debe definir el modelo de seguridad de los datos. Es posible realizar una validación del formulario del lado del cliente, pero el servidor no puede confiar en esta validación porque no tiene forma de saber realmente qué sucedió realmente en el lado del cliente.



# 6. Referencias

- [MDN: Envío y rececpción de datos de formulario (en inglés)](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data)
- [W3Schools: Atributo formaction (en inglés)](https://www.w3schools.com/tags/att_formaction.asp)
- [W3Schools: Validación de formularios (en inglés)](https://www.w3schools.com/js/js_validation.asp)
- [MDN: Validación de formularios (en inglés) ](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [MDN: Seguridad en el lado servidor (en inglés)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)
