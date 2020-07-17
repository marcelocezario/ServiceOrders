const mongoose = require('../../database');

const ServiceSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    serviceOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceOrder',
        require: true,
    },
    value: {
        type: Number,
        require: true,
    },
    discount: {
        type: Number,
        require: true,
    },
    finalValue: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;