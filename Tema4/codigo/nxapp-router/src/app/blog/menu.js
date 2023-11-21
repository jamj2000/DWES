import Link from 'next/link'

function Menu() {
    return (
        <div className='enlaces'>
            <Link href="/blog/primer-post">Primer Post</Link>
            <Link href="/blog/segundo-post">Segundo Post</Link>
            <Link href="/blog/tercer-post">Tercer Post</Link>
        </div>
    )
}

export default Menu