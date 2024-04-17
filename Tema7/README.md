> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 7: Programación de servicios Web <!-- omit in toc -->
> FUNCIONALIDADES EN LAS APP WEB.

- [1. Introducción](#1-introducción)
- [2. Datos ficticios](#2-datos-ficticios)
  - [2.1. Instalación de librería](#21-instalación-de-librería)
  - [2.2. Uso](#22-uso)
  - [2.3. Documentación](#23-documentación)
- [3. Gráficos](#3-gráficos)
  - [3.1. Instalación](#31-instalación)
  - [3.2. Uso](#32-uso)
  - [3.3. Flujo de datos (streaming)](#33-flujo-de-datos-streaming)
    - [3.3.1. Los modelos de provisión de datos](#331-los-modelos-de-provisión-de-datos)
    - [3.3.2. Ejemplo](#332-ejemplo)
  - [3.4. Documentación](#34-documentación)
- [4. Creación de PDFs](#4-creación-de-pdfs)
  - [4.1. Instalación](#41-instalación)
  - [4.2. Uso](#42-uso)
  - [4.3. Documentación](#43-documentación)
- [5. Envío de correos](#5-envío-de-correos)
  - [5.1. Instalación](#51-instalación)
  - [5.2. Uso](#52-uso)
  - [5.3. Documentación](#53-documentación)
- [6. Pago por internet](#6-pago-por-internet)
  - [6.1. Instalación](#61-instalación)
  - [6.2. Uso](#62-uso)
  - [6.3. Documentación](#63-documentación)




--- 

![NUEVO](assets/nuevo.png)

> **IMPORTANTE: MATERIAL PARA EL PRÓXIMO CURSO 2024/25**
>
> El contenido previo de este tema ha sido movido al [Tema 6](../Tema6). Este contenido es nuevo, y está previsto su uso en el próximo curso.

 

# 1. Introducción

En este tema añadiremos nuevas funcionalidades a nuestra aplicación web. En concreto, se estudiarán las siguientes funcionalidades:

- **Datos ficticios**
- **Gráficos**
- **Creación de PDFs**
- **Envío de correos**
- **Pago por internet**


# 2. Datos ficticios

Durante el desarrollo de una aplicación a menudo necesitamos datos *fake* para probar su funcionalidad. Para ello disponemos de la librería **[faker.js](https://fakerjs.dev/)**, la cual nos provee de este tipo de datos. 


## 2.1. Instalación de librería
Instalamos como **dependencia de desarrollo**. Aparecerá en la sección `devDependencies` en el archivo `package.json`.


```console
npm install -D @faker-js/faker
```

> **IMPORTANTE:**
>
> Esta librería ocupa unos cuantos MB, por lo que no debería usarse en producción.


## 2.2. Uso

```js
import { faker } from '@faker-js/faker';

// Algunos datos disponibles.
// Para ver un listado exhaustivo, consulta la API
faker.number.int()
faker.number.int({ min: 10, max: 100 })
faker.number.float() 
faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }) 
faker.person.firstName() 
faker.person.firstName('female') 
faker.person.firstName('male') 
faker.person.lastName()
faker.person.fullName()
faker.person.bio()
faker.internet.email()
faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne_Doe63@yahoo.com'
faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.dev' }) // 'Jeanne_Doe88@example.dev'
faker.animal.dog()   // 'Irish Water Spaniel'
faker.animal.cat()   // 'Singapura'
faker.animal.horse() // 'Swedish Warmblood'
faker.image.avatar()
faker.image.city()
```


## 2.3. Documentación

- [Guía](https://fakerjs.dev/guide/)
- [API. Tipos de datos proporcionados](https://fakerjs.dev/api/)



# 3. Gráficos

Otra de las funcionalidades que a menudo es requerida es la de presentación de información en forma gráfica. Suele tratarse de diagramas para la exposición de datos o de monitorización de ellos (en algunos casos en tiempo real). En este último caso, los gráficos suelen estar incorporados en un Dashboard o Panel del usuario. 

La web W3Schools tiene una [introdución a los gráficos](https://www.w3schools.com/ai/ai_graphics.asp) explicando brevemente las librerías más habituales para el trabajo con gráficos.

Nosotros usaremos la librería [chart.js](https://www.chartjs.org/) por ser una de las más populares. Además es sencilla de usar y tiene licencia MIT, la cual es muy permisiva.

Hay una [demo disponible en Vercel](https://nxchart.vercel.app). El código fuente está disponible en:

- [Código fuente](https://github.com/jamj2000/nxchart)

![demo](assets/chart-dashboard.png)


## 3.1. Instalación

```console
npm  install  chart.js  react-chartjs-2
```

El segundo paquete (`react-chartjs-2`) nos permitirá usar directamente componentes de React, en lugar de Vanilla JS.


## 3.2. Uso


La forma más rápida y directa de empezar a usar esta librería es usando el siguiente esquema. 

```js
import { Chart } from 'chart.js/auto'   // versión 4 de chartjs
import { Line } from 'react-chartjs-2';

const options = {
  plugins: {
    title:   /* ... */,
    legend:  /* ... */,
  },
  scales:    /* ... */,
}

const data = {
    labels:  /* ... */,
    datasets: [
        {
            label: /* ... */,
            data:  /* ... */,
        },
        {
            label: /* ... */,
            data:  /* ... */,
        }
    ],
};

export default function grafico() {
    return (
        <div className='contenedor '>
            <Line options={options} data={data} />
        </div>
    )
}
```

Sin embargo, para despliegue en producción, en lugar de usar `import { Chart } from 'chart.js/auto'` es recomendable usar la forma que aparece a continuación, puesto que reducirá el peso del código resultante. En este segundo caso deberemos importar los componentes especificos que vayamos a necesitar y además realizar un registro de ellos.

```js
// Esto es un ejemplo para un gráfico tipo Scatter.
// Para otro tipo de gráfico necesitarás importar otros componentes.
import {
  Chart,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(LinearScale, PointElement, Tooltip, Legend);
```


Haciendo uso del paquete `react-chartjs-2` importamos el tipo de gráfico deseado. En el ejemplo que viene a continuación importamos un gráfico de tipo `Scatter`.

Luego seguimos el siguiente procedimiento:

1. Definimos un constante `options` con la configuración general del gráfico.
2. Definimos una constante `data` con la configuración específica del gráfico.
3. Usamos el componente pasándole las propiedades anteriores.


```js
import { Scatter } from 'react-chartjs-2';

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const data = {
    datasets: [
        {
            label: 'Puntos aleatorios',   
            data: Array.from({ length: 100 }, () => ({  // 100 puntos 
                x: Math.random(),
                y: Math.random(),
            })),
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
    ],
};

export default function grafico() {
    return (
        <div className='contenedor '>
            <Scatter options={options} data={data} />
        </div>
    )
}
```

El gráfico debe estar dentro de un **elemento contenedor**. El contenedor padre debe cumplir los siguientes requisitos para que el comportamiento sea [responsive](https://www.chartjs.org/docs/latest/configuration/responsive.html):

- Tener `position: relative` en su estilo CSS. 
- Dedicarse únicamente al lienzo del gráfico.

Chart.js usa su contenedor principal para actualizar el renderizado del lienzo (`canvas`) y los tamaños de visualización. Sin embargo, este método requiere que el contenedor esté relativamente posicionado y dedicado únicamente al lienzo del gráfico.


> **IMPORTANTE:**
>
> La página donde vaya a incrustarse el gráfico debe contener la directiva **`'use client'`**


## 3.3. Flujo de datos (streaming)

En algunos casos deseamos que la gráfica muestre un flujo de datos (**streaming**) obtenido de alguna fuente. Para ello podemos usar el plugin [chartjs-plugin-streaming](https://nagix.github.io/chartjs-plugin-streaming/latest/). Su página web dispone de varios [ejemplos](https://nagix.github.io/chartjs-plugin-streaming/latest/samples/charts/line-horizontal.html).

El sitio oficial también dispone de una [guía](https://nagix.github.io/chartjs-plugin-streaming/latest/guide/) bastante detallada.

Entre toda la información podemos destacar:

1. [Los modelos de provisión de datos](https://nagix.github.io/chartjs-plugin-streaming/latest/guide/data-feed-models.html)
2. [El tutorial para crear app en React, también aplicable a Next.js](https://nagix.github.io/chartjs-plugin-streaming/latest/tutorials/react/app.html)

### 3.3.1. Los modelos de provisión de datos

El paquete `chartjs-plugin-streaming` soporta obtención de datos mediante los modos **pull** y **push**. Para mayor información consulta la [documentación oficial](https://nagix.github.io/chartjs-plugin-streaming/latest/guide/data-feed-models.html#push-model-listening-based)



### 3.3.2. Ejemplo

Hay disponible una aplicación de ejemplo con [código fuente disponible en Github](https://github.com/jamj2000/nxchart-streaming).

![demo streaming](assets/streaming.avif)


**Ejecución en entorno de desarrollo**

```console
git clone  https://github.com/jamj2000/nxchart-streaming.git
cd  nxchart-streaming
npm install
npm run dev
```

**Ejecución en entorno de producción**

**IMPORTANTE**: El grafico6 hace uso del plugin `chartjs-plugin-zoom` para ofrecer funcionalidad de zoom y pan. Sin embargo este plugin provoca un error en el proceso de construcción. Por tanto el comando `npm run build` fallará. Si deseas llevar esta aplicación a producción, elimina este plugin del archivo `src/components/grafico6.js`.


**Resumen del proceso de desarrollo**

```console
npm  install  chart.js@3 react-chartjs-2@4 luxon chartjs-adapter-luxon chartjs-plugin-streaming chartjs-plugin-zoom chartjs-plugin-annotation@1 --legacy-peer-deps
```

> **IMPORTANTE:** 
>
> **A fecha de Abril de 2024, este plugin de streaming no soporta chartjs v4, por tanto debemos instalar los paquetes más antiguos usando el comando anterior**

Los paquetes instalados son los siguientes:

- `luxon`: librería para manejo de fechas y horas
- `chartjs-adapter-luxon`: adaptador de la librería anterior
- `chartjs-plugin-annotation`: plugin para realizar anotaciones en el gráfico
- `chartjs-plugin-streaming`: plugin para hacer streaming
- `chartjs-plugin-zoom`: plugin opcional. Para hacer zoom y pan 



```js
'use client'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';         // IMPORTANTE: versión 3 de chartjs. La forma de importar es distinta
import annotationPlugin from 'chartjs-plugin-annotation';

import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';


const onRefresh = (chart) => {
 /* ... */
};


const options = {
  responsive: true,
  plugins: {
    title: /* ... */,
    legend: /* ... */,
    annotation: { annotations: {} }  // necesario para ocultar gráfica al pulsar leyenda
  },
  scales: {
    x: {
      type: 'realtime',
      realtime: {
        duration: 20000,
        refresh: 1000,
        delay: 2000,
        onRefresh: onRefresh
      }
    },
    y: {
      title: {
        display: true,
        text: 'Valores'
      }
    }
  },
  interaction: /* ... */,
}


const data = /* ... */;



function grafico() {
  Chart.register(annotationPlugin, ChartStreaming);

  return (
    <div className='contenedor'>
      <Line options={options} data={data} />
    </div>
  );
}

export default grafico
```


## 3.4. Documentación

- [Código fuente de ejemplo](https://github.com/jamj2000/nxchart)
- [Código fuente de ejemplo con streaming](https://github.com/jamj2000/nxchart-streaming)
- [Componentes](https://react-chartjs-2.js.org/components/)
- [Ejemplos de react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2/tree/master/sandboxes)
- [Documentación Plugin Streaming](https://nagix.github.io/chartjs-plugin-streaming/latest/)
- [Documentación Plugin Annotation](https://www.chartjs.org/chartjs-plugin-annotation/latest/)
- [Documentación Plugin Zoom](https://www.chartjs.org/chartjs-plugin-zoom/latest/)
- [Más gráficos, plugins,... - Awesome Chart.js](https://github.com/chartjs/awesome/blob/master/README.md)
  


# 4. Creación de PDFs 


pdf-lib

## 4.1. Instalación


## 4.2. Uso



## 4.3. Documentación



# 5. Envío de correos


react-email
nodemailer

## 5.1. Instalación


## 5.2. Uso



## 5.3. Documentación


# 6. Pago por internet


stripe

## 6.1. Instalación


## 6.2. Uso



## 6.3. Documentación
