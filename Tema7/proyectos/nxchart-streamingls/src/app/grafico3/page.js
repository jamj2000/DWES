'use client'
import Link from 'next/link'
import Grafico3 from "@/components/grafico3";


function page() {

    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico 3</h1>

            <Grafico3 />
        </>
    );
}

export default page