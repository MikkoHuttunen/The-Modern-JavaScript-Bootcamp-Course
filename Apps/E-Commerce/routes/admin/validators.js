//Validation and sanitation logic for forms

//Implement modules
const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    requireTitle: check('title')
        .trim()
        .isLength({ min: 5, max: 40 })
        .withMessage('Must be between 5 and 40 characters'),
    requirePrice: check('price')
        .trim()
        .toFloat()
        .isFloat({ min: 1 })
        .withMessage('Must be a number greater than 1'),
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async email => {
            //Check if user with given email is already registered
            const existingUser = await usersRepo.getOneBy({ email });

            if (existingUser) {
                throw new Error('Email is already registered');
            }
        }),
    requirePassword: check('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
        .custom((passwordConfirmation, { req }) => {
            //Check that passwords match when registering
            if (passwordConfirmation !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),
    requireEmailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a valid email')
        .custom(async email => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) {
                throw new Error('User with given email does not exist');
            }
        }),
    requireValidPasswordForUser: check('password')
        .trim()
        .custom(async (password, { req }) => {
            //Find user based on user input
            const user = await usersRepo.getOneBy({ email: req.body.email });

            //If email field is empty
            if (!user) {
                throw new Error('Email cannot be empty');
            }

            //Validify password
            const validPassword = await usersRepo.comparePasswords(user.password, password);

            if (!validPassword) {
                throw new Error('Invalid password');
            }
        })
};