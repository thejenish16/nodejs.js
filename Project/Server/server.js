const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {


    let filename = "";
    switch (req.url) {
        case "/":
            filename = "home.html"
            break;
        case "/about":
            filename = "about.html"
            break;
        case "/blog":
            filename = "blog.html"
            break;
        case "/contect":
            filename = "contect.html"
            break;
        default:
            filename = "404.html"
            break;
    }

    fs.readFile(filename, (err, result) => {
        res.end(result);
    })
});

server.listen(5000, (err) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Server Started Successfully");
    }
});