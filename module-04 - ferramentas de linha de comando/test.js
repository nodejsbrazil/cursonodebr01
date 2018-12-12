const { deepEqual, ok } = require('assert');
const Database = require('./database');
const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'speed', id: 1 };
const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Lanterna Verde',
  poder: 'Anel do poder',
  id: 2,
};

describe('Suite de manipulação de herois', () => {
  before(async () => {
    await Database.remover();
    await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await Database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  it('deve cadastrar um heroi', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);

    const [realResult] = await Database.listar(expected.id);
    deepEqual(realResult, expected);
  });

  it('deve listar um heroi pelo id', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const result = await Database.listar(1);
    deepEqual(result[0], expected);
  });

  it('deve atualizar um heroi pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'ricão',
    };
    await Database.atualizar(expected.id, {
      nome: expected.nome,
      poder: expected.poder,
    });

    const [realResult] = await Database.listar(expected.id);
    deepEqual(realResult, expected);
  });
});
