const { log } = require('console');
const fs = require('fs');
console.log("1");

// Sync 

// const result = fs.readFileSync('./test.txt', 'utf8');
// console.log(result);

// console.log("2");


// Async 
fs.readFile('./test.txt', 'utf8', (err, result) => {
    console.log(result);

    console.log("2");

});

