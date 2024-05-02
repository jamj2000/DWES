'use client'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';



function Grafico() {
    Chart.register(annotationPlugin, ChartStreaming);

    const onRefresh = (chart) => {
        chart.data.datasets[0].data.push({
            x: new Date(),
            y: Math.random(),
        });
    };


    const options = {
        responsive: true,

        interaction: {
            mode: 'index',
            intersect: false,
        },

        plugins: {
            annotation: {
                annotations: {
                    line1: {
                        drawTime: 'beforeDatasetsDraw',
                        yScaleID: 'yAxes',
                        type: 'line',
                        yMin: 0.5,
                        yMax: 0.5,
                        borderColor: '#000000',
                        borderWidth: 2,
                    },
                },
            },

            legend: {
                display: true,
                labels: {
                    color: '#000000'
                },
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true,
            },
        },

        scales: {
            yAxes: {
                suggestedMin: 0,
                suggestedMax: 1,
                beginAtZero: false,
                ticks: {
                    color: '#000000',
                    maxTicksLimit: 5,
                },
                grid: {
                    display: false,
                    borderColor: '#000000',
                },
            },
            x: {
                beginAtZero: false,
                ticks: {
                    color: '#000000',
                    maxTicksLimit: 10,
                },
                grid: {
                    display: false,
                    borderColor: '#2B2D65',
                },
                type: 'realtime',
                realtime: {
                    duration: 20000,
                    refresh: 1000,
                    delay: 2000,
                    onRefresh: onRefresh,
                },
            },
        },
    }


    const data = {
        datasets: [
            {
                label: 'Indice de precios',
                data: [],
                backgroundColor: '#0000ff',
                borderColor: '#0000ff',
                tension: 0.3,
                borderWidth: 1.6,
                pointRadius: 0,
                tooltip: true,
                spanGaps: false,
            },
        ],
    }


    return (
        <div className='chart'>
            <Line options={options} data={data} />
        </div>
    );
}

export default Grafico
