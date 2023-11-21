import Link from 'next/link'

function Navbar() {
    return (
        <nav className='navbar'>
            <div>
                <Link href="/">Inicio</Link>
                <Link href="/tienda">Tienda</Link>
                <Link href="/blog">Blog</Link>
            </div>
            <div>
                <Link href="/acerca">Acerca de ...</Link>
                <Link href="/registro">Registrarme</Link>
            </div>
        </nav>
    )
}

export default Navbar