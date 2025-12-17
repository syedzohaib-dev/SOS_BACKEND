const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
// Static folder name
// const CLOUDINARY_FOLDER = 'saylani_welfare_management_system';

// // Upload Function (from memory buffer)
// export const uploadToCloudinary = async (fileBuffer) => {
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream({ folder: CLOUDINARY_FOLDER }, (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//         });
//         stream.end(fileBuffer);
//     });
// };
