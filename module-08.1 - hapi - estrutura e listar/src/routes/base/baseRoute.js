class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            .filter(method => method !== 'constructor' && !method.startsWith('_'))
    }
}

module.exports = BaseRoute