import { Chart } from 'chart.js/auto'
// import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
// Chart.register(ArcElement, Tooltip, Legend);

import { Pie } from 'react-chartjs-2';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'left',
        },
        title: {
            display: true,
            text: 'Gráfico de tarta',
        },
    },
};

const data = {
    labels: ['Partido Rojo', 'Partido Azul', 'Partido Amarillo', 'Partido Verde', 'Partido Morado', 'Partido Naranja'],
    datasets: [
        {
            label: '# VOTOS',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
export default function grafico() {
    return (
        <div className='chart' style={{ aspectRatio: 1}}>
            <Pie options={options} data={data} />
        </div>
    )
}
