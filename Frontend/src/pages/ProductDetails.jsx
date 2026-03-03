import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiInstance from "../apiInstance"

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.get(`/products/${id}`)
      setProduct(res.data)
    } catch (error) {
      console.error(error)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p className="text-white">Cargando...</p>
  if (!product) return <p className="text-white">Producto no encontrado</p>

  return (
    <div className="text-white p-4 max-w-6xl mx-auto">
      {/* aquí empezamos */}
    </div>
  )
}

export default ProductDetails
