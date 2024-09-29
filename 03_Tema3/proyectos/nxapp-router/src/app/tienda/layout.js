import Menu from "./menu"

function layout({ children }) {
    return (
        <div className='layout-tienda'>
            <Menu />
            <div>
                {children}
            </div>
        </div>
    )
}

export default layout