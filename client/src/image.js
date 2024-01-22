const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { Buffer } = require('buffer');



const wasabiConfig = {
  accessKeyId: 'OFOPN9NMDIMFC8DUCAGW',
  secretAccessKey: '2AV1clPdZbIhUE0eEh1TYGlrXc9wnZveOtcQffOM',
  region: 'ap-southeast-1',
  bucket: 'olympiad',
};

const s3 = new S3Client({
  region: wasabiConfig.region,
  endpoint: `https://s3.${wasabiConfig.region}.wasabisys.com`, 
  credentials: {
    accessKeyId: wasabiConfig.accessKeyId,
    secretAccessKey: wasabiConfig.secretAccessKey,
  },
});

const readFromWasabi = async (fileKey) => {
  try {
    const params = {
      Bucket: wasabiConfig.bucket,
      Key: fileKey,
    };

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

export default getSingleImage;

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