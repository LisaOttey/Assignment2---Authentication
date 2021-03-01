let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let bcontactscontroller = require('../controllers/bcontacts');
//connect to our contacts model
let BusinessContacts = require('../models/bcontacts');

function requireAuth(req, res, next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}



/* Get Route for contact list page - READ LIST operation */
router.get('/', bcontactscontroller.displayBContactsList);

/* GET Route for DISPLAYING ADD Page - CREATE Operation */
router.get('/add', requireAuth, bcontactscontroller.displayBContactsAdd);

/* POST Route for PROCESSING ADD Page - CREATE Operation */
router.post('/add', requireAuth, bcontactscontroller.processBContactsAdd);
    

/* GET Route for DISPLAYING EDIT Page - UPDATE Operation */
router.get('/edit/:id', requireAuth, bcontactscontroller.displayBContactsEdit);


/* POST Route for PROCESSING EDIT Page - UPDATE Operation */
router.post('/edit/:id', requireAuth, bcontactscontroller.processBContactsEdit);
   

/* GET to  - DELETE  Operation */
router.get('/delete/:id', requireAuth, bcontactscontroller.performDelete);


module.exports = router;
