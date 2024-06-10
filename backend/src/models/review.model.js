import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cafe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cafe',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;

