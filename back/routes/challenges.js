const express = require('express');
const multer =  require("multer");
const crypto = require('crypto')
const sharp = require('sharp')
const Challenge = require('../models/ChallengeModel')
const Reply = require('../models/ChallengeModel')
const { Upload } = require("@aws-sdk/lib-storage");

const {cloudFrontClient, CreateInvalidationCommand, CloudFrontClient} = require('@aws-sdk/client-cloudfront')

const  { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, S3} = require ('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth')
 
const {  
    getChallenges,
    getChallenge,
    postChallenge,
    deleteChallenge,
    updateChallenge } = require('../controllers/challenge');
const { findOneAndUpdate } = require('../models/ChallengeModel');


//--Set up--


//AWS
bucketName = process.env.BUCKET_NAME
bucketRegion = process.env.BUCKET_REGION
accessKey = process.env.ACCESS_KEY
secretAccessKey = process.env.SECRET_ACCESS_KEY
CloudFrontDistId =  process.env.CLOUDFRONT_DIST_ID

//S3
const s3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    }, 
    region: bucketRegion
});

//Creating random name with crypto
const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

//multer
const storage = multer.memoryStorage()
const upload = multer({storage: storage })


const cloudFront =  new CloudFrontClient({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    }
})





//--Routers--


// GET all parents (Home)
router.get('/', async (req, res) => { 
    const challenges = await Challenge.find({}).sort({createdAt: -1})
    for (const challenge of challenges) { 
        // const getObjectParams = { 
        //     Bucket: bucketName,
        //     Key: challenge.fileName
        // }
        // console.log(challenge)

        // const command = new GetObjectCommand(getObjectParams);
        // const url =  await getSignedUrl(s3, command, { expiresIn: 3600 * 5 });
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

    for (const child of challenge.replies) { 

            // const getObjectParams = { 
            //     Bucket: bucketName,
            //     Key: child.fileName
            // }

            // const command = new GetObjectCommand(getObjectParams);
            // const url =  await getSignedUrl(s3, command, { expiresIn: 3600 * 5 });

            const url = 'https://ddi556n39z2z8.cloudfront.net/' + challenge.fileName
            child.fileURL = url;  
 

        }

            // const getObjectParams = { 
            //     Bucket: bucketName,
            //     Key: challenge.fileName
            // }
            // const command = new GetObjectCommand(getObjectParams);
            // const url =  await getSignedUrl(s3, command, { expiresIn: 3600 * 5 });
            const url = 'https://ddi556n39z2z8.cloudfront.net/' + challenge.fileName
            challenge.fileURL = url;   

        challenge.save((error, challenge) => {
            if(error) throw error
            res.status(200).json(challenge)
            console.log(challenge)
        })
    } catch(err) { 
        res.status(400).send(err)
    }
});






//Auth middleware
router.use(requireAuth)



//POST Parent (Create Parent)
router.post('/', upload.single('file'), async(req, res) => { 
    console.log('----req.body----', req.body)
    
    //Getting all the params and body  
    const title = req.body.title
    const userEmail  = req.body.userEmail
    const description = req.body.description
    const reps = req.body.reps
    const time = req.body.time 
    const userName = req.body.userName

    // const buffer = await sharp(req.file.buffer).resize({height: 550, width: 600, fit: "cover"}).toBuffer()
    const fileName = randomFileName()

    // Saving file to S3 
    const params = {  
        Bucket: bucketName, 
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    const Putcommand = new PutObjectCommand(params);
    await s3.send(Putcommand);

    // //Saving to mongoDB
    const SavedChallenge = await new Challenge({
        title: title, 
        userName: userName,
        userEmail: userEmail,
        description: description, 
        reps: reps, 
        time: time, 
        fileName: fileName,
        fileURL: ''
    })

    // //Setting S3 URL
    if(SavedChallenge) { 
        const createURL = async () => { 
            getObjectParams = { 
                Bucket: bucketName,
                Key: SavedChallenge.fileName
            }
            const command = new GetObjectCommand(getObjectParams);
            const url =  await getSignedUrl(s3, command, { expiresIn: 3600 })
            SavedChallenge.fileURL = url
        }       

        await createURL()

    } else { 
        console.log('no ChallengeName')
    }
    // //Saving the in MongoDB
    SavedChallenge.save((error, SavedChallenge) => {
        if(error) throw error
        res.status(200).json(SavedChallenge)
    }) 

})



//POST Child (Create Child)
router.post('/reply/:id', upload.single('file'), async (req, res) => { 
    console.log('---req.body---', req.body)

    const reps = req.body.reps
    const userName = req.body.userName
    const userEmail = req.body.userEmail
    const {id} = req.params
    
    const challenge = await Challenge.findById(id) 
    const fileName = randomFileName()

    const params = {  
        Bucket: bucketName, 
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }
    const Putcommand = new PutObjectCommand(params);
    await s3.send(Putcommand);


    const SavedChallengeee = await new Reply({
        userName: userName,
        userEmail: userEmail,
        reps: reps, 
        fileName: fileName,
        fileURL: ''
    })

    getObjectParams = { 
        Bucket: bucketName,
        Key: SavedChallengeee.fileName 
    }
    const command = new GetObjectCommand(getObjectParams);
    const url =  await getSignedUrl(s3, command, { expiresIn: 3600 });
    SavedChallengeee.fileURL = url


    await challenge.replies.push(SavedChallengeee);

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
        try { 
            for(const children of challenge.replies) { 
                const Params = { 
                    Bucket: bucketName,
                    Key: children.fileName
                }
                    const command = new DeleteObjectCommand(Params);
                    await s3.send(command)
                }

                const invalidationParams =  { 
                    DistributionId: CloudFrontDistId,
                    InvalidationBatch:  { 
                        CallerReference: children.fileName,
                        Paths: { 
                            Quantity: 1, 
                            Items: [ 
                                '/' + children.fileName
                            ]
                        }
                    }
                }
                const invalidationCommand = new CreateInvalidationCommand(invalidationParams);
                await cloudFront.send(invalidationCommand)


                const Params = { 
                    Bucket: bucketName,
                    Key: challenge.fileName
                }
                const command = new DeleteObjectCommand(Params);
                await s3.send(command)
                
                const deletedChallenge = await Challenge.findByIdAndDelete({_id: id});
                res.status(200).json(deletedChallenge)

            } catch (err) { 
                res.status(400).json('No such challenge', err.message) 
            }
    } else { 
        res.status(400).send('Cant find Challenge') 
    }
});


// DELETE a Child
router.delete('/child/:childId', async (req, res) =>  {
    const { childId } = req.params;


        // Deleteing from S3 
        const Params = { 
                Bucket: bucketName,
                Key: childFileName
             }
            const command = new DeleteObjectCommand(Params);
            await s3.send(command)
                
            //Deleting from MongoDB
            const parent = await Challenge.findById(parentID)
            const result = await parent.replies.id(childID).remove();
        
            //Saving new in MongoDB
            parent.save( (err) => {
                if (err) return handleError(err);
                console.log('the subdocs were removed from mongo');
                });


    res.status(200).json(childId)
        
});






// UPDATE a challenge 
router.patch('/:id', updateChallenge);

module.exports = router; 



