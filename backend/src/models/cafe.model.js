import mongoose from 'mongoose';

const cafeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    menu: {
        type: String,
        required: true,
    },
    icons: [
        {
            type: {
              type: String, // Type of icon (e.g., 'Dog Friendly')
            },
            url: {
              type: String, // URL of the icon
            }
          }
    ],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
}, { collection: "cafes"});

const Cafe = mongoose.model('Cafe', cafeSchema);

export default Cafe;

