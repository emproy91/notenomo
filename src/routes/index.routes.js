const { Router } = require('express')
const router = Router();

const { renderIndex, renderAbout } = require('../controllers/index.controller')

router.get('/', renderIndex);

router.get('/about', renderAbout);

module.exports = router; //se exporta para usarse en server.js