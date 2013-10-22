var Emitter = require('events').EventEmitter;
var util = require('util');

function Clock() {
    Emitter.call(this);

    this._stop = false;

    this.initialize();
}

util.inherits(Clock, Emitter);

Clock.prototype.initialize = function() {
    var that = this;
    var now = new Date();

    setTimeout(function() {
        that.step();
    }, 1000 - now.getMilliseconds());
};

Clock.prototype.step = function() {
    var that = this;

    if(!that._stop) {
        var myTime = new Date();

        that.emit('tick', {
            h: myTime.getHours(),
            m: myTime.getMinutes(),
            s: myTime.getSeconds(),
            ms: myTime.getMilliseconds()
        });

        setTimeout(function() {
            that.step();
        }, 1000 - myTime.getMilliseconds());
    }
};

Clock.prototype.stop = function() {
    this._stop = true;
};


module.exports = Clock;