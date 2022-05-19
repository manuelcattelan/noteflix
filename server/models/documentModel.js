const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for document object
const documentSchema = new Schema ({
    // attributes for document objectdocume
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    description: String,
    area: String,
    tag: [ String ],
    creationDate: Date,
    url: String,
})

// create model for document object
const documentModel = mongoose.model('document', documentSchema);

module.exports = documentModel;
