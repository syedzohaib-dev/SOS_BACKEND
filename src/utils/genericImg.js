import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = (file, nameOfFile , typeOfFile) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'saail_docs',
                public_id: file.originalname,
            },
            (err, result) => {
                if (err) return reject(err);

                resolve({
                    nameOfFile,
                    typeOfFile,
                    filename: file.originalname,
                    fileUrl: result.secure_url,
                    publicId: result.public_id,
                    mimetype: file.mimetype,
                });
            },
        );

        stream.end(file.buffer);
    });
};
