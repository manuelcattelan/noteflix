const express = require('express');
const router = express.Router();

const multer = require('multer')
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const fs = require('fs');

// import document model
const Document = require('./../models/documentModel');

// initialize cloud storage
const s3 = new AWS.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
}) 

// initialize multer storage object
const upload = multer({
    storage: multerS3 ({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

// route handler for document upload
router.post('', upload.single('url'), (request, result) => {

    tags = request.body.tag.split(" ");

    // create new document entry
    let document = new Document ({
        title: request.body.title,
        author: request.body.author,
        description: request.body.description,
        area: request.body.area,
        tag: tags,
        creationDate: new Date,
        url: request.file.location,
    })

    // store new document entry in database
    document.save().then( document => {
        console.log('-> document successfully uploaded to database')
        result
            .status(201)
            .json({ 
                message: 'Document created successfully', 
                document
            });
        return;
    })

    result.status(400);
});

// route handler for listing all documents
router.get('', async (request, result) => {
    let documents = await Document.find({});

    if (!documents || documents.length == 0){
        result
            .status(200)
            .json({
                message: 'No documents found',
            })

        return;
    }
    result
        .status(200)
        .json({
            message: 'Documents found',
            documents: documents 
        })
});

// route handler for listing a document by ID
router.get('/:id', async (request, result) => {
    let document = await Document.findById(request.params.id);

    if (!document){
        result
            .status(404)
            .json({
                message: 'No document found',
            })

        return;
    }
    result
        .status(200)
        .json({
            message: 'Document found',
            document
        })
})

// route handler for listing a document by ID
router.get('/:id', async (request, result) => {
    let document = await Document.findById(request.params.id);
    
    result.status(200).json({
        self: document.id,
        title: document.title,
        author: document.author,
        description: document.description,
        area: document.area,
        tag: document.tag,
        creationDate: document.Date, 
        url: document.url,
    })
})
module.exports = router;
