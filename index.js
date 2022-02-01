const http = require('http')
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const dish = require('./routes/dishRouter');
const promo = require('./routes/promoRouter');
const leaders = require('./routes/leaderRouter');
const users = require('./routes/users');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

const app = express();
const hostname = 'localhost';
const port = 3000;

app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUnitialized: false,
  resave: false,
  store: new FileStore()
}));

function auth (req, res, next) {
  console.log(req.session);

  if(!req.session.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}

app.use(bodyParser.json());
app.use(auth);
app.use('/dishes', dish);
app.use('/promotions', promo);
app.use('/leaders', leaders);
app.use('/users', users);

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app, (req, res) => {
  console.log('Request for ' + req.url + ' by method ' + req.method);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
