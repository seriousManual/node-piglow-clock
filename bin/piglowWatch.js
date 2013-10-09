#!/usr/bin/env node

var argv = require('optimist').argv;
var piGlowWatch = require('../');

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

piGlowWatch.start(options, function(error) {
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

function showVersion() {
    console.log(require('../package.json').version);
}

function showHelp() {
    var help = [
        'Usage: piglow-watch [options]',
        '',
        'Options:',
        '  -b, --brightenss: sets the brightness of the LEDs',
        '  -h, --help:       this help',
        '',
        ''
    ];

    console.log(help.join('\n'));
}