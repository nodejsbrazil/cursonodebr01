const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDB = require('./src/db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./src/db/strategies/mongodb/schemas/heroSchema')
const HeroRoutes = require('./src/routes/heroRoutes')

const app = new Hapi.Server({
    port: 4000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {

    const connection = MongoDB.connect()
    const mongoDb = new Context(new MongoDB(connection, HeroSchema))


    app.route([
        ...mapRoutes(new HeroRoutes(mongoDb), HeroRoutes.methods())
    ])

    await app.start()
    console.log('server running at', app.info.port)

    return app;
}
module.exports = main()