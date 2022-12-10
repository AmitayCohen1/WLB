const express = require('express');
const { loginUser, signupUser } = require('../controllers/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)

router.get('/check-jwt', async (req, res) => {
    // get the JWT from the request
  
    const userToken = req.headers.authorization;
    const final = userToken.split(' ')[1];

      try {
      // verify the JWT using the secret or public key
      const decodedToken = await jwt.verify(final, process.env.SECRET_KEY);
  
      // JWT is valid
      res.status(200).send({ message: 'JWT is valid' });
    } catch (error) {
      // JWT is invalid or has expired
      res.status(401).send({ message: 'JWT is invalid or has expired' });
    }
  }); 

module.exports = router;