//Customer side cart related functionality

//Implement modules
const express = require('express');

const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const showCartTemplate = require('../views/carts/show');

//Routers
const router = express.Router();

//Receive a post request to add an item to a cart
router.post('/cart/products', async (req, res) => {
    let cart;

    //If cart doesn't exit yet create it
    if (!req.session.cartId) {
        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;
    } else {
        //Get existing cart from the repository
        cart = await cartsRepo.getOne(req.session.cartId);
    }

    //Check if added product already exists in the cart
    const existingItem = cart.items.find(item => item.id === req.body.productId);

    if (existingItem) {
        //Increment quantity
        existingItem.quantity++;
    } else {
        //Add new product id to items array
        cart.items.push({ id: req.body.productId, quantity: 1 });
    }

    //Update the cart
    await cartsRepo.update(cart.id, {
        items: cart.items
    });

    res.redirect('/cart');
});

//Receive a GET request to show all items in cart
router.get('/cart', async (req, res) => {
    //Check if cart already exists
    if(!req.session.cartId) {
        return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId);

    //Iterate through cart items and get them from repository
    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id);
        item.product = product;
    }

    res.send(showCartTemplate({ items: cart.items }));
});

//Receive a post request to delete and item from a cart
router.post('/cart/products/delete', async (req, res) => {
    const { itemId } = req.body;
    //Get cart from repository
    const cart = await cartsRepo.getOne(req.session.cartId);
    const items = cart.items.filter(item => item.id !== itemId);

    //Update cart items after removing
    await cartsRepo.update(req.session.cartId, { items });
    res.redirect('/cart');
});

module.exports = router;