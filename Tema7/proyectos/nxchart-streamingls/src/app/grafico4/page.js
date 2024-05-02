'use client'
import Link from 'next/link'
import Grafico4 from "@/components/grafico4";


function page() {

    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico 4</h1>

            <Grafico4 />
        </>
    );
}

export default page