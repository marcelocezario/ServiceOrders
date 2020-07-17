const mongoose = require('../../database');

const ServiceOrderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    amount: {
        type: Number,
    },
    payday: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'canceled', 'paid'],
        require: true,
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ServiceOrder = mongoose.model('ServiceOrder', ServiceOrderSchema);

module.exports = ServiceOrder;