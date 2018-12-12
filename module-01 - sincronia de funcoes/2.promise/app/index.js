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

(function main() {
  Promise.resolve()
    .then(_ => obterPessoa(2))
    .then(pessoa => {
      return obterTelefone(pessoa.id).then(({ telefone }) => {
        return Object.assign({}, pessoa, { telefone });
      });
    })
    .then(pessoa => {
      return obterEndereco(pessoa.id).then(({ endereco }) => {
        return Object.assign({}, pessoa, { endereco });
      });
    })
    .then(pessoa => {
      console.log(`
      Nome: ${pessoa.nome},
      Telefone: ${pessoa.telefone},
      Endereco: ${pessoa.endereco}
     `);
    })
    .catch(error => {
      console.error('Deu ruim', error);
    });
})();
