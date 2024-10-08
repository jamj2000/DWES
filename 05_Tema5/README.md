> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 5: FORMULARIOS  <!-- omit in toc -->
> Generación dinámica de páginas Web  
> SSG, SERVER ACTIONS, FORMULARIOS, IMÁGENES 

**[`PROYECTOS DE EJEMPLO`](PROYECTOS.md)**

<img src="assets/nextdotjs.svg" width="80" height="80">

---

- [1. Introducción](#1-introducción)
- [2. Server Actions](#2-server-actions)
  - [2.1. Crear acciones del servidor](#21-crear-acciones-del-servidor)
  - [2.2. Ejecutar acciones del servidor](#22-ejecutar-acciones-del-servidor)
  - [2.3. ¿Qué hace la acción del servidor al finalizar?](#23-qué-hace-la-acción-del-servidor-al-finalizar)
- [3. Formularios](#3-formularios)
  - [3.1. useFormStatus](#31-useformstatus)
  - [3.2. useFormState](#32-useformstate)
  - [3.3. Usando un wrapper en lugar de useFormState](#33-usando-un-wrapper-en-lugar-de-useformstate)
  - [3.4. useActionState: simplificando lo anterior](#34-useactionstate-simplificando-lo-anterior)
  - [3.5. Varias acciones dentro de un formulario](#35-varias-acciones-dentro-de-un-formulario)
  - [3.6. Consejos](#36-consejos)
    - [3.6.1. Detro de un formulario usa **`button`** únicamente para hacer submit.](#361-detro-de-un-formulario-usa-button-únicamente-para-hacer-submit)
    - [3.6.2. Pasa correctamente los valores a las propiedades en los **`input`**](#362-pasa-correctamente-los-valores-a-las-propiedades-en-los-input)
    - [3.6.3. Usa **`label`** correctamente](#363-usa-label-correctamente)
    - [3.6.4. Usa **`defaultValue`** y **`value`** correctamente](#364-usa-defaultvalue-y-value-correctamente)
    - [3.6.5. Usa **`disabled`** y **`readOnly`** correctamente](#365-usa-disabled-y-readonly-correctamente)
    - [3.6.6. Usa **`select`** correctamente](#366-usa-select-correctamente)
- [4. Validación de datos](#4-validación-de-datos)
  - [4.1. Validación en el cliente](#41-validación-en-el-cliente)
  - [4.2. Validación en el servidor](#42-validación-en-el-servidor)
    - [4.2.1. Ataques frecuentes](#421-ataques-frecuentes)
    - [4.2.2. Sea paranoico: nunca confíe en sus usuarios](#422-sea-paranoico-nunca-confíe-en-sus-usuarios)
    - [4.2.3. Resumen](#423-resumen)
- [5. CASOS PRÁCTICOS AVANZADOS](#5-casos-prácticos-avanzados)
  - [5.1. Panel de gestión de escuela (Parte 1 de 2)](#51-panel-de-gestión-de-escuela-parte-1-de-2)
  - [5.2. Albúm de fotos](#52-albúm-de-fotos)
- [6. ANEXO: SSG](#6-anexo-ssg)
- [7. Referencias](#7-referencias)







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


## 3.1. useFormStatus

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


## 3.2. useFormState

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

## 3.3. Usando un wrapper en lugar de useFormState

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

## 3.4. useActionState: simplificando lo anterior

A partir de NextJS 15 disponemos de un nuevo hook `useActionState` que sustituye a los anteriores hooks y que simplifica en gran manera el trabajo con *actions*.

```js
import { createHoppy } from "@/lib/actions;
import { useActionState } from "react";

export default function Form() {
  const { error, action, isPending } = useActionState(createHoppy, null);

  return (
    <form onSubmit={action} className="flex flex-col gap-y-2">
      <input
        type="text"
        name="content"
        placeholder="New hoppy"
        className="py-2 px-3 rounded-sm"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white py-2 px-3 rounded-sm"
      >
        Submit
      </button>
      {isPending && <p>Please wait...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
} 
```

**Mejoras respecto a la solución previa**

- El código es mucho más simple
- No es necesario usar  `useFormStatus` ni `useFormState`.
- Tampoco es necesario usar un *wrapper*.
- No es necesario poner el botón de submit en un componente separado.
- `useActionState` no se limita a su uso en formularios, sino que es una solución general para el *feedback* proporcionado por cualquier acción del servidor.

**Cambios en las acciones**

- Con este hook, las *actions* deben tener 2 argumentos, siendo `formData` el segundo argumento.
  
```js
"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createHoppy(previousState, formData) {
 
  try {
    const content = formData.get("content") as string;
    await prisma.hoppy.create({ data: { content } });
  } catch (e) {
    return "be attention, An error occurred.";
  }

  revalidatePath("/");
}
```  



## 3.5. Varias acciones dentro de un formulario

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



## 3.6. Consejos

Aunque JSX se parece mucho a HTML, tiene algunas peculiaridades que pueden complicar la vida al desarrollador que no las conozca.   

Aquí van algunos consejos:


### 3.6.1. Detro de un formulario usa **`button`** únicamente para hacer submit.

No pongas botones con fines distintos a submit. Si lo hacemos se disparará el *action* asociado al formulario. Para operaciones que no sean acciones del servidor usa otro elemento que no sea *button*.

Este comportamiento quizás se deba a algún bug en NextJS.


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

### 3.6.2. Pasa correctamente los valores a las propiedades en los **`input`**


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

### 3.6.3. Usa **`label`** correctamente

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

### 3.6.4. Usa **`defaultValue`** y **`value`** correctamente

La mayoría de las veces la propiedad que necesitaremos usar en un `input` es `defaultValue`. Pero existen algunos casos en que necesitaremos hacer uso de `value`. 

A continuación tienes los contextos en los que se usa cada propiedad:

| Propiedad      | Contexto                                                    |
| -------------- | ----------------------------------------------------------- |
| **`value`**    | Para valores asociados a una variable de **estado**         |
| `defaultValue` | Para valores no asociados a una variable de estado          |


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

### 3.6.5. Usa **`disabled`** y **`readOnly`** correctamente

Las propiedades `disabled` y `readOnly` se comportan de forma parecida en un `input`. **En ambos casos, el usuario no podrá modificar el valor del input**.

La principal diferencia es la siguiente:

- cuando usamos `readOnly` el valor SÍ será enviado al servidor.
- cuando usamos `disabled` el valor NO será enviado al servidor.

Ejemplo:

```js
export default Form (  ) {

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


### 3.6.6. Usa **`select`** correctamente

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
<select name="localidad" defaultValue={3} >
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


# 5. CASOS PRÁCTICOS AVANZADOS


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






# 6. ANEXO: SSG

NextJS también nos proporciona soporte para SSG. 


**Static Site Generat{ion,or,ed}**

Los generadores de sitios estáticos (SSG) son motores que utilizan archivos de entrada de texto (como Markdown , reStructuredText y AsciiDoc ) para generar páginas web estáticas. Los sitios estáticos generados por generadores de sitios estáticos no requieren un backend después de la generación del sitio, lo que los convierte en ciudadanos de primera clase en las redes de entrega de contenido (CDN). Algunos de los generadores de sitios estáticos más populares son:

| Framework | Lenguaje   |
| --------- | ---------- |
| Jekyll    | Ruby       |
| Hugo      | Go         |
| Gatsby    | Javascript |
| Next.js   | Javascript |
| Astro     | Javascript |

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



# 7. Referencias

- [MDN: Envío y rececpción de datos de formulario (en inglés)](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data)
- [W3Schools: Atributo formaction (en inglés)](https://www.w3schools.com/tags/att_formaction.asp)
- [W3Schools: Validación de formularios (en inglés)](https://www.w3schools.com/js/js_validation.asp)
- [MDN: Validación de formularios (en inglés) ](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [MDN: Seguridad en el lado servidor (en inglés)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)
- [Vídeo (en inglés): Forms, with Shadcn UI and Server & Client Side Validation](https://youtu.be/7DNBG2c7-RE?si=-SAvtw_qsXpRDdWX)