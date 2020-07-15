const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/serviceorders', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose