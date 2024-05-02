'use client'
import Link from 'next/link'
import Grafico2 from "@/components/grafico2";


function page() {

    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico 2</h1>

            <Grafico2 />
        </>
    );
}

export default page