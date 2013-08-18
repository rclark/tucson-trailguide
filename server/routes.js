module.exports.homePage = function (req, res) {
    res.render('home', res.templateContext);
};

module.exports.mapPage = function (req, res) {
    res.render('map', res.templateContext);
};