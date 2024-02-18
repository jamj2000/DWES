> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 8: Generación dinámica de páginas Web interactivas <!-- omit in toc -->
> AUTENTICACIÓN DE USUARIOS, NEXT AUTH. OAUTH, CREDENTIALS.

- [1. Introducción](#1-introducción)
- [2. Instalación de dependencias](#2-instalación-de-dependencias)
- [3. Creación de archivos necesarios](#3-creación-de-archivos-necesarios)
  - [3.1. Ejemplos:](#31-ejemplos)
- [4. Conceptos teóricos](#4-conceptos-teóricos)
  - [4.1. Sesiones](#41-sesiones)
- [5. Proveedores. Tipos de autenticación](#5-proveedores-tipos-de-autenticación)
  - [5.1. OAuth (Open Authentication)](#51-oauth-open-authentication)
    - [5.1.1. Google](#511-google)
    - [5.1.2. GitHub](#512-github)
  - [5.2. Email](#52-email)
  - [5.3. Credentials](#53-credentials)
- [6. Adaptadores. Tipos de persistencia de datos](#6-adaptadores-tipos-de-persistencia-de-datos)
  - [6.1. Prisma](#61-prisma)
  - [6.2. Neon.tech](#62-neontech)
- [7. Estrategias de gestión de sesiones](#7-estrategias-de-gestión-de-sesiones)
- [8. Envío de correo](#8-envío-de-correo)
- [9. Despliegue](#9-despliegue)
- [10. Aplicaciones de ejemplo](#10-aplicaciones-de-ejemplo)
  - [10.1. Aplicación OAuth](#101-aplicación-oauth)
  - [10.2. Aplicación Credentials](#102-aplicación-credentials)
  - [10.3. Aplicación All](#103-aplicación-all)
  - [10.4. Aplicación Middleware](#104-aplicación-middleware)
- [11. Referencias:](#11-referencias)


--- 

# 1. Introducción

En este Tema usaremos el sistema de autenticación proporcionado por **[Auth.js](https://authjs.dev/)**. 

Auth.js es una solución completa de autenticación de código abierto para aplicaciones web. Algunas de sus características son:

- Cookies firmadas, con prefijo y solo de servidor
- Protección CSRF incorporada
- Agnóstico del tiempo de ejecución: Funciones Vercel Edge, Node.js, Serverless, etc.
- Soporte integrado para más de 75 servicios populares (Google, Facebook, Auth0, Apple…)
- Soporte integrado para más de 23 bases de datos/ORM (MySQL, Postgres, Prisma, Drizzle…)
- Autenticación integrada de correo electrónico/sin contraseña/enlace mágico

> **NOTA**: En sus inicios, hasta la versión 4, el proyecto se llamaba NextAuth y estaba enfocado en el framework NextJS. A partir de la versión 5, pasó a llamarse Auth.js y estar disponible también para otros frameworks como SvelteKit, SolidStart, ... A lo largo de este documento usaremos de forma indistinta los términos Auth.js y NextAuth 5.


# 2. Instalación de dependencias

```sh
npm install next-auth@beta
```

Si además trabajamos con el ORM Prisma:

```sh
npm install @auth/prisma-adapter
npm install @prisma/client 
npm install prisma -D 
```

Si vamos a necesitar cifrar contraseñas:

```sh
npm install bcryptjs
```

Si queremos enviar correos para verificar cuentas:

```sh
npm install nodemailer -D
```



# 3. Creación de archivos necesarios


Ruta           |   Archivo
---------------|--------------------------------------
**`/`**        | **`.env`**
**`/src`**     | **`auth.js`** 
**`/src`**     | **`middleware.js`** 
**`/src/app`** | **`api/auth/[...nextauth]/route.js`**



> **NOTA**: Trabajaremos con archivos de Javascript, en lugar de Typescript, para evitar complejidad. 


## 3.1. Ejemplos:

**`.env`**

En este archivo guardamos las variables de entorno de los proveedores OAuth, conexión a BD, ...

```
AUTH_SECRET=         # Linux: `openssl rand -hex 32` or go to https://generate-secret.vercel.app/32

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

AUTH_FACEBOOK_ID=
AUTH_FACEBOOK_SECRET=
```

> **IMPORTANTE**: NextAuth 5 simplifica el proceso de gestión de variables de entorno con respecto a NextAuth4. La nueva forma de nombrado de variables es la mostrada arriba. Si seguimos esta convención, AuthJs las reconocerá automáticamente y nuestra configuración de archivos se verá simplificada de forma notable. 

**`auth.js`**

Es el archivo más importante, puesto que incluye toda la configuración para la autenticación.

```js
import NextAuth from "next-auth"
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"


const options = {
  providers: /* ... */,
  session:   /* ... */,
  adapter:   /* ... */,
  pages:     /* ... */,
  callbacks: /* ... */, 
  events:    /* ... */,
}


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth ( 
  options 
)
```

> **NOTA**: En la versión 5 de NextAuth importamos los proveedores desde `@auth/core/providers/*` en lugar de `next-auth/providers/*` como se realizaba en la versión 4, aunque esta última forma se mantiene por motivos de retrocompatibilidad.


**`app/api/auth/[...nextauth]/route.js`**

Esta archivo proporciona una API para autenticación.

```js
export { GET, POST } from '@/auth' // Reexportamos GET  y POST
```

Las rutas que proporciona son las siguientes:

```
api/auth/providers    -> muestra JSON de los proveedores incorporados a nuestra app
api/auth/session      -> muestra JSON de la sesión actual en caso de existir, sino muestra null
api/auth/signin       -> muestra formulario por defecto para login
api/auth/signout      -> muestra formulario por defecto para logout
api/auth/error        -> muestra página por defecto para error
api/auth/verify-request
```


**`middleware.js`**

La configuración de este archivo nos permite indicar qué rutas de nuestra aplicación están disponibles y cuales no según las condiciones. 


```js
import { auth } from "@/auth";

export default auth((req) => {
    // ...

})

// Rutas que seran revisadas por la función anterior
export const config = {
    matcher: ['/dashboard(.*)']
};

```

En configuraciones más complejas, cuando nuestra aplicación se despliega en Internet en una red `edge`, necesitaremos configurar el middleware de una manera algo distinta a la anterior, tal como se muestra a continuación.

En un archivo separado pondremos la configuración de los proveedores. Y en el middleware sólamente incluiremos la configuración de este archivo. El resto de opciones de autenticación no los incluiremos. Esto es necesario, porque actualmente Prisma no puede ejecutarse en el `edge`, que es donde se ejecutará el *middleware*.

```js
// auth.config.js
import Credentials from "@auth/core/providers/credentials"
import Google from "@auth/core/providers/google"
import GitHub from '@auth/core/providers/github'

export default {
    providers: [
        Google,
        GitHub,
        Credentials({  /* ... */ })
    ]
}
```

```js
// middleware.js
import NextAuth from "next-auth";
import authConfing from "@/auth.config"

const { auth } = NextAuth(authConfing)


export default auth((req) => {
    // ...

})

export const config = {
    matcher: [
        '/',
        '/about',
        '/(dashboard)(.*)' 
    ]
};
```

El acceso a las rutas se puede configurar también sin necesidad de *middleware*. En este tema realizaremos el proceso de autorización sin necesidad de hacer uso de éste.



# 4. Conceptos teóricos

Antes de nada es importante diferenciar 2 conceptos:

- `Autenticación`: proceso para identificar a un usuario
- `Autorización`: proceso de dar acceso a determindos recursos al usuario autenticado.

AuthJS es esencialmente una solución de **autenticación** para aplicaciones web. Pero junto con el manejo de sesiones y el middleware podemos conseguir una solución completa de autenticación/autorización.

## 4.1. Sesiones

HTTP / HTTPS son protocolos sin estado. Esto quiere decir, que aunque realicemos una conexión desde la misma IP, dichos protocolos no son capaces por si mismos de gestionar una sesión. 

Se entende por **sesión** la capacidad de un servidor web de mantener la identidad del usuario y almacenar datos específicos de éste durante múltiples interacciones de solicitud/respuesta entre una aplicación web en el servidor y el cliente web en el navegador.

Debido a las limitaciones que tienen HTTP / HTTPS para este fin, ya hace tiempo que se inventó una forma de gestionar las sesiones y que a día de hoy es ampliamente usado.

El mecanismo más usado para gestionar sesiones se compone de 2 elementos:

- **cookies** en la lado cliente
- **variables de sesión** en el lado servidor


En Auth.js, los datos de sesión tienen una forma similar a la siguiente:


```json
{
  "user": {
    "name": "José Antonio Muñoz Jiménez",
    "email": "jamj2000@gmail.com",
    "image": "https://avatars.githubusercontent.com/u/2934084?v=4",
  },
  "expires": "2024-02-20T12:02:43.639Z"
}
```

La sesión activa puede consultarse en el *endpoint* `/api/auth/session` proporcionado por la API de Auth.js.


# 5. Proveedores. Tipos de autenticación

Los proveedores de autenticación en NextAuth.js son servicios que se pueden utilizar para iniciar sesión en un usuario. Existen varios tipos. Los más usados son:

- **OAuth**
- **Email**
- **Credentials**

Los proveedores disponibles en nuestra app pueden consultarse en el *endpoint* `/api/auth/providers` proporcionado por la API de Auth.js.


## 5.1. OAuth (Open Authentication)

- [Documentación de OAuth](https://authjs.dev/getting-started/providers/oauth-tutorial)

Open Authorization es un estándar cerrado que permite flujos simples de autorización para sitios web o aplicaciones informáticas. Se trata de un protocolo propuesto por Blaine Cook y Chris Messina, que permite autorización segura de una API de modo estándar y simple para aplicaciones de escritorio, móviles y web.

OAuth permite a un usuario del sitio A (proveedor de servicio) compartir su información con el sitio B (llamado consumidor) sin compartir toda su identidad. Para desarrolladores de consumidores, OAuth es un método de interactuar con datos protegidos y publicarlos. Para desarrolladores de proveedores de servicio, OAuth proporciona a los usuarios un acceso a sus datos al mismo tiempo que protege las credenciales de su cuenta. Este mecanismo es utilizado por compañías como Google, Facebook, Microsoft, Twitter y Github para permitir a los usuarios compartir información sobre sus cuentas con aplicaciones de terceros o sitios web.

NextAuth.js está diseñado para funcionar con cualquier servicio OAuth, es **compatible con OAuth 1.0, 1.0A, 2.0 y OpenID Connect** y tiene soporte integrado para los servicios de inicio de sesión más populares.

Los lista proveedores soportados de forma oficial está disponible en el siguiente enlace:

- https://authjs.dev/getting-started/providers


Para configurar dicha funcionalidad necesitaremos editar 2 archivos. A continuación se muestra un ejemplo:
 
- Archivo **/.env**

```
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

- Archivo **/src/auth.js**

```js
import Github from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"

  // ...

  providers: [ Github, Google ],
```

> **NOTA**: A diferencia de versiones anteriores, en NextAuth 5 no es necesario indicar en este archivo las variables de entorno, siempre que la hayamos declarado en el archivo `.env` con la forma `AUTH_PROVEEDOR_ID` y `AUTH_PROVEEDOR_SECRET`.

Para poder ofrecer OAuth necesitaremos **registrar nuestra aplicación** web en la **sección destinada a desarrolladores que ofrece el proveedor** para estos fines.

Una vez hecho esto, el proveedor nos proporcionará 2 valores, que deberemos añadir a nuestro archivo `.env`, que son:

- **ID**
- **SECRET**

A continuación se muestra el proceso resumido de registro de una aplicación web en los proveedores Google y Github, aunque existen muchos otros.


### 5.1.1. Google

https://console.developers.google.com/apis/credentials


![google 1](assets/oauth-google1.png)

![google 2](assets/oauth-google2.png)

> **IMPORTANTE**: Cuando nuestra aplicación esté desplegada en producción, deberemos cambiar la URL `http://localhost:3000` por la URL del despliegue, p. ej: `https://mi-app.vercel.app`. 

![google 3](assets/oauth-google3.png)

![google 4](assets/oauth-google4.png)

Si no has usado nunca está consola, Google te pedirá que primero crees un Proyecto, y después que rellenes una Pantalla de Consentimiento. Y finalmente podrás dar de alta las credenciales de tu app tal como se muestra en las capturas anteriores.

Si tienes algún problema puedes consultar la página https://support.google.com/cloud/answer/10311615 


### 5.1.2. GitHub

https://github.com/settings/apps

![github 1](assets/oauth-github1.png)

![github 2](assets/oauth-github2.png)

> **IMPORTANTE**: Cuando nuestra aplicación esté desplegada en producción, deberemos cambiar la URL `http://localhost:3000` por la URL del despliegue, p. ej: `https://mi-app.vercel.app`. 

![github 3](assets/oauth-github3.png) 

![github 4](assets/oauth-github4.png)


## 5.2. Email

- [Documentación de Email](https://authjs.dev/getting-started/providers/email-tutorial)

Además de autenticar usuarios en Auth.js mediante OAuth, también puedes habilitar la opción de autenticarlos mediante `magic links`. Son enlaces que se envían al correo electrónico del usuario y al hacer clic en ellos se registrará el usuario automáticamente.

Agregar soporte para iniciar sesión por correo electrónico además de uno o más servicios OAuth proporciona una manera para que los usuarios inicien sesión si pierden el acceso a su cuenta OAuth (por ejemplo, si está bloqueada o eliminada).

El proveedor de correo electrónico se puede utilizar junto con (o en lugar de) uno o más proveedores de OAuth.


Para configurar dicha funcionalidad necesitaremos editar 2 archivos. A continuación se muestra un ejemplo:
 
- Archivo **/.env**

```
SMTP_USER=apikey
SMTP_PASSWORD={API_KEY}
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
EMAIL_FROM={SENDER_EMAIL}
```

- Archivo **/src/auth.js**

```js
import Email from "@auth/core/providers/email"

  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
```

## 5.3. Credentials

- [Documentación de Credentials](https://authjs.dev/getting-started/providers/credentials-tutorial)

Tradicionalmente, y aún hoy en día, se trabaja con el clásico método **usuario / contraseña**, y es la mayoría de las veces como **email / contraseña**. Sin embargo, este método se considere inseguro y además requiere de trabajo extra para su gestión. Al menos se debería realizar un proceso de verificación del email para aumentar la seguridad.

Desde AuthJS se limita intencionalmente para desalentar el uso de contraseñas debido a los riesgos de seguridad inherentes asociados con ellas y la complejidad adicional asociada con el soporte de nombres de usuario y contraseñas.

AuthJS ha sido diseñado para manejar la sesión del usuario desde el punto de vista del cliente, para admitir múltiples métodos de autenticación (OAuth, correo electrónico, etc.) para que no se vea obligado a ejecutar su propio servicio de autenticación.



```js
import Credentials from "@auth/core/providers/credentials"

 providers: [
    Credentials({

      async authorize(credentials) {

          const user = await getUserByEmail(credentials.email);
          if (!user || !user.password) return null;

          if (user) {  // && user.emailVerified
              const passwordsMatch = await bcrypt.compare(credentials.password, user.password)
              if (passwordsMatch) return user
          } else {
              return null
          }

      },
    }),
  ],
```


# 6. Adaptadores. Tipos de persistencia de datos

Un adaptador en Auth.js conecta la aplicación a cualquier base de datos o sistema backend que desees utilizar para almacenar datos de los usuarios, sus cuentas, sesiones, etc. Los adaptadores son opcionales, a menos que necesites conservar la información del usuario en su propia base de datos, o desees implementar ciertos flujos. Por ejemplo, el proveedor de correo electrónico requiere un adaptador para poder guardar tokens de verificación.

La lista de adaptadores soportados de forma oficial está disponible en el siguiente enlace:

- https://authjs.dev/getting-started/adapters


## 6.1. Prisma

- Referencia: https://authjs.dev/reference/adapter/prisma

Un adaptador es un objeto con métodos para leer y escribir datos de una fuente de datos. Piensa en estos métodos como una forma de normalizar la capa de datos a interfaces comunes que Auth.js pueda entender.

Esto es lo que hace que Auth.js sea muy flexible y permite utilizarlo con cualquier capa de datos.

Los métodos del adaptador se utilizan para realizar las siguientes operaciones:

- Crear/actualizar/eliminar un usuario
- Vincular/desvincular una cuenta a/de un usuario
- Manejar sesiones activas
- Admite autenticación sin contraseña en múltiples dispositivos

Auth.js se puede integrar con cualquier capa de datos (base de datos, ORM o API backend, cliente HTTP) para crear usuarios automáticamente, manejar la vinculación de cuentas automáticamente, admitir el inicio de sesión sin contraseña y almacenar información de la sesión.

Auth.js tiene una lista bastante extensa de adaptadores para ORM/Bases de datos:

- @auth/azure-tables-adapter
- @auth/d1-adapter
- @auth/dgraph-adapter
- @auth/drizzle-adapter
- @auth/dynamodb-adapter
- @auth/edgedb-adapter
- @auth/fauna-adapter
- @auth/firebase-adapter
- @auth/hasura-adapter
- @auth/kysely-adapter
- @auth/mikro-orm-adapter
- @auth/mongodb-adapter
- @auth/neo4j-adapter
- @auth/pg-adapter
- @auth/pouchdb-adapter
- **@auth/prisma-adapter**
- @auth/sequelize-adapter
- @auth/supabase-adapter
- @auth/surrealdb-adapter
- @auth/typeorm-adapter
- @auth/unstorage-adapter
- @auth/upstash-redis-adapter
- @auth/xata-adapter

Los Modelos que usa Auth.js son los siguientes:

![Modelos para Auth](assets/authjs-models.png)

**IMPORTANTE**: 
Sólo necesitaremos los modelos User y Account. Al modelo User añadiremos los campos password y role. Ver más abajo.

## 6.2. Neon.tech

[neon.tech](https://neon.tech) es un DBaaS muy sencillo de usar y con un plan gratis bastante generoso. Se recomienda su uso para las tareas de este Tema. 

Una vez nos hayamos registrado y creado una base de datos, podemos acceder a los datos de conexión mediante `Dashboard` -> `Connection Details`-> `Database` -> `Prisma` y `.env`

![neon prisma](assets/neon-prisma.png)

![neon .env](assets/neon-env.png)


# 7. Estrategias de gestión de sesiones

[Auth.js admite 2 estrategias](https://authjs.dev/concepts/session-strategies) de sesión para conservar el estado de inicio de sesión de un usuario. El valor predeterminado es utilizar la estrategia de almacenar sesiones en cookies + JWT: (`strategy: "jwt"`), pero también podemos utilizar el adaptador de base de datos para almacenar la sesión en una base de datos  (`strategy: "database"`).

Para la gestión de información de la sesión, nosotros usaremos la estrategia `jwt`:

```js
const options = {
    providers: [Google, GitHub],
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    /* ... */
}
```

# 8. Envío de correo

Si desaas realizar la verificación de email, por ejemplo al usar credenciales, necesitarás enviar un correo de confirmación al usuario. Y para ello puedes usar alguno de los correos transaccionales que aparecen a continuación.

**Servidores de correo transaccional**

- [Brevo](https://brevo.com)
- [Resend](https://resend.com)
- [Sendgrid](https://sendgrid.com)
- [Mailtrap](https://mailtrap.io/)

El proceso de verificación de email es complejo y no se aboradará en este tema. Si te interesa, en [este vídeo](https://youtu.be/MNm1XhDjX1s?si=XtUeR4FxpEY5MYSy) puedes ver como se realiza.



# 9. Despliegue

**MUY IMPORTANTE:**

Cuando despliegues tu aplicación en Internet deberás actualizar las URLs en los proveedores OAuth, de forma similar a la mostrada a continuación:

**Google**

![oauth google despliegue](assets/oauth-google5.png)

**Github**

![oauth github despliegue](assets/oauth-github5.png)


# 10. Aplicaciones de ejemplo

En este tema trabajaremos con el código fuente de 4 aplicaciones:

1. [nxauth-oauth](https://github.com/jamj2000/nxauth-oauth)
2. [nxauth-credentials](https://github.com/jamj2000/nxauth-credentials)
3. [nxauth-all](https://github.com/jamj2000/nxauth-all)
4. [nxauth-middleware](https://github.com/jamj2000/nxauth-middleware)
   
Las directrices seguidas para su desarrollan han sido comunes, y se listan a continuación.

Se ha realizado la **autenticación siempre desde el lado servidor**.

Para **obtener los datos de sesión**, se ha usado `const sesion = await auth()`

```js
import { auth } from "@/auth"

async function page() {
    const sesion = await auth()
    
}
```

Se ha **ampliado del módelo `User` con campos `password` y `role`**.

```prisma
model User {
  id            String  @id @default(cuid())
  // ...
  password      String?
  role          String?   @default("USER")  // o  ADMIN
  // ...
}
```

Vamos a necesitar el campo `password` para el trabajo con credenciales. Y el campo `role` nos permitirá distinguir entre roles USER y ADMIN.


## 10.1. Aplicación OAuth

- [nxauth-oauth](https://github.com/jamj2000/nxauth-oauth)

En la primera aplicación, nos centramos en el código necesario para trabajar con OAuth.

El archivo `auth.js` queda de una forma similar a la siguiente:

```js
// auth.js
import NextAuth from "next-auth";
import Google from "@auth/core/providers/github"
import GitHub from "@auth/core/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"

const options = {
    providers: [Google, GitHub],
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            session.user.role = token?.role
            return session
        },
        async jwt({ token }) {  
            const { role } = await prisma.user.findUnique({
                where: {
                    email: token.email
                }
            })
            token.role = role

            return token
        }
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth(options)
```

Los callbacks **`jwt`** y **`session`** son muy importantes. Se ejecutan en el orden indicado anteriormente y nos permiten:

1. recoger la información de *role* del usuario desde la BD e introducirla en el JWT.
2. recoger la información de *role* del usuario desde el JWT e introducirla en la sesión.

Los datos de sesión tendrán por tanto un aspecto similar al siguiente:

```json
{
  "user": {
    "name": "José Antonio Muñoz Jiménez",
    "email": "jamj2000@gmail.com",
    "image": "https://avatars.githubusercontent.com/u/2934084?v=4",
    "role": "USER",    
  },
  "expires": "2024-02-20T12:02:43.639Z"
}
```

Las acciones de servidor quedan así:

```js
'use server'
import { signIn, signOut} from "@/auth"


// https://authjs.dev/reference/nextjs#signin
export async function loginGoogle() {
    try {
        await signIn('google', { redirectTo: '/dashboard'})
    } catch (error) {
        throw error
    }
}

export async function loginGithub() {
    try {
        await signIn('github', { redirectTo: '/dashboard'})
    } catch (error) {
        console.log(error);
        throw error
    }
}

// https://authjs.dev/reference/nextjs#signout
export async function logout() {
    try {
        await signOut({redirectTo: '/'})
    } catch (error) {
        throw error
    }
}
```


## 10.2. Aplicación Credentials

- [nxauth-credentials](https://github.com/jamj2000/nxauth-credentials)

En la segunda aplicación, nos centramos en el código necesario para trabajar  con Credentials.

Bastantes archivos se ven afectados.

```js
// auth.js
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"
import Credentials from "@auth/core/providers/credentials"
import bcrypt from 'bcryptjs'

export const options = {
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error'
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                })

                if (user) {  // && user.emailVerified
                    const matchPassword = bcrypt.compare(credentials.password, user?.password)
                    if (matchPassword) return user
                } else {
                    return null
                }

            },
        }),
     ]
}


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({ ...options })
```

La función **`autorize`** es de gran importancia. Permite dar autorización (`return user`) o no (`return null`). Esta función se ejecuta después de introducir los datos en el formulario y después de la ejecución del server action de login. 

```js
// código ejecutado en un server action
await signIn('credentials', { email, password, redirectTo: '/dashboard' })
```

> NOTA: Las variables `email` y `password` anteriores, son enviadas como argumento dentro del objeto `credentials` a la función `authorize`.


## 10.3. Aplicación All

- [nxauth-all](https://github.com/jamj2000/nxauth-all)
  
En la tercera aplicación, desarrollamos el código necesario para trabajar tanto con OAuth como Credentials y afinamos algunos detalles finales.

En esta aplicación final, se revisa el correcto funcionamiento de ambos tipos de autenticación y se revisa la correcta autorización de acceso a las rutas.

Hay una demo disponible en [vercel](https://auth5.vercel.app/).


## 10.4. Aplicación Middleware

- [nxauth-middleware](https://github.com/jamj2000/nxauth-middleware)

En la cuarta aplicación controlamos el acceso a las rutas mediante `middleware`. Este componente se ejecuta antes de acceder a las rutas que queramos controlar. Al final del archivo hemos añadido dichas rutas.

El contenido del archivo `src/middleware.js` es el siguiente:

```js
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    // console.log(req.auth);
    // console.log(req.nextUrl);
    if (!req.auth) {
        console.log('no autenticado');

        let callbackUrl = req.nextUrl.pathname;
        if (req.nextUrl.search) {
          callbackUrl += req.nextUrl.search;
        }
    
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(req.nextUrl.origin
            + `/auth/login?callbackUrl=${encodedCallbackUrl}`)
    }
    
})


export const config = {
    matcher: [
        "/dashboard(.*)",
        "/admin(.*)",
        "/proveedores(.*)",
        "/articulos",
        "/articulos/new",
        "/articulos/edit",
        "/articulos/delete",
    ],
};
```

Hemos colocado la configuración de NextAuth en dos archivos separados:

- **src/auth.js**
- **src/auth.config.js**
  
El motivo es que, actualmente, dentro del *middleware* no podemos hacer uso de `PrismaAdapter`. Por tanto, colocamos en **`src/auth.config.js`**

```js
import Credentials from "@auth/core/providers/credentials"
import Google from "@auth/core/providers/google"
import GitHub from '@auth/core/providers/github'
import { getUserByEmail } from "@/lib/data"

export default {
    providers: [
        Google,
        GitHub,
        Credentials({
            async authorize(credentials) {
                console.log('AUTHORIZE');
                return getUserByEmail(credentials.email)
            },
        }),
    ]
}
```

Y en **`src/auth.js`**

```js
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"
import { getUserById } from "@/lib/data"
import authConfig from "@/auth.config"


export const options = {
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error'
    },
    callbacks: {
        async session({ session, token }) {
            // console.log(session, user);
            session.user.role = token?.role
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await getUserById(token.sub)
            if (!user) return token;

            token.role = user?.role
            return token
        }
    },
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({ ...options, ...authConfig })
```

Hay una demo disponible en [vercel](https://auth5middleware.vercel.app/).


# 11. Referencias:

- [Introducción a Auth.js](https://authjs.dev/getting-started/introduction)
- [Diferencias entre NextAuth4 y NextAuth5](https://authjs.dev/guides/upgrade-to-v5)
- [⭐ Video: Next Auth V5 - Advanced Guide (2024)](https://youtu.be/MNm1XhDjX1s?si=XtUeR4FxpEY5MYSy): El vídeo es muy completo, pero dura 8 horas 😱. Nuestro interés empieza a partir de la segunda hora.
- [⭐ Código fuente del vídeo anterior](https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide)

