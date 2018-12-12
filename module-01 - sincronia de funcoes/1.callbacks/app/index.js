function obterPessoa(id, callback) {
  setTimeout(() => {
    return callback(null, {
      nome: 'Erick',
      id: 2,
    });
  }, 500);
}

function obterEndereco(pessoaId, callback) {
  setTimeout(() => {
    return callback(null, {
      endereco: 'Av paulista, 22',
      id: 3,
    });
  });
}

function obterTelefone(pessoaId, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '11969803388',
      id: 22,
    });
  });
}

(function main() {
  obterPessoa(2, (error1, result1) => {
    obterEndereco(result1.id, (error2, result2) => {
      obterTelefone(result1.id, (error3, result3) => {
        console.log(`
         Nome: ${result1.nome},
         Telefone: ${result3.telefone},
         Endereco: ${result2.endereco}
        `);
      });
    });
  });
})();
