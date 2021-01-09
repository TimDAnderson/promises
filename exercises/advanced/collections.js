/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

const Promise = require('bluebird');
const promisifiedFunctions = require('../bare_minimum/promiseConstructor');
const fs = require('fs');

var combineFirstLineOfManyFiles = function (filePaths, writePath) {
  // TODO
  //map over the filePaths array and turn them into promises
  return new Promise((resolve, reject) => {
    var promiseArray = [];
    for (var i = 0; i < filePaths.length; i++) {
      promiseArray.push(new Promise((resolve, reject) => {
        fs.readFile(filePaths[i], 'utf-8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.split('\n')[0]);
          }
        });
      }));
    }
    Promise.all(promiseArray)
      .then((dataArray) => {
        //for each item in dataArray
        let returnText = '';
        for (var i = 0; i < dataArray.length; i ++) {
          if (i === dataArray.length - 1) {
            returnText = returnText + dataArray[i];
          } else {
            returnText = returnText + dataArray[i] + '\n';
          }
        }
        //write to new line in write path
        fs.writeFile(writePath, returnText, (err)=> {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};