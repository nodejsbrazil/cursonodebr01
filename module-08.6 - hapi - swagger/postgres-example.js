// npm i pg
// npm install --save sequelize pg-hstore pg

// const { Client } = require('pg');
// const client = new Client({
//   database: 'degfe1gjfh80m8',
//   host: 'ec2-54-163-246-5.compute-1.amazonaws.com',
//   port: 5432,
//   password: 'fea27e438e77e507f6a31e6d8bcc4d8642c88c78b2c7dcc0ec6351d513f43ca8',
//   user: 'vwgytcowhvcjug',
//   ssl: true,
// });
// (async () => {
//   const r = await client.connect();
//   console.log('conectado!');
//   const res = await client.query('SELECT * FROM TB_HEROIS');

//   console.log(res.rows); // Hello world!
//   await client.end();
// })();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'herois', //database
  'erickwendel', // user
  'minhasenhasecreta', //senha
  {
    host: 'localhost',
    dialect: 'postgres',
    // case sensitive
    quoteIdentifiers: false,
    // deprecation warning
    operatorsAliases: false

    // dialectOptions: {
    //   ssl: true,
    // },
  },
);

(async () => {
  const Herois = sequelize.define(
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

  // force: true will drop the table if it already exists
  await Herois.sync();
  // Table created
  const result = await Herois.create({
    nome: 'John',
    poder: 'Hancock',
  });
  console.log(
    'result',
    await Herois.findAll({ raw: true, attributes: ['nome', 'poder', 'id'] }),
  );
})();
