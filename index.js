const http = require('http')
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const dish = require('./routes/dishRouter');
const promo = require('./routes/promoRouter');
const leaders = require('./routes/leaderRouter');

const app = express();
const hostname = 'localhost';
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/dishes', dish.dishRouter);
app.use('/dishes', dish.dishIdRouter);
app.use('/promotions', promo.promoRouter);
app.use('/promotions', promo.promoIdRouter);
app.use('/leaders', leaders.leadersRouter);
app.use('/leaders', leaders.leaderIdRouter);

const server = http.createServer(app, (req, res) => {
  console.log('Request for ' + req.url + ' by method ' + req.method);

  if (req.method == 'GET') {
    let fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
      else fileUrl = req.url;

    filePath = path.resolve('./public'+fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
        if ( ( !fs.existsSync(filePath) ) ) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl +
                      ' not found</h1></body></html>');
        } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
        };
    }
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + fileUrl +
              ' not a HTML file</h1></body></html>');
    }
  }
  else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + req.method +
              ' not supported</h1></body></html>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
