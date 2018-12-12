const { obterPessoas } = require('./service');

//Criando nosso próprio Map
Array.prototype.meuMap = function(callback) {
  const novoArrayMapeado = [];
  for (let indice = 0; indice <= this.length - 1; indice++)
    novoArrayMapeado.push(callback(this[indice], indice));

  return novoArrayMapeado;
};

//
(async main => {
  const result = await obterPessoas('a');
  // map tradicional
  //   const names = result.results.map((item, indice) => {
  //     // má prática!
  //     // item.name = 'aEW';
  //     // return item.name;

  //     // se quiser modificar o valor e retornar todo objeto
  //     // return {
  //     //   ...item,
  //     //   name: 'aEW',
  //     // };

  //     return item.name;
  //   });

  const names = result.results.meuMap(
    (item, index) => `[${index}]${item.name}`,
  );
  console.log(names);
  // array original não deverá para ser alterado
  // console.log(result.results[0].name, result.results[1].name);
})();
