var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { //request done to root url 
  res.render('about', { title: 'About' }); //render contact file based on rendering machine tat specified before => jade 
});

module.exports = router;

//any changes to route file, we need to restart server 