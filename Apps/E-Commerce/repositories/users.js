//Handles user related functions

//Implement modules
const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

//Turn crypto function to return promise
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
    //Compare user input password to database
    async comparePasswords(saved, supplied) {
        //Saved -> password saved in database (hashed.salt)
        //Supplied -> password given by user input when signing in
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
    
        return hashed === hashedSuppliedBuf.toString('hex');
    }

    //Add new user data
    async create(attributes) {
        attributes.id = this.randomId();
        const salt = crypto.randomBytes(8).toString('hex'); //Generate salt
        const buf = await scrypt(attributes.password, salt, 64); //Generate encrypted password
        const records = await this.getAll();
        const record = { ...attributes, password: `${buf.toString('hex')}.${salt}` }; //Encrypt password with salt

        records.push(record);
        await this.writeAll(records);
        return record;
    }
}

//Export instance of an users.js for other files to use
module.exports = new UsersRepository('users.json');

/*
//For testing the functions
const test = async () => {
    //Create new users file
    const repo = new UsersRepository('users.json');
    //Create new user

    await repo.create({ email: 'test@email.com', password: 'password123' });
    //Log all users
    const users = await repo.getAll();
    console.log(users);
    //Search one user by id
    const user = await repo.getOne('*user id*');
    console.log(user);
    //Delete user by id
    await repo.delete('*user id*');
    //Update user info by id
    await repo.update('*user id*', { key: '*value*' });
    //Find user by given given attributes
    await repo.getOneBy({ key: '*value*' });
    console.log(user);
}

test();
*/