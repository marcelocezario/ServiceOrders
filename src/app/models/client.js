const mongoose = require('../../database');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    adress: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Client = mongoose.model('Client', UserSchema);

module.exports = Client;