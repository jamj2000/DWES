import { Chart } from 'chart.js/auto'

// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';


// Chart.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
//   );
  

import { Line } from 'react-chartjs-2';

const options = {
//   responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'TEMPERATURAS en ºC',
    },
  },
};


const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
  datasets: [
    {
      label: 'Suecia',
      data: [-10, -4, -1, 4, 10, 15, 18],
      borderColor: 'rgb(5, 234, 15)',
      backgroundColor: 'rgba(5, 234, 15, 0.5)',
      fill: {
        target: 'origin',
        above: 'rgba( 0, 0, 255, 0.1)',   // area color azul sobre el origen
        below: 'rgba( 255, 0, 0, 0.1)'    // area color rojo bajo el origen
      }
    },
    {
      label: 'Chile',
      data: [23, 24, 16, 5, 3, -3, -7],
      borderColor: 'rgb(184, 58, 0)',
      backgroundColor: 'rgba(184, 58, 0, 0.5)',
      fill: {
        target: 'origin',
        above: 'rgba( 0, 0, 255, 0.1)',   // area color azul sobre el origen
        below: 'rgba( 255, 0, 0, 0.1)'    // area color rojo bajo el origen
      }
    },
  ],
};

export default function grafico() {
    return (
        <div className='chart'>
            <Line options={options} data={data} />
        </div>
    )
}
