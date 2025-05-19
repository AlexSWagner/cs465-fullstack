var express = require('express');
var router = express.Router();
const ctrlRooms = require('../controllers/rooms');

/* GET rooms page */
router.get('/', ctrlRooms.list);

module.exports = router; 