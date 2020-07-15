const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    criadoEm: {
        type: Date,
        default: Date.now,
    },
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;