//Implement modules
const express = require('express');
const { check, validationResult } = require('express-validator');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    requireEmailExists,
    requireValidPasswordForUser
} = require('./validators');

//Subrouter
const router = express.Router();

//Sign up page
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});

//Handle sign up page post requests
router.post('/signup',
    //Validation & sanitation
    [requireEmail, requirePassword, requirePasswordConfirmation],
    async (req, res) => {
        const errors = validationResult(req);

        //Error handling
        if (!errors.isEmpty()) {
            return res.send(signupTemplate({ req, errors }));
        }

        const { email, password, passwordConfirmation } = req.body;
        const user = await usersRepo.create({ email, password }); //Create new user
        req.session.userId = user.id; //Store userId inside the user cookie
    
        res.send('Account created');
});

//Sign out page
router.get('/signout', (req, res) => {
    //Clear cookies
    req.session = null;
    res.send('You are logged out');
});

//Sign in page
router.get('/signin', (req, res) => {
    res.send(signinTemplate({}));
});

//Handle sign in page post requests
router.post('/signin',
    //Validation
    [requireEmailExists, requireValidPasswordForUser],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send(signinTemplate({ errors }));
        }

        const { email } = req.body;
        const user = await usersRepo.getOneBy({ email });

        //Start session
        req.session.userId = user.id;
        res.send('You are signed in');
});

//Export router for accessing
module.exports = router;