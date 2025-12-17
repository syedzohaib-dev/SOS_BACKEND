/* eslint-disable no-console */
import mongoose from 'mongoose';

const dbConnect = async (uri) => {
    try {
        await mongoose.connect(uri);

        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

export default dbConnect;
