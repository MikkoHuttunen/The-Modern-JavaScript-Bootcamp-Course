//Admin product related functionality

//Implement modules
const express = require('express');
const { validationResult } = require('express-validator');
const productsRepo = require('../../repositories/products');
const newProductTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

//Routers
const router = express.Router();

//Admin products page
router.get('/admin/products', (req, res) => {

});

//Add new product page
router.get('/admin/products/new', (req, res) => {
    res.send(newProductTemplate({}));
});

//Handle post requests
router.post('/admin/products/new', [requireTitle, requirePrice], (req, res) => {
    const errors = validationResult(req);
    res.send('Submitted');
})

module.exports = router;