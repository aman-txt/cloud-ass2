const express = require('express');
const app = express();
const axios = require('axios');

const userRoute = require('./routes/users');

const bodyParser= require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const rootRoute = '';
app.use(express.json());
app.use(rootRoute,userRoute);
app.use((req,res,next) => {
    res.status(200).json({
        message: "Working"
    })

})

module.exports = app;