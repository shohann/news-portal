const { sign } = require('jsonwebtoken');
const config = require('config');

const accessTokenExpiration = config.get('accessTokenExpiration');
const authSecret = config.get('authSecret');

module.exports.generateAccessToken = (id, email) => sign({ id: id, email: email }, authSecret,{ expiresIn: accessTokenExpiration });
