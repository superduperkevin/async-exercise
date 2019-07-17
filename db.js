const fs = require('fs').promises;
/*
All of your functions must return a promise!
*/

/* 
Every function should be logged with a timestamp.
If the function logs data, then put that data into the log
ex after running get('user.json', 'email'):
  sroberts@talentpath.com 1563221866619

If the function just completes an operation, then mention that
ex after running delete('user.json'):
  user.json succesfully delete 1563221866619

Errors should also be logged (preferably in a human-readable format)
*/

/**
 * Logs the value of object[key]
 * @param {string} file
 * @param {string} key
 */

function log(value) {
  return fs.appendFile('log.txt', `${value} ${Date.now()}\n`);
}
// async await solution
// async await solution
// async await solution

// async function get(file, key) {
//   try {
//     // 1. read file
//     // 2. handle promise --> data
//     const data = await fs.readFile('file', 'utf-8');
//     // 3. parse data from string --> JSON
//     const parsed = JSON.parse(data);
//     // 4. use the key to get the value fo object[key]
//     const value = parsed[key];
//     // 5. append the log file with the above value
//     if (!value) return log(`ERROR ${key} invalid key on ${file}`);
//     return log(value);
//   } catch (err) {
//     log(`ERROR no such file or directory ${file}`);
//   }
// }

// promise solution
// promise solution
// promise solution

function get(file, key) {
  // 1. read file
  // 2. handle promise --> data
  return fs
    .readFile(file, 'utf-8')
    .then(data => {
      // 3. parse data from string --> JSON
      const parsed = JSON.parse(data);
      // 4. use the key to the value at object[key]
      const value = parsed[key];
      if (!value) return log(`ERROR ${key} invalid key on ${file}`);
      // 5. append the log file with the above value
      return log(value);
    })
    .catch(err => log(`ERROR no such file or directory ${file}`));
}
// const numHarrys = .match(/Harry/g).length; // count the harrys

/**
 * Sets the value of object[key] and rewrites object to file
 * @param {string} file
 * @param {string} key
 * @param {string} value
 */

// set function with promises

function set(file, key, value) {
  if (value) {
    return fs
      .readFile(file, 'utf-8')
      .then(data => {
        const parsed = JSON.parse(data);
        // console.log(keyvalue);
        parsed[key] = value;
        fs.writeFile(file, JSON.stringify(parsed));
        return log(parsed[key]);

        // 1. read file
        // 2. handle promise --> data
        // 3. rewrite object to file
      })
      .catch(err => log(`ERROR no such file or directory ${file}`));
  }
  return log(`ERROR value missing`);
}

/**
 * Deletes key from object and rewrites object to file
 * @param {string} file
 * @param {string} key
 */
function remove(file, key) {
  if (key) {
    return fs
      .readFile(file, 'utf-8')
      .then(data => {
        const parsed = JSON.parse(data);
        delete parsed[key];
        fs.writeFile(file, JSON.stringify(parsed));
        return log(parsed[key]);
      })
      .catch(err => log(`ERROR no such file or directory ${file}`));
  }
  return log(`ERROR key missing`);
}

/**
 * Deletes file.
 * Gracefully errors if the file does not exist.
 * @param {string} file
 */
function deleteFile(file) {
  if (file) {
    return fs.unlink(`${file}`);
  }
  return log(`ERROR invalid file`);
}

/**
 * Creates file with an empty object inside.
 * Gracefully errors if the file already exists.
 * @param {string} file JSON filename
 */
function createFile(file) {
  if (!file) {
    return fs.appendFile(file.pop());
  }
  return log(`ERROR file already exists`);
}

/**
 * Merges all data into a mega object and logs it.
 * Each object key should be the filename (without the .json) and the value should be the contents
 * ex:
 *  {
 *  user: {
 *      "firstname": "Scott",
 *      "lastname": "Roberts",
 *      "email": "sroberts@talentpath.com",
 *      "username": "scoot"
 *    },
 *  post: {
 *      "title": "Async/Await lesson",
 *      "description": "How to write asynchronous JavaScript",
 *      "date": "July 15, 2019"
 *    }
 * }
 */
function mergeData() {
  // // 2.
  // return fs.
  //   fileA.filter(file => )
}

/**
 * Takes two files and logs all the properties as a list without duplicates
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *  union('scott.json', 'andrew.json')
 *  // ['firstname', 'lastname', 'email', 'username']
 */
function union(fileA, fileB) {}

/**
 * Takes two files and logs all the properties that both objects share
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    intersect('scott.json', 'andrew.json')
 *    // ['firstname', 'lastname', 'email']
 */
function intersect(fileA, fileB) {}

/**
 * Takes two files and logs all properties that are different between the two objects
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    difference('scott.json', 'andrew.json')
 *    // ['username']
 */
function difference(fileA, fileB) {}

module.exports = {
  get,
  set,
  remove,
  deleteFile,
  createFile,
  mergeData,
  union,
  intersect,
  difference,
};
