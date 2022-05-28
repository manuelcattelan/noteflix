const express = require('express');
const router = express.Router();

const User = require('./../models/userModel');

router.get('/:id', async (req, res) => {
    // check id length and id string format (must be hex)
    if(req.params.id.length != 24 || req.params.id.match(/(?![a-f0-9])\w+/)){
        return res
            .status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
    }
    // check for user existence in database
    let user = await User.findById(req.params.id).exec();
    if (!user){
        return res
            .status(404)
            .json({
                success: false,
                message: 'User not found'
            })
    }
    // return username and avatar of user
    return res
        .status(200)
        .json({
            success: true,
            username: user.username,
            avatar: user.avatar
        })
})

router.patch('/:id/upgrade', async (req, res) => {
    // check id length and id string format (must be hex)
    if(req.params.id.length != 24 || req.params.id.match(/(?![a-f0-9])\w+/)){
        return res
            .status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
    }
    // check for user existence in database
    let user = await User.findById(req.params.id).exec();
    if (!user){
        return res
            .status(404)
            .json({
                success: false,
                message: 'User not found'
            })
    }
    if (req.loggedUser.type != "moderator"){
        return res
            .status(401)
            .json({
                success: false,
                message: 'Only moderators are allowed to upgrade users to mentors'
            })
    }  
    if (user.userType != 'user'){ 
        return res
            .status(400)
            .json({
                success: false,
                message: 'User cannot be upgraded'
            })
    };
    user.userType = 'mentor';
    user.save()
        .then ( () => {
            return res
                .status(200)
                .json({ 
                    success: true,
                    message: 'User was successfully upgraded to mentor'
                });
        })
        .catch( (error) => {
            return res
                .status(400)
                .json({ 
                    success: true,
                    message: error.message 
                });
        })
})

router.patch('/:id/downgrade', async (req, res) => {
    // check id length and id string format (must be hex)
    if(req.params.id.length != 24 || req.params.id.match(/(?![a-f0-9])\w+/)){
        return res
            .status(400)
            .json({
                success: false,
                message: 'Invalid ID',
            })
    }
    // check for user existence in database
    let user = await User.findById(req.params.id).exec();
    if (!user){
        return res
            .status(404)
            .json({
                success: false,
                message: 'User not found'
            })
    }
    if (req.loggedUser.type != "moderator"){
        return res
            .status(401)
            .json({
                success: false,
                message: 'Only moderators are allowed to downgrade mentors to users'
            })
    }
    if (user.userType != 'mentor'){ 
        return res
            .status(400)
            .json({
                success: false,
                message: 'User cannot be downgraded'
            })
    };
    user.userType = 'user';
    user.save()
        .then ( () => {
            return res
                .status(200)
                .json({ 
                    success: true,
                    message: 'Mentor was successfully downgraded to user'
                });
        })
        .catch( (error) => {
            return res
                .status(400)
                .json({ 
                    success: true,
                    message: error.message
                });
        })
})

module.exports = router
