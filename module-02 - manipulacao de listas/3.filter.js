const { obterPessoas } = require('./service');

// nosso proprio filter
Array.prototype.meuFilter = function(callback) {
  const itensFiltrados = [];
  for (let indice = 0; indice <= this.length - 1; indice++) {
    const result = callback(this[indice], indice, this);
    if (!result) continue;

    itensFiltrados.push(this[indice]);
  }
  return itensFiltrados;
};

(async main => {
  const result = await obterPessoas('a');
  const results = result.results;
  //   const familiaLars = results.filter((item, indice, lista) => {
  //     return item.name.toLowerCase().indexOf(`lars`) !== -1;
  //   });
  const familiaLars = results.meuFilter((item, indice, lista) => {
    return item.name.toLowerCase().indexOf(`lars`) !== -1;
  });
  const names = familiaLars.map(item => item.name);
  console.log(names);
})();
