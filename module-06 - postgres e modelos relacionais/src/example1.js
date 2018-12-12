class NotImplementedException extends Error {
  constructor() {
    super('Not Implemented Exception');
  }
}
//interface
class ICrud {
  create(item) {
    throw new NotImplementedException();
  }
  read(item) {
    throw new NotImplementedException();
  }
  update(id, item) {
    throw new NotImplementedException();
  }
  delete(id) {
    throw new NotImplementedException();
  }
}

class MongoDBStrategy extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log('MongoDBStrategy');
  }
}
class PostgreSQLStrategy extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log('PostgreSQLStrategy');
  }
}

class ContextoStrategy extends ICrud {
  constructor(database) {
    super();
    this._database = database;
  }
  create(item) {
    return this._database.create(item);
  }
  read(item) {
    return this._database.read(item);
  }
  update(id, item) {
    return this._database.update(id, item);
  }
  delete(id) {
    return this._database.delete(id, item);
  }
}

const contextMongo = new ContextoStrategy(new MongoDBStrategy());
contextMongo.create();
const context = new ContextoStrategy(new PostgreSQLStrategy());
context.create();

// context.read();
