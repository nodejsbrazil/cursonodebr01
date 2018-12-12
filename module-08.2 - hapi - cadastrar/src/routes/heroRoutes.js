const BaseRoute = require('./base/baseRoute')
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }
    create() {
        return {
            path: '/herois',
            method: 'POST',
            handler: (request, headers) => {
                const payload = request.payload
                return this.db.create(payload)
            }
        }
    }
    
}

module.exports = HeroRoutes