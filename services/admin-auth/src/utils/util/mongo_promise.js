/* eslint-disable */
const mongo = require('mongodb');
const Promise = require('promise')
const client = mongo.MongoClient

/*
class MongoPromise {
    constructor(table_name){
        this.table_name = table_name;
        this.url = "mongodb://mongo/kupi_zapchasti";
    }

    insertOne(obj) {
        return new Promise(
            (resolve, reject) => client.connect(this.url, 
                (err, db) => db.collection(this.table_name).insertOne(obj, 
                    (err, res) => err ? reject(err) : resolve(res)
                )
            )
        ) 
    } 
}
*/
const MongoPromise = {
    insertOne: (obj) => new Promise(
        (resolve, reject) => client.connect("mongodb://mongo/kupi_zapchasti", 
            (err, db) => db.collection('test').insertOne(obj, 
                (err, res) => err ? reject(err) : resolve(res)
            )
        )
    ) 
}

module.exports = MongoPromise;