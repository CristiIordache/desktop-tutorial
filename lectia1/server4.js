let http = require('http');
let url = require('url');

let server = http.createServer((req, res) => {
    let queryObject = url.parse(req.url, true);
    let path = queryObject.pathname;
    let params = queryObject.query;

    let a = parseFloat(params.a);
    let b = parseFloat(params.b);

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (path === '/plus' && !isNaN(a) && !isNaN(b)) {
    res.end(`${a + b}`);
  } else if (path === '/mult' && !isNaN(a) && !isNaN(b)) {
    res.end(`${a * b}`);
  } else {
    res.end('nu stiu');
  }
});

server.listen(3000, );
