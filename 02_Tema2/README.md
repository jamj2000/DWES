> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 2: LENGUAJE PARA SERVIDOR <!-- omit in toc -->
> Inserción de código en páginas Web  
> JAVASCRIPT


<img src="assets/javascript.svg" width="80" height="80">
<img src="assets/nodedotjs.svg" width="80" height="80">

---

- [1. Introducción](#1-introducción)
- [2. Declaración de variables y constantes](#2-declaración-de-variables-y-constantes)
- [3. Tipos de datos simples](#3-tipos-de-datos-simples)
  - [3.1. Booleanos](#31-booleanos)
  - [3.2. Numeros](#32-numeros)
  - [3.3. Texto](#33-texto)
- [4. Tipos de datos compuestos](#4-tipos-de-datos-compuestos)
  - [4.1. Arrays](#41-arrays)
  - [4.2. Objetos](#42-objetos)
- [5. Valores vs Referencias](#5-valores-vs-referencias)
- [6. Operaciones frecuentes con arrays](#6-operaciones-frecuentes-con-arrays)
- [7. Operaciones frecuentes con objetos](#7-operaciones-frecuentes-con-objetos)




---
# 1. Introducción

En este tema necesitaras consultar los recursos que aparecen a continuación para entender los **Arrays**, **Objetos** y **Arrow functions**, requisito imprescindible para trabajar en NodeJS y Javascript:

- [SINTAXIS DE JAVASCRIPT](https://github.com/jamj2000/Javascript/blob/master/02.SINTAXIS.md)
- [FUNCIONES](https://github.com/jamj2000/Javascript/blob/master/03.FUNCIONES.md)
- [ARRAYS](https://github.com/jamj2000/Javascript/blob/master/04.ARRAYS.md)
- [OBJETOS](https://github.com/jamj2000/Javascript/blob/master/05.OBJETOS.md)

> **IMPORTANTE:** Los apartados que aparecen a continuación son un resumen muy breve del contenido de los enlaces anteriores y no es suficiente para entender con cierta profundidad el lenguaje Javascript, por lo que se recomienda encarecidamente la consulta de dichos enlaces.
>


# 2. Declaración de variables y constantes

```js
let a;        // Valor inicial undefined, tipo undefined
const b = 0;  // Obligatorio asignar un valor inicial 
```

# 3. Tipos de datos simples

## 3.1. Booleanos

```js
a = true; 
typeof a;   // boolean
```

## 3.2. Numeros

```js
a = 23;
typeof a;   // number

a = 23.01;  
typeof a;   // number 
```

**Conversión de número a string**

```js
let a = 4.095001;

a.toString();
```

**Redondeo a 2 decimales**

```js
let a = 4.095001;

+a.toFixed(2);      // Redondeo a 2 decimales 
```

## 3.3. Texto

```js
a = "hola mundo";
typeof a;   // string
```

**Conversión de número a string**

```js
let a = 4.095001';

a.toFixed(2);      // Redondeo a 2 decimales 
```
 

# 4. Tipos de datos compuestos

## 4.1. Arrays

```js
const a = [ 1, 2, 3 ];
```


## 4.2. Objetos

```js
const a = { nombre: 'Juan', edad: 20 };
```


# 5. Valores vs Referencias

![Valores vs Referencias](assets/valor-referencia.png)

# 6. Operaciones frecuentes con arrays

**Sección de un array**

```js
let a = [ 1, 2, 3, 4, 5 ]

a.slice(1)     // [ 2, 3, 4, 5 ]
a.slice(-2)    // [ 4, 5 ]
a.slice(0,3)   // [ 1, 2, 3 ]
```


**Añadir al final**



**Insertar en cualquier posición**




**Sustituir un elemento**



**Sustituir varios elementos**



**Operaciones de filtrado, ordenación y mapeo**

```js
const nombres = ["Ángel", "Anabel", "Eva", "Ana", "elena", "David" ];

const resultado = nombres
  .filter(nombre => nombre.length > 4)  
  .sort( (a, b) => a.localeCompare(b));                          



const nums = [-10, 5, -3, 8, -7];

const resultado = nums
  .map(num => Math.abs(num))        
  .sort((a, b) => a - b); 



const jugadores = [
  { nombre: "Alicia", score: 4 },
  { nombre: "Roberto", score: 7 },
  { nombre: "Carlos", score: 9 },
  { nombre: "David", score: 3 }
];

const resultado = jugadores
  .filter(jugador => jugador.score > 5)  
  .map(jugador => jugador.nombre)          
  .sort( (a, b) => a.localeCompare(b) );   
```


# 7. Operaciones frecuentes con objetos

```js
```


```js
let persona = { nombre:"José",  edad:30,  direccion: {calle: "antigua", num: 1} };


let copia_profunda = JSON.parse(JSON.stringify(persona));
```