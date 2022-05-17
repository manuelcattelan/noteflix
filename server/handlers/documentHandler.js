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

// function to upload document in s3 storage
const uploadDocument = (req, res, next) => {
    const documentTitle = req.body.title;
    const documentUrl = req.file.location;

    // create new document entry
    let document = new Document ({
        title: documentTitle,
        creationDate: new Date,
        url:documentUrl,
    })

    // store new document entry in database
    document.save().then( document => {
        console.log('-> document successfully uploaded to database')
        res.json({ message: 'Document created successfully', document});
    })
}

// route handler for document upload
router.post('', upload.single('url'), uploadDocument);

module.exports = router;
