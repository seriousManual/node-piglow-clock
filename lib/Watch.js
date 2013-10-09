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

    step();

    function step() {
        var myTime = new Date();

        that.emit('tick', {
            h: myTime.getHours(),
            m: myTime.getMinutes(),
            s: myTime.getSeconds(),
            ms: myTime.getMilliseconds()
        });

        if(!that._stop) {
            setTimeout(step, 1000 - myTime.getMilliseconds());
        }
    }
};

Watch.prototype.stop = function() {
    this._stop = true;
};


module.exports = Watch;