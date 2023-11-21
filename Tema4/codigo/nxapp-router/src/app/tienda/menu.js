import Link from "next/link"

function Menu() {
    return (
        <div className='enlaces'>
            <Link href="/tienda/electronica">Electrónica</Link>
            <Link href="/tienda/decoracion">Decoración</Link>
            <Link href="/tienda/mobiliario">Mobiliario</Link>
            <Link href="/tienda/libros">Libros</Link>
        </div>
    )
}

export default Menu