/* GET travel page */
module.exports.list = function(req, res) {
    res.render('travel', { title: 'Travlr Getaways' });
}; 