const express = require('express');
const router = express.Router();

const multer = require('multer')
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
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf files are supported!'));
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

// route handler for listing all documents
router.get('', async (request, result) => {
    // retrieve all documents from database
    let documents = await Document.find({});

    // if no documents were found
    if (!documents || documents.length == 0){
        return result.status(204)
        .json({
            success: false,
            message: 'No documents found',
        })
    }

    // if documents were found, return document list

    documents = documents.map( (doc)=>{
        return {
            _id: doc._id,
            title: doc.title,
            author: doc.author,
            description: doc.description,
            area: doc.area,
            tag: doc.tag,
            creationDate: doc.creationDate,
            url: doc.url,
            like:   doc.like.length,
            dislike: doc.dislike.length
        }
    })

    result
        .status(200)
        .json({
            success: true,
            message: 'Documents found',
            documents: documents
        })
});

router.get('/saved', async (request, result) =>{
    //get user from DB
    let usr = await User.findById(request.loggedUser.id).exec();

    //get documents saved by user
    let docs = await Document.find({
        "_id" : {
             "$in" : usr.savedDocuments
        }
    })

    //if no documents are found
    if (!docs.length){
        return result.status(204)
        .json({
            success: false,
            message: 'No documents found',
        })
    }

    docs = docs.map( (doc)=>{
        return {
            _id: doc._id,
            title: doc.title,
            author: doc.author,
            description: doc.description,
            area: doc.area,
            tag: doc.tag,
            creationDate: doc.creationDate,
            url: doc.url,
            like:   doc.like.length,
            dislike: doc.dislike.length
        }
    })

    return result.status(200)
    .json({
        success: true,
        message: 'Documents found',
        documents: docs
    })
})


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
                status: false,
                message: 'No document found',
            })
        return;
    }

    let author = await User.findById(document.author);

    if (!author)
        author = {username: '[deleted]'};
    else 
        author = {username: author.username, avatar: author.avatar};

    let interactions = {
        liked: //check if user is in likes
        !!await Document.findOne({
            _id: document.id,
            like: request.loggedUser.id,
          }).exec(),
        saved: //check if document is in saved documents
        !!await User.findOne({
            _id: request.loggedUser.id,
            savedDocuments: document.id ,
          }).exec()
    }

    document = {
            _id: document._id,
            title: document.title,
            author: document.author,
            description: document.description,
            area: document.area,
            tag: document.tag,
            creationDate: document.creationDate,
            url: document.url,
            like:   document.like.length,
            dislike: document.dislike.length
        }

    // if document was found return document
    result
        .status(200)
        .json({
            status: true,
            message: 'Document found',
            document,
            author,
            interactions
        })
})

module.exports = router;
