import { Chart } from 'chart.js/auto'

// import {
//   Chart,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// Chart.register(LinearScale, PointElement, Tooltip, Legend);

import { Bubble } from 'react-chartjs-2';
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
            label: 'Burbujas rojas aleatorias',
            data: Array.from({ length: 50 }, (value, index) => ({
                x: faker.number.int({ min: -100, max: 100 }),
                y: faker.number.int({ min: -100, max: 100 }),
                r: faker.number.int({ min: 5, max: 20 }),
            })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Burbujas azules aleatorias',
            data: Array.from({ length: 50 }, () => ({
                x: faker.number.int({ min: -100, max: 100 }),
                y: faker.number.int({ min: -100, max: 100 }),
                r: faker.number.int({ min: 5, max: 20 }),
            })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function grafico() {
    return (
        <div className='chart'>
            <Bubble options={options} data={data} />
        </div>
    )
}
