'use client'
import Link from 'next/link'
import Grafico7 from "@/components/grafico7";


function page() {

    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico 7</h1>

            <Grafico7 />
        </>
    );
}

export default page