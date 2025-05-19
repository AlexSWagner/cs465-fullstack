/* GET home page */
module.exports.index = function(req, res) {
    res.render('index', { 
        title: 'Travlr Getaways',
        home: true
    });
}; 