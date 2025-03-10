const connectToMongo=require('./db.js');
const express = require('express')
var cors = require('cors')
require("dotenv").config();


connectToMongo();

const app = express()

app.use(cors("https://i-notebook-opal.vercel.app"));

const port = process.env.PORT;

//For every request that comes in, make sure you use this translator (express.json()) to understand any JSON data in the request
app.use(express.json())

    
// Available Routes

app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})