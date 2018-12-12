class Heroi {
  constructor({ id, nome, poder }) {
    this.nome = nome;
    this.poder = poder;
    this.id = id || Date.now();
  }
}
module.exports = Heroi;
