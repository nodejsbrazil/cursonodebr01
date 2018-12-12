const IDb = require('./base/interfaceDb');
const Sequelize = require('sequelize');
class PostgreSQLConnection {
  static connect() {}
}
class PostgreSQLStrategy extends IDb {
  constructor() {
    super();
    this._herois = null;
    this._sequelize = null;
    
  }

 async defineModel() {
    this._herois = this._sequelize.define(
      'herois',
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        //opcoes para base existente
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false,
        
      },
    );
    await this._herois.sync()
  }

 async connect() {
    this._sequelize = new Sequelize(
      'heroes', //database
      'erickwendel', // user
      'minhasenhasecreta', //senha
      {
        host: 'localhost',
        dialect: 'postgres',
        // case sensitive
        quoteIdentifiers: false,
        // deprecation warning
        operatorsAliases: false,
        //disable logging
        logging: false
        // dialectOptions: {
        //   ssl: true,
        },
    );

    await this.defineModel();
  }

  async isConnected() {
    try {
      // await this._connect();
      await this._sequelize.authenticate();
      return true;
    } catch (error) {
      console.error('fail!', error);
      return false;
    }
  }

  create(item) {
    return this._herois.create(item, { raw: true });
  }

  read(item) {
    return this._herois.findAll({ where: item, raw: true });
  }

  update(id, item) {
    return this._herois.update(item, { where: { id } });
  }
  delete(id) {
    const query = id ? { id } : {};
    return this._herois.destroy({ where: query });
  }
}

module.exports = PostgreSQLStrategy;
