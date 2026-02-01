import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import SubMenuComponent from "./SubMenuComponent";

function MenuComponent({ categories, menuOpened, setMenuOpened }) {
    const categoryMockup = { id: '22', nombre: 'Videovigilancia', nivel: 1, subcategorias: [{id:1, nombre:'juasjuas'}]}
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleOpenSubMenu = (e, category) => {
        e.preventDefault()
        setSelectedCategory(category)
    }

    return (
        <div className="">
            {menuOpened && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-10"></div>
            )}

            <div
                className={`${menuOpened
                    ? "fixed z-20  bg-secondaryBlue left-0 w-11/12 h-full overflow-hidden sm:w-2/5 translate-x-0 border-r-[1px] border-blue-950"
                    : "hidden -translate-x-full"
                    } ${selectedCategory && 'overflow-y-scroll'}`}
            >

                <section className="py-3 pl-4 bg-mainDarkBlue">
                    <div className="flex justify-between ">
                        <div className="border-[1px]   border-gray-500 rounded-xl flex items-center">
                            <IoSearch className="mx-4 text-gray-500" />
                            <input type="text" placeholder='Buscar categorias...' className='placeholder-gray-500 text-gray-300 outline-none py-2' />
                        </div>
                        <div className="flex items-center">
                            <button className='text-gray-500 text-2xl cursor-pointer mr-6' onClick={() => setMenuOpened(false)}>
                                <IoCloseSharp/>
                            </button>
                        </div>
                    </div>
                </section>
                <div className="h-[1px] bg-gray-500 w-full"></div>

                <div className='w-full h-[1px] px-2'></div>
                {selectedCategory ? <SubMenuComponent category={selectedCategory} setSelectedCategory={setSelectedCategory} setMenuOpened={setMenuOpened}/> :
                    <section className='h-full  flex flex-col bg-secondaryBlue'>
                        <ul className="flex flex-col gap-1 mt-4">
                            {categories.map((category) => (<DisplayedCategory key={category.id} category={category} handleOpenSubMenu={handleOpenSubMenu} />))}
                        </ul>
                    </section>}
            </div>
        </div>
    )
}
function DisplayedCategory({ category, handleOpenSubMenu }) {
    return (
        <div className="text-gray-300 py-3  hover:bg-blue-950 rounded-lg px-3 mx-4 flex items-center justify-between  cursor-pointer"
            onClick={(e) => handleOpenSubMenu(e, category)}>
            <a href="" className='text-[14px] font-semibold'>{category.nombre}</a>
            <a href="" className='text-xl'><MdNavigateNext /></a>
        </div>
    )
}

export default MenuComponent