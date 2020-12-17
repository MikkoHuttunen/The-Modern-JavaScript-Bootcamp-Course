//Implement modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Use middleware function in every route handler in the app
//Parses form data to more readable form
app.use(bodyParser.urlencoded({ extended: true }));

//Handle HTTP requests
app.get('/', (req, res) => {
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

//Handle post requests
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Account created');
});

//Listen to a port
app.listen(3000, () => {
    console.log('Listening');
});