'use client'

import Link from 'next/link'
import Grafico03 from '@/components/Grafico03'


function page() {
    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico de líneas 1</h1>
            <Grafico03 />
        </>
    )
}

export default page