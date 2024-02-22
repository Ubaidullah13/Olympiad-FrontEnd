const { S3Client } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { createRequest } = require('@aws-sdk/util-create-request');
const { GetObjectCommand } = require('@aws-sdk/client-s3');

// Your Wasabi configuration
const wasabiConfig = {
  accessKeyId: 'OFOPN9NMDIMFC8DUCAGW', // Replace with your access key
  secretAccessKey: '2AV1clPdZbIhUE0eEh1TYGlrXc9wnZveOtcQffOM', // Replace with your secret key
  region: 'ap-southeast-1',
  bucket: 'olympiad', // The name of your bucket
};

// Initialize the S3 client
const s3 = new S3Client({
  region: wasabiConfig.region,
  endpoint: `https://s3.${wasabiConfig.region}.wasabisys.com`,
  credentials: {
    accessKeyId: wasabiConfig.accessKeyId,
    secretAccessKey: wasabiConfig.secretAccessKey,
  },
});

// Function to generate a pre-signed URL
async function generatePresignedUrl(objectKey, customFileName) {
  try {
    // Create a GetObjectCommand for the specified object
    const command = new GetObjectCommand({
      Bucket: wasabiConfig.bucket,
      Key: objectKey, // The key of the object for which to generate the URL
      ResponseContentDisposition: `inline; filename="${customFileName}"`
    });

    // Generate the pre-signed URL
    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 5*24*3600 }); // URL expires in 3600 seconds (1 hour)
    
    //console.log(`Pre-signed URL: ${presignedUrl}`);
    return presignedUrl;
  } catch (error) {
    console.error("Error generating pre-signed URL", error);
    return "/Images/images.PNG";
  }
}


const readFromWasabi = async (fileKey) => {
  try {
    const params = {
      Bucket: wasabiConfig.bucket,
      Key: fileKey,
    };

    console.log("fetching from wasabi with params --->", params);
    const response = await s3.send(new GetObjectCommand(params));

    // Convert the ReadableStream (response.Body) to a Blob
    const blob = await new Response(response.Body).blob();

    // Convert the Blob to an ArrayBuffer, then to a Buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  } catch (error) {
    console.error('Wasabi read error:', error);
    throw error;
  }
};




const getSingleImage = async (fileKey) => {
  // const fileKey = req.body.fileKey;
    const objectData = await readFromWasabi(fileKey);

    // Check if objectData is already a Buffer
    const imageData = Buffer.isBuffer(objectData) ? objectData : Buffer.from(objectData);

    // Convert the image data to a base64 string
    const base64Image = `data:image/jpeg;base64,${imageData.toString('base64')}`;
    
    return base64Image;
};

export {getSingleImage,generatePresignedUrl};

// How to Use this, First make promises (Don't know how)

// const hj = async () => {
//   try{
//     const res = await getSingleImage("1705881569259-Asset Placement sequence diagram.png");
//     console.log(res);
//     setImg(res);
//   }catch(err){
//     console.log(err);
//   }
// }

//   useEffect(() => {
//     hj();
//   }, []);