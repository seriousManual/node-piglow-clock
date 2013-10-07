var Emitter = require('events').EventEmitter;
var util = require('util');

function Watch() {
    Emitter.call(this);

    this._intervalHandle = null;

    this.initialize();
}

util.inherits(Watch, Emitter);

Watch.prototype.initialize = function() {
    var that = this;

    this._intervalHandle = setInterval(function() {
        var myTime = new Date();

        that.emit('tick', {h: myTime.getHours(), m: myTime.getMinutes(), s: myTime.getSeconds()} );
    }, 1000);
};

Watch.prototype.stop = function() {
    if(this._intervalHandle) {
        clearInterval(this._intervalHandle);
        this._intervalHandle = null;
    }
};


module.exports = Watch;