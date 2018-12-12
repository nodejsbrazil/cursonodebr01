const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'listar herois',
                notes: 'retorna a base inteira de herois',
                validate: {
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown()
                }
            },
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }
    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'cadastrar herois',
                notes: 'Cadastra um heroi por nome e poder',
                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                    },
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    payload: {
                        nome: Joi.string().max(100).required(),
                        poder: Joi.string().max(30).required()
                    }
                },

            },
            handler: (request, headers) => {
                const payload = request.payload
                return this.db.create(payload)
            }
        }
    }
    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'atualizar herois',
                notes: 'atualiza um heroi por ID',
                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                    },
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().max(100),
                        poder: Joi.string().max(30)
                    }
                },

            },
            handler: (request, headers) => {
                const payload = request.payload;
                const id = request.params.id;
                return this.db.update(id, payload)
            }
        }
    }
    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'remover herois',
                notes: 'remove um heroi por id',
                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                    },
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: (request, headers) => {
                const id = request.params.id;
                return this.db.delete(id)
            }
        }
    }

}

module.exports = HeroRoutes