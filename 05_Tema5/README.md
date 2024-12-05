> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 5: FORMULARIOS  <!-- omit in toc -->
> Generación dinámica de páginas Web  
> SERVER ACTIONS, FORMULARIOS, IMÁGENES 

**[`PROYECTOS DE EJEMPLO`](PROYECTOS.md)**

<img src="assets/nextdotjs.svg" width="80" height="80">

---

- [1. Introducción](#1-introducción)
- [2. Server Actions](#2-server-actions)
  - [2.1. Crear acciones del servidor](#21-crear-acciones-del-servidor)
  - [2.2. Ejecutar acciones del servidor](#22-ejecutar-acciones-del-servidor)
  - [2.3. ¿Qué hace la acción del servidor al finalizar?](#23-qué-hace-la-acción-del-servidor-al-finalizar)
- [3. Formularios](#3-formularios)
  - [3.1. POST vs GET](#31-post-vs-get)
    - [3.1.1. POST](#311-post)
    - [3.1.2. GET](#312-get)
  - [3.2. Funciones del lado cliente](#32-funciones-del-lado-cliente)
  - [3.3. useFormStatus](#33-useformstatus)
  - [3.4. useFormState](#34-useformstate)
  - [3.5. Usando un wrapper en lugar de useFormState](#35-usando-un-wrapper-en-lugar-de-useformstate)
  - [3.6. useActionState: simplificando lo anterior](#36-useactionstate-simplificando-lo-anterior)
  - [3.7. Varias acciones dentro de un formulario](#37-varias-acciones-dentro-de-un-formulario)
  - [3.8. Consejos](#38-consejos)
    - [3.8.1. Detro de un formulario usa **`button`** únicamente para hacer submit.](#381-detro-de-un-formulario-usa-button-únicamente-para-hacer-submit)
    - [3.8.2. Pasa correctamente los valores a las propiedades en los **`input`**](#382-pasa-correctamente-los-valores-a-las-propiedades-en-los-input)
    - [3.8.3. Usa **`label`** correctamente](#383-usa-label-correctamente)
    - [3.8.4. Usa **`defaultValue`** y **`value`** correctamente](#384-usa-defaultvalue-y-value-correctamente)
    - [3.8.5. Usa **`disabled`** y **`readOnly`** correctamente](#385-usa-disabled-y-readonly-correctamente)
    - [3.8.6. Usa **`select`** correctamente](#386-usa-select-correctamente)
- [4. Validación de datos](#4-validación-de-datos)
  - [4.1. Validación en el cliente](#41-validación-en-el-cliente)
  - [4.2. Validación en el servidor](#42-validación-en-el-servidor)
    - [4.2.1. Ataques frecuentes](#421-ataques-frecuentes)
    - [4.2.2. Sea paranoico: nunca confíe en sus usuarios](#422-sea-paranoico-nunca-confíe-en-sus-usuarios)
    - [4.2.3. Resumen](#423-resumen)
- [5. Casos prácticos avanzados](#5-casos-prácticos-avanzados)
  - [5.1. Panel de gestión de escuela (Parte 1 de 2)](#51-panel-de-gestión-de-escuela-parte-1-de-2)
  - [5.2. Albúm de fotos](#52-albúm-de-fotos)
- [6. Referencias](#6-referencias)





--- 

# 1. Introducción

El envío de información por parte del usuario al servidor se realiza a través de formularios. Por tanto su correcto manejo es de gran importancia.

En este tema veremos, principalmente, como trabajar con formularios en NextJS, lo cual requiere de un servidor que sea capaz de procesar los datos enviados desde ellos. Podemos hablar de proceamiento en el servidor, muchas veces también conocido como generación dinámica de páginas, en el caso que se devuelva al usuario una página de respuesta.

Como comparativa para constrastar, también incluimos en este tema la técnica `SSG`, que es lo contrario de la generación dinámica de páginas. Es la generación estática de páginas durante el despliegue o construcción de la aplicación. Después de generadas las páginas, el servidor no necesitará realizar procesamiento alguno y por tanto su función se limitará a servir contenido estático, lo cual aumenta el rendimiento y requiere de servidores más simples y menos costosos.



# 2. Server Actions

Las acciones de servidor son funciones que serán ejecutadas en el servidor. Fueron introducidas en NextJS 13. 

**Se usan habitualmente para procesar, en el lado servidor, datos procedentes de un formulario.**

## 2.1. Crear acciones del servidor

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

## 2.2. Ejecutar acciones del servidor

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

## 2.3. ¿Qué hace la acción del servidor al finalizar?

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


# 3. Formularios

## 3.1. POST vs GET

La información recogida en un formulario puede enviarse al servidor de 2 maneras distintas:

- **POST** 
- **GET**

### 3.1.1. POST

Cuando usamos el método POST, **la información se envía en el cuerpo de la petición** y no es visible para el usuario. 

**Esta es la forma recomendada en la mayoría de los casos**, por ejemplo:

- Hay campos con información confidencial, como puede ser contraseñas y similar.
- Hay gran cantidad de información a enviar al servidor, como muchos inputs, textareas, ...
- Necesitamos enviar archivos al servidor mediante `input type='file'`.

Es habitual su uso para enviar información de un formulario para su procesamiento en el servidor. Las operaciones que se realizan, normalmente sobre una BD, son:

- **Inserción**
- **Modificación**
- **Eliminación**

Este método también se usa en operaciones de autenticación, como:

- **Registro**
- **Login**
- **Logout**
  

En JSX se escribe de la siguiente forma:

```js
<form  action={...}>

  {/* Elementos del formulario */}

</form>
```

**NOTA**: `action` es una función asíncrona ejecutada en el servidor, es decir un *server action*

Su equivalencia en HTML es la siguiente:


```html
<form  action="..."  method="POST"  enctype="multipart/form-data">

  <!-- Elementos del formulario -->

</form>
```


### 3.1.2. GET

Cuando usamos el método GET, **la información se envía en la URL de la petición** y es visible para el usuario.

Su uso es menos habitual, aunque es adecuado en el siguiente caso:

- Necesitamos enviar poca información al servidor y deseamos que esa información sea pública.

Suele usarse para enviar información de filtrado en la URL de una página, por ejemplo:

http://www.example.com/products?**query=laptop&sort=price&page=2**

Esta información de filtrado suele clasificarse en 3 categorías:

- **Búsqueda**
- **Ordenación**
- **Paginación**

En JSX se escribe de la siguiente forma:

```js
import Form from 'next/form'; // IMPORTANTE. Necesario importar. 

// ...

<Form  action="...">

  <input name='query' {/* ... */} />
  <input name='sort'  {/* ... */} />
  <input name='page'  {/* ... */} />

</Form>
```

**NOTA1**: Observa que es necesario importar el componente, y que éste debe escribirse con la primera letra en mayúsculas. Este componente está disponible a partir de NextJS 15

**NOTA2**: `action` es la página que recibe la información en forma de parámetros de consulta. Cuando tenemos `action=""`, significa que la información será enviada a la misma página donde está el formulario.

Su equivalencia en HTML es la siguiente:

```html
<form  action="..."  method="GET"  enctype="application/x-www-form-urlencoded">

  <input name='query' <!-- ... --> />
  <input name='sort'  <!-- ... --> />
  <input name='page'  <!-- ... --> />

</form>
```


## 3.2. Funciones del lado cliente

NextJS tiene 3 funciones para mejorar la experiencia con formularios, que deben ejecutarse desde el lado cliente:

- Mostrar estados de carga en el cliente con `useFormStatus()`
- Capturar y mostrar errores del servidor con `useFormState()`
- Mostrar estados, capturar y mostrar errores del servidor con `useActionState()` (a partir de Next 15)

> **IMPORTANTE**: **Componentes del lado cliente**
>
> En React, y en NextJS, todas las funciones que comienzan por `use` se consideran `hooks` y deben ser ejecutadas en el cliente. También es necesario usar componentes del cliente si queremos hacer uso de eventos como onclick, onchange, ...

Supongamos que disponemos del siguiente `server action`:

**/app/actions.js**
```js                                                        
'use server'

export async function insertData(formData) {
    const nombre = formData.get('nombre')
    const apellidos = formData.get('apellidos')
    
    // ...
 
}
```


## 3.3. useFormStatus

Este *hook* nos permite deshabilitar el botón de submit mientras el formulario se está procesando en el servidor. Esto evita que el usuario siga pulsando dicho botón para evitar sobrecargar de peticiones al servidor.


**/app/SubmitButton.js**

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


## 3.4. useFormState

Este *hook* permite al formulario recibir el mensaje generado por el `server action` tras su ejecución, y poder dar retroalimentación al usuario.

Esta técnica es la que aparece en la mayoría de tutoriales y documentación. Voy a pasar a exponerla para que puedas entienda su funcionamiento y la forma de aplicarla. Aunque yo personalmente considero que es muy engorrosa y que es bastante mejorable.

La documentación puede consultarse en https://react.dev/reference/react-dom/hooks/useFormState

**/app/formulario.js**
```js
'use client'
import { SubmitButton } from '@/app/SubmitButton'
import { insertData } from '@/app/actions'
import { useFormState } from 'react-dom';


export function Formulario() {
    // El server action real es insertData
    const [respuesta, action] = useFormState(insertData, null);

    return (
        <form action={action}>
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

export async function insertData(prevState, formData) {
    const nombre = formData.get('nombre')
    const apellidos = formData.get('apellidos')
    
    // ...
 
}
```

## 3.5. Usando un wrapper en lugar de useFormState

Una técnica que considero más elegante que la anterior es usar un *wrapper* para envolver el `server action`. Esto nos permitirá realizar operaciones en el cliente, tanto antes como después de invocar la acción del servidor.

Como ventaja tiene que es más legible y que no tenemos que modificar el `server action` para recibir 2 argumentos. Además no rompe nada en NextJS. Simplemente estamos haciendo uso de funcionalidades que proporciona Javascript.


**/app/formulario.js**
```js
'use client'
import { SubmitButton } from '@/app/SubmitButton'
import { insertData } from '@/app/actions'
import { toast } from 'react-hot-toast';


export function Formulario() {

    // action es un wrapper de insertData
    async function action (formData) {
        const { type, message } = await insertData(formData);
        if (type == 'success') toast.success(message)
        if (type == 'error') toast.error(message)
    }

    return (
        <form action={action}>
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

export async function insertData(formData) {
    const nombre = formData.get('nombre')
    const apellidos = formData.get('apellidos')
    
    // ...
    return { type: 'error', message: '...' }
 
}
```

[Código fuente con ejemplo completo](https://github.com/jamj2000/nxform)


## 3.6. useActionState: simplificando lo anterior

A partir de NextJS 15 disponemos de un nuevo hook `useActionState` que simplifica el trabajo con *actions*.

```js
"use client"
import { createProduct } from "@/lib/actions";
import { useActionState } from "react";

export default function Form() {

  // createProduct es la acción del servidor
  const [ status, action, pending ] = useActionState(createProduct, null);

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <input
        type="text"
        name="content"
        placeholder="New Product"
        className="py-2 px-3 rounded-sm"
      />
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 text-white py-2 px-3 rounded-sm"
      >
        Submit
      </button>
      {pending && <p>Please wait...</p>}
      {status && <p className="text-red-500">{status}</p>}
    </form>
  );
} 
```

**Características**

- El código es más simple
- No es necesario usar  `useFormStatus` ni `useFormState`.
- No es necesario poner el botón de submit en un componente separado.
- `useActionState` no se limita a su uso en formularios, sino que es una solución general para el *feedback* proporcionado por cualquier acción del servidor.

**Cambios en las acciones**

- Con este hook, las *actions* deben tener 2 argumentos, siendo `formData` el segundo argumento.
  
```js
"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProduct(previousState, formData) {
 
  try {
    const content = formData.get("content") as string;
    await prisma.product.create({ data: { content } });
  } catch (e) {
    return "be attention, An error occurred.";
  }

  revalidatePath("/");
}
```  



## 3.7. Varias acciones dentro de un formulario

Quizás no mucha gente sepa que, en HTML, los `input` y `button` pueden tener un atributo [**`formAction`**](https://www.w3schools.com/tags/att_formaction.asp) . Con ello, dentro de un formulario podemos hacer llamadas a distintas acciones en el servidor.

NextJS, emplea una técnica similar, como se muestra en el siguiente código JSX:

```html
       <form key={user.id}>
          <input type='hidden' name='id' defaultValue={user.id} />

          <label htmlFor='nombre'>Usuario</label>
          <input type='text' id='nombre' name='nombre' defaultValue={user.nombre} />

          <label htmlFor='edad'>Edad</label>
          <input type='text' id='edad' name='edad' defaultValue={user.edad} />

          <button formAction={userUpdate}>Actualizar</button>
          <button formAction={userDelete}>Eliminar</button>
        </form>
```

Esto es muy útil si disponemos de un formulario con datos, por ejemplo de un usuario, y queremos realizar distintas acciones: actualizar, eliminar, ...


[Código fuente con ejemplo completo](https://github.com/jamj2000/nxform)



## 3.8. Consejos

Aunque JSX se parece mucho a HTML, tiene algunas peculiaridades que pueden complicar la vida al desarrollador que no las conozca.   

Aquí van algunos consejos:


### 3.8.1. Detro de un formulario usa **`button`** únicamente para hacer submit.

No pongas botones con fines distintos a submit. Si lo hacemos se disparará el *action* asociado al formulario. Para operaciones que no sean acciones del servidor usa otro elemento que no sea *button*.


**MAL**

```js
'use client'

<form action={accion1} >
    <button onClick={otraOperacion}> Otra operación que no es acción </button> // Mal

    <button formAction={accion2} > Accion 2</button>  // Bien
    <button formAction={accion3} > Accion 3</button>  // Bien
    <button type='submit'> Acción 1 </button>         // Bien
</form>
```

**BIEN**

```js
'use client'

<form action={accion1} >
    <span onClick={otraOperacion}> Otra operación que no es acción </span> // Bien

    <button formAction={accion2} > Accion 2</button>  // Bien
    <button formAction={accion3} > Accion 3</button>  // Bien
    <button type='submit'> Acción 1 </button>         // Bien
</form>
```

Otra solución es desactivar el comportamiento por defecto del botón con el método `preventDefault` del evento.

**BIEN**

```js
'use client'

<form action={accion1} >
    <button onClick={(e) => { e.preventDefault(); otraOperacion() }}> Otra operación que no es acción </button> // Bien

    <button formAction={accion2} > Accion 2</button>  // Bien
    <button formAction={accion3} > Accion 3</button>  // Bien
    <button type='submit'> Acción 1 </button>         // Bien
</form>
```

### 3.8.2. Pasa correctamente los valores a las propiedades en los **`input`**


**MAL**

```js
<input type="number" min="1" max="100" />  // Permitido en HTML. No permitido en JSX
<input required="true" disabled="true" />  // Permitido en HTML. No permitido en JSX
<input required disabled />                // Permitido en HTML. Permitido en JSX
```

**BIEN**

```js
<input type="number" min={1} max={100} />  // Correcto en JSX
<input required={true} disabled={true} />  // Correcto en JSX
<input required  disabled />               // Correcto en JSX     
```

### 3.8.3. Usa **`label`** correctamente

**MAL**

```js
<label>Número:</label>                              // Provoca warning en JSX
<input id="num" type="number" min={1} max={100} />   
```

**BIEN**

```js
<label htmlFor="num">Número: </label>                  
<input id="num" type="number" min={1} max={100} />  
```

**BIEN**

```js
<label>Número:                   
  <input type="number" min={1} max={100} />  
</label>  
```

### 3.8.4. Usa **`defaultValue`** y **`value`** correctamente

La mayoría de las veces la propiedad que necesitaremos usar en un `input` es `defaultValue`. Pero existen algunos casos en que necesitaremos hacer uso de `value`. 

A continuación tienes los contextos en los que se usa cada propiedad:

| Propiedad      | Contexto                                            |
| -------------- | --------------------------------------------------- |
| **`value`**    | Para valores asociados a una variable de **estado** |
| `defaultValue` | Para valores no asociados a una variable de estado  |


Ejemplo:


```js
'use client'
import { useState } from 'react';


export default function Cuadrado({ long, width }) {

    const [largo, setLargo] = useState(long)
    const [ancho, setAncho] = useState(width)

    return (
        <form>
            <label> Largo:
                <input type="number" name="escala" step={0.01}
                    defaultValue={1}                          // Correcto. No asociado a variable de estado   
                />
            </label>
            <label> Largo:
                <input type="number" name="largo" step={0.01}
                    onChange={(e) => setLargo(e.target.value)}
                    value={largo}                              // Correcto. Variable de estado
                />
            </label>
            <label> Ancho:
                <input type="number" name="ancho" step={0.01}
                    onChange={(e) => setAncho(e.target.value)}
                    value={ancho}                              // Correcto. Variable de estado
                />
            </label>
            <label> Área:
                <input type="number" name="area" readOnly
                    value={largo * ancho}                      // Correcto. Valor derivado del estado
                    onChange={() => {}}
                />
            </label>  
        </form>
    )
}
```

> **NOTA:**
>
> React, y por tanto JSX, distingue entre **entradas controladas** y **entradas no controladas**.
> 
> Una entrada como `<input />` no está controlada. Incluso si pasamos un valor inicial como `<input defaultValue="Initial text" />`, JSX solo especifica el valor inicial. No controla cuál debería ser el valor en otro momento.      
>
> Para representar una **entrada controlada**, le pasamos la propiedad **`value`** (o `checked` para los checkbox y radio). React forzará que la entrada coincida siempre con dicho valor. Este valor se guarda en una variable de estado, que es actualizada  con un gestor de eventos. Ejemplo:
>
> ```js
>function Form() {
>  const [firstName, setFirstName] = useState(''); // Declaramos variable de estado ...
>  // ... 
>  return (
>    <input
>      // ...forzamos que el valor del input value coincida con el la variable de estado...
>      value={firstName} 
>      // ... y actualizamos la variable de estado en cada cambio
>      onChange={e => setFirstName(e.target.value)}
>    />
>  );
>}
>```
>
> Referencia: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable

### 3.8.5. Usa **`disabled`** y **`readOnly`** correctamente

Las propiedades `disabled` y `readOnly` se comportan de forma parecida en un `input`. **En ambos casos, el usuario no podrá modificar el valor del input**.

La principal diferencia es la siguiente:

- cuando usamos `readOnly` el valor SÍ será enviado al servidor.
- cuando usamos `disabled` el valor NO será enviado al servidor.

Ejemplo:

```js
export default Formulario (  ) {

  return (
   <form action={action}>
              <label> Número 1:
                <input  type="number"  name="num1"  step={0.01}
                  defaultValue={ 1 }   
                />
              </label>

              <label> Número 2:
                <input  type="number"  name="num2"  step={0.01}
                  defaultValue={ 2 }
                  readOnly         // Valor no modificable. SÍ se envía al servidor                      
                />
              </label>  

              <label> Número 3:
                <input  type="number"  name="num3"  step={0.01} 
                  defaultValue={ 3 }  
                  disabled         // Valor no modificable. NO se envía al servidor 
                />  
              </label>

              <button type="submit"> </button>
    </form>
  )
}
```


> **NOTA:**
>
> El componente `fieldset` también admite la propiedad `disabled`. A menudo esto es útil para deshabilitar un grupo de inputs. Sin embargo tiene el inconveniente de que los valores de los *inputs* dentro del *fieldset disabled* no serán enviados al servidor.
> 
> El componente `fieldset` no admite la propiedad `readOnly`. 

>**IMPORTANTE:**
>
> Recuerda que los valores de los componentes `input`, `select`, `textarea`, ... no se enviarán al servidor si están dentro de un `fieldset disabled`. 
> 
> De la misma manera, tampoco se lanzarán las acciones de los componentes `button` que estén dentro de dicho componente.


> **NOTA:** La propiedad `readOnly` sólo se aplica a `input` y `textarea`. No tiene efecto con `fieldset` ni con `select`.    


### 3.8.6. Usa **`select`** correctamente

Hay algunas diferencias al usar `select` y `option` en JSX con respecto a su uso en HTML.

En HTML hacemos

```html
<select name="localidad">
      <option value="1"> Álava </option>
      <option value="2"> Albacete </option>
      <option value="3" selected> Almeria </option>
      <option value="4"> Ávila </option>
</select>
```

En JSX debemos hacer

```js
<select name="localidad" defaultValue={3}>
      <option value={1}> Álava </option>
      <option value={2}> Albacete </option>
      <option value={3}> Almeria </option>
      <option value={4}> Ávila </option>
</select>
```
A diferencia de HTML, no se admite pasar el atributo `selected` a `option`. Para indicar la opción seleccionada por defecto usamos `defaultValue`.

Por otro lado, cuando usamos array de objetos y los recorremos con el método `map`, el formato a seguir es el que aparece a continuación:


```js
const localidadId = 1 
 
<select name="localidad" defaultValue={localidadId} >
      {localidades.map(localidad => (
        <option key={localidad.id} value={localidad.id}> {localidad.nombre} </option>
      ))}
</select>
```

      
- Referencia: [Documentación de React acerca de select](https://react.dev/reference/react-dom/components/select)


#  4. Validación de datos

La validación de datos es el proceso de garantizar que la entrada del usuario sea limpia, correcta y útil.

Las tareas de validación típicas son:

- ¿El usuario ha completado todos los campos obligatorios?
- ¿Ha introducido el usuario una fecha válida?
- ¿El usuario ha ingresado texto en un campo numérico?

En la mayoría de los casos, el propósito de la validación de datos es garantizar la entrada correcta del usuario.

La validación puede definirse mediante muchos métodos diferentes e implementarse de muchas maneras diferentes.

La **validación del lado del cliente** la realiza un navegador web, antes de enviar la entrada a un servidor web.

La **validación del lado del servidor** la realiza un servidor web, después de que la entrada se haya enviado al servidor.


## 4.1. Validación en el cliente

HTML5 introdujo un nuevo concepto de validación HTML llamado validación de restricciones .

La validación de restricciones HTML se basa en:

- Atributos de entrada HTML de validación de restricciones
- Pseudo selectores CSS de validación de restricciones
- Propiedades y métodos DOM de validación de restricciones


**Atributos HTML**

| Atributo   | Descripción                                      |
| ---------- | ------------------------------------------------ |
| `disabled` | el elemento de entrada debe estar deshabilitado  |
| `readonly` | el elemento de entrada debe ser solo-lectura     |
| `max`      | el valor máximo de un elemento de entrada        |
| `min`      | el valor mínimo de un elemento de entrada        |
| `step`     | el paso entre 2 valores consecutivos             |
| `pattern`  | el patrón de valor de un elemento de entrada     |
| `required` | el campo de entrada requiere un valor de entrada |
| `type`     | el tipo de un elemento de entrada                |


**Pseudoselectores CSS**

| Selector     | Descripción                                                    |
| ------------ | -------------------------------------------------------------- |
| `:disabled`  | Selecciona elementos de entrada con el atributo "disabled"     |
| `:read-only` | Selecciona elementos de entrada con el atributo "readonly"     |
| `:invalid`   | Selecciona elementos de entrada con valores no válido          |
| `:optional`  | Selecciona elementos de entrada sin ningún atributo "required" |
| `:required`  | Selecciona elementos de entrada con el atributo "required"     |
| `:valid`     | Selecciona elementos de entrada con valores válidos.           |


## 4.2. Validación en el servidor

> **ADVERTENCIA**: nunca confíe en los datos pasados ​​a su servidor desde el cliente. Incluso si su formulario se valida correctamente y evita entradas con formato incorrecto en el lado del cliente, un usuario malintencionado aún puede alterar la solicitud de red.

Cada vez que envía datos a un servidor, debe considerar la seguridad. Los formularios HTML son, con diferencia, los vectores de ataque a servidores más comunes (lugares donde pueden ocurrir ataques). Los problemas nunca provienen de los formularios HTML en sí, sino de cómo el servidor maneja los datos.

### 4.2.1. Ataques frecuentes

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


### 4.2.2. Sea paranoico: nunca confíe en sus usuarios

Entonces, ¿cómo se lucha contra estas amenazas? Este es un tema que va mucho más allá de esta guía, pero hay algunas reglas a tener en cuenta. La regla más importante es: nunca confíes en tus usuarios, incluido tú mismo; Incluso un usuario de confianza podría haber sido secuestrado.

Todos los datos que llegan a su servidor deben ser verificados y desinfectados (en inglés se conoce como `sanitized`). Siempre. Sin excepción.

- **Escapa de personajes potencialmente peligrosos**. Los caracteres específicos con los que debes tener cuidado varían según el contexto en el que se utilizan los datos y la plataforma del servidor que empleas, pero todos los lenguajes del lado del servidor tienen funciones para esto. Lo que hay que tener en cuenta son las secuencias de caracteres que parecen código ejecutable (como comandos JavaScript o SQL).
- **Limite la cantidad de datos entrantes para permitir solo lo necesario**.
- **Archivos subidos a la zona de pruebas**. Guárdelos en un servidor diferente y permita el acceso al archivo sólo a través de un subdominio diferente o, mejor aún, a través de un dominio completamente diferente.
Debería poder evitar muchos o la mayoría de los problemas si sigue estas tres reglas, pero siempre es una buena idea que un tercero competente realice una revisión de seguridad. No asuma que ha visto todos los problemas posibles.

### 4.2.3. Resumen

Como mencionamos anteriormente, enviar datos de formularios es fácil, pero proteger una aplicación puede ser complicado. Solo recuerda que un desarrollador front-end no es quien debe definir el modelo de seguridad de los datos. Es posible realizar una validación del formulario del lado del cliente, pero el servidor no puede confiar en esta validación porque no tiene forma de saber realmente qué sucedió realmente en el lado del cliente.


# 5. Casos prácticos avanzados

En los temas previos dispones de algunos [proyectos de ejemplo](proyectos) que hacen uso de formularios y de imágenes. Son proyectos básicos que pretenden ser didácticos, no ser extensos ni exhaustivos. 

Para que compruebes las posibilidades que tienes a tu disposición, puedes consultar los siguientes proyectos, que están desarrollados y explicados (en inglés) con cierta profundidad. 

## 5.1. Panel de gestión de escuela (Parte 1 de 2)

- [Vídeo: Next.js School Management Dashboard UI Design Tutorial](https://youtu.be/myYlGLFxZas?si=S7H_vI7Jj9hh6LjP)
- [Código fuente del video anterior](https://github.com/safak/next-dashboard-ui/tree/completed)
- [Demo](https://nxdashboard.vercel.app/)


![dashboard demo](assets/dashboard.png)


## 5.2. Albúm de fotos

![photobox](assets/photobox.png)
 
- [Vídeo: Build a Google Photos Clone with Next.js and Cloudinary – Tutorial](https://youtu.be/l71rTm_0260?si=dlqaBBnNq4y29dFF)
- [Código fuente del video anterior](https://github.com/cloudinary-community/photobox)
- [Demo](https://demo.photobox.dev/)


![photobox demo](assets/photobox-demo.png)



# 6. Referencias

- [MDN: Envío y rececpción de datos de formulario (en inglés)](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data)
- [W3Schools: Atributo formaction (en inglés)](https://www.w3schools.com/tags/att_formaction.asp)
- [W3Schools: Validación de formularios (en inglés)](https://www.w3schools.com/js/js_validation.asp)
- [MDN: Validación de formularios (en inglés) ](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [MDN: Seguridad en el lado servidor (en inglés)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)
- [Vídeo (en inglés): Forms, with Shadcn UI and Server & Client Side Validation](https://youtu.be/7DNBG2c7-RE?si=-SAvtw_qsXpRDdWX)
