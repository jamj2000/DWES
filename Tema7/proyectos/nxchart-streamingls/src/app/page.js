// https://github.com/chartjs/Chart.js/issues/10173
// https://stackblitz.com/edit/chartjs-reproduced-error-5ayyah?file=components%2FLineChart.js
'use client'

import Grafico1 from '@/components/grafico1';
import Grafico2 from '@/components/grafico2';
import Grafico3 from '@/components/grafico3';
import Grafico4 from '@/components/grafico4';
import Grafico5 from '@/components/grafico5';
// import Grafico6 from '@/components/grafico6';
import Grafico7 from '@/components/grafico7';


import Link from "next/link";

export default function Home() {
  return (
    <main className="mt-10">
      <h1>Gráficos de chart.js con streaming </h1>
      <p className="mb-10">Ejemplos tomados de
        <Link href='https://nagix.github.io/chartjs-plugin-streaming/latest/samples/charts/line-horizontal.html' target='_blank'>
           chartjs-plugin-streaming
        </Link> 
      </p>
      <h2><Link href="/grafico1">Gráfico 1 (Líneas)</Link></h2>
      <h2><Link href="/grafico2">Gráfico 2 (Barras)</Link></h2>
      <h2><Link href="/grafico3">Gráfico 3 (Líneas y Barras)</Link></h2>
      <h2><Link href="/grafico4">Gráfico 4 (Líneas y Barras con anotaciones)</Link></h2>
      <h2><Link href="/grafico5">Gráfico 5 (Líneas y Barras con anotaciones. Vertical)</Link></h2>
      <h2><Link href="/grafico6">Gráfico 6 (Líneas y Barras con anotaciones y zoom)</Link></h2>
      <h2><Link href="/grafico7">Gráfico 7 (Gráfico extra).</Link></h2>
      <h2><Link href="/dashboard">Dashboard con todos los gráficos</Link></h2>
    </main>
  );
}