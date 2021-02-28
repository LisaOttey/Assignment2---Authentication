let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our contacts model
let BusinessContacts = require('../models/bcontacts');

/* Get Route for contact list page - READ LIST operation */
router.get('/',(req, res, next) => {
    BusinessContacts.find((err, ContactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactsList);
        
            res.render('BusinessContacts/list', {title: 'Business Contacts List', BusinessContacts: ContactsList});
            
        }
  });
});

/* GET Route for DISPLAYING ADD Page - CREATE Operation */
router.get('/add', (req, res, next) => {
    res.render('BusinessContacts/add', {title: 'Add Business Contact'})
});

/* POST Route for PROCESSING ADD Page - CREATE Operation */
router.post('/add', (req, res, next) => {
    let newContact = BusinessContacts({
        "name": req.body.name,
        "number":req.body.number,
        "email": req.body.email
        
    });

    BusinessContacts.create(newContact, (err, BusinessContacts) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh list page
            res.redirect('/bcontacts');
        }
    });

});

/* GET Route for DISPLAYING EDIT Page - UPDATE Operation */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    BusinessContacts.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show edit view
            res.render('BusinessContacts/edit', {title:'Edit Contact', bcontacts:contactToEdit})
        }
    });
});


/* POST Route for PROCESSING EDIT Page - UPDATE Operation */
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id

    let updatedContact = BusinessContacts({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    BusinessContacts.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contacts list
            res.redirect('/bcontacts')
        }
    })
});

/* GET to  - DELETE  Operation */
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    BusinessContacts.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contacts list
            res.redirect('/bcontacts');
        }

    })
});

module.exports = router;
