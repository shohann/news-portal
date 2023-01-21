const { sign } = require('jsonwebtoken');
const config = require('config');

const accessTokenExpiration = config.get('accessTokenExpiration');
const authSecret = config.get('authSecret');

module.exports.generateAccessToken = (id, email, role) => sign({ id: id, email: email, role: role }, authSecret,{ expiresIn: accessTokenExpiration });
