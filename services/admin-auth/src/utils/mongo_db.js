/* eslint-disable */ 
const Promise = require('promise');
const MongoPromise = require('./util/mongo_promise');
const db_operation = require('./util/db_util').db_operation;
const db_message = require('./util/db_util').db_message;
const db_make_status = require('./util/db_util').db_make_status;


const mongo_db = {
    findOrder: async (name) => {},
    addOrder: async (id, name, price) => {
        try {
            const data = await MongoPromise.insertOne({
                _id: Date.now(),
                'id': id,
                'name': name,
                'price': price,
            })
            return data.result.ok === 1 ?
                db_make_status(db_operation.ADD_ORDER, true, db_message.ORDER_ADD) :
                db_make_status(db_operation.ADD_ORDER, false, db_message.ORDER_NOT_ADD)
        } catch (error) {
            return db_make_status(db_operation.ADD_ORDER, false, db_message.DB_FAILED);
        }
    },
    updateOrder: () => {},
    deleteOrder: () => {}
}

module.exports = mongo_db;
///mongo_db.addOrder(1, 'iphone', '56990').then(console.log);