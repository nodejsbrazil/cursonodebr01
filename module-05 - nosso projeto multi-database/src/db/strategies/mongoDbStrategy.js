const IDb = require('./base/interfaceDb');
class MongoDBStrategy extends IDb {
  constructor() {
    super();
  }
  create(item) {
    return 'MongoDB';
  }
}

module.exports = MongoDBStrategy;
