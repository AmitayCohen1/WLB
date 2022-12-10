const express = require('express');
const multer =  require("multer");
const crypto = require('crypto')
const Challenge = require('../models/ChallengeModel')
const Reply = require('../models/ChallengeModel')
const router = express.Router();
const {CloudFrontClient} = require('@aws-sdk/client-cloudfront')
const  { S3Client, GetObjectCommand, DeleteObjectCommand} = require ('@aws-sdk/client-s3');
const {newParent, newChild} = require('../models/sendGrid')
require('dotenv').config() 
const AWS = require('aws-sdk');
const { generateUploadURL } = require('../s3');


//--Set up--
 //AWS



//AWS
bucketName = process.env.BUCKET_NAME
bucketRegion = process.env.BUCKET_REGION
accessKey = process.env.ACCESS_KEY
secretAccessKey = process.env.SECRET_ACCESS_KEY
// const cloudfrontDistributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID

const s3 = new AWS.S3();

const s3Client = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    }, 
    region: bucketRegion
});

AWS.config.update({
 accessKeyId: process.env.REACT_APP_ACCESS_KEY,
 secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
 region: bucketRegion
});



//Creating random name with crypto
const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

//multer
const storage = multer.memoryStorage()
const upload = multer({storage: storage })


const cloudfront = new CloudFrontClient({
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
    }
  });
  
  
//--Routers--

 

  router.get('/s3Url', async (req, res) => {
    const type = req.query.fileType; // get the file type from the query string
    const data = await generateUploadURL(type);
    res.send({data});
  });
  




// GET all parents (Home)
router.get('/', async (req, res) => { 
    const challenges = await Challenge.find({}).sort({createdAt: -1})
    for (const challenge of challenges) { 
        const url = 'https://ddi556n39z2z8.cloudfront.net/' + challenge.fileName
        challenge.fileURL = url;  
    }
   res.status(200).json(challenges);
});



// GET AWS params for a parent (New Challenge Page)
router.get('/:challengeParamsId', async (req, res) => { 
    const { challengeParamsId } = req.params;

    try { 
    const challenge = await Challenge.findById(challengeParamsId)
    console.log(challenge)

    for (const child of challenge.replies) { 
            const url = 'https://ddi556n39z2z8.cloudfront.net/' + child.fileName
            child.fileURL = url;  
        }

            const url = 'https://ddi556n39z2z8.cloudfront.net/' + challenge.fileName
            challenge.fileURL = url;   

        challenge.save((error, challenge) => {
            if(error) throw error
            res.status(200).json(challenge)
        })
    } catch(err) { 
        res.status(400).send(err)
    }
});



//Auth middleware
// router.use(requireAuth)


//POST Parent (Create Parent)
router.post('/', upload.single('file'), async (req, res) => {   
    
    const title = req.body.title
    const userEmail  = req.body.userEmail
    const organization  = req.body.organization
    const description = req.body.description
    const reps = req.body.reps
    const time = req.body.time 
    const userName = req.body.userName
    const fileName = req.body.fileName
    const fileURL = req.body.fileURL
    const isLessReps = req.body.isLessReps
    
    console.log('title -',title)
    console.log('userEmail -',userEmail)
    console.log('organization -',organization)
    console.log('description -',description)
    console.log('reps -',reps)
    console.log('time -',time)
    console.log('userName -',userName)
    console.log('fileURL -',fileURL)
    console.log('fileName -',fileName)
    console.log('isLessReps -',isLessReps)


    const SavedChallenge = await new Challenge({
        title: title, 
        userName: userName,
        userEmail: userEmail,
        organization: organization,
        description: description, 
        reps: reps, 
        time: time, 
        fileName: fileName,
        fileURL: fileURL,
        isLessReps: isLessReps
    })
    await newParent(fileURL)
    console.log('SavedChallenge', SavedChallenge)

    // //Saving the in MongoDB
    SavedChallenge.save((error, SavedChallenge) => {
        if(error) { 
            console.log('error:', error)
            throw error
        }
        res.status(200).json({'SavedChallenge': SavedChallenge})
        // console.log('SavedChallenge:', SavedChallenge)
    }) 

})



//POST Child (Create Child)
router.post('/reply/:id', upload.single('file'), async (req, res) => { 

    const reps = req.body.reps
    const userName = req.body.userName
    const userEmail = req.body.userEmail
    const organization  = req.body.organization
    const fileName = req.body.fileName
    const fileURL = req.body.fileURL
    const {id} = req.params
    
    const challenge = await Challenge.findById(id) 

    const SavedChallenge = await new Reply({
        userName: userName,
        userEmail: userEmail,
        organization: organization,
        reps: reps, 
        fileName: fileName,
        fileURL: fileURL
    })

    await newChild(fileURL);

    await challenge.replies.push(SavedChallenge);
    await challenge.save((error, SavedChallenge) => { 
        if(error) throw error
        res.status(200).json(SavedChallenge)
        console.log('BACKEND RESPONSE', SavedChallenge)
    })
})


// DELETE a Parent
router.delete('/:id', async (req, res) =>  {
    const { id } = req.params;
    const challenge = await Challenge.findById(id)
    if(challenge) {  
        
        if(challenge.replies) { 
            try { 
                for(const children of challenge.replies) { 
                    const Params = { 
                        Bucket: bucketName,
                        Key: children.fileName
                    }
                    const command = new DeleteObjectCommand(Params);
                    const deletedChild = await s3
                    console.log('deletedChild', deletedChild)
                }
            } catch (err) { 
                console.log(err)
            }
        }

        try { 
            const Params = { 
                Bucket: bucketName,
                Key: challenge.fileName
            }

            const command = new DeleteObjectCommand(Params);
            await s3Client.send(command)                
            const deletedChallenge = await Challenge.findByIdAndDelete({_id: id});
            res.status(200).send(deletedChallenge)
            
        } catch(err) { 
            console.log(err)
        }
    } else { 
    res.status(400).send('Cant find Challenge') 
    }
});


// DELETE a Child
router.delete('/child/:parentId/:childId', async (req, res) =>  {
    const { childId } = req.params;
    const { parentId } = req.params;
    
        // Deleteing from S3 
        const Params = { 
                Bucket: bucketName,
                Key: childId
             }
            const command = new DeleteObjectCommand(Params);
            await s3Client.send(command)

            //Deleting from MongoDB
            const parent = await Challenge.findById(parentId)
            const result = await parent.replies.id(childId).remove();
        
            //Saving new in MongoDB
            parent.save((err) => {
                if (err) return handleError(err);
                console.log('the subdocs were removed from mongo');
            });


    res.status(200).json(childId)
});



// UPDATE a challenge 
router.patch('/:id', async (req, res) => { 
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(400).json({err: 'no such challenge'});
    }

    const challenge = await Challenge.findByIdAndUpdate({_id: id}, {...req.body})

    if(!challenge) { 
        return res.status(400).json({err: 'no such challenge'});
    }
    res.status(200).json(challenge);
});






module.exports = router; 



