var Watch = require('./lib/Watch');
var piglowInterface = require('piglow');

var myWatch;

function start(options, piglow) {
    var brightness = options.brightness || 100;

    myWatch = new Watch();

    myWatch.on('tick', function(time) {
        map(0, time.h, brightness, piglow);
        map(1, time.m, brightness, piglow);
        map(2, time.s, brightness, piglow);
    });
}

function stop() {
    myWatch.stop();
}

function map(leg, value, brightness, piglow) {
    (+value)
        .toString(2)
        .split('')
        .map(function(v) {
            return +v;
        })
        .forEach(function(value, index) {
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