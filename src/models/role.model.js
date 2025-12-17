import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            enum: [
                'Admin',
                'Branch-Head',
                'Area-Manager'
            ],
            trim: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Role', roleSchema);