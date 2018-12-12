const { equal, deepEqual, ok } = require('assert');
const PostgresStrategy = require('../src/db/strategies/postgresSQLStrategy');
const Context = require('../src/db/strategies/base/contextStrategy');
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' };

const context = new Context(new PostgresStrategy());
describe('PostgreSQL Strategy', function() {
  this.timeout(Infinity);
  before(async () => {
    await context.connect()
    await context.delete();
    await context.create(MOCK_HEROI_CADASTRAR);
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  it('PostgresSQL connection', async () => {
    const result = await context.isConnected();
    equal(result, true);
  });

  it('cadastrar', async () => {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.dataValues.id;
    deepEqual(result.dataValues, MOCK_HEROI_CADASTRAR);
  });

  it('listar', async () => {
    const [result] = await context.read(MOCK_HEROI_CADASTRAR);
    delete result.id;
    deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('atualizar', async () => {
    const [result] = await context.read({});

    const novoItem = {
      ...MOCK_HEROI_CADASTRAR,
      nome: 'Mulher Maravilha',
    };
    const [update] = await context.update(result.id, novoItem);

    deepEqual(update, 1);
  });

  it('remover', async () => {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    deepEqual(result, 1);
  });
});
