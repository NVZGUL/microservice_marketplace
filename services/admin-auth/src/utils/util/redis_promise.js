const redis = require('redis');
const Promise = require('promise');

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

/* eslint-disable */
client.on('connect', () => console.log('redis connected on ' + process.env.REDIS_PORT));

const RedisPromise = {
    // redis hgetall
    hgetall: (key) => new Promise(
        (resolve, reject) => client.hgetall(key, 
            (err, obj) => err ? reject(err) : resolve(obj)
        )
    ),
    // redis hmset
    hmset: (key, hash) => new Promise(
        (resolve, reject) => client.hmset(key, hash,
            (err, obj) => err ? reject(err) : resolve(obj)
        )
    ),
    // redis exist
    exist: (key) => new Promise(
        (resolve, reject) => client.exists(key,
            (err, obj) => err ? reject(err) : resolve(obj)
        )
    ),
    // redis dell
    del: (key) => new Promise(
        (resolve, reject) => client.del(key, 
            (err, obj) => err ? reject(err) : resolve(obj)
        )
    )
    
}

module.exports = RedisPromise;
/* eslint-enable */
