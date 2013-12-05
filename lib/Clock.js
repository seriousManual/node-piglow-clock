var util = require('util');

var PTic = require('ptic');

function Clock() {
    PTic.call(this, 1000);

    this.on('tick', this._step.bind(this));
    this.start(false);
}

util.inherits(Clock, PTic);

Clock.prototype._step = function() {
    var myTime = new Date();

    this.emit('second', {
        h: myTime.getHours(),
        m: myTime.getMinutes(),
        s: myTime.getSeconds(),
        ms: myTime.getMilliseconds()
    });
};

module.exports = Clock;