const mongoose = require('mongoose')

//MONGO_URI='mongodb://localhost/notes-app' <--esto va en .env

const { NOTENOMO_HOST, NOTENOMO_DATABASE } = process.env;
const MONGODB_URI = 'mongodb://' + NOTENOMO_HOST + '/' + NOTENOMO_DATABASE;
//const MONGODB_URI = process.env.MONGODB_URI; <--para que funcione esto

//const MONGODB_URI = 'mongodb://localhost/notes-app'

mongoose.connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }) //'mongodb://192.168.10.10:3000/dbenotroserver'
    .then(db => console.log('Database is conected'))
    .catch(err => console.log(err));