const Bcrypt = require('bcrypt')
const {
    promisify
} = require('util')
const hashAsync = promisify(Bcrypt.hash)
const compareAsync = promisify(Bcrypt.compare)
const SALT = parseInt(process.env.PWD_SALT)

class Password {

    static hashPassword(pass) {
        return hashAsync(pass, SALT)
    }
    static comparePassword(pass, hash) {
        return compareAsync(pass, hash)
    }
}
module.exports = Password