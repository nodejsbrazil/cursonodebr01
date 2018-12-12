const { obterPessoas } = require('./service');

Array.prototype.meuReduce = function(callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];

  for (let indice = 0; indice < this.length; indice++) {
    valorFinal = callback(valorFinal, this[indice], this);
  }
  return valorFinal;
};

/** */

//verificar o peso de todas as pessoas para informar à nave
(async main => {
  const { results } = await obterPessoas('a');
  const pesos = results.map(item => parseInt(item.height));
  //   const total = pesos.reduce(
  //     (anterior, proximo, listaOriginal) => anterior + proximo,
  //     0,
  //   );

  //   const total = pesos.meuReduce(
  //     (anterior, proximo, listaOriginal) => anterior + proximo,
  //     0,
  //   );
  const total = [['Erick', 'Wendel'], ['Nerdzão', 'NodeBR']]
    .meuReduce((anterior, proximo) => anterior.concat(proximo), [])
    .join(',');
  console.log('total', total);
})();
