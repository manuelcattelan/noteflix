require('dotenv').config();

const express = require('express');
const router = express.Router();
  

const User = require('./../models/userModel');
const tokenChecker = require('./tokenHandler.js');


//only authenticated
router.post('', async (req, result) => {
    if ( !(req.body.subscriptionType == 'studenti' || req.body.subscriptionType == 'nerd' || req.body.subscriptionType == 'matricole') ||
     (req.body.subscriptionType == "studenti" && (!req.body.subscriptionArea)) ){
        result.status(400).json({ success: false, message: 'Malformed request'});
        return;
    }
    
    var usr = await User.findById(req.loggedUser.id).exec();

    sub = {
        subType: req.body.subscriptionType,
        area: req.body.subscriptionArea,
        creationDate: new Date,
        lastPayment: new Date
    };


    usr.subscription = sub;
    await usr.save();   
    
    result.status(201).json({ success: true, message: 'Enjoy your token!',
                token: tokenChecker.createToken(usr) });
    return;

});


module.exports = router;
