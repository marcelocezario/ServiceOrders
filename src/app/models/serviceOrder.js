const mongoose = require('../../database');

const ServiceOrderSchema = new mongoose.Schema({
    number: {
        type: Number,
        require: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        require: true,
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'canceled', 'paid'],
        require: true,
        default: 'open'
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    amount: {
        type: number,
        require: true,
    },
    payday: {
        type: date,
        require: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ServiceOrder = mongoose.model('ServiceOrder', UserSchema);

module.exports = ServiceOrder;