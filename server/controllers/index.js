let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create user model instance
let userModel = require('../models/user');
let User = userModel.User; //alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('home', {title:'Home', subtext:'Pleasure to virtually meet you!'});
}

module.exports.displayAboutPage =  (req, res, next) => {
    res.render('about',  { title: 'About Me', subtext: 'Pleasure to virtually meet you!'});
}

module.exports.displayProjectsPage =  (req, res, next) => {
    res.render('projects',  { title: 'Projects', subtext: 'Here is what I am busy working on!'});
}

module.exports.displayServicesPage =  (req, res, next) => {
    res.render('services',  { title: 'Services', subtext: 'What can I provide to you!'});
}

module.exports.displayContactPage =  (req, res, next) => {
    res.render('contact',  { title: 'Contact', subtext: 'Want to get intouch!' });
}


module.exports.displayLoginPage = (req, res, next) =>{
    //check if user is logged in already
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            anchormessage: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local', 
    (err, user, info) => {
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error' )
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/bcontacts');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage =(req,res,next)=>{
    //check if user is not logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title:"Register",
            messages: req.flash('registerMessage'),
            displayName:req.user ? req.user.displayName:''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req,res,next)=>{
    //instantiate a user object
    let newUser=new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) =>
    {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName:req.user ? req.user.displayName:''
            });
        }
        else 
        {
            //if no error exists, then registration is successful

            //redirect the user and authenticate them

            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/bcontacts')
            });
        }
    });
}

module.exports.performLogout=(req,res,next)=>{
    req.logout();
    res.redirect('/');
}