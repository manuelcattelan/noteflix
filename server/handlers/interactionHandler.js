const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import document model
const Document = require('./../models/documentModel');
const User = require('./../models/userModel');


router.post('/:id/save', async (request, result) =>{
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        result.status(400)
            .json({
                success: false,
                saved: false,
                message: 'Invalid ID',
            })
        return;
    }

    let updated = await User.updateOne({ _id: request.loggedUser.id },
            { $pull:{
                savedDocuments: request.params.id
            }
        }).exec();

    if (updated.modifiedCount){
        result.status(200)
            .json({
                success: true,
                saved: false,
                message: 'Document unsaved',
            })
        return;
    }

    await User.updateOne({ _id: request.loggedUser.id },
        { $push:{
            savedDocuments: request.params.id
        }
    }).exec()
    
    result.status(200)
        .json({
            success: true,
            saved: true,
            message: 'Document saved',
        })
    return;
})


router.post('/:id/comment', async (request, result) =>{
     // check id length and id string format (must be hex)
     if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        result.status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
        return;
    }

    if (!request.body.commentText) {
        result.status(400)
        .json({
            success: false,
            message: 'Missing commentText in request body'
        })
    }

    //push new comment to document
    await Document.updateOne({ _id: request.params.id },
        { $push:{
            comments: {
                author: request.loggedUser.id,
                date: new Date(),
                body: request.body.commentText
            }
        }
    }).exec();

    result.status(200)
        .json({
            success: true,
            message: 'Comment added successfully'
        })

});

router.delete('/:id/comment/:commentId', async (request, result) =>{
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/) ||
       request.params.commentId.length != 24 || request.params.commentId.match(/(?![a-f0-9])\w+/)){
        result.status(400)
            .json({
                success: false,
                message: 'Invalid document or comment ID',
            })
        return;
    }

    //find and remove comment from document only if author matches token data
    let updated = await Document.updateOne({ _id: request.params.id },
        { $pull:{
            comments: {
                _id: request.params.commentId,
                author: request.loggedUser.id
            }
        }
    }).exec();

    //if it was modified then show success
    if (updated.modifiedCount){
        return result.status(200)
        .json({
            success: true,
            message: 'Comment deleted successfully'
        })
    }
    
    return result.status(400)
        .json({
            success: false,
            message: 'Delete failed'
        })

});

// route handler for updating the "reported" attribute on document report
router.patch('/:id/report', async (request, result) => {
    // check if logged user is mentor
    if (request.loggedUser.type == "mentor"){
        return result
            .status(401)
            .json({
                success: false,
                message: 'Mentors are not allowed to report documents'
            })
    }
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
    // update reported attribute if it wasn't already reported by the logged user
    if (document.reported.indexOf(request.loggedUser.id) !== -1){
        result
            .status(400)
            .json({
                success: true,
                message: 'You have reported this document already',
            })
        return;
    }
    document.reported.push(request.loggedUser.id);
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


router.patch('/:id/:vote', async (request, result) =>{
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        result.status(400)
            .json({
                success: false,
                liked: false,
                message: 'Invalid ID',
            })
        return;
    }

    let doc = await Document.findById(request.params.id);

    //if can't find on DB send error
    if (!doc){
        return result.status(404)
            .json({
                success: false,
                message: 'Document not found',
            })
    }

    //check if current user has already liked/disliked
    let liked = doc.like.indexOf(request.loggedUser.id) != -1
    let disliked = doc.dislike.indexOf(request.loggedUser.id) != -1

    //remove any previous votes
    doc.like.pull(request.loggedUser.id)
    doc.dislike.pull(request.loggedUser.id)

    let num = 0;
    switch (request.params.vote) {
        case 'like':
            //if the document wasn't liked already add like
            if (!liked){
                doc.like.push(request.loggedUser.id);
                num = 1;
            }
            break;
        case 'dislike':
            if (!disliked){
                doc.dislike.push(request.loggedUser.id);
                num = -1;
            }
            break;
        default:
            //return error for any other :vote option
            return result.status(400)
            .json({
                success: false,
                message: 'Invalid operation',
            })
    }
    
    doc.save().then(()=>{
        return result.status(200)
        .json({
            success: true,
            status: num,
            message: "Document "+ (!num?"un":'')+request.params.vote+"d successfully" 
            //generate return message (it's a bit overcomplicated but ok)
        })
    }).catch( error => {
        // document save failure
        return result
            .status(400)
            .json({
                success: false,
                message: error.message
            })
    })
})


module.exports = router
