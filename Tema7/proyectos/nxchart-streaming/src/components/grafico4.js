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
      position: 'right',
      labels: {
        color: '#555555'
      },
    },
    annotation: {
      annotations: {
        line: {
          drawTime: 'beforeDatasetsDraw',
          type: 'line',
          scaleID: 'y',
          value: 0,
          borderColor: 'black',
          borderWidth: 5,
          label: {
            backgroundColor: 'red',
            content: 'Anotación',
            enabled: true
          }
        },
      }
    }
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
      label: 'Datos 1',
      data: [],
      // backgroundColor: '#ff000088',       
      // borderColor: '#00000088', 
      backgroundColor: 'rgba(255, 0, 0, 0.5',
      borderColor: 'rgba(255, 0, 0, 0.5)',
      borderWidth: 4,
      cubicInterpolationMode: 'monotone',
    },
    {
      type: 'bar',
      label: 'Datos 2',
      data: [],
      // backgroundColor: '#0000ff88',       
      // borderColor: '#00000088', 
      backgroundColor: 'rgba(0, 0, 255, 0.5',
      borderColor: 'rgba(0, 0, 255, 0.5)',
      borderWidth: 2,
    }
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