const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const mongoose = require('mongoose');
const Challenge = require('../models/ChallengeModel')


// POST a  new challenge
const postChallenge =  async (req, res) => { 
    console.log(title, description, reps, time, file,fileName)
    const SaveChallenge = new Challenge(req.body)
    SaveChallenge.save((error, saveChallenge)=>{
        if(error) throw error
        res.status(200).json(saveChallenge)
    } ) 
}

// GET all challenges
const getChallenges = async (req, res) => { 
    const challenges = await Challenge.find({}).sort({time: -1})
    for(const challenge of challenges) { 
            const getObjectParams = { 
                Bucket: bucketName,
                Key: challenge.fileName
            }
            const command = new GetObjectCommand(getObjectParams);
            const url =  await getSignedUrl(s3, command, { expiresIn: 3600 });
            challenge.fileURL = url;   
    }
   res.status(200).json(challenges);
}

// GET a single challenge
const getChallenge =  async (req, res) => { 
    const { id } = req.params;

    const challenges = await Challenge.findById({id})
   res.status(200).json(challenges);
}

// DELETE a challenge
const deleteChallenge = async (req, res) => { 
}


// UPDATE(PATCH) a challenge 
const updateChallenge = async (req, res) => { 
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(400).json({err: 'no such challenge'});
    }

    const challenge = await Challenge.findByIdAndUpdate({_id: id}, {...req.body})

    if(!challenge) { 
        return res.status(400).json({err: 'no such challenge'});
    }
    res.status(200).json(challenge);
}
 
module.exports = {  
    getChallenges,
    getChallenge,
    postChallenge,
    deleteChallenge,
    updateChallenge }

