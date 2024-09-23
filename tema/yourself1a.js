// Do it yourself 1
// Create a server that responds to 127.0.0.1:3000 with your city name
// and your country name.
5




let http = require('http');

let server = http.createServer((req, res) => {
  
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('City: Linz\nCountry: Romania');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
