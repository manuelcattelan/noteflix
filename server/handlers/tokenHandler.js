require('dotenv').config();

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

// return decoded token information of logged in user
router.get('/', async (req, res) => {
    return res
        .status(200)
        .json({ 
            success: true, 
            tokenData: req.loggedUser
        });
})

// function used to create a token when a user logs in or signs up
function createToken(user){
    // create token payload
    var payload = { id: user._id,
                    type: user.userType};
    // if the user has a subscription (user or mentor), add this information to token
    if (user.subscription){
        if (new Date() - user.subscription.lastPayment < 30 * (1000*3600*24) )  //must have payed within 30 days
            payload.subscription = {
                type: user.subscription.subType,
                area: user.subscription.area,
            }
    }
    // add expire option and sign token
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

module.exports = {
    tokenChecker: tokenChecker,
    createToken: createToken,
    tokenApi: router
}
