import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiInstance from "../apiInstance"
import NotFound from "./NotFound"


function CategoryDisplay({ categories }) {
    const { id } = useParams()
    const [category, setCategory] = useState(null)

    const fetchCategory = async()=>{
        const apiResponse = await apiInstance.get(`/categories/${id}`)
        console.log(apiResponse.data)
        setCategory(apiResponse.data)
    }
    useEffect(() => {
         fetchCategory()
    }, [])


    return (
        <div className="text-white text-3xl">
            <h2>
                {category && <p>{category.nombre}</p>}
                {category===null && <NotFound/>}
            </h2>
        </div>
    )
}

export default CategoryDisplay