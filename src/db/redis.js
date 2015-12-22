'use strict';

const redis = require('redis');
const Promise = require('bluebird');
const config = require('../config');
const logger = require('../logger').getInstance('RedisConnection'); 
let _redisConnection;

Promise.promisifyAll(redis);

class RedisConnection {
    constructor () {
        this.client = redis.createClient(config.redisPort, config.redisHost);
        this.client.on('connect', function() {
            logger.info('ctor => connected to redis', {
                host: config.redisHost,
                port: config.redisPort
            });
        }); 
    }
    
    getClient() {
        return this.client;
    }
}

function getInstance () {
    if (!_redisConnection) {
        _redisConnection = new RedisConnection();
    }
    return _redisConnection.getClient();
}

module.exports.getInstance = getInstance;