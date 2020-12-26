//Implement modules
const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
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

    //Create new record
    async create(attributes) {
        attributes.id = this.randomId();

        const records = await this.getAll();
        records.push(attributes);
        await this.writeAll(records);

        return attributes;
    }

    //Get all user data
    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
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
        const record = records.find(record => record.id === id);

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