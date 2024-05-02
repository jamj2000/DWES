# NextJS + chartjs

Aplicación que muestra gráficas de datos con flujo temporal.

![streaming](streaming.avif)

Paquetes usados:


- `luxon`: librería para manejo de fechas y horas
- `chartjs-adapter-luxon`: adaptador de la librería anterior
- `chartjs-plugin-annotation`: plugin para realizar anotaciones en el gráfico
- `chartjs-plugin-streaming`: plugin para hacer streaming
- `chartjs-plugin-zoom`: plugin opcional. Para hacer zoom y pan 


# Ejecución en entorno de desarrollo

```console
git clone  https://github.com/jamj2000/nxchart-streaming.git
cd  nxchart-streaming
npm install
npm run dev
```

# Ejecución en entorno de producción

**IMPORTANTE:** El grafico6 hace uso del plugin `chartjs-plugin-zoom` para ofrecer funcionalidad de zoom y pan. Sin embargo este plugin provoca un error en el proceso de construcción. Por tanto el comando `npm run build` fallará. Si deseas llevar esta aplicación a producción, elimina este plugin del archivo `src/components/grafico6.js`.


