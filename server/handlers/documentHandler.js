const express = require('express');
const router = express.Router();

const multer = require('multer')
const multerMiddleware = multer();
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path')

// import document model
const Document = require('./../models/documentModel');
const User = require('./../models/userModel');

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
            cb(null, Date.now().toString()+'.pdf')
        }
    }),
    fileFilter: (req, file, cb) => {
        // check for file extension before uploading
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf files are supported!'));
        }
        // check if all file parameters are provided in request
        if( !( req.body.title && req.body.description && req.body.area && req.body.tag ) ){
            cb(null, false);
            return cb(new Error('Missing parameters in request form.'))
        }
    }
});

// upload file to s3 cloud storage
const uploadFile = upload.single('url');

// route handler for document upload
router.post('', function (request, result) {
    uploadFile(request, result, function(error) {
        // error returned by multer upload function
        if(error){
            return result
                    .status(400)
                    .send({ success: false, message: error.message})
        }
        // check if all file parameters are provided in request
        if( !( request.body.title && request.body.description && request.body.area && request.body.tag ) ){
            return result
                .status(400)
                .send({ success: false, message: "Missing request parameters"});
        }
        // convert tag attribute from string with spaces to array of elements
        tags = request.body.tag.split(" ");

        // create new document entry
        let document = new Document ({
            title: request.body.title,
            author: request.loggedUser.id,
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
                    success: true,
                    message: 'Document created successfully', 
                    document
                });
            return;
        })
    })
});

// route handler for listing all documents (depending on the status provided)
router.get('', async (request, result) => {
    let documents
    let documentStatus = request.query.status;

    // retrieve all documents from database
    if (!documentStatus){ documents = await Document.find({}); }
    else if (!(documentStatus == "pending" || documentStatus == "public" || documentStatus == "reported")){
        result
            .status(400)
            .json({
                success: false,
                message: 'Unknown document status provided'
            })
        return
    }
    else {
        if (documentStatus == "reported") { documents = await Document.find({ status: "public", reported: true }) }
        else {documents = await Document.find({ status: documentStatus })}
    }

    // if no documents were found
    if (!documents || documents.length == 0){
        result
            .status(404)
            .json({
                success: true,
                message: 'No documents found',
            })
        return;
    }

    // if documents were found, return documen list
    result
        .status(200)
        .json({
            success: true,
            message: 'Documents found',
            documents: documents 
        })
});

// route handler for listing a document by ID
router.get('/:id', async (request, result) => {
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        result
            .status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
        return;
    }

    // find document by id parameter
    let document = await Document.findById(request.params.id);
    
    // if no document was found
    if (!document){
        result
            .status(404)
            .json({
                success: true,
                message: 'No document found',
            })
        return;
    }

    let author = await User.findById(document.author);

    if (!author)
        author = {username: '[deleted]'};
    else 
        author = {username: author.username, avatar: author.avatar};

    // if document was found return document
    result
        .status(200)
        .json({
            success: true,
            message: 'Document found',
            document,
            author
        })
})

// route handler for deleting a document by ID
router.delete('/:id', async(request, result) => {
    // look for document with provided id
    let document = await Document.findById(request.params.id).exec();

    // if no document was found
    if (!document){
        result
            .status(404)
            .json({
                success: true,
                message: 'No document found',
            })
        return;
    }

    // retrieve document name from url attribute
    let documentName = path.basename(document.url);

    // create params object for document deletion
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: documentName
    }

    // delete document from database
    await document.deleteOne();

    // delete document from cloud storage
    s3.deleteObject(params, function (error, data) {
        if (error){
            return result
                    .status(400)
                    .send({ 
                        success: false, 
                        message: error.message
                    })
        }
        return result
                .status(200)
                .send({
                    success: true,
                    message: 'Document deleted.'
                })
    })
} )

// route handler for updating the "reported" attribute on document report
router.patch('/:id/report', async (request, result) => {
    // look for document with provided id
    let document = await Document.findById(request.params.id).exec();

    // if no document was found
    if (!document){
        result
            .status(404)
            .json({
                success: true,
                message: 'No document found',
            })
        return;
    }

    if(document.reported){
        return result
            .status(200)
            .json({ 
                success: true,
                message: 'Document was already reported and is being evaluated'
            });
    }

    // update reported attribute
    document.reported = true;
    // push changes to database
    await document.save();

    return result
        .status(200)
        .json({ 
            success: true,
            message: 'Document reported successfully'
        });
})

module.exports = router;
