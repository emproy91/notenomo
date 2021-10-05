const usersCtrl = {};

const passport = require('passport');

const User = require('../models/User')

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async(req, res) => {
    const errors = [];

    //[{ text: ' asdasda', { text: 'lkonononlknlkn' } }]

    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden.' });
        //req.flash('error_msg')
    }
    if (password.length < 4) {
        errors.push({ text: 'la contraseña debe tener minimo 4 caracteres.' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email //, password, confirm_password
        })
    } else {
        //res.send('registrado con éxito.');
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'Ese correo ya está en uso.');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPasssword(password)
            await newUser.save();
            req.flash('success_msg', 'Está registrad@ exitosamente');
            res.redirect('/users/signin');
        }
    }
    //console.log(req.body);
    //res.send('received');
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

/*
usersCtrl.signin = (req, res) => {
        res.send('signin');
};
*/
usersCtrl.logout = (req, res) => {
    //res.send('logout');
    req.logout();
    req.flash('success_msg', 'Sesión cerrada.');
    res.redirect('/users/signin');
}

module.exports = usersCtrl;