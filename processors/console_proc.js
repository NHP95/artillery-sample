const accounts = require('./console_accounts.js');

function logResponse(requestParams, response, context, ee, next) {
    console.log(response);
    return next();
}

module.exports = {
    logResponse: logResponse,
    saveUserToFile: accounts.saveUserToFile,
    hashPassword: accounts.hashPassword
}