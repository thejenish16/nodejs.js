import { sync } from 'vuex-router-sync'
const { create } = require("domain")

const fs = require("fs")

// create file in sync 
fs.writeFileSync("./test.txt", "This is a test file created using fs module in Node JS")

// create file in async
fs.writeFile("./test.txt", "This is a test file created using fs module in Node JS", (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("File created successfully")
    }
});

// Append File In Sync
fs.appendFileSync("./test.txt", "\nThis is appended text in sync")

// Append File In Async
fs.appendFile("./test.txt", "\n" + new Date().toLocaleString() + "\n", (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("File appended successfully")
    }
});

// Read File In Sync
const Read = fs.readFileSync("./test.txt", "utf-8")
console.log(Read)

// Read File In Async
fs.readFile("./test.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(data)
    }
}
);

// delete file in sync
fs.unlinkSync("./test.txt")

// copy file in sync
fs.copyFileSync("./test.txt", "./test_copy.txt")
