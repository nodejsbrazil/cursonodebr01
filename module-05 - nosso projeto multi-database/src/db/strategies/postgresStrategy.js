const IDb = require('./base/interfaceDb');
class PostgresStrategy extends IDb {
  constructor() {
    super();
  }
  create(item) {
    return 'Postgres';
  }
}

module.exports = PostgresStrategy;
