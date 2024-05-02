'use client'

import Link from 'next/link'
import Grafico01 from '@/components/Grafico01'
import Grafico02 from '@/components/Grafico02'
import Grafico03 from '@/components/Grafico03'
import Grafico04 from '@/components/Grafico04'
import Grafico05 from '@/components/Grafico05'
import Grafico06 from '@/components/Grafico06'
import Grafico07 from '@/components/Grafico07'
import Grafico08 from '@/components/Grafico08'
import Grafico09 from '@/components/Grafico09'


const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

const data = {
    labels: ['Rojo', 'Azul', 'Amarillo', 'Verde', 'Purpura', 'Naranja'],
    datasets: [{
        label: '# de VOTOS',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }]
}


function page() {
    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Dashboard</h1>
            <div className='grid'>
                <Grafico01 />
                <Grafico02 />
                <Grafico03 />
                <Grafico04 />
                <Grafico05 />
                <Grafico06 />
                <Grafico07 />
                <Grafico08 />
                <Grafico09 />
            </div>
        </>
    )
}

export default page