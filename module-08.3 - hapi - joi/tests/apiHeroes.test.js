const assert = require('assert')
const api = require('./../api')
let app = {}
describe('API Heroes test suite', function ()  {
    this.beforeAll(async () => {
        app = await api
    })
    it('listar /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const statusCode = result.statusCode 
        
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })

    it('cadastrar /herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: {
                nome: 'Flash',
                poder: 'Velocidade'
            }
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nome, "Flash")

    })

    it('não deve cadastrar com payload errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: {
                NAME: 'Flash'
            }
        })
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 400)
        assert.ok(payload.message.search('"nome" is required') !== -1)

    })

})