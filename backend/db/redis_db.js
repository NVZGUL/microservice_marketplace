const Promise = require('promise');
const RedisPromise = require('./util/redis_promise');
const db_operation = require('./util/db_util').db_operation;
const db_message = require('./util/db_util').db_message;
const db_make_status = require('./util/db_util').db_make_status;

const redis_db = {

    findUser: async (id) => {
        try {
            const data = await RedisPromise.hgetall(id);
            return data ? 
                db_make_status(db_operation.FIND_USER, true, data) :
                db_make_status(db_operation.FIND_USER, false, db_message.USER_NOT_EXIST)
        } catch(error) {
            return db_make_status(db_operation.FIND_USER, false, db_message.DB_FAILED)
        }
        
    },

    addUser: async (id, token, email, name) => {
        try {
            const res = await RedisPromise.hmset(id, {
                'google-id': id,
                'google-token': token,
                'google-email': email,
                'google-name': name
            })
            return res === 'OK' ?
                db_make_status(db_operation.ADD_USER, true, db_message.USER_ADD) :
                db_make_status(db_operation.ADD_USER, false, db_message.USER_NOT_ADD)
        } catch (error) {
            return db_make_status(db_operation.ADD_USER, false, db_message.DB_FAILED)
        }
    },
    existUser: async (id) => {
        try {
            const res = await RedisPromise.exist(id);
            return res === 1 ?
                db_make_status(db_operation.EXIST_USER, true, db_message.USER_EXIST) :
                db_make_status(db_operation.EXIST_USER, false, db_message.USER_NOT_EXIST)
        } catch (error) {
            return db_make_status(db_operation.EXIST_USER, false, db_message.DB_FAILED)
        }
    },

    deleteUser: async(id) => {
        try {
            const res = await RedisPromise.del(id);
            return res === 1 ?
                db_make_status(db_operation.DELETE_USER, true, db_message.USER_DELETED) :
                db_make_status(db_operation.DELETE_USER, false, db_message.USER_NOT_DELETED)

        } catch (error) {
            return db_make_status(db_operation.EXIST_USER, false, db_message.DB_FAILED)
        }
    }
}

module.exports = redis_db;
//redis_db.existUser(12).then(console.log)
//redis_db.findUser(115637759064460931723).then(console.log, console.log);
//redis_db.findUser(115637759064460931723).then(console.log, console.log);
//redis_db.existUser(13).then(console.log, console.log)
redis_db.addUser(131, "dsdjsk", "test@te.st", "Test").then(console.log)
redis_db.findUser(131).then(console.log)
redis_db.deleteUser(131).then(console.log)
redis_db.findUser(131).then(console.log)
//redis_db.existUser(12).then(console.log, console.log)
//redis_db.addUser()