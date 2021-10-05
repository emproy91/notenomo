const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); //pide el modelo del usuario

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {

    //Match Email's user
    const user = await User.findOne({ email })
    if (!user) {
        return done(null, false, { message: 'No se encontró el usuario.' });
    } else {
        //Match Password's user
        const match = await user.matchPasssword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta.' })
        }
    }
}));
//guardar usuario registrado en la sesion del servidor
passport.serializeUser((user, done) => {
    done(null, user.id);
});
//consulta para mantener sesion en cada ruta o vista
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});