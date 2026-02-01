
const axios = require ('axios')
const {getToken} = require("./auth")

const apiInstance = axios.create({
    baseURL:"https://developers.syscom.mx/api/v1"
})


let APItoken 
const setAPIToken = async() => {
    if(!APItoken){
        const response = await getToken()
        if(response.access_token){
            APItoken = response.access_token
            apiInstance.defaults.headers["Authorization"] = `Bearer ${APItoken}`
        }
    }
}

 const getCategories = async()=>{
    try {
        await setAPIToken()
        const response = await apiInstance.get("/categorias")
        return response.data
    } catch (error) {
        console.log(error.response.data)
    }
}

 const getCategoryItems = async(categoryID)=>{
    try {
        await setAPIToken()
        const response = await apiInstance.get(`/categorias/${categoryID}`)
        return response.data
    } catch (error) {
        throw error
    }
}

 const getProducts = async(categoria, pagina)=>{
    try {
        await setAPIToken()
        const response = await apiInstance.get('/productos', {
            params:{
                categoria, 
                pagina
            }
        })
        return response.data
    } catch (error) {
        const apiError = error.response.data
        throw{
            message:apiError.detail
        }
    }
} 
module.exports = {getCategories, getCategoryItems, getProducts}