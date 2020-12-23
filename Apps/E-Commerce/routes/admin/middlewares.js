//Middleware functions to reduce duplicate code

const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFunc) {
        return(req, res, next) => {
            const errors = validationResult(req);

            //Handle possible errors
            if(!errors.isEmpty()) {
                return res.send(templateFunc({ errors }));
            }

            //If there is no errors continue
            next();
        };
    },
    requireAuth(req, res, next) {
        //Check that user is signed in
        if (!req.session.userId) {
            return (res.redirect('/signin'));
        }

        next();
    }
}