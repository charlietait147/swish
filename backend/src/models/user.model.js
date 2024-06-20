import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    cafes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cafe'
    
    }]
});

const User = mongoose.model('User', userSchema);

export default User;