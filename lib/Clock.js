var Emitter = require('events').EventEmitter;
var util = require('util');

var PTic = require('ptic');

function Clock() {
    Emitter.call(this);

    this._ticker = new PTic(1000);
    this._ticker.on('tick', this._step.bind(this));
    this._ticker.start(false);
}

util.inherits(Clock, Emitter);

Clock.prototype._step = function() {
    var myTime = new Date();

    this.emit('tick', {
        h: myTime.getHours(),
        m: myTime.getMinutes(),
        s: myTime.getSeconds(),
        ms: myTime.getMilliseconds()
    });
};

Clock.prototype.stop = function() {
    this._ticker.stop();
};


module.exports = Clock;