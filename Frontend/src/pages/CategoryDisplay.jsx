import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiInstance from "../apiInstance"
import NotFound from "./NotFound"


function CategoryDisplay({ categories }) {
    const { id } = useParams()
    const [category, setCategory] = useState(null)

    useEffect(() => {
        const loadCategory = async()=>{
            const localCategory = categories.find(c=>c.id==id)
            if(localCategory) setCategory(localCategory)
        }

        loadCategory()
    }, [id, categories])


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