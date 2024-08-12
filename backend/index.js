const express = require('express');
const dbconnect = require('./db');
const path = require('path');
require('dotenv').config();
var cors = require('cors')

const app = express()   
const port = process.env.PORT  

// cors 
app.use(cors());

// database connection
dbconnect(); 

// middleware: used to parse incominq`gggggggggg requests with JSON payloads.
app.use(express.json());

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/member', require('./routes/memberRoutes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  