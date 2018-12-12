const assert = require('assert')
const api = require('./../api')
let app = {}
describe.only('API Heroes test suite', function ()  {
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

})