const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    const q = await Model
        .find({})
        .exec();

    if (!q) {
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode })
        .exec();

    if (!q) {
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Model({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const trip = await newTrip.save();
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

// PUT: /trips/:tripCode - Updates a trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const trip = await Model.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        ).exec();
        
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
}; 