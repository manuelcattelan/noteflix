require('dotenv').config();

const express = require('express');
const router = express.Router();
  

const User = require('./../models/userModel');
const Subscription = require('./../models/subscriptionModel');
const tokenChecker = require('./tokenHandler.js');


//only authenticated
router.post('', async (req, result) => {
    if ( (!req.body.subscriptionType) ||
     (req.body.subscriptionType != "Nerd" && (!req.body.subscriptionArea)) ){
        result.status(400).json({ success: false, message: 'Malformed request'});
        return;
    }
    
    var usr = await User.findById(req.loggedUser.id).exec();
    
    //delete any previous subscription
    await Subscription.deleteOne({ _id: usr.subscription });

    var subs = new Subscription ({
        type: req.body.subscriptionType,
        creationDate: new Date,
        lastPayment: new Date
    })

    if (req.body.subscriptionType != "Nerd"){
        subs.area= req.body.subscriptionArea;
    }

    await subs.save();
    usr.subscription = subs._id;
    await usr.save();   
    
    result.json({ success: true, message: 'Enjoy your token!',
                token: tokenChecker.createToken(usr, subs), email: usr.email, id: usr._id, self: "api/v1/" + usr._id });
    return;

});


module.exports = router;
