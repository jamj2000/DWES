import { Chart } from 'chart.js/auto'

// import {
//     Chart,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// Chart.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

import { Line } from 'react-chartjs-2';


const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top',
        },
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
            label: 'España',
            data: [10, 14, 18, 22, 30, 35, 40],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Francia',
            data: [7, 12, 14, 18, 22, 26, 30],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
