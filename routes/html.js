const pageHtml = require('express').Router();
const path = require('path');

// get route for notes page
pageHtml.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// if it is left blank or anything else is typed after the / in the url, it will navigates back to home page
pageHtml.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = pageHtml;