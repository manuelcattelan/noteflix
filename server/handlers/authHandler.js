require('dotenv').config();

const express = require('express');
const router = express.Router();
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

const tokenHandler = require('./tokenHandler.js');

const User = require('./../models/userModel');

// login registered user
router.post('/login', async (request, result) => {
    // check if email and passwords were provided, else return error
    if ( !(request.body.email && request.body.password)){
        result.status(400).json({ success: false, message: 'La richiesta non è in un formato valido'});
        return;
    }
    // check if email matches a valid format, else return error
    if (!request.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        result.status(400).json({ success: false, message: "L'email è stata fornita in un formato invalido"});
        return;
    }
    // check if given email is one of a registered user, else return error 
    let user = await User.findOne({ email: request.body.email }).exec();
    if (!user){
        result.status(400).json({ success: false, message: "L'email fornita non risulta nei nostri database"});
        return;
    }
    // salt and hash given password and check with the stored digest 
    let pwdHash = crypto.createHash('sha256').update(request.body.password + user.passwordSalt).digest('hex');
    if (pwdHash ===  user.passwordHash){
        // if check was successfull, authenticate user and return generated token
        result.status(200).json({ success: true, message: 'Ecco il tuo token!',
        token: tokenHandler.createToken(user) });
        return;
    } 
    // if check was unsuccessfull, return error
    result.status(400).json({ success: false, message: 'La password non è corretta'});
});

// register new user
router.post('/signup', async (request, result) => {
    // check if email and passwords were provided, else return error
    if ( !(request.body.email && request.body.password && request.body.avatar && request.body.username && request.body.subscriptionType)){
        result.status(400).json({ success: false, message: 'Mancano dei parametri nel body della richiesta'});
        return;
    }
    // check if provided subscription information is valid 
    if (!(request.body.subscriptionType == 'studenti' || request.body.subscriptionType == 'nerd' || request.body.subscriptionType == 'matricole') ||
         (request.body.subscriptionType == "studenti" && (!request.body.subscriptionArea))){
        result.status(400).json({ success: false, message: 'Il piano di abbonamento selezionato non è valido'});
        return;
    }
    // check for valid email address 
    if (!request.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        result.status(400).json({ success: false, message: "L'email è stata fornita in un formato invalido"});
        return;
    }
    // check for user uniqueness, return error if a user with the same email already exists
    let prevUser = await User.findOne({ email: request.body.email }).exec();
    if (prevUser){
        result.status(400).json({ success: false, message: "L'Email fornita risulta già in uso"});
        return;
    }
    // calculate salt and hash
    let pwdSalt = crypto.randomBytes(16).toString('base64');
    let pwdHash = crypto.createHash('sha256').update(request.body.password + pwdSalt).digest('hex');
    // save to database
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
    // if user was successfully registered, also logs him in and return generated token 
    user.save()
        .then( () => {
            console.log('user saved');
            result.status(201).json({ success: true, message: 'Ecco il tuo token!',
                token: tokenHandler.createToken(user) });
            return;
        })
        .catch( (error) => {
            result.status(500).json({ success: false, message: error.message });
        })
})

module.exports = router;
