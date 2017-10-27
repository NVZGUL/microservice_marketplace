const redis = require('redis');
const Promise = require('promise');
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

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
//RedisPromise.hmset(13, {1:"sdsd", 2:"dsdsdsd"}).then((res) => console.log("this is" + res));
//RedisPromise.hgetall(12).then(console.log);
//RedisPromise.hgetall(115637759064460931723).then(console.log, console.log)
//RedisPromise.exist(115637759064460931723).then(console.log, console.log)
//RedisPromise.hgetall(1).then(console.log, console.log)
//client.hgetall(12, (err, obj) => console.log(obj))
//RedisPromise.testAs(12,console.log)
//console.log(1)