/* global process */
'use strict';

const logger = require('./logger').getInstance('worker-main');
// const config = require('./config');
const redis = require('./db/redis').getInstance();
const RedisKeys = require('./db/keys');
const Monitor = require('./monitor')

var fooData = '{"url": "http://localhost:3000/profile","expectedStatusCode": 200,"pollingInterval": 1000}';

new Monitor(fooData).start();

// function worker(worker) {
    
    // redis.hkeysAsync(RedisKeys.MONITOR)
    //     .then(function (err, replies) {
    //         if (err) {
    //             logger.error(err);
    //             return;
    //         }
            
    //         logger.debug('monitors', replies);
    //     });
// }
