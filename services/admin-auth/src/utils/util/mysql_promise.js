/* eslint-disable */
const mysql = require('mysql');
const Promise = require('promise');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

/*
const MySqlPromise = {
    getAllOrders: () => {
        connection.connect();
        const res = new Promise(
            (resolve, reject) => connection.query("SELECT * FROM valid_users", 
                (err, res) => err ? reject(err) : resolve(res)
            )
        );
        connection.end();
        return res;
    },
    insertOrder: (data) => {
        connection.connect();
        const res = new Promise(
            (resolve, reject) => connection.query(`INSERT INTO test1 values ()`)
        );
        connection.end();
    }
}
*/
class MySqlPromise {

    constructor(table) {
        this.table = table;
    }

    getScheme() {
        //connection.connect();
        const res = new Promise(
            (resolve, reject) => connection.query(`SHOW COLUMNS FROM ${this.table}`, 
                (err, res, fields) => err ? reject(err) : resolve(res.map(el => el.Field))
            )
        )
        //connection.end();
        return res;
    }

    getData() {
        connection.connect();
        const res = new Promise(
            (resolve, reject) => connection.query(`SELECT * FROM ${this.table}`,
                (err, res) => err ? reject(err) : resolve(res)
            )
        );
        connection.end();
        return res;
    }
    addData(data) {
        const columns = Object.keys(data).reduce((a,b) => a + ',' + b);
        const values = Object.values(data).reduce((a,b) => a + ',' + b);
        connection.connect();
        const res = new Promise(
            (resolve, reject) => connection.query(`INSERT INTO ${this.table}(${columns}) VALUES (${values})`,
                (err, res) => err ? reject(err) : resolve(res)
            )
        );
        connection.end();
        return res;
    }

    mapToColumnName(name) {
        switch (name.toLowerCase()) {
            case "кат.номер":
                return "Id";
            case "цена":
                return "price";
            case "наименование":
                return "description";
            default:
                return "";
        }
    }

    createQueryFields(data) {
        return data.reduce((a, b) => a + ',' + b);
    }

    async addAndUpdate(data) {
        /*
        data = {
            "key": [value]
            ...
        }
        =>
        map()
        */
        const columns = this.createQueryFields(Object.keys(data));
        //const values = Object.values(data).map(this.createQueryFields);
        const header = Object.keys(data);
        let obj = [];
        [...Array(header.length).keys()].map((i) => {
            obj.push(Object.values(data).map((x) => x[i]));
        })
        const values = obj.map(this.createQueryFields).reduce((x, y)=> '(' + x + '),' + '(' + y + ')')
        console.log(values)
        connection.connect();

        const res = await new Promise(
            (resolve, reject) => connection.query(`SELECT ${columns} FROM ${this.table}`,
                (err, res) => err ? reject(err) : resolve(res)
            ) 
        )
        
        //const query = INSERT INTO ${this.table} (${columns}) VALUES (val), (val) ON DUPLICATE KEY UPDATE 
        connection.end();
        return res;
    }

    updateData(data) {
        connection.connect();
        const query = 1;
        const res = new Promise(
            (resolve, reject) => connection.query(`UPDATE ${this.table} SET ${query} WHERE ID = ${id}`,
                (err, res) => err ? reject(err) : resolve(res)
            )
        )
        connection.end();
    }
}

module.exports = MySqlPromise;
const data = {
    email: ["email", "email1"],
    ID: ["id", "id1"]
}
let test = new MySqlPromise('valid_users')
test.addAndUpdate(data).then(console.log);
console.log(["dsad", "цена", "dsds", "кат.номер"].map(test.mapToColumnName).filter(Boolean))