'use strict';

const request = require('request');
const logger = require('./logger').getInstance('Monitor');

class Monitor {
    /*
    * expecting a payload with the url, expectedStatusCode, and pollingInterval 
    */
    constructor(redisJson) {
        const redisData = JSON.parse(redisJson);
        if (!redisData.url) {
            throw new Error('No endpoint supplied to the monitor');
        }

        this.url = redisData.url;
        this.expectedStatusCode = redisData.expectedStatusCode || 200;
        this.pollingInterval = redisData.pollingInterval || 5000;
    }

    start() {
        setInterval(this.pollingHandler.bind(this), this.pollingInterval);
    }

    pollingHandler() {
        var self = this;
        // hit the endpoint
        logger.info('Making a request to url', self.url);
        request(self.url, function requestHandler(error, response, body) {
            if (error) {
                logger.error('An unexpected error occurred while requesting endpoint', self.url);
                return;
            }
            
            // check response with expected response
            if (response.statusCode !== self.expectedStatusCode) {
                logger.error('The response status code was not the expected one!', {
                    expected: self.expectedStatusCode,
                    actual: response.statusCode
                });
            } else {
                logger.error('The request was successful!');
            }
            
            // TODO: log result (redis?)
        });
    }
}

module.exports = Monitor;