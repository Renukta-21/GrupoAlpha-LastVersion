require("dotenv").config()

const config = {
    PORT: process.env.PORT,
    CLIENT_ID:process.env.CLIENT_ID,
    SECRET_KEY:process.env.SECRET_KEY
}

module.exports = config