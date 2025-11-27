const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const port = 3001 || process.env.PORT;

app.use(logger);
app.get('/', (req,res)=>{
    res.send('Hello from the server!');
})

app.get('/something', (req,res)=>{
    res.send('Hello from something route!');
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);  
})