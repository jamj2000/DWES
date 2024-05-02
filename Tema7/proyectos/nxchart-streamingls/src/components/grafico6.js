// https://stackoverflow.com/questions/67913985/chartjs-plugin-zoom-not-working-with-my-react-project
'use client'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming'
import zoomPlugin from 'chartjs-plugin-zoom';    // NO USAR ESTE PLUGIN EN PRODUCCIÓN: npm run build fallará.

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
    zoom: {
      pan: {
        enabled: true,
        mode: 'x'
      },
      zoom: {
        pinch: {
          enabled: true
        },
        wheel: {
          enabled: true
        },
        mode: 'x'
      },
      limits: {
        x: {
          minDelay: 0,
          maxDelay: 4000,
          minDuration: 1000,
          maxDuration: 20000
        }
      },
    },    
    annotation: {
      annotations: {
        linea1: {
          drawTime: 'beforeDatasetsDraw',
          type: 'line',
          scaleID: 'y',
          value: 0,
          borderColor: 'black',
          borderWidth: 1,
          label: {
            backgroundColor: 'red',
            // content: 'Anotación',
            enabled: true
          }
        },
        mensaje1: {
          drawTime: 'beforeDatasetsDraw',
          type: 'line',
          scaleID: 'y',
          value: 110,
          borderColor: 'black',
          borderWidth: 0,
          label: {
            backgroundColor: 'green',
            content: 'Usa rueda de ratón para ZOOM',
            enabled: true
          }
        },
        mensaje2: {
          drawTime: 'beforeDatasetsDraw',
          type: 'line',
          scaleID: 'y',
          value: -110,
          borderColor: 'black',
          borderWidth: 0,
          label: {
            backgroundColor: 'green',
            content: 'Deja pulsado botón del ratón y arrastra para PAN',
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
      backgroundColor: 'rgba(255, 0, 0, 0.5',
      borderColor: 'rgba(255, 0, 0, 0.5)',
      borderWidth: 4,
      cubicInterpolationMode: 'monotone',
    },
    {
      type: 'bar',
      label: 'Datos 2',
      data: [],
      backgroundColor: 'rgba(0, 0, 255, 0.5',
      borderColor: 'rgba(0, 0, 255, 0.5)',
      borderWidth: 2,
    }
  ]
};




function Grafico() {
  Chart.register(annotationPlugin, ChartStreaming, zoomPlugin);

  return (
    <div className='chart'>
      <Line options={options} data={data} />
    </div>
  );
}

export default Grafico