//Middleware functions to reduce duplicate code

const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFunc, dataCb) {
        return async (req, res, next) => {
            const errors = validationResult(req);

            //Handle possible errors
            if (!errors.isEmpty()) {
                let data = {};

                if (dataCb) {
                    data = await dataCb(req);
                }

                return res.send(templateFunc({ errors, ...data }));
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