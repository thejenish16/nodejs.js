const http = require('http');


const Server = http.createServer((req, res) => {
    res.write("<h1>Im Jenish</h1>");
    res.end();
});

Server.listen(3000, (error) => {
    if (error) 
        console.log(error);

    console.log("Server Is Started Successfully!");

}); 