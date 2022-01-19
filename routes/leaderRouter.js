const express = require('express');
const bodyParser = require('body-parser');

const leadersRouter = express.Router();
const leaderIdRouter = express.Router();

leadersRouter.use(bodyParser.json());
leaderIdRouter.use(bodyParser.json());

leadersRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    next();
  })
  .get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will get data about leaders!');
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('PUT operation is not supported!');
  })
  .post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will add data about leaders!');
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will delete all data about leaders!');
  });

leaderIdRouter.route('/:leaderId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    next();
  })
  .get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will get data about ' + req.params.leaderId + ' leader!');
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('PUT operation is not supported!');
  })
  .post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will add data about ' + req.params.leaderId + ' leader!');
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will delete data about ' + req.params.leaderId + ' leader!');
  });

module.exports.leadersRouter = leadersRouter;
module.exports.leaderIdRouter = leaderIdRouter;
