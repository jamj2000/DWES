> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 7: Programación de servicios Web <!-- omit in toc -->
> BASES DE DATOS con ORM, PRISMA

- [1. Introducción](#1-introducción)
- [2. Primeros pasos con Prisma](#2-primeros-pasos-con-prisma)
  - [2.1. Instalación del paquete prisma](#21-instalación-del-paquete-prisma)
  - [2.2. Comandos disponibles](#22-comandos-disponibles)
  - [2.3. Inicialización](#23-inicialización)
- [3. Definiendo el Modelo de Datos](#3-definiendo-el-modelo-de-datos)
  - [3.1. Generar el modelo de datos mediante introspección](#31-generar-el-modelo-de-datos-mediante-introspección)
  - [3.2. Escribir el modelo de datos manualmente](#32-escribir-el-modelo-de-datos-manualmente)
    - [3.2.1. Modelos](#321-modelos)
    - [3.2.2. Relaciones](#322-relaciones)
    - [3.2.3. Sincronizando el esquema con la base de datos](#323-sincronizando-el-esquema-con-la-base-de-datos)
- [4. Consultas CRUD](#4-consultas-crud)
  - [4.1. CRUD](#41-crud)
    - [4.1.1. Create](#411-create)
    - [4.1.2. Read](#412-read)
    - [4.1.3. Update](#413-update)
    - [4.1.4. Delete](#414-delete)
  - [4.2. Seleccionar campos](#42-seleccionar-campos)
  - [4.3. Consultar varias tablas](#43-consultar-varias-tablas)
- [5. Ver datos de las tablas](#5-ver-datos-de-las-tablas)
- [6. Despliegue en Vercel](#6-despliegue-en-vercel)
- [7. Referencias](#7-referencias)



--- 

# 1. Introducción

Un **ORM**, o **Object Relational Mapper**, es una pieza de software diseñada para traducir entre las representaciones de datos utilizadas por las bases de datos y las utilizadas en la programación orientada a objetos.

Desde la perspectiva de un desarrollador, un ORM le permite trabajar con datos respaldados por bases de datos utilizando las mismas estructuras y mecanismos orientados a objetos que usaría para cualquier tipo de datos internos. En general, los ORM sirven como una capa de abstracción entre la aplicación y la base de datos. 

Cada lenguaje/framework tiene su propio ORM. A continuación se muestran los más conocidos:

- Doctrine (PHP/Symfony)
- Eloquent (PHP/Laravel)
- JPA (Java)
- Hibernate (Java/Spring)
- Sequelize (Node.js)
- Prisma (Node.js)

En este tema veremos el ORM **Prisma**, disponible para Javascript/Typescript y que soporta las siguientes bases de datos:

- PostgreSQL
- MySQL
- SQLite
- SQL Server
- MongoDB
- CockroachDB


# 2. Primeros pasos con Prisma

## 2.1. Instalación del paquete prisma

```sh 
npm install prisma -D
npm install @prisma/client
``` 

## 2.2. Comandos disponibles

`npx prisma`

## 2.3. Inicialización

`npx prisma init`

> **NOTA**: Podemos indicar el proveedor de datos en la inicialización. Por ejemplo:
>
> ```sh
> npx prisma init --datasource-provider postgresql
> npx prisma init --datasource-provider mysql
> npx prisma init --datasource-provider sqlite
> ```   


Este comando hace dos cosas:

1. crea un nuevo directorio y archivo llamados **`prima/schema.prisma`**, que contiene el esquema de Prisma con la variable de conexión de su base de datos.
2. añade al archivo **`.env`** en el directorio raíz del proyecto la variable de entorno `DATABASE_URL`, que debeás posteriormente editar manualmente para apuntar a tu base de datos.


**`prisma/schema.prisma`**

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Como `provider` del `datasource` tenemos los siguientes: 

- sqlite
- postgresql
- mysql
- sqlserver
- mongodb
- cockroachdb


**`.env`**

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

> **NOTA**: El formato de la variable de entorno `DATABASE_URL` es el siguiente:
>
> `DATABASE_URL='<provider>://<user>:<pass>@<host>:<port>/<db>'`


# 3. Definiendo el Modelo de Datos

Hay dos formas alternativas de definir un modelo de datos:

1. **Generar el modelo de datos mediante introspección**: cuando tienes una base de datos existente o prefieres migrar el esquema de tu base de datos con SQL, genera el modelo de datos mediante una introspección de tu base de datos. En este caso, el esquema de la base de datos es la única fuente de verdad para los modelos de tu aplicación.


2. **Escribir el modelo de datos manualmente y usar Prisma Migrate**: puedes escribir tu modelo de datos manualmente y asignarlo a tu base de datos usando Prisma Migrate. En este caso, el modelo de datos es la única fuente de verdad para los modelos de tu aplicación.



## 3.1. Generar el modelo de datos mediante introspección

En el caso de que dispongamos de tablas previamente creadas en la base de datos y deseemos mantener la información, generaremos el modelo a partir de dichas tablas. Para ello ejecutamos:

```sh
npx prisma db pull    
npx prisma generate
```

> **IMPORTANTE**: La operación `npx prisma db pull` borra el modelo previo de `prisma/schema.prisma`. 

![prisma db pull](assets/introspect.png)

![prisma generate](assets/generate.png)


## 3.2. Escribir el modelo de datos manualmente

En este otro caso, tenemos una base de datos totalmente vacía, sin tablas creadas previamente. Para generar el modelo desde cero, editamos el archivo `prisma/schema.prisma` para añadir los modelos deseados.


### 3.2.1. Modelos

- [Modelos en Prisma](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)


**Reglas de nombrado para Modelos:**

- Los nombres de los modelos deben cumplir con la siguiente expresión regular: `[A-Za-z][A-Za-z0-9_]*`
- Los nombres de los modelos deben comenzar con una letra y normalmente se escriben en **PascalCase**
- Los nombres de los modelos deben usar la forma singular (por ejemplo, `Usuario` en lugar de usuario, usuarios o Usuarios)

> **NOTA**: Puede utilizar el atributo `@@map` para asignar un modelo (por ejemplo, `Usuario`) a una tabla con un nombre diferente que no coincide con las convenciones de nomenclatura del modelo (por ejemplo, usuarios).


**Reglas de nombrado para Campos**

Reglas de nombrado:

- Debe cumplir con la siguiente expresión regular: [A-Za-z][A-Za-z0-9_]*
- Debe comenzar con una letra y normalmente se escriben en **camelCase**
  
> **NOTA**: Puede utilizar el atributo `@map` para asignar un nombre de campo a una columna con un nombre diferente que no coincida con las convenciones de nomenclatura de campos: p. ej. `miCampo @map("mi_campo")`.


**Ejemplo**:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Articulo {
  id          Int       @id @default(autoincrement())
  nombre      String
  descripcion String?
  precio      Decimal?  

  @@map("articulos")
}
```

> NOTA: El signo **`?`** significa que el valor no es requerido, es decir admite NULL.


**Tipos de datos**

Prisma define los siguientes tipos de datos:

- [String](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#string)
- [Boolean](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#boolean)
- [Int](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#int)
- [BigInt](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#bigint)
- [Float](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#float)
- [Decimal](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#decimal)
- [DateTime](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datetime)
- [Json](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#json)

Estos tipos de datos son mapeados a los tipos nativos de cada base de datos según se muestra en la siguiente tabla:

Prisma  	  | String        | Boolean    | Int      | BigInt    | Float             | Decimal        | DateTime     | Json
------------|---------------|------------|----------|-----------|-------------------|----------------|--------------|----------------
PostgreSQL	| text          | boolean    | integer  | bigint    | double precision  | decimal(65,30) | timestamp(3) | jsonb
SQL Server	| nvarchar(1000)|tinyint     | int      | int       | float(53)         | decimal(32,16) | datetime2    | Not supported
MySQL	      | varchar(191)  |TINYINT(1)  | INT      | BIGINT    | DOUBLE            | DECIMAL(65,30) | DATETIME(3)  | JSON
MongoDB	    | String        |Bool        | Int      | Long      | Double            | Not supported  | Timestamp    | A valid BSON object (Relaxed mode) 
SQLite	    | TEXT          |INTEGER     | INTEGER  | INTEGER   | REAL              | DECIMAL        | NUMERIC      | Not supported
CockroachDB	| STRING        |BOOL        | INT      | INTEGER   | DOUBLE PRECISION  | DECIMAL        | TIMESTAMP    | JSONB



### 3.2.2. Relaciones 

- [Relaciones en Prisma](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations)

![Esquema de ejemplo](assets/sample-database.png)

**[Uno a Uno](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-one-relations)**

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique // relation scalar field (used in the `@relation` attribute above)
}
```

**[Uno a Muchos](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-many-relations)**

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}
```

**[Muchos a Muchos](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations)**

```prisma
model Post {
  id         Int                 @id @default(autoincrement())
  title      String
  categories CategoriesOnPosts[]
}

model Category {
  id    Int                 @id @default(autoincrement())
  name  String
  posts CategoriesOnPosts[]
}

model CategoriesOnPosts {
  post       Post     @relation(fields: [postId], references: [id])
  postId     Int // relation scalar field (used in the `@relation` attribute above)
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId Int // relation scalar field (used in the `@relation` attribute above)
  assignedAt DateTime @default(now())
  assignedBy String

  @@id([postId, categoryId])
}
```

### 3.2.3. Sincronizando el esquema con la base de datos


Siempre que actualices tu esquema Prisma, deberás actualizar el esquema de tu base de datos utilizando `npx prisma migrate dev` o `npx prisma db push`. Esto mantendrá el esquema de tu base de datos sincronizado con tu esquema Prisma. Los comandos también regenerarán Prisma Client.


Para ello ejecutaremos:

```sh
npx prisma migrate dev --name init
```

o, en su lugar, ejecutaremos:


```sh
npx prisma db push
```

> **IMPORTANTE**: La operación `npx prisma db push` eliminará todas las tablas previas en la base de datos que no aparezcan registradas en `prisma/schema.prisma`. 


# 4. Consultas CRUD

- [Consutlas CRUD con Prisma](https://www.prisma.io/docs/orm/prisma-client/queries/crud)

## 4.1. CRUD

CRUD es el acrónimo para:

- **Create**
- **Read**
- **Update**
- **Delete**

Estas son las 4 operaciones básicas necesarias para la gestión de información.

### 4.1.1. Create

```javascript
const user = await prisma.user.create({
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
  },
})
```

### 4.1.2. Read

**Encontrar un registro por ID**

```javascript
const user = await prisma.user.findUnique({
  where: {
    id: 1,
  },
})
```  

**Encontrar todos los registros**

```javascript
const users = await prisma.user.findMany()
```

### 4.1.3. Update

**Actualizar un registro por ID**

```javascript
const updateUser = await prisma.user.update({
  where: {
    id: 1,
  },
  data: {
    name: 'Eva York',
  },
})
```

### 4.1.4. Delete

**Elimnar un registro por ID**

```javascript
const deleteUser = await prisma.user.delete({
  where: {
    id: 1,
  },
})
```

## 4.2. Seleccionar campos


**Obtener email y name del user con id 22**

```javascript
const getUser = await prisma.user.findUnique({
  where: {
    id: 22,
  },
  select: {
    email: true,
    name: true,
  },
})
```

## 4.3. Consultar varias tablas

Algunos ejemplos.

**Insertar user, algunos posts y categories asociadas**

```javascript 
const user = await prisma.user.create({
  data: {
    email: 'ariadne@prisma.io',
    name: 'Ariadne',
    posts: {
      create: [
        {
          title: 'My first day at Prisma',
          categories: {
            create: {
              name: 'Office',
            },
          },
        },
        {
          title: 'How to connect to a SQLite database',
          categories: {
            create: [{ name: 'Databases' }, { name: 'Tutorials' }],
          },
        },
      ],
    },
  },
})
```

**Obtener user y todos sus posts**

```javascript
const user = await prisma.user.findFirst({
  include: {
    posts: true,
  },
}
```

**Obtener user, sus posts y categories**

```javascript
const user = await prisma.user.findFirst({
  include: {
    posts: {
      include: {
        categories: true,
      },
    },
  },
})
```

**Obtener name de user y todos los title de sus posts**

```javascript
const user = await prisma.user.findFirst({
  select: {
    name: true,
    posts: {
      select: {
        title: true,
      },
    },
  },
})
```

**Obtener todos los campos de user y todos los title de sus posts**

```javascript
const user = await prisma.user.findFirst({
  include: {
    posts: {
      select: {
        title: true,
      },
    },
  },
})
```

# 5. Ver datos de las tablas

Ejecutamos

```sh
npx prisma studio
```

y abrimos en el navegador la URL http://localhost:5555

![prisma studio 1](assets/studio1.png)

![prisma studio 2](assets/studio2.png)


# 6. Despliegue en Vercel


Vercel almacenará en caché automáticamente las dependencias durante el despliegue. Para la mayoría de las aplicaciones, esto no causará ningún problema. Sin embargo, para Prisma, puede resultar en una versión obsoleta de Prisma Client si se cambia su esquema de Prisma. 

Para evitar este problema, debemos añadir `prisma generate` al script `postinstall` en el archivo **`package.json`**:

```json
{
  ...
  "scripts" {
    ...
    "postinstall": "prisma generate"
  }
  ...
}
```

# 7. Referencias

- [Video: Nextjs y Prisma ORM desde Cero usando Typescript](https://www.youtube.com/watch?v=5k7ZGhL3pI0&t=3938s)
- [Get started with Prisma](https://www.prisma.io/docs/getting-started)
- [Prisma schema](https://www.prisma.io/docs/orm/prisma-schema)
- [Proyecto de ejemplo](https://github.com/jamj2000/nxprisma-crud)

