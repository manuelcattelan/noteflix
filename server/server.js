// load .env variables
require('dotenv').config();

const app = require('./app.js')
const mongoose = require('mongoose');

const port = process.env.SERVER_PORT;

// connect to mongodb instance
db = mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then ( () => {
    // successfully connected to the database
    console.log("-> connected to database");

    // listen on specified port
    app.listen(port, function() {
        console.log("-> server running on port", port);
    })
})

