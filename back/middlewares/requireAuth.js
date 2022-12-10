const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const requireAuth = async (req, res, next) => { 

    const { authorization } = req.headers
    console.log(authorization)

    if(!authorization) { 
        console.log('aaaaa')
        return res.status(401).json({error: 'Autariztoion token required'});
    }
    
    const token = authorization.split(' ')[1]
    
    try { 
        const {_id} = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = User.findOne({ _id }).select('_id');
        res.status(200).json({_id: 'goodAuth'})
        next()
    } catch(err) { 
        console.log('problem with Auth', err)
        res.status(401).json({err: 'Request is not autherized'});
    }   
}

module.exports = requireAuth;