const Bcrypt = require('bcrypt')
const {
    promisify
} = require('util')
const hashAsync = promisify(Bcrypt.hash)
const compareAsync = promisify(Bcrypt.compare)
const SALT = 3

class Password {

    static hashPassword(pass) {
        return hashAsync(pass, SALT)
    }
    static comparePassword(pass, hash) {
        return compareAsync(pass, hash)
    }
}
module.exports = Password