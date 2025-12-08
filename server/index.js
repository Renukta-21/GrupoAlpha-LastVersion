const express = require('express');
const app = express();
const {getToken} = require('./services/auth.js')
const logger = require('./middleware/logger');
const { getCategories, getCategoryItems } = require('./services/backendRequests.js');
const cors = require('cors');

const port = 3001 || process.env.PORT;

app.use(cors());
app.use(logger);
app.get('/', (req,res)=>{
    res.send('Hello from the server!');
})

app.get('/categories', async(req,res)=>{
    res.send(await getCategories());
})
app.get('/categories/:id', async(req,res)=>{
    res.send(await getCategoryItems(32));
})
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);  
})