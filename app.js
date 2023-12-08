const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
require('dotenv').config()
require('express-async-errors')

const app = express();


// var corsOptions = {
//   origin: "http://localhost:2000"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());


// simple route
const userRouter = require('./router/userRouter');
app.use('/api',userRouter)

const connectDatabase = require('./db/connect');

// set port, listen for requests
//Start server
const port = process.env.PORT || 3000
const start = async () => {
    connectDatabase()
    try {
        app.listen (port ,()=> {
            console.log(`App is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error.message);
    }
}

start();