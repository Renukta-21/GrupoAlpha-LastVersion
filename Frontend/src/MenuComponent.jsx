import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";

function MenuComponent({ categories, menuOpened, setMenuOpened }) {
    const [selectedCategory, setSelectedCategory] = useState(null)
    return (
        <>
            {menuOpened && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-10"></div>
            )}

            <div
                className={`${menuOpened
                    ? "fixed z-20  bg-thirdBlue left-0 w-11/12 h-full translate-x-0 border-r-[1px] border-blue-950"
                    : "hidden -translate-x-full"
                    }`}
            >

                <section className="py-3 pl-4 pr-6 bg-secondaryBlue">
                    <div className="flex justify-between ">
                        <div className="border-[1px]   border-gray-500 rounded-xl flex items-center">
                            <IoSearch className="mx-4 text-gray-500" />
                            <input type="text" placeholder='Buscar categorias...' className='placeholder-gray-500 text-gray-300 outline-none py-2' />
                        </div>
                        <div>
                            <button className='text-gray-500 text-2xl' onClick={() => setMenuOpened(false)}>x</button>
                        </div>
                    </div>
                </section>
                <div className='w-full h-[1px] bg-blue-950'></div>
                {selectedCategory ? <p>Hola</p> :
                    <section className='h-full'>
                        <ul className="flex flex-col gap-1 bg-thirdBlue mt-4 mr-3">
                            {categories.map((category) => (
                                <li key={category.id} className="text-gray-300 py-3   rounded-lg px-3 py-2 flex items-center justify-between">
                                    <a href="" className='text-[14px] font-semibold'>{category.nombre}</a>
                                    <a href="" className='text-xl'><MdNavigateNext /></a>
                                </li>
                            ))}
                        </ul>
                    </section>}
            </div>
        </>
    )
}
function DisplayedCategory({selectedCategory}){
    return()
}

export default MenuComponent