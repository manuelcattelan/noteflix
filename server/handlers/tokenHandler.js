require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function createToken(user, subscription){
    var payload
    if (subscription){
        console.log(user.subscription)
        payload = { id: user._id, 
            subscriptionType: subscription.type,
            subscriptionArea: subscription.area};
    } else {
        payload = { id: user._id };
    }
    var options = { expiresIn: 86400 } // expires in 24 hours
    var token = jwt.sign(payload, process.env.TOKEN_SECRET, options);
    return token;
}

const tokenChecker = function ( req, res, next ) {
// header or url parameters or post parameters
    var token = req.body.token || req.query.token || req.headers[ 'x-access-token'];
    if (!token) {
        res.status(401).json({ success: false, message: 'No token provided.'});
        return
    }
    
    // decode token, verifies secret and checks expiration
    jwt.verify(token, process.env.TOKEN_SECRET, function ( err, decoded ) {
        if (err) 
            res.status( 403 ).json({ success: false, message: 'Token not valid'});
        else {
            // if everything is good, save in req object for use in other routes
            req.loggedUser = decoded;
            next();
        }
    });
};

function checkPermissions (req, macroarea) {
    var token = req.body.token || req.query.token || req.headers[ 'x-access-token'];
    var tokenData = jwt_decode(token);
    return (tokenData.subscription == "Nerd" ||
            tokenData.area == macroarea )
} 


module.exports = {
    tokenChecker: tokenChecker,
    createToken: createToken,
    checkPermissions: checkPermissions
}