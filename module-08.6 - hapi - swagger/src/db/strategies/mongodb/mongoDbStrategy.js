const ICrud = require('../base/interfaceDb')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}
class MongoDB extends ICrud {
    // 3o
    constructor(connection, schema) {
        super()
        // 4o
        this._connection = connection;
        this._collection = schema;
    }
    // 2o
    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]

    }
     // 1o 
    static connect() {
        Mongoose.connect('mongodb://erickwendel:minhasenhasecreta@localhost:27017/herois', {
            useNewUrlParser: true
        }, function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error)
        })
        const connection = Mongoose.connection
        connection.once('open', () => console.log('database rodando!!'))
        return connection;
    }

    async create(item) {
        return this._collection.create(item)
    }
    async read(item = {}) {
        return this._collection.find(item, { nome: 1, poder: 1, insertedAt: 1})
    }
    async update(id, item) {
        return this._collection.updateOne({_id: id}, { $set: item})
    }
    
    async delete(id) {
        return this._collection.deleteOne({_id: id})
    }
}

module.exports = MongoDB