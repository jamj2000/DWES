> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 2: LENGUAJE PARA SERVIDOR <!-- omit in toc -->
> Inserción de código en páginas Web  
> JAVASCRIPT

<div style="display: inline">
<img src="assets/javascript.svg" width="80" height="80">
<img src="assets/nodedotjs.svg" width="80" height="80">
</div>

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
  - [6.1. Inicializar](#61-inicializar)
  - [6.2. Insertar](#62-insertar)
  - [6.3. Eliminar](#63-eliminar)
  - [6.4. Modificar](#64-modificar)
  - [6.5. Copiar](#65-copiar)
  - [6.6. Obtener sección](#66-obtener-sección)
  - [6.7. Recorrer](#67-recorrer)
  - [6.8. Filtrar](#68-filtrar)
  - [6.9. Encontrar](#69-encontrar)
  - [6.10. Ordenar](#610-ordenar)
- [7. Operaciones frecuentes con objetos](#7-operaciones-frecuentes-con-objetos)
  - [7.1. Inicializar](#71-inicializar)
  - [7.2. Insertar](#72-insertar)
  - [7.3. Eliminar](#73-eliminar)
  - [7.4. Modificar](#74-modificar)
  - [7.5. Copiar](#75-copiar)






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
const array = [ 1, 2, 3 ];
```


## 4.2. Objetos


```js
const objeto = { nombre: 'Juan', edad: 20 };
```


# 5. Valores vs Referencias

- **Los datos simples (number, string, boolean) son tratados como valores.**
- **Los datos compuestos (arrays, objetos) son tratados como referencias.**

![Valores vs Referencias](assets/valor-referencia.png)

# 6. Operaciones frecuentes con arrays

Las operaciones más frecuentes con arrays son las siguientes:

## 6.1. Inicializar

```js
// Crea nueva referencia y asigna memoria dinámica
const array = [ 1, 2, 3, 4, 5 ]
```

## 6.2. Insertar

**Un elemento al final**

```js
const array = [ 1, 2, 3, 4, 5 ]

array.push(6)  // [ 1, 2, 3, 4, 5, 6 ]
```

**Uno o varios elementos en cualquier posición**


```js
const array = [ 1, 2, 3 ]

// en pos 0 sustituimos 0 elementos por 9
const sus = array.splice(0, 0, 9)  // sus = [], array = [ 9, 1, 2, 3 ]
```

```js
const array = [ 1, 2, 3 ]

// en pos 1 sustituimos 0 elementos por 9, 8, 7
const sus = array.splice(1, 0, 9, 8, 7)  // sus = [], array = [ 1, 9, 8, 7, 2, 3 ]
```

## 6.3. Eliminar

**Un elemento al final**

```js
const array = [ 1, 2, 3, 4, 5 ]

const num = array.pop()  // num = 5, array = [ 1, 2, 3, 4 ]
```

**Uno o varios elementos en cualquier posición**

```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 0 extraemos 1 elemento
const ex = array.splice(0, 1)  // ex = [1], array = [ 2, 3, 4, 5 ]
```

```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 1 extraemos 3 elementos
const ex = array.splice(1, 3)  // ex = [2, 3, 4], array = [ 1, 5 ]
```


```js
const array = [ 1, 2, 3, 4, 5 ]

// Deja un hueco
delete array[1]  // [ 1, <1 empty item>, 3, 4, 5 ]
```

## 6.4. Modificar

**Uno o varios elementos en cualquier posición**


```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 0 sustituimos 1 elemento por 9
array.splice(0, 1, 9)  // array = [ 9, 2, 3, 4, 5 ]
```
```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 0 sustituimos 1 elemento por 9, 8, 7
const sus = array.splice(0, 1, 9, 8 , 7)  // sus = [1],  array = [ 9, 8, 7, 2, 3, 4, 5 ]
```

```js
const array = [ 1, 2, 3, 4, 5 ]

// en pos 1 sustituimos 3 elementos por 9, 8, 7
const sus = array.splice(1, 3, 9, 8, 7)  // sus = [2, 3, 4], array = [ 1, 9, 8, 7, 5 ]
```

## 6.5. Copiar

```js
const numeros = [ 1, 2, [3, 4], [5, 6] ]

const copia_superficial = [ ...numeros ]

const copia_profunda1 = JSON.parse(JSON.stringify(numeros))
const copia_profunda2 = structuredClone(numeros);

// Test
copia_superficial[2][0] = 9 // numeros = [ 1, 2, [ 9, 4 ], [ 5, 6 ] ]
copia_profunda1[2][1] = 9   // numeros = [ 1, 2, [ 9, 4 ], [ 5, 6 ] ]
copia_profunda2[2][1] = 9   // numeros = [ 1, 2, [ 9, 4 ], [ 5, 6 ] ]
```


## 6.6. Obtener sección

```js
const array = [ 1, 2, 3, 4, 5 ]

const nuevoArray1 = a.slice(1)     // [ 2, 3, 4, 5 ]
const nuevoArray2 = a.slice(-2)    // [ 4, 5 ]
const nuevoArray3 = a.slice(0,3)   // [ 1, 2, 3 ]
```

## 6.7. Recorrer

> 🤔 Observa el uso de una **función flecha** como argumento de otra función

```js
const array = [ 1, 2, 3, 4, 5 ]

array.forEach( item => console.log (item) )
array.forEach( (item, pos) => console.log (pos, item) )
``` 


```js
const array = [ 1, 2, 3, 4, 5 ]

const nuevoArray1 = array.map( item => item * 2 )          // nuevoArray1 = [ 2, 4, 6, 8, 10 ]
const nuevoArray2 = array.map( (item, pos) => item * pos ) // nuevoArray2 = [ 0, 2, 6, 12, 20 ]
``` 

## 6.8. Filtrar 

> 🤔 Observa el uso de una **función flecha** como argumento de otra función

```js
const array = [ 1, 2, 3, 4, 5 ]
 
const nuevoArray1 = array.filter( item => item % 2 )          // nuevoArray1 = [ 1, 3, 5 ]  // números impares
const nuevoArray2 = array.filter( item => !(item % 2) )       // nuevoArray2 = [ 2 , 4 ]    // números pares
const nuevoArray3 = array.filter( (item, pos) => pos==1 || pos==4 ) // nuevoArray3 = [2, 5] // posiciones 1 y 4
``` 


## 6.9. Encontrar

> 🤔 Observa el uso de una **función flecha** como argumento de otra función

```js
const array = [ 1, 2, 3, 4, 5 ]
 
const num1 = array.find( item => item % 2 )        // num1 = 1  // el primer número impar
const num2 = array.find( item => !(item % 2) )     // num2 = 2  // el primer número par
const num3 = array.find( (item, pos) => pos == 4 ) // num3 = 5  //posición 4
```

## 6.10. Ordenar

> 🤔 Observa el uso de una **función flecha** como argumento de otra función

```js
const array = [ 2, 20, 2, 1, 10, 1, 100 ];

array.sort();                         // [1, 1, 10, 100, 2, 2, 20]
array.sort( (a, b) => a - b );        // [1, 1, 2, 2, 10, 20, 100]  

const nuevoArray = array.toSorted( (a, b) => a - b );    // No modifica array original  

const ciudades = [ "Ávila", "Almeria", "Albacete", "Álava" ]

ciudades.sort()                               // [ 'Albacete', 'Almeria', 'Álava', 'Ávila' ]
ciudades.sort( (a,b) => a.localeCompare(b) )  // [ 'Álava', 'Albacete', 'Almeria', 'Ávila' ]

const nuevasCiudades = ciudades.toSorted( (a, b) => a.localeCompare(b) )  // No modifica array original
```


**Ejemplos de filtrado, ordenación y mapeo con métodos encadenados**

```js
const nombres = ["Ángel", "Anabel", "Eva", "Ana", "elena", "David" ]

const resultado = nombres
  .filter( nombre => nombre.length > 4 )   
  .sort( (a, b) => a.localeCompare(b) )
  .map( nombre => nombre.toUpperCase() )                          



const nums = [-10, 5, -3, 8, -7]

const resultado = nums
  .map(num => Math.abs(num))        
  .sort((a, b) => a - b) 



const jugadores = [
  { nombre: "Alicia", score: 4 },
  { nombre: "Roberto", score: 7 },
  { nombre: "Carlos", score: 9 },
  { nombre: "David", score: 3 }
]

const resultado = jugadores
  .filter(jugador => jugador.score > 5)  
  .map(jugador => jugador.nombre)          
  .sort( (a, b) => a.localeCompare(b) )   
```

> 🧐 
> 
> Los siguientes métodos NO modifican el array original
>
> - `map`, `filter`, `find`, `toSorted`
>
> El siguiente método SÍ modifica el array original
>
> - `sort`


# 7. Operaciones frecuentes con objetos

Las operaciones más frecuentes con objetos son las siguientes:

## 7.1. Inicializar

```js
// Crea nueva referencia y asigna memoria dinámica
const persona = { nombre: 'Juan', edad: 20 }
```

## 7.2. Insertar

```js
const persona = { nombre: 'Juan', edad: 20 }

persona.casado = false  // persona = { nombre: 'Juan', edad: 20, casado: false }
```

```js
const persona = { nombre: 'Juan', edad: 20 }

// Crea nueva referencia y asigna memoria dinámica
persona = { ...persona, casado: false }  // persona = { nombre: 'Juan', edad: 20, casado: false }
```

## 7.3. Eliminar

```js
const persona = { nombre: 'Juan', edad: 20 }

delete persona.edad  // persona = { nombre: 'Juan' }
```

## 7.4. Modificar

```js
const persona = { nombre: 'Juan', edad: 20 }

persona.edad = 21  // persona = { nombre: 'Juan', edad: 21 }
```

```js
const persona = { nombre: 'Juan', edad: 20 }

// Crea nueva referencia y asigna memoria dinámica
persona = { ...persona, edad: 21 } // persona = { nombre: 'Juan', edad: 21 }
```



## 7.5. Copiar


```js
const persona = { edad: 11, direccion: {calle: "nueva", num: 1} }

const copia_superficial = { ...persona }

const copia_profunda1 = JSON.parse(JSON.stringify(persona))
const copia_profunda2 = structuredClone(persona);

// Test
copia_superficial.direccion.num = 99 // persona = { edad: 11,  direccion: {calle: "nueva", num: 99} }
copia_profunda1.direccion.num = 88   // persona = { edad: 11,  direccion: {calle: "nueva", num: 99} }
copia_profunda2.direccion.num = 88   // persona = { edad: 11,  direccion: {calle: "nueva", num: 99} }
```