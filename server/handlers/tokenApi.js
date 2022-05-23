const express = require('express');
require('dotenv').config();
const router = express.Router();

const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    res.status(200).json({ success: true, tokenData: req.loggedUser});
})

module.exports = router