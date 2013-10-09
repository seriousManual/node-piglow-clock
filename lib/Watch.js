var Emitter = require('events').EventEmitter;
var util = require('util');

function Watch() {
    Emitter.call(this);

    this._stop = false;

    this.initialize();
}

util.inherits(Watch, Emitter);

Watch.prototype.initialize = function() {
    var that = this;
    var now = new Date();

    setTimeout(function() {
        that.step();
    }, 1000 - now.getMilliseconds());
};

Watch.prototype.step = function() {
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

Watch.prototype.stop = function() {
    this._stop = true;
};


module.exports = Watch;