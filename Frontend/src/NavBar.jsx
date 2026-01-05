import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import logo from './assets/logo.jpeg'
import logoDark from './assets/logoDark.png'

export default function NavBar({handleMenuClick}) {
    return (
        <nav className="py-2 mx-3">
            <section className="flex items-center justify-between">
                <div className="flex items-center">
                    <a href="" className="text-white mr-2" onClick={handleMenuClick}>
                        <RxHamburgerMenu />
                    </a>

                    <a href="" className="max-w-[140px] block">
                        <img src={logoDark} alt="" className="w-full" />
                    </a>
                </div>

                <div className="flex text-xl items-center gap-4">
                    <a href="" className="text-white">
                        <MdOutlineLocalFireDepartment />
                    </a>
                    <a href="" className="text-white">
                        <FaRegUserCircle />
                    </a>
                    <a href="" className="bg-cartBackground p-2 rounded-lg">
                        <IoCartOutline />
                    </a>
                </div>
            </section>

            <section>
                <div className="flex items-center border-white border-[0.5px] rounded-full my-2 py-2">
                    <IoSearch className="mx-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar productos, marcas y mas..."
                        className="searchProductsinput"
                    />
                </div>
            </section>
        </nav>
    )
}
