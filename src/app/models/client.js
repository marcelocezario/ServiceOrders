const mongoose = require('../../database');

const ClientSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    endereco: {
        type: String,
        require: true,
    },
    telefone: {
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