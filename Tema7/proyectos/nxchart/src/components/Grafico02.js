import { Chart } from 'chart.js/auto';

// import {
//     Chart,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// Chart.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

import { Bar } from 'react-chartjs-2';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'PRECIPITACIONES - Gráfico de barras',
        },
    },
};

const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
        {
            label: '2022',
            data: [5, 7, 7, 8, 4, 7, 1],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: '2023',
            data: [3, 4, 9, 10, 4, 8, 2],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export default function grafico() {
    return (
        <div className='chart'>
            <Bar options={options} data={data} />
        </div>
    )
}
