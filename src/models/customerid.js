const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerIdSchema = new Schema(
    {
        id: { type: Number, required: true}
    }
)
module.exports = mongoose.model('customerid', CustomerIdSchema);