'use client'

import Link from 'next/link'
import Grafico06 from '@/components/Grafico06';

function page() {
    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico de donut</h1>
            <Grafico06 />
        </>

    )
}

export default page;