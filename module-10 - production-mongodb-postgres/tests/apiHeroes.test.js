const assert = require('assert')
const api = require('./../api')
let app = {}
let MOCK_ID = ""
let MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWF0IjoxNTQyNzI4MzQ0fQ.JvBOZa7yXds4ktQ7HvNRYO6-s1mbU7AKTJP9G2ghje4"
const headers = {
    Authorization: MOCK_TOKEN
}

function cadastrar() {
    return app.inject({
        method: 'POST',
        url: '/herois',
        headers,
        payload: {
            nome: 'Flash',
            poder: 'Velocidade'
        }
    });
}


describe('API Heroes test suite', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await cadastrar()
        MOCK_ID = JSON.parse(result.payload)._id
    })
    it('não deve listar herois sem um token', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois',
        })
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(JSON.parse(result.payload).error, "Unauthorized")
    })
    it('listar /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois',
            headers
        })
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })

    it('cadastrar /herois', async () => {
        const result = await cadastrar()
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nome, "Flash")

    })

    it('não deve cadastrar com payload errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: {
                NAME: 'Flash'
            }
        })
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 400)
        assert.ok(payload.message.search('"nome" is required') !== -1)
    })
    it('atualizar /herois/{id}', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${MOCK_ID}`,
            headers,
            payload: {
                nome: 'Canário Negro',
                poder: 'Grito'
            }
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nModified, 1)

    })
    it('remover /herois/{id}', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${MOCK_ID}`,
            headers,
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).n, 1)
    })
})