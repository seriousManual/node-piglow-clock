var Emitter = require('events').EventEmitter;
var util = require('util');

function Watch() {
    Emitter.call(this);

    this.initialize();
}

util.inherits(Watch, Emitter);

Watch.prototype.initialize = function() {
    var that = this;

    setInterval(function() {
        var myTime = new Date();

        that.emit('tick', {h: myTime.getHours(), m: myTime.getMinutes(), s: myTime.getSeconds()} );
    }, 1000);
};


module.exports = Watch;