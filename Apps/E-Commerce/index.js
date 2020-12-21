//Implement modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

//Use middleware function in every route handler in the app
//Parses form data to more readable form
app.use(bodyParser.urlencoded({ extended: true }));
//Cookie encryption
app.use(cookieSession({ keys: ['uhuihu345u435345huji3h49']}));

//Sign up page
app.get('/signup', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

/*
//Middleware function that runs before post function
const bodyParser = (req, res, next) => {
    if (req.method === 'POST') {
        req.on('data', data => {
            //Parsing form data from post
            const parsed = data.toString('utf8').split('&');
            const formData = {};
            for (let pair of parsed) {
                const [key, value] = pair.split('=');
                formData[key] = value;
            }
            req.body = formData;
            next();
        });
    } else {
        next();
    }
}
*/

//Handle sign up page post requests
app.post('/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    //Check if user with given email is already registered
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email is already registered');
    }

    //Check that passwords match when registering
    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    //Create new user
    const user = await usersRepo.create({ email, password });

    //Store userId inside the user cookie
    req.session.userId = user.id;
    
    res.send('Account created');
});

//Sign out page
app.get('/signout', (req, res) => {
    //Clear cookies
    req.session = null;
    res.send('You are logged out');
});

//Sign in page
app.get('/signin', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button>Sign In</button>
            </form>
        </div>
    `);
});

//Handle sign in page post requests
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });

    //Validify email
    if (!user) {
        return res.send('User with given email does not exist');
    }

    //Validify password
    const validPassword = await usersRepo.comparePasswords(user.password, password);

    if (!validPassword) {
        return res.send('Invalid password');
    }

    //Start session
    req.session.userId = user.id;
    res.send('You are signed in');
});

//Listen to a port
app.listen(3000, () => {
    console.log('Listening');
});