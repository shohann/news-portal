const config = require('config');

module.exports.getSaltRounds = () => config.get('saltRounds');