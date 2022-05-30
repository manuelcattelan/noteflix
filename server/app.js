const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// import object handlers
const authentication = require('./handlers/authHandler')
const users = require('./handlers/userHandler');
const documents = require('./handlers/documentHandler')
const interactions = require('./handlers/interactionHandler.js');
const token = require('./handlers/tokenHandler.js');

// routes for authentication api
app.use('/api/v1/auth', authentication)

// from here, every route request requires a token to be validated
app.use('/api/v1', token.tokenChecker);

// routes for decoding token data of users
app.use('/api/v1/token', token.tokenApi)
// routes for users api
app.use('/api/v1/users', users);
// routes for documents api
app.use('/api/v1/documents', documents);
// routes for documents interactions api
app.use('/api/v1/documents', interactions);

//return 404 message in JSON when API is not found
app.use((req, res) => {
    res.status(404);
    res.json({ success: false, message: 'Error: API not found' });
});

module.exports = app;
