'use client'
import Link from 'next/link'
import Grafico5 from "@/components/grafico5";


function page() {

    return (
        <>
            <Link href='/'>Volver a página de INICIO</Link>
            <h1 className='text-center'>Gráfico 5</h1>

            <Grafico5 />
        </>
    );
}

export default page