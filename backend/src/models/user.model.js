import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
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
    },
    // Tokens issued before this time are rejected, so changing the password logs out other sessions
    passwordChangedAt: {
        type: Date
    }
}, {
    // Never send the password hash or reset token back to the client
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.resetPasswordToken;
            delete ret.resetPasswordExpires;
            delete ret.passwordChangedAt;
            return ret;
        }
    }
});

const User = mongoose.model('User', userSchema);

export default User;