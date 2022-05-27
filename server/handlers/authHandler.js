require('dotenv').config();

const express = require('express');
const router = express.Router();
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

const tokenChecker = require('./tokenHandler.js');

const User = require('./../models/userModel');

router.post('/login', async (request, result) => {
    if ( !(request.body.email && request.body.password)){
        result.status(400).json({ success: false, message: 'Malformed request'});
        return;
    }

    if (!request.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        result.status(400).json({ success: false, message: 'Invalid email address'});
        return;
    }
    
    let user = await User.findOne({ email: request.body.email }).exec();
    if (!user){
        result.status(400).json({ success: false, message: 'Invalid username'});
        return;
    }
    
    let pwdHash = crypto.createHash('sha256').update(request.body.password + user.passwordSalt).digest('hex');
    if (pwdHash ===  user.passwordHash){
        result.status(200).json({ success: true, message: 'Enjoy your token!',
        token: tokenChecker.createToken(user) });
        return;
    } 

    result.status(400).json({ success: false, message: 'Invalid password'});
});

router.post('/signup', async (request, result) => {
    if ( !(request.body.email && request.body.password && request.body.avatar && request.body.username && request.body.subscriptionType)){
        result.status(400).json({ success: false, message: 'Missing parameters in rerquest body'});
        return;
    }

    if (!(request.body.subscriptionType == 'studenti' || request.body.subscriptionType == 'nerd' || request.body.subscriptionType == 'matricole') ||
         (request.body.subscriptionType == "studenti" && (!request.body.subscriptionArea))){
        result.status(400).json({ success: false, message: 'Invalid subscription plan'});
        return;
    }

    //check for valid email address (i have no idea if the regex is correct)
    if (!request.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        result.status(400).json({ success: false, message: 'Invalid email address'});
        return;
    }

    //check for uniqueness
    let prevUser = await User.findOne({ email: request.body.email }).exec();
    if (prevUser){
        result.status(400).json({ success: false, message: 'Email aready in use'});
        return;
    }
    
    //calculate salt and hash
    let pwdSalt = crypto.randomBytes(16).toString('base64');
    let pwdHash = crypto.createHash('sha256').update(request.body.password + pwdSalt).digest('hex');

    //save to database
    let user = new User ({
        email: request.body.email,
        passwordHash: pwdHash,
        passwordSalt: pwdSalt,
        username: request.body.username,
        joinDate: new Date(),
        avatar: request.body.avatar,
        subscription: {
            subType: request.body.subscriptionType,
            area: request.body.subscriptionArea,
            creationDate: new Date,
            lastPayment: new Date
        },
        userType: 'user'
    })
    
    if (await user.save()){
        console.log('user saved');
        result.status(201).json({ success: true, message: 'Enjoy your token!',
                token: tokenChecker.createToken(user) });
        return;
    }
    result.status(400).json({ success: false, message: 'Unknown error'});
    
})

router.patch('/changePwd', async (request, result) => {
    if ( !(request.body.oldPassword && request.body.newPassword)){
        result.status(400).json({ success: false, message: 'Malformed request'});
        return;
    }
    let usr = await User.findById(request.loggedUser.id);
    let hash = crypto.createHash('sha256').update(request.body.oldPassword + usr.passwordSalt).digest('hex');
    if (hash != usr.passwordHash){
        result.status(400).json({ success: false, message: 'Old password doesn\'t match'});
        return;
    }

    hash = crypto.createHash('sha256').update(request.body.newPassword + usr.passwordSalt).digest('hex');
    usr.passwordHash = hash;
    await usr.save();
    result.status(200).json({ success: true, message: 'Password successfully updated'});
})
module.exports = router;
