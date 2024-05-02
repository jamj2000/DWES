'use client'
import Link from 'next/link'
import Grafico6 from "@/components/grafico6";


function page() {

    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico 6</h1>

            <Grafico6 />
        </>
    );
}

export default page