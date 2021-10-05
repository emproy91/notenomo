const indexCtrl = {}; //objeto asignado al control del render de vistas

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderAbout = (req, res) => {
    res.render('about')
};

module.exports = indexCtrl;