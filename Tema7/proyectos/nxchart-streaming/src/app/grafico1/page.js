'use client'
import Link from 'next/link'
import Grafico1 from "@/components/grafico1";


function page() {

    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico 1</h1>

            <Grafico1 />
        </>
    );
}

export default page