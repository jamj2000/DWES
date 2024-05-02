import { Chart } from 'chart.js/auto'
// import {
//   Chart,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// Chart.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

import { Scatter } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

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
            data: Array.from({ length: 100 }, () => ({
                x: faker.number.float({ min: -100, max: 100 }),
                y: faker.number.float({ min: -100, max: 100 }),
            })),
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
    ],
};

export default function grafico() {
    return (
        <div className='chart'>
            <Scatter options={options} data={data} />
        </div>
    )
}
