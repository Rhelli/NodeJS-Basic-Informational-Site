const http = require('http');
const url = require('url');
const fs = require('fs');

const errorPage = fs.readFileSync('404.html', 'utf-8', (err, data) => {
  if (err) {
    throw new Error(err)
  }
  return data;
});

http.createServer(function (req, res) {
  const query = url.parse(req.url, true);
  const filename = '.' + query.pathname;
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write(errorPage);
      return res.end();
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
}).listen(3000);