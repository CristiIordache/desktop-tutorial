const http = require('http');
const fs = require('fs');
const path = require('path');


function replaceTemplate(template, data) {
  let output = template.replace(/{%PRODUCT%}/g, data.product);
  output = output.replace(/{%DESCRIPTION%}/g, data.description);
  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace(/{%IMAGE%}/g, data.image);
  return output;
}


const server = http.createServer((req, res) => {
  
  if (req.url === '/' || req.url === '/product') {
   
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading data');
        return;
      }

      const productData = JSON.parse(data)[0]; 


      fs.readFile(path.join(__dirname, 'templates', 'page.html'), 'utf-8', (err, template) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error loading template');
          return;
        }

        
        const output = replaceTemplate(template, productData);
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(output);
      });
    });
  } else {
   
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});


server.listen(3000, () => {
  console.log('Server running on port 3000');
});
