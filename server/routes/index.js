/* File Name: Index.js by Lisa Hayles Ottey 301162155 - 02/13/2021*/

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home', subtext: 'Welcome to my first webpage!'} );
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home', subtext: 'Welcome to my first webpage!'});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me', subtext: 'Pleasure to virtually meet you!'} );
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', subtext: 'Here is what I am busy working on!'});
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', subtext: 'What can I provide to you!'});
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', subtext: 'Want to get intouch!' });
});


/* GET contact page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', subtext: 'Login to your Account' });
});


module.exports = router;
