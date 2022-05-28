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

// api/v1/token/?token={token} checks token validity
app.use('/api/v1/token', tokenChecker.tokenChecker);
app.use('/api/v1/token', tokenApi)

// specify route prefix for object handlers
app.use('/api/v1/auth', auth)

//verified with token
app.use('/api/v1/subscription', tokenChecker.tokenChecker);
app.use('/api/v1/subscription', subscription);

app.use('/api/v1/documents', tokenChecker.tokenChecker);
app.use('/api/v1/documents', documents);

const interaction = require('./handlers/interactionHandler.js');
app.use('/api/v1/documents', interaction);

//return 404 message in JSON when API is not found
app.use((req, res) => {
    res.status(404);
    res.json({ success: false, message: 'Error: API not found' });
});


module.exports = app;
