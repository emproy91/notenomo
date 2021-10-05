require('dotenv').config();

const app = require('./server');
require('./database');

//console.log(process.env.TESTING) //Estas variables sensibles no se van a subir en produccion

//require('./server');

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})