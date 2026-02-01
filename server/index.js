const express = require("express")
const app = express();
const logger = require("./middleware/logger")
const { getCategories, getCategoryItems, getProducts } = require ('./services/backendRequests')
const cors = require("cors")

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
    const id = req.params.id;   
    try {
        res.send(await getCategoryItems(id));
    } catch (error) {
        res.status(400).send('Errorrrr')
    }
})

app.get('/products', async(req,res)=>{
    const { categoria, pagina } = req.query;
    console.log(categoria, pagina)

    try {
        const data = await getProducts(categoria, pagina)
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send({error:'Error fetching', details:error.message})   
    }
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);  
})