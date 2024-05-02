'use client'

import Link from 'next/link'
import Grafico01 from '@/components/Grafico01'

function page() {
    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico de barras 1</h1>
            <Grafico01 />
        </>
    )
}

export default page
