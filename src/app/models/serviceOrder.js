const mongoose = require('../../database');

function amountValue(services){
    let amount = 0
    foreach(service in services){
        amount += service['finalValue'];
    }
    return amount;
}

const ServiceOrderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        require: true,
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    amount: {
        type: Number,
        require: true,
        default: amountValue(services)
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