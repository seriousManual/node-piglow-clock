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

piGlowWatch.start({}, function() {
    console.log( 'hello' );
});

process.on('SIGINT', end);

function end() {
    piGlowWatch.stop();
    process.exit();
}