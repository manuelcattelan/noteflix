const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import object handlers
const documents = require('./handlers/documentHandler')

// specify route prefix for object handlers
app.use('/api/v1/documents', documents);

module.exports = app;
