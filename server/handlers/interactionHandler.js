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

router.post('/:id/like', async (request, result) =>{
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

    let updated = await Document.updateOne({ _id: request.params.id },
            { $pull:{
                like: request.loggedUser.id
            }
        }).exec();

    //if can't find on DB send error
    if (!updated.matchedCount){
        return result.status(400)
            .json({
                success: false,
                liked: false,
                message: 'Invalid ID',
            })
    }

    //if like has been removed
    if (updated.modifiedCount){
        return result.status(200)
            .json({
                success: true,
                liked: false,
                message: 'Document unliked',
            })
    }

    await Document.updateOne({ _id: request.params.id },
        { $push:{
            like: request.loggedUser.id
        }
    }).exec();

    
    result.status(200)
        .json({
            success: true,
            liked: true,
            message: 'Document liked',
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
module.exports = router
