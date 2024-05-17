const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    area: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    nearbyHospitals: {
        type: String,
        required: true
    },
    nearbyColleges: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
