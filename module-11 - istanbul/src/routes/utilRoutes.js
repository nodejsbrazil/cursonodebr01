const BaseRoute = require('./base/baseRoute')
const {
    join
} = require('path')
/*
    1o add nyc
    2o npm t
    3o create utilRoutes
    4o register on api
    5o run on navigator
    6o add .gitignore
    7o add --exit to npm t
    8o add postinstall
*/
class UtilRoutes extends BaseRoute {
    coverage() {
        return {
            path: '/coverage/{param*}',
            method: 'GET',
            config: {
                auth: false,
            },
            handler: {
                directory: {
                    path: join(__dirname, '../../coverage'),
                    redirectToSlash: true,
                    index: true,
                },
            },
        }
    }
}

module.exports = UtilRoutes