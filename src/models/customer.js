const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
        },
        email: {
            type: String,
            required: false,
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
        address1: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
        vehicles: [{
            year: {type: Number, required: true},
            make: {type: String, required: true},
            model: {type: String, required: true},
            color: String,
            vin: String
        }],
        optInText: Boolean,
        deleted: {
            type: Boolean,
            required: false
        }
    },
    { optimisticConcurrency: true}
);
module.exports = mongoose.model('customers', CustomerSchema);