const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error');

//router importing
const product = require('./routes/productRoute');
app.use(bodyParser.json())
app.use('/api/v1',product);

//error middleware
app.use(errorMiddleware)


module.exports = app;

