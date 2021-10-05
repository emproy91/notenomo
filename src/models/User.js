const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

UserSchema.methods.encryptPasssword = async password => { //recibir la contraseña
    const salt = await bcrypt.genSalt(10); //algoritmo para cifrar la contraseña 
    return await bcrypt.hash(password, salt); //contraseña cifrada
};
//toma la contraseña en la vista
UserSchema.methods.matchPasssword = async function(password) {
    //compara las contraseñas cifradas de la BD y de la vista
    return await bcrypt.compare(password, this.password);

}

module.exports = model('User', UserSchema);