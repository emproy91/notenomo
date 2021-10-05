const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override'); // jala los forms de la lista de notas para poder eliminarlas
const flash = require('connect-flash');
const session = require('express-session'); //guarda mensajes en el servidor
const passport = require('passport')

//Inicializations
const app = express();
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 4000); //buscando servidor de salida o el 4000
app.set('views', path.join(__dirname, 'views')) //metodo para traer la ruta de las vistas en cualquier SO
app.engine('.hbs', exphbs({ //motor de plantillas
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), //ruta de vistas plantillas
    partialsDir: path.join(app.get('views'), 'partials'), //ruta de partials navegación 
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //soportar la info a formato json
app.use(methodOverride('_method')); //envia consulta al boton de eliminar
app.use(session({
    secret: 'secret', //cambiar el secreto luego
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));
/*
app.get('/', (req, res) => {
    res.render('index')
        //res.send('hola tu'); //primera vista a la peticion de la primera ruta del local host
});
*/

//Static Files
app.use(express.static(path.join(__dirname, 'public'))); //llamar los archivos estaticos publicos

module.exports = app;