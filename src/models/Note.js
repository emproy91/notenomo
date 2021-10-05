const { Schema, model } = require('mongoose'); //definimos como guardar los datos

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema); // ...NoteSchema,'collectionNme'); para ponerle nombre especifico a la coleccion
// os objetos y funciones con "//!" son para hacer privadas las notas por usuario