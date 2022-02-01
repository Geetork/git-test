const http = require('http')
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cookieParser = require('cookieParser');

const dish = require('./routes/dishRouter');
const promo = require('./routes/promoRouter');
const leaders = require('./routes/leaderRouter');

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

function auth(req, res, next) {
  console.log(req.headers);
  let authHeader = req.headers.authotization;
  if (!authHeader) {
    let err = new Error('You are not authenticated!');
    res.setHeader('WWW-Aothenticate', 'Basic');
    err.status = 401;
    next(err);
    return;
  };

  let auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  let user = auth[0];
  let pass = auth[1];
  if (user == 'admin' && pass == 'password'){
    next();
  } else {
    let err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
  }
}

app.use(bodyParser.json());
app.use(auth);
app.use('/dishes', dish);
app.use('/promotions', promo);
app.use('/leaders', leaders);

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app, (req, res) => {
  console.log('Request for ' + req.url + ' by method ' + req.method);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
