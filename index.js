var Watch = require('./lib/Watch');

var myWatch;

function start(options) {
    options = options || {};

    var brightness = options.brightness || 100;

    myWatch = new Watch();

    myWatch.on('tick', function(time) {
        map(0, time.h, brightness, {});
        map(1, time.m, brightness, {});
        map(2, time.s, brightness, {});
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
    start: start,
    stop: stop
};