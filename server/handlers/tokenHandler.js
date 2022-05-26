require('dotenv').config();

const jwt = require('jsonwebtoken');

function createToken(user){
    var payload = { id: user._id,
                    type: user.userType};
    if (user.subscription){
        if (new Date() - user.subscription.lastPayment < 30 * (1000*3600*24) )  //must have payed within 30 days
            payload.subscription = {
                type: user.subscription.subType,
                area: user.subscription.area,
            }
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

module.exports = {
    tokenChecker: tokenChecker,
    createToken: createToken,
}