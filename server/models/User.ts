import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";
import { IUser, IUserDocument } from '../types/mongoose';

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    avatar: {
        type: String,
    },
    images: [String]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// define instance method for comparing passwords
userSchema.methods.isCorrectPassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export const User = model<IUserDocument | undefined>("User", userSchema);