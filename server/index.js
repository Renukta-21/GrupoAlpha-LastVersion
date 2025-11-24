const express = require('express');
const app = express();

const port = 3001 || process.env.PORT;

app.get('/', (req,res)=>{
    console.log('Main route accessed');
    res.send('Hello from the server!');
})