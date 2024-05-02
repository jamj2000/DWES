'use client'

import Link from 'next/link'
import Grafico1 from '@/components/grafico1'
import Grafico2 from '@/components/grafico2'
import Grafico3 from '@/components/grafico3'
import Grafico4 from '@/components/grafico4'
import Grafico5 from '@/components/grafico5'
import Grafico6 from '@/components/grafico6'
import Grafico7 from '@/components/grafico7'

function page() {
    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Dashboard</h1>
            <div className='grid'>
                <Grafico1 />
                <Grafico2 />
                <Grafico3 />
                <Grafico4 />
                <Grafico5 />
                <Grafico6 />
                <Grafico7 />
            </div>
        </>
    )
}

export default page