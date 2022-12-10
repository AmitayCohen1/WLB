const { v4: uuidv4 } = require('uuid');
const aws  = require('aws-sdk') 
const mime = require('mime'); // import the mime library
require('dotenv').config() 


const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY


aws.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
    region: bucketRegion
  });


const s3 = new aws.S3({
    bucketRegion,
    accessKey,
    secretAccessKey,
    signatureVersion: 'v4'
})



const generateUploadURL = async (type) => {
  const uuid = uuidv4();
  // const fileName = `${uuid}.${type}`;
    const fileName = `${uuid}.mp4`;
  // const contentType = mime.getType(type);
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60,
    // ContentType: contentType
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return { uploadURL, fileName };
};






module.exports = {generateUploadURL}

