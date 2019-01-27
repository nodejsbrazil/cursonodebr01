const Sequelize = require('sequelize')
const UserSchema = {
  name: 'users',
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      required: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
  },
  options: {
    //opcoes para base existente
    tableName: 'TB_USUARIOS',
    freezeTableName: false,
    timestamps: false,

  }
}

module.exports = UserSchema