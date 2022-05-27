const express = require('express'); // express library
const path = require('path'); // path library
const multer = require('multer'); // multer library to handle form-data
const multerS3 = require('multer-s3'); // multerS3 library to handle document upload
const AWS = require('aws-sdk'); // aws library to handle s3 bucket

// router object to create and manage requests 
const router = express.Router();

// import document model
const Document = require('./../models/documentModel');
// import user model
const User = require('./../models/userModel');

// define amazon cloud storage
const s3 = new AWS.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
}) 

// define multer storage object to handle document upload
const upload = multer({
    storage: multerS3 ({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            // the document is saved with a name generated from the current date
            cb(null, Date.now().toString()+'.pdf')
        }
    }),
    // check prerequisites for document upload
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

// define function used to upload file to s3 storage using the upload middleware
const uploadFile = upload.single('url');

// route handler for document upload
router.post('', async (request, result) => {
    // upload document sent in form to s3 storage
    uploadFile(request, result, function(error) {
        // error returned by multer upload function
        if(error){
            return result
                    .status(400)
                    .send({ 
                        success: false, 
                        message: error.message
                    })
        }
        // if here, the document was successfully uploaded to s3 storage
        // convert tag attribute from string with spaces to array of elements
        let tags = request.body.tag.split(" ");
        // retrieve document url from s3 bucket
        let documentLocation = request.file.location;
        // create new document entry
        let document = new Document ({
            title: request.body.title,
            author: request.loggedUser.id,
            description: request.body.description,
            area: request.body.area,
            tag: tags,
            creationDate: new Date,
            url: documentLocation,
        })
        // store new document entry in database
        document.save()
            .then( document => {
                // document was saved successfully
                console.log('-> document successfully uploaded to database')
                return result
                    .status(201)
                    .json({ 
                        success: true,
                        message: 'Document created successfully', 
                        document
                    });
            })
            .catch( error => {
                // document save failed
                console.log('-> document upload failed')
                return result
                    .status(400)
                    .json({
                        success: false,
                        message: error.message
                    })
            })
    })
});

// route handler for listing all public documents 
router.get('', async (request, result) => {
    // find all documents that are public
    let documents = await Document.find({ status: "public" }).exec();
    // if no documents were found in the database
    if (!documents || documents.length == 0){
        return result
            .status(204)
            .send()
    }
    // if documents were found, extract needed information to return
    documents = documents.map( (doc)=>{
        return {
            _id: doc._id,
            title: doc.title,
            description: doc.description,
            approval: 100 * doc.like.length/(doc.like.length + doc.dislike.length), 
            url: doc.url,
        }
    })
    // return needed information to show document preview
    return result
        .status(200)
        .json({
            success: true,
            message: 'Public documents found',
            documents: documents
        })
});

// route handler for listing pending documents waiting for validation
router.get('/pending', async (request, result) => {
    // find all documents that are waiting for validation
    let documents = await Document.find({ status: "pending" }).exec();
    // if no documents were found in the database
    if (!documents || documents.length == 0){
        return result
            .status(204)
            .send()
    }
    // if documents were found, extract needed information to return
    documents = documents.map( (doc)=>{
        return {
            _id: doc._id,
            title: doc.title,
        }
    })
    // return needed information to show list of pending documents 
    return result
        .status(200)
        .json({
            success: true,
            message: 'Pending documents found',
            documents: documents
        })
});

// route handler for listing reported documents waiting for validation
router.get('/reported', async (request, result) => {
    // find all documents that have been reported
    let documents = await Document.find({ reported: true }).exec();
    // if no documents were found in the database
    if (!documents || documents.length == 0){
        return result
            .status(204)
            .send()
    }
    // if documents were found, extract needed information to return
    documents = documents.map( (doc)=>{
        return {
            _id: doc._id,
            title: doc.title,
        }
    })
    // return needed information to show list of reported documents
    return result
        .status(200)
        .json({
            success: true,
            message: 'Reported documents found',
            documents: documents
        })
});

// route handler for listing all documents uploaded by logged mentor
router.get('/uploaded', async (request, result) => {
    // check if logged user is mentor
    if (request.loggedUser.type != "mentor"){
        console.log(request.loggedUser.type);
        return result
            .status(401)
            .json({
                success: false,
                message: 'User is not a mentor'
            })
    }
    // check for user existence in database
    let user = await User.findById(request.loggedUser.id).exec();
    if (!user){
        return result
            .status(404)
            .json({
                success: false,
                message: 'User not found'
            })
    }
    // find all documents that have been uploaded from current mentor
    let documents = await Document.find({ author: user._id }).exec();
    // if no documents were found in the database
    if (!documents || documents.length == 0){
        return result
            .status(204)
            .send()
    }
    // if documents were found, extract needed information to return
    documents = documents.map( (doc)=>{
        return {
            _id: doc._id,
            title: doc.title,
            status: doc.status,
            totalVotes: (doc.like.lenght + doc.dislike.length),
            approval: 100 * doc.like.length/(doc.like.length + doc.dislike.length), 
            totalComments: doc.comments.length
        }
    })
    // return needed information to show list of uploaded documents
    return result
        .status(200)
        .json({
            success: true,
            message: 'Uploaded documents found',
            documents: documents
        })
})

// route handler for listing a document by ID
router.get('/:id', async (request, result) => {
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        return result
            .status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
    }
    // find document by id parameter
    let document = await Document.findById(request.params.id);
    // if no document was found in the database
    if (!document){
        return result
            .status(404)
            .json({
                success: true,
                message: 'No document found with the given id',
            })
    }
    //check if subscription plan is sufficient
    if (! request.loggedUser.subscription ||
        !(request.loggedUser.subscription.type == 'nerd' || 
         (request.loggedUser.subscription.type == 'studente' && request.loggedUser.subscription.area == document.area))){
        return result
            .status(401)
            .json({
                status: false,
                message: 'Your subscription plan does not allow you to view this document.',
            })
    }
    // retrieve user name of document author
    let author = await User.findById(document.author);
    if (!author)
        author = {username: '[deleted]'};
    else 
        author = {username: author.username, avatar: author.avatar};
    // handle user interactions with retrieved documents
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
    return result
        .status(200)
        .json({
            success: true,
            message: 'Document found',
            document,
            author,
            interactions
        })
})

// route handler for deleting a document by ID
router.delete('/:id', async(request, result) => {
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        return result
            .status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
    }
    // look for document with provided id
    let document = await Document.findById(request.params.id).exec();
    // if no document was found in the database
    if (!document){
        return result
            .status(404)
            .json({
                success: true,
                message: 'No document found with the given id',
            })
    }
    // retrieve document name from url attribute
    let documentName = path.basename(document.url);
    // create params object for document deletion
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: documentName
    }
    // delete document from database
    document.deleteOne()
        .catch( error => {
            // document deletion failed
            console.log('-> document deletion failed')
            return result
                .status(400)
                .json({
                    success: false,
                    message: error.message
                })
        })
    // delete document from cloud storage
    s3.deleteObject(params, function (error, data) {
        // document deletion from cloud failed
        if (error){
            return result
                    .status(400)
                    .send({ 
                        success: false, 
                        message: error.message
                    })
        }
        // document deletion from cloud succeeded
        return result
                .status(200)
                .send({
                    success: true,
                    message: 'Document deleted'
                })
    })
})

// route handler for updating the "reported" attribute on document report
router.patch('/:id/report', async (request, result) => {
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        return result
            .status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
    }
    // look for document with provided id
    let document = await Document.findById(request.params.id).exec();
    // if no document was found
    if (!document){
        result
            .status(404)
            .json({
                success: true,
                message: 'No document found with the given id',
            })
        return;
    }
    // if document was already reported, do nothing and return
    if(document.reported){
        return result
            .status(200)
            .json({ 
                success: true,
                message: 'Document was already reported and is being evaluated'
            });
    }
    // if here, document was not already reported
    // update reported attribute
    document.reported = true;
    // push changes to database
    document.save()
        .then( () => {
            // document report was successfull
            return result
                .status(200)
                .json({ 
                    success: true,
                    message: 'Document reported successfully'
                });
        })
        .catch( error => {
            // document report failed
            return result
                .status(400)
                .json({
                    success: false,
                    message: error.message
                })
        })
})

// route handler for updating the "pending" attribute to "public" on document report
router.patch('/:id/validate', async (request, result) => {
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        return result
            .status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
    }
    // look for document with provided id
    let document = await Document.findById(request.params.id).exec();
    // if no document was found
    if (!document){
        result
            .status(404)
            .json({
                success: true,
                message: 'No document found with the given id',
            })
        return;
    }
    // if document was pending, publish it
    if (document.status == "pending"){ document.status = "public"; }
    // if document was public and got reported, validate it
    else if (document.status == "public" && document.reported == true) { document.reported = false; }
    // push changes to database
    document.save()
        .then( () => {
            // document publish was successfull
            return result
                .status(200)
                .json({ 
                    success: true,
                    message: 'Document validated successfully'
                });
        })
        .catch( error => {
            // document publish failed
            return result
                .status(400)
                .json({
                    success: false,
                    message: error.message
                })
        })
})
module.exports = router;
