/* File Name: Users.js by Lisa Hayles Ottey 301162155 - 02/13/2021*/

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
