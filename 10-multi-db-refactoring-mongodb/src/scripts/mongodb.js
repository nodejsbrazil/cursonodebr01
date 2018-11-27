// docker ps 
// docker exec -it 57a740453755 mongo -u erickwendel -p minhasenhasecreta --authenticationDatabase herois

// databases
show dbs 

// mudando o contexto para uma database
use herois

// mostrar tables (colecoes)
show collections 

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for(let i=0; i<= 50000; i ++ ) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}
db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0})

// create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

// read
db.herois.find()

// update

db.herois.update({ _id: ObjectId("5bedf37a088070a57a572638") }, 
                 {nome: 'Mulher maravilha'})

db.herois.update({ poder: 'Velocidade' }, 
                 { $set: { poder: 'super força'} })

// delete
db.herois.remove({})
db.herois.remove({nome: 'Mulher maravilha'})