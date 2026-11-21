import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Accounts created with Google sign in have no password until the user sets one
    password: {
        type: String,
        required: function () { return !this.googleId; },
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    avatar: {
        type: String,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    cafes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cafe'
    }],
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

const User = mongoose.model('User', userSchema);

export default User;