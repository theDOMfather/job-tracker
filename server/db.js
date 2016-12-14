var mongoose = require("mongoose");
var config = require('../config.js');

var USER = process.env.DB_USER || config.db.user;
var PASSWORD = process.env.DB_PASSWORD || config.db.password;

mongoose.connect(`mongodb://${USER}:${PASSWORD}@ds133418.mlab.com:33418/heroku_2thfdbfj`);

module.exports = mongoose.connection;
