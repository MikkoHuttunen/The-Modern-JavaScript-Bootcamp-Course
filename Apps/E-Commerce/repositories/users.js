//Handles user related functions

//Implement modules
const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

//Turn crypto function to return promise
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
    constructor (filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        //Check if file exists, if not, create it
        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }

    //Get all user data
    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
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

    //Compare user input password to database
    async comparePasswords(saved, supplied) {
        //Saved -> password saved in database (hashed.salt)
        //Supplied -> password given by user input when signing in
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

        return hashed === hashedSuppliedBuf.toString('hex');
    }

    //Write data to a file
    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    //Give users random id
    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    //Find specific user by id
    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    //Delete user
    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRecords);
    }

    //Update user information
    async update(id, attributes) {
        const records = await this.getAll();
        const record = records.find(record = record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }

        //Write given information to a record
        Object.assign(record, attributes);
        await this.writeAll(records);
    }

    //Find user by given attributes
    async getOneBy(filters) {
        const records = await this.getAll();
        
        for (let record of records) {
            let found = true;

            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }

            if (found) {
                return record;
            }
        }
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