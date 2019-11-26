module.exports = {
    saveUserToFile: saveUserToFile,
    hashPassword: hashPassword
}

const crypto = require('crypto');
var fs = require('fs');

function saveUserToFile(requestParams, response, context, ee, next) {
    if (response.statusCode === 200) {
        appendToFile(`./data/${context.vars.prefix}_accounts.csv`, response.body.email);
    }
    else {
        appendToFile(`./data/${context.vars.prefix}_accounts_err.csv`,
            `${requestParams.json['email']},${JSON.stringify(response.body)}`);
    }
    return next();
}

function appendToFile(filename, payload) {
    fs.appendFile(filename, payload + '\n', function (err) {
        if (err) throw err;
    });
}

function hashPassword(requestParams, context, ee, next) {
    requestParams.json['password'] = crypto.pbkdf2Sync(context.vars.password, new Buffer('', 'hex'), 100, 256, 'sha256').toString('hex');
    return next();
}

