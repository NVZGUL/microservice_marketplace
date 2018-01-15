/* eslint-disable */
const Promise = require('promise');
const RedisPromise = require('./util/redis_promise');
const db_operation = require('./util/db_util').db_operation;
const db_message = require('./util/db_util').db_message;
const db_make_status = require('./util/db_util').db_make_status;
const bcrypt = require('bcryptjs');
const localAuth = require('../auth/local'); 
const randomstring = require('randomstring');

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

    addUser: async (id, email, name, phone) => {
        try {
            const token = localAuth.encodeToken(email);
            const res = await RedisPromise.hmset(email, {
                'google-id': id,
                'google-email': email,
                'google-name': name,
                'token': token,
                'phone': phone
            })
            return res === 'OK' ?
                db_make_status(db_operation.ADD_USER, true, db_message.USER_ADD) :
                db_make_status(db_operation.ADD_USER, false, db_message.USER_NOT_ADD)
        } catch (error) {
            return db_make_status(db_operation.ADD_USER, false, db_message.DB_FAILED)
        }
    },
    // use only with find and exist 
    updateValue: async (key, obj) => {
        try {
            const res = await RedisPromise.hmset(key, obj)
            return res === 'OK' ?
                db_make_status(db_operation.UPDATE_VALUE, true, db_message.VALUE_UPDATE) :
                db_make_status(db_operation.UPDATE_VALUE, false, db_message.VALUE_NOT_UPDATE)
        }
        catch (error) {
            return db_make_status(db_operation.UPDATE_VALUE, false, db_message.DB_FAILED)
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
