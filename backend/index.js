const express = require('express');
const dbconnect = require('./db');
require('dotenv').config();
var cors = require('cors')

const app = express()   
const port = process.env.PORT  

// cors 
app.use(cors({
  origin : "gymbro-app.vercel.app"
}));

// database connection
dbconnect(); 

// middleware: used to parse incominq`gggggggggg requests with JSON payloads.
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/member', require('./routes/memberRoutes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  
