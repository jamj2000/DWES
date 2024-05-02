'use client'

import Link from 'next/link'
import Grafico07 from '@/components/Grafico07';

function page() {

    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico de burbujas</h1>
            <Grafico07 />
        </>
    )
}

export default page;