var util = require('util');

var piglowInterface = require('piglow');
var depugger = require('depugger');

var Clock = require('./lib/Clock');

var MAX_DIGIT_NUMBER = 6;

var myClock, piglow, debug;

function start(options, p) {
    piglow = p;
    var brightness = options.brightness ? piglowInterface.processValue(options.brightness) : 10;

    debug = depugger(options.debug, 'clock');
    myClock = new Clock();

    myClock.on('tick', function(time) {
        debug('%dh %dmin %ds %dms', time.h, time.m, time.s, time.ms);

        piglow.startTransaction();
        piglow.reset;
        map(0, time.h, brightness, piglow);
        map(1, time.m, brightness, piglow);
        map(2, time.s, brightness, piglow);
        piglow.commitTransaction();
    });
}

function stop(callback) {
    piglow.reset;
    myClock.stop();

    setTimeout(callback, 100);
}

function map(leg, value, brightness, piglow) {
    var list = (+value)
        .toString(2)
        .split('')
        .map(function(v) {
            return +v;
        });

    while(list.length < MAX_DIGIT_NUMBER) {
        list.unshift(0);
    }

    list.forEach(function(value, index) {
        if(value === 1) {
            piglow['l_' + leg + '_' + index] = brightness;
        }
    });
}

module.exports = {
    start: function(options, callback) {
        options = options || {};

        piglowInterface(function(error, piGlowHandler) {
            if(error) {
                return callback(error);
            }

            start(options, piGlowHandler);

            callback(null);
        });
    },
    stop: stop
};
