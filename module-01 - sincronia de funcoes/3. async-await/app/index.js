function obterPessoa(id, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        nome: 'Erick',
        id: 2,
      });
    }, 500);
  });
}

function obterEndereco(pessoaId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        endereco: 'Av paulista, 22',
        id: 3,
      });
    });
  });
}

function obterTelefone(pessoaId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        telefone: '11969803388',
        id: 22,
      });
    });
  });
}

(async function main() {
  const pessoa = await obterPessoa(2);
  const { telefone } = await obterTelefone(pessoa.id);
  const { endereco } = await obterEndereco(pessoa.id);
  console.log(`
      Nome: ${pessoa.nome},
      Telefone: ${telefone},
      Endereco: ${endereco}
     `);
})();

