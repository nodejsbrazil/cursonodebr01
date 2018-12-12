use herois-db

// create
db.herois.create({ nome: 'Iron man', poder: 'Rico'})

// read
db.herois.find({})

// update
db.herois.update({_id: id}, {$set: {nome: 'papaleguas'}})

// delete
db.herois.delete({_id: id})

