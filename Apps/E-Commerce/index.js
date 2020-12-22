//Implement modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

//Routers
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products')

const app = express();

//Use middleware function in every route handler in the app
//Public folder that is visible to browser
app.use(express.static('public'));
//Parses form data to more readable form
app.use(bodyParser.urlencoded({ extended: true }));
//Cookie encryption
app.use(cookieSession({ keys: ['uhuihu345u435345huji3h49']}));
//Use subrouters
app.use(authRouter);
app.use(productsRouter);

//Listen to a port
app.listen(3000, () => {
    console.log('Listening');
});