import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import apiInstance from "./apiInstance"

export default function MainPage() {
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const busqueda = searchParams.get("busqueda")

        if (!busqueda) return

        setLoading(true)

        apiInstance
            .get(`/products?busqueda=${busqueda}`)
            .then(res => {
                setProducts(res.data.productos)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))

    }, [searchParams])

    return (
        <div className="p-4">
            {loading && <p className="text-white">Buscando...</p>}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <div
                        key={product.producto_id}
                        className="bg-[#0f1c2e] p-3 rounded-xl border border-gray-700 hover:border-blue-500 transition"
                    >
                        <img
                            src={product.img_portada}
                            alt={product.titulo}
                            className="w-full h-40 object-contain mb-2"
                        />

                        <h3 className="text-white text-sm font-semibold line-clamp-2">
                            {product.titulo}
                        </h3>

                        <p className="text-gray-400 text-xs mt-1">
                            {product.modelo}
                        </p>

                        <p className="text-blue-400 font-bold mt-2">
                            ${product.precios?.precio_lista}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}