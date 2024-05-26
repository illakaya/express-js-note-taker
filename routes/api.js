// Handles api Routes: GET, POST and DELETE
const api = require('express').Router();
// We need these functions to help with reading and writing in our db.json file.
const { readAndAppend, readFromFile, writeToFile } = require('../helper/fsHelpers');
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
        res.json(`Note added successfully`);
    } else {
        res.error(`Error occurred whilst adding new note`);
    }
});

// For the end point PORT/api/notes/specified id
api.delete('/notes/:id', (req, res) => {
    // for the request made, retrieve the id parameter
    const id = req.params.id;
    // Read the file and return a promise
    readFromFile(db).then((notes) => {
        // parse the promise into a JS object
        let parsedNotes = JSON.parse(notes);
        // identify the index of the note using the id
        const idIndex = parsedNotes.findIndex((note) => note.id === id);
            if(idIndex === -1) {
                // if the note with the specified id does not exist, then inform the user
                res.json(`Note with ID ${id} does not exist`);
            } else {
                // otherwise, remove the note using splice
                parsedNotes.splice(idIndex, 1);
                // then save the new array to the file again
                writeToFile('./db/db.json', parsedNotes);
                res.json(`Note with ID ${id} has been deleted successfully`);
            };
    })
})

module.exports = api;
