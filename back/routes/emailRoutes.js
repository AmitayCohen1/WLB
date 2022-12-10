const express = require('express');
const sendMessage = require('../models/sendGrid');
const router = express.Router()

//SendGrid 
router.post('/', async (req, res) => {
    const content = req.body.data
    const response = await sendMessage(content)
    res.status(200).send(content)
})

module.exports = router;