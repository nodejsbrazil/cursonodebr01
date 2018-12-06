const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'Erick@32123123'
const HASH = '$2b$04$6woVEzHzHKwIYCKH4a/rGuuKaY0R.RcxGV6DV5cHT9IlE2jcDkTga'

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
      
        assert.ok(result.length > 10)
    })

    it('deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        
        assert.ok(result)
    })
})