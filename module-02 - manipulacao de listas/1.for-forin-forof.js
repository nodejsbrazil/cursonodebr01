const { obterPessoas } = require('./service');

//
(async main => {
  const result = await obterPessoas('a');
  const names = [];
  // for (let i = 0; i <= result.results.length - 1; i++) {
  //   const pessoa = result.results[i];
  //   names.push(pessoa.name);
  // }
  // console.log('names', names);

  // for (let i in result.results) {
  //   const pessoa = result.results[i];
  //   names.push(pessoa.name);
  // }

  // console.log('names', names);

  for (pessoa of result.results) {
    names.push(pessoa.name);
  }
  console.log('names', names);
})();
