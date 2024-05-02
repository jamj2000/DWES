'use client'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';


const onRefresh = (chart) => {
  const now = Date.now();
  chart.data.datasets.forEach(dataset => {
    dataset.data.push({
      x: now,
      y: Math.random() * 200 - 100   // Rango de 200 empezando en -100 -> desde -100 hasta 100
    });
  });
};


const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'TEMPERATURAS en ºC',
    },
    legend: {
      display: true,
      labels: {
        color: '#000000'
      },
    },
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
  interaction: {
    mode: 'index',
    intersect: false
  },
}




const data = {
  datasets: [
    {
      label: 'Datos',
      data: [],
      backgroundColor: '#55555588',
      borderColor: '#55555588',
      borderWidth: 4,
    },
  ]
};




function Grafico() {
  Chart.register(annotationPlugin, ChartStreaming);

  return (
    <div className='chart'>
      <Line options={options} data={data} />
    </div>
  );
}

export default Grafico