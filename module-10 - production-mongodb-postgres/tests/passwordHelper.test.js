const assert = require('assert');
const PasswordHelper = require('../src/helpers/passwordHelper');

const SENHA = 'erick@32123';
const HASH = '$2b$04$nJuOS9YZH9FpsKTOSh2IPOZUW9IF83bo54FE2L/rO/Xzrl.pS/qV2'



describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA);

        // const result = await PasswordHelper.hashPassword('321123');
        // console.log('result', result)
        assert.ok(result.length > 10);
    });
    it('deve comparar uma senha e seu hash', async () => {
        const result = PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })

});