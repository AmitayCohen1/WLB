const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const requireAuth = async (req, res, next) => { 

    const {autharization} = req.headers

    if(!autharization) { 
        return res.status(401).json({error: 'Autariztoion token required'});
    }
    const token = autharization.split(' ')[1]
    
    try { 
        const {_id} = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = User.findOne({ _id }).select('_id');
        next()
        
    } catch(err) { 
        res.status(401).json({err: 'Request is not autherized'});
    }   
}

module.exports = requireAuth;