import { Chart } from 'chart.js/auto'

// import {
//     Chart,
//     RadialLinearScale,
//     PointElement,
//     LineElement,
//     Filler,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// Chart.register(
//     RadialLinearScale,
//     PointElement,
//     LineElement,
//     Filler,
//     Tooltip,
//     Legend
// );

import { Radar } from 'react-chartjs-2';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'CALIFICACIONES - Gráfico de radar',
        },
    },
};

const data = {
    labels: ['Matemáticas', 'Lengua', 'Biología', 'Geología', 'Inglés', 'Música'],
    datasets: [
        {
            label: 'Ana Ramirez',
            data: [1, 9, 4, 7, 6, 3],
            borderWidth: 1,
        },
        {
            label: 'Juan González',
            data: [7, 3, 5, 4, 3, 4],
            borderWidth: 1,
        },
    ],
};

export default function grafico() {
    return (
        <div className='chart' style={{ aspectRatio: 1}}>
            <Radar options={options} data={data} />
        </div>
    )
}
