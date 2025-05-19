/* GET rooms page */
const fs = require('fs');

const roomsData = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

module.exports.list = function(req, res) {
    res.render('rooms', { 
        title: 'Travlr Getaways - Rooms',
        rooms: roomsData,
        isRooms: true
    });
}; 