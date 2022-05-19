const express = require('express');
const app = express();
const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// import object handlers
const documents = require('./handlers/documentHandler')
const tokenApi = require('./handlers/tokenApi')
const auth = require('./handlers/authHandler')
const subscription = require('./handlers/subscriptionHandler.js');
const tokenChecker = require('./handlers/tokenHandler.js');

// api/v1/token/{token} checks token validity
app.use('/api/v1/token', tokenApi)

// specify route prefix for object handlers
app.use('/api/v1/documents', documents);
app.use('/api/v1/auth', auth)

//verified with token
app.use('/api/v1/subscription', tokenChecker.tokenChecker);
app.use('/api/v1/subscription', subscription);


module.exports = app;
