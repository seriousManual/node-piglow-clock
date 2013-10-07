var Watch = require('./lib/Watch');

(new Watch()).on('tick', function(time) {
    console.log( arguments );
});