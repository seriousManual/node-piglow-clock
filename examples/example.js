var sandboxed = require('sandboxed-module');

var testUtil = require('../tests/util/util');

var log = [];

var piglowInterfaceMock = testUtil.createPiGlowMock(log);

var piGlowClock = sandboxed.require('../index', {
    requires: {
        "piglow": piglowInterfaceMock
    }
});

piGlowClock.start({}, function() {});

setInterval(function() {
    console.log(log);
}, 1000);