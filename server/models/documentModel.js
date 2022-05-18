const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for document object
const documentSchema = new Schema ({
    // attributes for document object
    title: String,
    // author: String,
    description: String,
    area: String,
    tag: String,
    creationDate: Date,
    url: String,
})

// create model for document object
const documentModel = mongoose.model('document', documentSchema);

module.exports = documentModel;
