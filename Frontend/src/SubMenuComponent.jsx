import { IoCloseSharp } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SubMenuComponent({ category, setSelectedCategory, setMenuOpened }) {
    const navigate = useNavigate()
    console.log(category)
    const {subcategorias} = category.subcategorias
    return (
        <div className="fixed inset-0 bg-secondaryBlue z-10 h-fit">
            <section className='px-4 py-4 flex justify-between bg-mainDarkBlue'>
                <h2 className='text-white text-xl font-semibold'>{category.nombre}</h2>
                <div className="flex items-center">
                    <button className="text-white bg-buttonBlue flex rounded-2xl px-3 py-1 text-[13px] flex items-center" 
                    onClick={()=> {
                        setSelectedCategory(null)
                        setMenuOpened(false)
                        navigate(`/categories/${category.id}`)
                    }}>Ver todas <MdNavigateNext className="text-2xl font-bold" /></button>
                    <span className="text-gray-500 text-xl mx-3"><IoCloseSharp onClick={()=> setMenuOpened(false)} /></span>
                </div>
            </section>
            <div className="h-[1px] bg-gray-500 w-full"></div>
            <section className="px-6 py-3  text-buttonBlue text-[16px] font-semibold">
                <div className="flex items-center gap-2 hover:cursor-pointer hover:text-blue-300 px-3 max-w-fit" onClick={()=>setSelectedCategory(null)}><IoChevronBack />Volver</div>
            </section>
            <div className="h-[1px] bg-gray-500 w-full"></div>
            <section className="mt-4 ">
                {subcategorias.map(sub => (
                    <div className="text-gray-300 px-3 " key={sub.id}>
                        <div className="flex items-center px-4 py-[11px] justify-between text-[15px] font-semibold hover:bg-blue-950 cursor-pointer rounded-md">
                            <span>{sub.nombre}</span> <MdNavigateNext className="text-xl" />
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default SubMenuComponent