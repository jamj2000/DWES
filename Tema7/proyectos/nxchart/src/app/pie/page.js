'use client'

import Link from 'next/link'
import Grafico05 from '@/components/Grafico05'

function page() {
    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico de tarta</h1>
            <Grafico05 />
        </>
    )
}

export default page;