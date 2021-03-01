let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create reference to the model 
let BusinessContacts = require('../models/bcontacts');


/* READ list */
module.exports.displayBContactsList = (req, res, next)=> {
    BusinessContacts.find((err, ContactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactsList);
        
            res.render('BusinessContacts/list', {title: 'Business Contacts List', BusinessContacts: ContactsList
            , displayName: req.user ? req.user.displayName : ''});
            
        }
  });
}


/* display & process ADD PAGE */
module.exports.displayBContactsAdd =  (req, res, next) => {
    res.render('BusinessContacts/add', {title: 'Add Business Contact'
    , displayName: req.user ? req.user.displayName : ''});
};

module.exports.processBContactsAdd =  (req, res, next) => {
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

};


/* display & process ADD PAGE */
module.exports.displayBContactsEdit =(req, res, next) => {
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
            res.render('BusinessContacts/edit', {title:'Edit Contact', bcontacts:contactToEdit
            , displayName: req.user ? req.user.displayName : ''});
        }
    });
};





module.exports.processBContactsEdit =(req, res, next) => {
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
};


/* delete */
module.exports.performDelete = (req, res, next) => {
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
};