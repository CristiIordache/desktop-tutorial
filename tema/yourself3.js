
// Do it yourself 3
// Build a server on port 3000 that responds to the user in the following way:
// The server will receive two parameters a and b and
// 1. For the url /plus?a=5&b=6 - return sum of parameters
// 2. For the url /mult?a=5&b=6 - return multiplied parameter
// 3. For every other request responds with “I don’t know how to respond
// to that”
// 7



let http = require('http');
let url = require('url');

let server = http.createServer((req, res) => {
 
  let parsedUrl = url.parse(req.url, true);
  let path = parsedUrl.pathname;
  let query = parsedUrl.query;

  
  let a = parseFloat(query.a);
  let b = parseFloat(query.b);

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  
  if (!isNaN(a) && !isNaN(b)) {
    if (path === '/plus') {
      res.end(`Sum: ${a + b}`);
    } else if (path === '/mult') {
      res.end(`Product: ${a * b}`);
    } else {
      res.end('I don’t know how to respond to that');
    }
  } else {
    res.end('I don’t know how to respond to that');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
