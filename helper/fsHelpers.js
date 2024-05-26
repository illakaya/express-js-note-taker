// Import the fs package
const fs = require('fs');

// Make fs.readFile a promise
const readFromFile = (filePath) => {
    // Create a Promise object, parameters the completion of the operation
    return new Promise((resolve, reject) => {
        // Call the readFile function passing the filePath parameter
        // Callback function passes error and data parameters
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                // If an error occurs, reject the promise object and provide err reason
                reject(err);
            } else {
                // If promise is completed, return the data
                resolve(data);
            }
        });
    });
};

// Make a function that will save content to a filePath
const writeToFile = (filePath, content) =>
    // Call the writeFile function and pass 3 parameters
    // filePath is where the information will be stores
    // content that has been JSON stringified (js objects cannot be stored in JSON)
        // Three parameters of JSON.stringify are the content, replacer (no transformation required to the object) and the space (4 spaces for indentation)
    // Callback function passing the error parameter
    fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) =>
        // Using a ternary operator
        // if an error has occurred (true), log the error to the log
        // if there is no error (false), tell the user that the data has been stored in the filePath
        err ? console.error(err) : console.info(`\nData written to ${filePath}`)
    );

// Make a function that will push content into a file
const readAndAppend = (file, content) => {
    // Call the readFile function passing the filePath parameter
    // Callback function passes error and data parameters
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            // If an error occurs, log the reason to the console
            console.error(err);
        } else {
            // Store the array data into a variable and parse the strings back into an object
            const parsedData = JSON.parse(data);
            // push the content object into the array data
            parsedData.push(content);
            // call the writeToFile function with the file parameter and the newly updated variable
            writeToFile(file, parsedData);
        }
    });
};

// Export the module so that other scripts can use it
module.exports = { readFromFile, writeToFile, readAndAppend };
