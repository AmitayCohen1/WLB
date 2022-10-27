const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => { 
  return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3d'})
}


const loginUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
      const fullUser = await User.findOne({email: email})
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({userName: fullUser.userName, email, token})
    } catch (error) {
      res.status(400).json({err: error.message})
    }
  }


const signupUser = async (req, res) => { 
    const {userName, email, password} = req.body
    console.log('recived user Name from front', userName)
    try { 
        const newUser = await User.signup(userName, email, password);
        const token = await createToken(newUser._id)
        res.status(200).json({userName, email, token});

    }
    catch(err) { 
        console.log('catch error in signup router', err)
        res.status(400).json({err: err.message});
    }
}


module.exports = { loginUser, signupUser}

