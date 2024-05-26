// Import Express.js and path
const express = require('express');
const path = require('path');

// Import the api router
const api = require('./routes/api');

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Initialize an instance of Express.js
const app = express();

// Static middleware to access the public folder
app.use(express.static('public'));

// Middleware to parse application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// let the app use api routes
app.use('/api', api);

// get route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// if anything else is typed after the / in the url, it will navigates back to home page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
