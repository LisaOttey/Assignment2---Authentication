/* File Name: Index.js by Lisa Hayles Ottey 301162155 - 02/13/2021*/

let express = require('express');
let router = express.Router();

let indexcontroller = require('../controllers/index');

/* GET home page old way without controller 
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home', subtext: 'Welcome to my first webpage!'} );
});
*/

/* GET home page. */
router.get('/', indexcontroller.displayHomePage);
router.get('/home', indexcontroller.displayHomePage);

/* GET about page. */
router.get('/about', indexcontroller.displayAboutPage);

/* GET projects page. */
router.get('/projects',  indexcontroller.displayProjectsPage);

/* GET services page. */
router.get('/services',  indexcontroller.displayServicesPage);

/* GET contact page. */
router.get('/contact',  indexcontroller.displayContactPage);

/* GET route for displaying Login page. */
router.get('/login',  indexcontroller.displayLoginPage);

/* GET route for processing Login page. */
router.post('/login',  indexcontroller.processLoginPage);


/* GET route for register page. */
router.get('/register',  indexcontroller.displayRegisterPage);

/* GET route for register page. */
router.post('/register',  indexcontroller.processRegisterPage);

/* GET to perform user logout. */
router.get('/logout',indexcontroller.performLogout);

module.exports = router;
