require('dotenv').config();

const express = require('express');
const router = express.Router();
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

const tokenChecker = require('./tokenHandler.js');

const User = require('./../models/userModel');
const Subscription = require('./../models/subscriptionModel');

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
        subs = await Subscription.findById(user.subscription).exec();
        result.status(200).json({ success: true, message: 'Enjoy your token!',
        token: tokenChecker.createToken(user, subs) });
        return;
    } 

    result.status(400).json({ success: false, message: 'Invalid password'});
});

router.post('/signup', async (request, result) => {
    if ( !(request.body.email && request.body.password && request.body.avatar && request.body.username) ||
         !(req.body.subscriptionType == 'studenti' || req.body.subscriptionType == 'nerd' || req.body.subscriptionType == 'matricole') ||
          (req.body.subscriptionType == "studenti" && (!req.body.subscriptionArea))){
        result.status(400).json({ success: false, message: 'Malformed request'});
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
            subType: req.body.subscriptionType,
            area: req.body.subscriptionArea,
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


module.exports = router;
