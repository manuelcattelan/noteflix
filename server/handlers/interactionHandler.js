const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import document model
const Document = require('./../models/documentModel');
const User = require('./../models/userModel');

// save document to display it in user library (implemented as a toggle option)
router.post('/:id/save', async (request, result) =>{
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        result.status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
        return;
    }
    // find document by id parameter
    let document = await Document.findById(request.params.id);
    // if no document was found in the database
    if (!document){
        return result
            .status(404)
            .json({
                success: false,
                message: 'No document found with the given id',
            })
    }
    let user = await User.findById(request.loggedUser.id);
    if (!user){
        return result
            .status(404)
            .json({
                success: false,
                message: 'No user found with the id of the logged user'
            })
    }
    // find index of saved reference to logged user id, if it exists
    let savedIndex = user.savedDocuments.indexOf(document._id); 
    // if index == -1 it means that the document was not already saved
    if (savedIndex == -1){
        user.savedDocuments.push(document._id);
    } else {
        // if document was already saved, unsave it
        user.savedDocuments.pull(document._id);
    }
    // save document changes to database
    user.save()
        .then( () => {
            result.status(200)
                .json({
                    success: true,
                    message: "Document " + (savedIndex == -1 ? 'saved' : 'unsaved')+ " successfully",
                })
        })
        .catch( (error) => {
            return result
                .status(400)
                .json({
                    success: false,
                    message: error.message
                })
        })
})

// add a new comment to the document
router.patch('/:id/comment', async (request, result) =>{
     // check id length and id string format (must be hex)
     if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        result.status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
        return;
    }
    // check if any text was given for the comment
    if (!request.body.commentText) {
        result.status(400)
        .json({
            success: false,
            message: 'Missing comment body'
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
    // create comment object
    let comment = {
        author: request.loggedUser.id,
        body: request.body.commentText,
        date: new Date()
    }
    // add comment to list of document comments and save changes to database 
    document.comments.push(comment);
    document.save()
        .then( () => {
            result.status(200)
                .json({
                    success: true,
                    message: 'Comment added successfully',
                    commentBody: comment.body,
                    commentDate: comment.date,
                })
        })
        .catch( (error) => {
            return result
                .status(400)
                .json({
                    success: false,
                    message: error.message
                })
        })
});

// remove a specific comment from a document
router.delete('/:id/comment/:commentId', async (request, result) =>{
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/) ||
       request.params.commentId.length != 24 || request.params.commentId.match(/(?![a-f0-9])\w+/)){
        result.status(400)
            .json({
                success: false,
                message: 'Invalid document or comment id',
            })
        return;
    }
    // find document by id parameter
    let document = await Document.findById(request.params.id);
    // if no document was found in the database
    if (!document){
        return result
            .status(404)
            .json({
                success: false,
                message: 'No document found with the given id',
            })
    }
    // find index of comment with given id, if it exists
    let commentIndex = document.comments.map(function(comment) { return comment.id }).indexOf(request.params.commentId); 
    // if index == -1 it means that no comment with the given id was found
    if (commentIndex == -1){
        result
            .status(404)
            .json({
                success: false,
                message: 'No comment found with the given id',
            })
        return;
    } 
    // only moderators and comment authors are allowed to delete documents
    if (document.commets[commentIndex].author != request.loggedUser.id || request.loggedUser.type != 'moderator'){
        result
            .status(403)
            .json({
                success: false,
                message: 'You do not have the permissionto delete this comment',
            })
        return;
    }
    // if a comment with the given id was found, delete it
    document.comments.splice(commentIndex, 1);
    // save document changes to database
    document.save()
        .then( () => {
            result.status(200)
                .json({
                    success: true,
                    message: 'Comment deleted successfully'
                })
        })
        .catch( (error) => {
            return result
                .status(400)
                .json({
                    success: false,
                    message: error.message
                })
        })
});

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
                success: false,
                message: 'No document found with the given id',
            })
        return;
    }
    if (document.status == 'pending'){
        result
            .status(400)
            .json({
                success: false,
                message: 'You cannot report documents that are still pending',
            })
        return;
    }
    // check if logged user is mentor
    if (request.loggedUser.id == document.author){
        return result
            .status(403)
            .json({
                success: false,
                message: 'You cannot report your own document'
            })
    }
    // update reported attribute if it wasn't already reported by the logged user
    if (document.reported.indexOf(request.loggedUser.id) !== -1){
        result
            .status(200)
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

// add like or dislike to document
router.patch('/:id/:vote', async (request, result) =>{
    // check id length and id string format (must be hex)
    if(request.params.id.length != 24 || request.params.id.match(/(?![a-f0-9])\w+/)){
        result.status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
        return;
    }
    // check if document exists in the database
    let doc = await Document.findById(request.params.id);
    // if can't find on DB send error
    if (!doc){
        return result.status(404)
            .json({
                success: false,
                message: 'No document found with the given id',
            })
    }
    // check if current user has already liked/disliked
    let liked = doc.like.indexOf(request.loggedUser.id) != -1
    let disliked = doc.dislike.indexOf(request.loggedUser.id) != -1
    // remove any previous votes
    doc.like.pull(request.loggedUser.id)
    doc.dislike.pull(request.loggedUser.id)
    // check for vote parameter
    let rating = 'none';
    switch (request.params.vote) {
        case 'like':
            // if the document wasn't liked already add like
            if (!liked){
                doc.like.push(request.loggedUser.id);
                rating = "liked"
            }
            break;
        case 'dislike':
            if (!disliked){
                // if the documet wasn't already disliked add dislike
                doc.dislike.push(request.loggedUser.id);
                rating = "disliked"
            }
            break;
        default:
            // return error for any other :vote option
            return result.status(400)
            .json({
                success: false,
                message: 'Invalid vote option given',
            })
    }
    // save changes to database 
    doc.save().then(()=>{
        return result.status(200)
        .json({
            success: true,
            rating,
            like: doc.like.length,
            dislike: doc.dislike.length,
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
