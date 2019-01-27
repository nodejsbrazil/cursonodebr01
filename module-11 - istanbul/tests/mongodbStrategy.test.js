const assert = require('assert')
const MongoDb = require('../src/db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('../src/db/strategies/mongodb/schemas/heroSchema')
const Context = require('../src/db/strategies/base/contextStrategy')

// 1o alterar criar pasta mongodb
// 2o mover mongodbStrategy para mongodb
// 3o modificar classe do mongodbStrategy
// 4o modificar criar schema em mongodb/schemas
// 6o modificar teste fazendo conexão direto do MongoDB
// 5o modificar teste passando para o MongoDB

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
};

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Mulher Maravilha',
    poder: 'força'
};
let MOCK_HEROI_ATUALIZAR_ID = '';
let context = {}

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, HeroSchema))

        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ATUALIZAR_ID = result._id
    })
    it('verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })
    it('cadastrar', async () => {
        const {
            nome,
            poder
        } = await context.create(MOCK_HEROI_CADASTRAR)

        assert.deepEqual({
            nome,
            poder
        }, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () => {
        const [{
            nome,
            poder
        }] = await context.read({
            nome: MOCK_HEROI_CADASTRAR.nome
        })
        const result = {
            nome,
            poder
        }
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, {
            poder: 'Laço'
        })
        assert.deepEqual(result.nModified, 1)
    })
    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ATUALIZAR_ID)
        assert.deepEqual(result.n, 1)
    })
})