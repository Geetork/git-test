const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
const promoIdRouter = express.Router();

promoRouter.use(bodyParser.json());
promoIdRouter.use(bodyParser.json());

promoRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    next();
  })
  .get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will get data about promotions!');
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('PUT operation is not supported!');
  })
  .post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will add data about promotions!');
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Will delete all data about promotions!');
  });

  promoIdRouter.route('/:promoId')
    .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text-plain');
      next();
    })
    .get((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text-plain');
      res.end('Will get data about ' + req.params.promoId + ' promotion!');
    })
    .put((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text-plain');
      res.end('PUT operation is not supported!');
    })
    .post((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text-plain');
      res.end('Will add data about ' + req.params.promoId + ' promotion!');
    })
    .delete((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text-plain');
      res.end('Will delete data about ' + req.params.promoId + ' promotion!');
    });

module.exports.promoRouter = promoRouter;
module.exports.promoIdRouter = promoIdRouter;
