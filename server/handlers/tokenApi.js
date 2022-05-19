const express = require('express');
require('dotenv').config();
const router = express.Router();

const jwt = require('jsonwebtoken');

router.get('/:token', async (req, res) => {
    // decode token, verifies secret and checks expiration
    jwt.verify(req.params.token, process.env.TOKEN_SECRET, function ( err, decoded ) {
        if (err) 
            res.status(403).json({ success: false, message: 'Token not valid'});
        else {
            // if everything is good, save in req object for use in other routes
            res.status(200).json({ success: false, tokenData: decoded});
        }
    });
})

module.exports = router