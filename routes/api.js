// Handles api Routes: GET, POST and DELETE
const api = require('express').Router();
// add fs package
const fs = require('fs');
// We need these functions to help with reading and writing in our db.json file.
const { readAndAppend, readFromFile } = require('../helper/fsUtils');
// Import the uuid package to generate random ids
const { v4: uuidv4 } = require('uuid');
// String defining where the db is located
let db = './db/db.json';

// API Routes

// Retrieve the data using a GET request
api.get('/notes', (req, res) => {
    // call the readFromFile function that returns a promise
    readFromFile(db).then((notes) => {
        // with the promise, parse it into a js object
        res.json(JSON.parse(notes));
    });
});

// Send data to db,json using POST request
api.post('/notes', (req, res) => {
    // destructure the title and text for a new note entered
    const { title, text } = req.body;
    if (req.body) {
        let newNote = {
            title,
            text,
            id: uuidv4(), // Generates a unique ID for the new note
        };
        readAndAppend(db, newNote);
        res.json('Note added successfully');
    } else {
        res.error('Error occurred whilst adding new note');
    }
});

module.exports = api;
