import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        roleTitle: {
            type: mongoose.Types.ObjectId,
            ref: 'Role',
        },

        status: {
            type: String,
            enum: ['In-Active', 'Active'],
            default: 'Active',
        },
        otp: {
            type: String,
        },
        otpExpires: {
            type: Date,
        },
    },
    { timestamps: true },
);

userSchema.virtual('branchHead', {
    ref: 'Branch',
    localField: '_id',
    foreignField: 'branchHead',
});

userSchema.virtual('areaManager', {
    ref: 'Branch',
    localField: '_id',
    foreignField: 'areaManager',
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });


export default mongoose.model.User || mongoose.model('User', userSchema);