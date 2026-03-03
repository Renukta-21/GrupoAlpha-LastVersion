import { useState, useEffect } from "react"
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import logoDark from './assets/logoDark.png'
import { useNavigate, useSearchParams } from "react-router-dom";
import apiInstance from "./apiInstance";
import axios from "axios";

export default function NavBar({ handleMenuClick }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("busqueda") || "")
    const [products, setProducts] = useState([])
    const [previewProducts, setPreviewProducts] = useState([])
    const [showPreview, setShowPreview] = useState(false)

    useEffect(() => {
        if (!query.trim()) {
            setPreviewProducts([])
            setShowPreview(false)
            return
        }

        const delay = setTimeout(() => {
            apiInstance
                .get(`/products?busqueda=${query}`)
                .then(res => {
                    setPreviewProducts(res.data.productos) // 👈 AQUI ESTÁ EL FIX
                    setShowPreview(true)
                })
                .catch(err => console.log(err))
        }, 400)

        return () => clearTimeout(delay)

    }, [query])

    const handleSubmit = () => {
        const trimmed = query.trim()
        if (!trimmed) return
        navigate(`/products?busqueda=${encodeURIComponent(trimmed)}`)
    }

    return (
        <nav className="py-2 mx-3">
            <section>
                <div className="relative my-2">
                    <div className="flex items-center border-white border-[0.5px] rounded-full py-2">
                        <IoSearch
                            className="mx-4 text-gray-500 cursor-pointer"
                            onClick={handleSubmit}
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                const value = e.target.value
                                setQuery(value)

                                if (value.trim().length >= 2) {
                                    navigate(`/products?busqueda=${encodeURIComponent(value)}`)
                                }
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            placeholder="Buscar productos, marcas y mas..."
                            className="searchProductsinput bg-transparent outline-none w-full text-white"
                        />
                    </div>
                </div>
            </section>
        </nav>
    )
}