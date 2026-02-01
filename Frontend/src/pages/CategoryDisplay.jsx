import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiInstance from "../apiInstance"
import NotFound from "./NotFound"

function CategoryDisplay() {
  const { id } = useParams()

  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const [loadingCategory, setLoadingCategory] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // 🔹 Categoría (una sola vez)
  const fetchCategory = async () => {
    try {
      setLoadingCategory(true)
      const res = await apiInstance.get(`/categories/${id}`)
      setCategory(res.data)
    } catch {
      setCategory(null)
    } finally {
      setLoadingCategory(false)
    }
  }

  // 🔹 Productos por página (60 por default)
  const fetchProducts = async (pageToLoad) => {
    try {
      setLoadingProducts(true)

      const res = await apiInstance.get("/products", {
        params: {
          categoria: id,
          pagina: pageToLoad
        }
      })

      const newProducts = res.data.productos || []

      setProducts(prev =>
        pageToLoad === 1 ? newProducts : [...prev, ...newProducts]
      )

      // si viene vacío → no hay más páginas
      if (newProducts.length === 0) {
        setHasMore(false)
      }

    } catch (error) {
      console.error(error)
    } finally {
      setLoadingProducts(false)
    }
  }

  // 🔹 Reset al cambiar categoría
  useEffect(() => {
    setProducts([])
    setPage(1)
    setHasMore(true)

    fetchCategory()
    fetchProducts(1)
  }, [id])

  // 🔹 Click del botón
  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchProducts(nextPage)
  }

  // ⛔ Estados base
  if (loadingCategory) return <p className="text-white">Cargando categoría...</p>
  if (!category) return <NotFound />

  return (
    <div className="text-white p-2">
      <h1 className="text-3xl font-bold mb-8">{category.nombre}</h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map(product => (
          <div key={product.producto_id} className="bg-gray-800 p-4 rounded">
            <img
              src={product.img_portada}
              alt={product.titulo}
              className="w-full h-48 object-contain bg-white rounded mb-3"
            />
            <p className="text-xs text-green-400">{product.marca}</p>
            <h3 className="text-[10px] font-semibold h-12 overflow-hidden">
              {product.titulo}
            </h3>
            <p className="text-xs text-gray-400">{product.modelo}</p>
            <p className="font-bold">
              ${product.precios.precio_descuento}
            </p>
          </div>
        ))}
      </div>

      {/* 🔹 BOTÓN ABAJO */}
      {loadingProducts && (
        <p className="text-center mt-6">Cargando productos...</p>
      )}

      {!loadingProducts && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-500 transition"
          >
            Cargar más
          </button>
        </div>
      )}

      {!loadingProducts && !hasMore && (
        <p className="text-center text-gray-400 mt-6">
          No hay más productos
        </p>
      )}
    </div>
  )
}

export default CategoryDisplay
