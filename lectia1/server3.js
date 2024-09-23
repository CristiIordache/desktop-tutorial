let http = require("http");

http.createServer(function (req, res) {
    
    const baseUrl = req.protocol + '://' + req.headers.host;
    console.log(baseUrl);
    
    const reqUrl = new URL(req.url, baseUrl); 
    console.log(reqUrl);
    
    let path = reqUrl.pathname;
    let searchParams = reqUrl.searchParams; 
    
    console.log(searchParams.has('name')); // Verifică dacă există parametrul 'name'
    console.log(searchParams.get('lastname')); // Obține valoarea parametrului 'lastname'
    
    if (searchParams.has('name') && searchParams.get('name') === 'cris') {
        res.write(`hello ${searchParams.get('name')}`);
    }
    
    res.end();

}).listen(3000);
