#!/usr/bin/env node

var argv = require('optimist').argv;
var piGlowWatch = require('../');

if(argv.h || argv.help) {
    showHelp();
    process.exit(0);
}

if(argv.v || argv.version) {
    showVersion();
    process.exit(0);
}

piGlowWatch.start({}, function(error) {
    if(error) {
        console.log(error.message);
        process.exit(1);
    }
});

process.on('SIGINT', end);

function end() {
    piGlowWatch.stop();

    setTimeout(function() {
        process.exit(0);
    }, 1000);
}
