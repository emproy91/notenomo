const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { //autenticado para agregar y navegar
        return next();
    }
    req.flash('error_msg', 'No Autorizado');
    res.redirect('/users/signin'); //no autenticado, necesita logear
}

module.exports = helpers;