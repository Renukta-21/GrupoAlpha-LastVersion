const axios = require("axios")
const config = require("./config")

const authInstance = axios.create({
    baseURL:"https://developers.syscom.mx/oauth/token"
})

const payload=`client_id=${config.CLIENT_ID}&client_secret=${config.SECRET_KEY}&grant_type=client_credentials`

const getToken = async()=>{
    try {
        
        const tokenResponse = await authInstance.post("", payload)
        console.log('GOT TOKEN')
        return tokenResponse.data
    } catch (error) {
        return error.response.data
    }
}

module.exports={getToken}