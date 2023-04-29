const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//router importing
const product = require('./routes/productRoute')
app.use(bodyParser.json())
app.use('/api/v1',product);
module.exports = app;

