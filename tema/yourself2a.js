// Do it yourself 2
// Build a server on port 3000 that responds to the user in the following
// way:
// 1. For the url ‘/city - return “Paris”
// 2. For the url ‘/country return “Romania”
// 3. For every other request responds with “I don’t know how to
// respond to that”
// 6




let http = require('http');

let server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Check the URL
  if (req.url === '/city') {
    res.end('Paris');
  } else if (req.url === '/country') {
    res.end('Romania');
  } else {
    res.end('I don’t know how to respond to that');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
