
# Module 5: Building a RESTful API

The goal is to refactor the Travlr application by creating separate RESTful API endpoints. This separates the data logic from the server-side views, following the "Separation of Concerns" principle.

## 1. Create a New Git Branch

In your terminal, from the `travlr` project directory, create and switch to a new branch for this module's work.

```bash
git checkout -b module5
```

## 2. Restructure the Project Directories

We need to create a dedicated folder structure for the new API.

1.  Create a new top-level folder named `app_api`.
2.  Inside `app_api`, create two sub-folders: `controllers` and `routes`.
3.  Move the entire `models` folder from `app_server` into `app_api`.

## 3. Update the Database Connection File

The database connection logic now resides in its new location at `app_api/models/db.js`. Ensure its content is as follows:

```javascript
const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// Build the connection string and set the connection timeout.
// timeout is in milliseconds.
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {}), 1000);
}

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

// more mongoose connection events...

connect();
```

## 4. Create the API Trips Controller

Create a new file at `app_api/controllers/trips.js`. This controller will integrate with MongoDB to fetch trip data. Add the following code to create a method that retrieves a list of all available trips:

```javascript
const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    // Uncomment the following line to show results of querey
    // on the console
    // console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList
};
```

## 5. Create the API Router

To make the new controller accessible, create a new router file at `app_api/routes/index.js`.

```javascript
const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList);

module.exports = router;
```

## 6. Wire Up the API in `app.js`

Adjust the main `app.js` file to incorporate the new API router. You need to define a variable for the API routes, update the path to the database connection, and wire up the router to the `/api` path.

Make the following changes in `app.js`:

```javascript
// ... require statements for other routers
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index'); // Create variable for API routes

// ...
// Bring in the database
require('./app_api/models/db'); // Connect to DB

var app = express();
// ... view engine setup

// ... other app.use statements
app.use('/travel', travelRouter);
app.use('/api', apiRouter); // Wire-up API routes

// ... error handlers
module.exports = app;
```

## 7. Enhance the API to Find a Single Trip

Add a new method to `app_api/controllers/trips.js` that takes a `tripCode` as a parameter to filter and select a single trip from the database.

Update the entire `app_api/controllers/trips.js` file with the following code:

```javascript
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
        .find({ 'code': req.params.tripCode }) // Return single record
        .exec();

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode // add additional endpoint to module.exports
};
```

## 8. Update the API Router for the New Endpoint

Modify `app_api/routes/index.js` to add a route for the new parameterized controller.

```javascript
const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList); // GET Method routes triplist

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;
```

## 9. Refactor the Website to Use the API

The final coding step is to change the public-facing travel page to get its data from the new API instead of a static JSON file.

### Modify the `travel.js` Controller

Update the controller at `app_server/controllers/travel.js`. Replace the entire file content with the following code, which uses the `fetch` API to call your new local endpoint.

```javascript
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

/* GET travel view */
const travel = async function (req, res, next) {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No trips exist in our database!';
                }
            }
            res.render('travel', {
                title: 'Travlr Getaways',
                trips: json,
                message
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    travel
};
```
## 10. Ignore the Instructions File

To prevent this instructions file from being committed to your GitHub repository, you should add it to your `.gitignore` file.

Open the `.gitignore` file located in the root of your `travlr` project. Add the following line to the bottom of the file (`module5_instructions.md`):

## 11. Finalize and Commit Changes

Review your changes, add them to git, commit, and push the new branch to your remote repository.

```bash
# 1. Check status
git status

# 2. Add all changes to tracking
git add .

# 3. Commit the changes
git commit -m "Module 5 completed baseline"

# 4. Push changes to GitHub
git push --set-upstream origin module5
```
```