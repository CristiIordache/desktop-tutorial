let http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' }); 

    let path = req.url;
    
    if (path === '/') {
        res.write("homepage");
    } 
    else if (path === '/studenti') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("studenti");
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' }); 
        res.write("Page not found");
    }
    
    res.end();
}).listen(3000);


// let http = require("http");

// http.createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/html" });

//     res.write("<p>Cris api</p>");
//     res.end();
//   })
//   .listen(3000, function () {
//     console.log("http://localhost:3000");
//   });
