'use client'

import Link from 'next/link'
import Grafico02 from '@/components/Grafico02'

function page() {
    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico de barras 2</h1>
            <Grafico02 />
        </>
    )
}

export default page;