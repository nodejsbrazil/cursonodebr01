/**
 * 1o Add procfile
 * 2o up to heroku
 * 
 * 
 * 2o add mlab
 * 3o run NODE_ENV=prod npm t
 * 
 * 4o add postgres
 * 5o add process.env.SSL_DB
 * 6o add sequelize ssl
 * 7o modify npm t --timeout 10000
 * 8o upto heroku
 * 
 * 9o install pm2
 * 10 up to heroku
 * 11 add pm2 to pre-install
 * 12 up to heroku
 */
const {
    join
} = require('path')
const {
    config
} = require('dotenv')

const {
    ok
} = require('assert')

const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || env === "dev", "environment inválida! Ou prod ou dev")

const configPath = join('./config', `.env.${env}`)

config({
    path: configPath
})


const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDB = require('./src/db/strategies/mongodb/mongoDbStrategy')

const HeroRoutes = require('./src/routes/heroRoutes')
const HeroSchema = require('./src/db/strategies/mongodb/schemas/heroSchema')

const PostgresDB = require('./src/db/strategies/postgres/postgresSQLStrategy')
const AuthRoutes = require('./src/routes/authRoutes')
const UserSchema = require('./src/db/strategies/postgres/schemas/userSchema')


const HapiSwagger = require('hapi-swagger')
const Inert = require('inert')
const Vision = require('vision')
const HapiJwt = require('hapi-auth-jwt2')
const MINHA_CHAVE_SECRETA = process.env.JWT_KEY

const swaggerConfig = {
    info: {
        title: '#CursoNodeBR - API Herois',
        version: 'v1.0'
    },
    lang: 'pt'

}

const app = new Hapi.Server({
    port: process.env.PORT
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connectionPostgres = await PostgresDB.connect()
    const model = await PostgresDB.defineModel(connectionPostgres, UserSchema)
    const postgresModel = new Context(new PostgresDB(connectionPostgres, model));

    const connection = MongoDB.connect()
    const mongoDb = new Context(new MongoDB(connection, HeroSchema))


    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerConfig
        }
    ])
    app.auth.strategy('jwt', 'jwt', {
        key: MINHA_CHAVE_SECRETA,
        // options: {
        //     expiresIn: 30
        // },
        validate: (dado, request) => {
            return {
                isValid: true
            }
        }
    })


    app.auth.default('jwt')


    app.route([
        ...mapRoutes(new HeroRoutes(mongoDb), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(MINHA_CHAVE_SECRETA, postgresModel), AuthRoutes.methods())
    ])

    await app.start()
    console.log('server running at', app.info.port)

    return app;
}
module.exports = main()