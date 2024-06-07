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
    discounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount'
    }]

    });

    const User = mongoose.model('User', userSchema);

    export default User;