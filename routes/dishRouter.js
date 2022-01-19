const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
const dishIdRouter = express.Router();

dishRouter.use(bodyParser.json());
dishIdRouter.use(bodyParser.json());

dishRouter.route('/')
  .all((req,res,next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
  })
  .get((req,res,next) => {
      res.end('Will send all the dishes to you!');
  })
  .post((req, res, next) => {
      res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .put((req, res, next) => {
      res.statusCode = 403;
      res.end('PUT operation not supported on /dishes');
  })
  .delete((req, res, next) => {
      res.end('Deleting all dishes');
  });

dishIdRouter.route('/:dishId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    next();
  })
  .get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will send dish ' + req.params.dishId + ' to you!');
  })
  .post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will add dish' + req.params.dishId + '!');
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('PUT operation is not supported on /dish/' + req.params.dishId + '!');
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will delete dish ' + req.params.dishId + '!');
  });

module.exports.dishRouter = dishRouter;
module.exports.dishIdRouter = dishIdRouter;
