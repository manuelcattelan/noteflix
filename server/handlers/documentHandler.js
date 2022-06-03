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
    // check if logged user is mentor
    if (request.loggedUser.type != "mentor"){
        return result
            .status(403)
            .json({
                success: false,
                message: "Devi essere un mentor per pubblicare un documento"
            })
    }
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
                        message: "Il documento è stato caricato con successo", 
                        documentId: document._id
                    });
            })
            .catch( error => {
                // document save failed
                console.log('-> document upload failed')
                return result
                    .status(500)
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
            area: doc.area
        }
    })
    // return needed information to show document preview
    return result
        .status(200)
        .json({
            success: true,
            message: "Sono stati trovati dei documenti",
            documents: documents
        })
});

// route handler for listing pending documents waiting for validation
router.get('/pending', async (request, result) => {
    // check if logged user is mentor
    if (request.loggedUser.type != "moderator"){
        return result
            .status(403)
            .json({
                success: false,
                message: "Solo i moderatori possono rendere pubblici i documenti in attesa di approvazione"
            })
    }
    // find all documents that are waiting for validation
    let documents = await Document.find({ status: "pending" }).exec();
    // if no documents were found in the database
    if (!documents || documents.length == 0){
        return result
            .status(204)
            .send()
    }
    // if documents were found, extract needed information to return
    documents = await Promise.all(documents.map( async (doc) => {
        let author = await User.findById(doc.author);
        let authorEmail
        if (!author){ authorEmail = '[deleted]'; }
        else { authorEmail = author.email; }
        return {
            _id: doc._id,
            title: doc.title,
            authorEmail: authorEmail
        }
    }));
    // return needed information to show list of pending documents 
    return result
        .status(200)
        .json({
            success: true,
            message: "Sono stati trovati documenti in attesa di essere approvati",
            documents: documents
        })
});

// route handler for listing reported documents waiting for validation
router.get('/reported', async (request, result) => {
    // check if logged user is mentor
    if (request.loggedUser.type != "moderator"){
        return result
            .status(403)
            .json({
                success: false,
                message: "Solo i moderatori possono visualizzare i documenti segnalati"
            })
    }
    // find all documents that have been reported
    let documents = await Document.find({ 'reported.0':  { $exists: true }}).exec();
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
            reportedTimes: doc.reported.length
        }
    })
    // return needed information to show list of reported documents
    return result
        .status(200)
        .json({
            success: true,
            message: "Sono stati trovati documenti segnalati dagli utenti",
            documents: documents
        })
});

// route handler for listing all documents uploaded by logged mentor
router.get('/uploaded', async (request, result) => {
    // check if logged user is mentor
    if (request.loggedUser.type != "mentor"){
        return result
            .status(403)
            .json({
                success: false,
                message: "Solo i mentor possono ottenere la lista dei file da loro pubblicati"
            })
    }
    // find all documents that have been uploaded from current mentor
    let documents = await Document.find({ author: request.loggedUser.id }).exec();
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
            totalVotes: (doc.like.length + doc.dislike.length),
            approval: 100 * doc.like.length/(doc.like.length + doc.dislike.length), 
            totalComments: doc.comments.length
        }
    })
    // return needed information to show list of uploaded documents
    return result
        .status(200)
        .json({
            success: true,
            message: "Sono stati trovati i documenti che hai caricato",
            documents: documents
        })
})

// route handler for listing all documents uploaded by logged mentor
router.get('/saved', async (request, result) => {
    // find information of logged in user
    let user = await User.findById(request.loggedUser.id).exec();
    // find all documents that have been saved from currently logged in user
    let documents = await Document.find({ status: "public", _id: {$in: user.savedDocuments }}).exec();
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
            area: doc.area
        }
    })
    // return needed information to show list of saved documents
    return result
        .status(200)
        .json({
            success: true,
            message: 'Sono stati trovati i documenti che hai salvato',
            documents: documents
        })
})

// route handler for listing most liked documents
router.get('/mostLiked', async (request, result) => {
    // find 10 most liked documents
    let documents = await Document.find({ status: "public" }).sort({ like: 'desc' }).limit(10).exec();
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
            area: doc.area
        }
    })
    // return needed information to show document preview
    return result
        .status(200)
        .json({
            success: true,
            message: "Sono stati trovati i documenti con più like",
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
                message: "l'ID del documento non è valido",
            })
    }
    // find document by id parameter
    let document = await Document.findById(request.params.id);
    // if no document was found in the database
    if (!document){
        return result
            .status(404)
            .json({
                success: false,
                message: "Nessun documento è stato trovato con l'ID fornito",
            })
    }
    // grant access to document to every moderator
    let isModerator = (request.loggedUser.type == "moderator");
    // grant access to document for document author
    let isAuthor = (request.loggedUser.id == document.author);
    // check if logged user has a subscription plan
    let hasSubscription = (request.loggedUser.subscription);
    // check if user subscription is valid for document access
    let hasValidSubscription = ((request.loggedUser.subscription.type == "nerd") || 
                                (request.loggedUser.subscription.type == "studenti" && request.loggedUser.subscription.area == document.area)) 
    if (!(isModerator || isAuthor)){
        if (!hasSubscription)
            return result
                .status(403)
                .json({
                    success: false,
                    message: "Il tuo piano di abbonamento non ti permette di vedere questo documento",
                })
        if (!hasValidSubscription) {
            return result
                .status(403)
                .json({
                    success: false,
                    message: "Il tuo piano di abbonamento non ti permette di vedere questo documento",
                })
        }
    }
    // retrieve user name of document author
    let author = await User.findById(document.author);
    if (!author)
        author = {username: '[deleted]'};
    else 
        author = {username: author.username, avatar: author.avatar};
    // Check the rating status (liked, disliked or none)
    let rating = 'none';
    if (document.like.indexOf( request.loggedUser.id) != -1)
        rating = 'liked'
    else if (document.dislike.indexOf( request.loggedUser.id) != -1)
        rating = 'disliked'
    // create interaction object
    let interactions = {
        rating,
        saved: //check if document is in user's saved documents
        !!await User.findOne({
            _id: request.loggedUser.id,
            savedDocuments: document.id ,
          }).exec()
    }
    //gather user data for each comment author
    let comments = await Promise.all(document.comments.map( async (comment) => {
        let author = await User.findById(comment.author);
        if (!author)
            author = {username: '[deleted]'};
        else 
            author = {username: author.username, avatar: author.avatar};
        return {
            date: comment.date,
            id: comment._id,
            author,
            body: comment.body
        }
    }));
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
            dislike: document.dislike.length,
            approval: 100 * document.like.length/(document.like.length + document.dislike.length)
        }
    // if document was found return document
    return result
        .status(200)
        .json({
            success: true,
            message: "Documenti trovati!",
            document,
            author,
            comments,
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
                message: "l'ID del documento non è valido",
            })
    }
    
    // look for document with provided id
    let document = await Document.findById(request.params.id).exec();
    //only author and a moderator can delete a resource
    if (request.loggedUser.type != "moderator" && 
        request.loggedUser.id   != document.author){
        return result
            .status(403)
            .json({
                success: false,
                message: "Non puoi eliminare documenti a meno che tu non sia il proprietario o un moderatore"
            })
    }
    // if no document was found in the database
    if (!document){
        return result
            .status(404)
            .json({
                success: false,
                message: "Nessun documento è stato trovato con l'ID fornito",
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
                .status(500)
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
                    message: "Il documento è stato eliminato con successo"
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
                message: "l'ID del documento non è valido",
            })
    }
    // check if current user is a moderator
    if (request.loggedUser.type != "moderator"){
        return result
            .status(403)
            .json({
                success: false,
                message: "Non puoi approvare una risorsa a meno che tu non sia un moderatore"
            })
    }
    // look for document with provided id
    let document = await Document.findById(request.params.id).exec();
    // if no document was found
    if (!document){
        result
            .status(404)
            .json({
                success: false,
                message: "Nessun documento è stato trovato con l'ID fornito",
            })
        return;
    }
    // if document was pending, publish it
    if (document.status == "pending"){ 
        document.status = "public"; 
    }
    // if document was public and got reported, validate it
    else if (document.status == "public" && document.reported.length > 0) { 
        document.reported = [];
    }
    // push changes to database
    document.save()
        .then( () => {
            // document publish was successfull
            return result
                .status(200)
                .json({ 
                    success: true,
                    message: "Il documento è stato approvato con successo!"
                });
        })
        .catch( error => {
            // document publish failed
            return result
                .status(500)
                .json({
                    success: false,
                    message: error.message
                })
        })
})

module.exports = router;
