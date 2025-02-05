const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const uploadImage = async (fileBuffer, fileName) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: 'image/jpeg', // Change based on image type
    };
    const result = await s3.upload(params).promise();
    return result.Location; // Return image URL
};

module.exports = { uploadImage };
