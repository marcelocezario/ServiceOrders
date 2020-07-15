const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ordensservico', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose