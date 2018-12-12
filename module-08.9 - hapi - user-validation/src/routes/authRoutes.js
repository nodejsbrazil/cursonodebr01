const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const PasswordHelper = require('./../helpers/passwordHelper')
const USER = {
    username: 'xuxadasilva',
    password: '123'
}
const Jwt = require('jsonwebtoken')

class AuthRoutes extends BaseRoute {
    constructor(key, db) {
        super()
        this.secret = key
        this.db = db
    }

    login() {

        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'fazer login',
                notes: 'retorna o token',
                validate: {
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request, headers) => {
                const {
                    username,
                    password
                } = request.payload

                const [user] = await this.db.read({
                    username: username.toLowerCase()
                })

                if (!user) {
                    return Boom.unauthorized('O usuario informado nao existe')
                }

                const match = await PasswordHelper.comparePassword(password, user.password)

                if (!match) {
                    return Boom.unauthorized('O usuario e senha invalidos!')
                }

                // if (
                //     username.toLowerCase() !== USER.username ||
                //     password !== USER.password
                // )
                //     return Boom.unauthorized()

                return {
                    token: Jwt.sign({
                        username: username
                    }, this.secret)
                }
            }
        }
    }
}
module.exports = AuthRoutes