/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

// var fs = require('fs');
// var Promise = require('bluebird');

var Promise = require('bluebird');
var fs = require('fs');
const rp = Promise.promisify(require('request'));



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // // TODO
  // return new promise constructor
  return new Promise ((resolve, reject) => {
    // use fs promise to read file
    fs.promises.readFile(readFilePath, 'utf-8')
    // get username from file data
      .then((data) => {
        return data.split('\n')[0];
      })
    // pass username into api request
      .then((gitHandle)=>{
        rp(`https://api.github.com/users/${gitHandle}`)
        // get response from api request
          .then((profile) => {
            // send response into writefilepath
            fs.promises.writeFile(writeFilePath, profile.body)
            //resolve response 
              .then(()=>{
                resolve();
              });
          });
      });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};


// fetchProfileAndWriteToFile('./timsGit.txt', './timsGit.txt');