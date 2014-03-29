#!/usr/bin/env node

var argv = require('optimist').argv;
var piGlowClock = require('../');

var options = {};

if(argv.h || argv.help) {
    showHelp();
    process.exit(0);
}

if(argv.v || argv.version) {
    showVersion();
    process.exit(0);
}

if(argv.b || argv.brightness) {
    options.brightness = argv.b || argv.brightness;
}

if(argv.d || argv.debug) {
    options.debug = true;
}

piGlowClock.start(options, function(error) {
    if(error) {
        console.log(error.message);
        process.exit(1);
    }
});

process.on('SIGINT', end);

function end() {
    piGlowClock.stop(function() {
        process.exit();
    });
}

function showVersion() {
    console.log(require('../package.json').version);
}

function showHelp() {
    var help = [
        'Usage: piglow-clock [options]',
        '',
        'Options:',
        '  -b, --brightness: sets the brightness of the LEDs',
        '  -h, --help:       this help',
        '  -d, --debug:      activates the debug mode, print the time to console',
        ''
    ];

    console.log(help.join('\n'));
}
