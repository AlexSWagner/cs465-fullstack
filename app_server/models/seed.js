const mongoose = require('mongoose');
const Trip = require('./travlr'); // Correctly refers to travlr.js in the same directory
const fs = require('fs');

// Connect to database by requiring the db.js file
require('./db'); // Correctly refers to db.js in the same directory

// Read the trips.json file.
// This path is relative to the project root, where 'node' command is executed.
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Clear existing data and seed new data
const seedDB = async () => {
   try {
       // Remove all existing trips
       await Trip.deleteMany({});
       console.log('Database cleared');
       
       // Insert new trips
       await Trip.insertMany(trips);
       console.log('Database seeded successfully');
       
   } catch (error) {
       console.log('Error seeding database:', error);
   } finally {
       // Close connection whether seeding was successful or not
       mongoose.connection.close();
   }
};

seedDB(); 