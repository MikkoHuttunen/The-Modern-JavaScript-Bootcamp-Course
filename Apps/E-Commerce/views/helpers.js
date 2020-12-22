//Functions to supply other functionality

module.exports = {
    getError(errors, prop) {
        try {
            return errors.mapped()[prop].msg;
        } catch (err) {
            return '';
        }
    }
};