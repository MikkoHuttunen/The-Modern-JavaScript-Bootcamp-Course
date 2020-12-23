//Admin product related functionality

//Implement modules
const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const newProductTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const editProductTemplate = require('../../views/admin/products/edit');
const middlewares = require('./middlewares');
const { requireTitle, requirePrice } = require('./validators');

//Routers
const router = express.Router();

//Store product images
const upload = multer({ storage: multer.memoryStorage() })

//Admin products page
router.get('/admin/products', requireAuth, async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

//Add new product page
router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(newProductTemplate({}));
});

//New product page post requests
router.post('/admin/products/new', requireAuth, upload.single('image'), [requireTitle, requirePrice], handleErrors(newProductTemplate), async (req, res) => {
    const image = req.file.buffer.toString('base64'); //Convert image file to readable string
    const { title, price } = req.body; //Get title and price from user input

    await productsRepo.create({ title, price, image }); //Create new product
    res.redirect('/admin/products'); //Redirect user to a new page after creating product
});

//Edit product page
router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
    const product = await productsRepo.getOne(req.params.id);

    //If there is no product with id
    if (!product) {
        return res.send('Product not found');
    }

    res.send(editProductTemplate({ product }));
});

//Edit product page post requests
router.post('admin/products/:id/edit', requireAuth, async (req, res) => {});

module.exports = router;