var express = require('express');
var router = express.Router();
var usr = require('./user.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(usr);
});

module.exports = router;
