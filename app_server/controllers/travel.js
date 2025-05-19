/* GET travel page */
const fs = require('fs');

const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

module.exports.list = function(req, res) {
    res.render('travel', { 
        title: 'Travlr Getaways',
        trips: trips,
        travel: true
    });
}; 