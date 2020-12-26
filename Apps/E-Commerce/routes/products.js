//Customer side product related functionality

//Implement modules
const express = require('express');

const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/index');

//Routers
const router = express.Router();

//Landing/front page
router.get('/', async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

module.exports = router;