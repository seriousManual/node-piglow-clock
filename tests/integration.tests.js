var sandboxed = require('sandboxed-module');
var expect = require('chai').expect;
var sinon = require('sinon');

var testUtil = require('./util/util');


describe('integration', function() {

    it('should set leds', function() {
        var testDate = new Date(2000, 0, 1, 23, 42, 0);
        var clock = sinon.useFakeTimers(testDate.getTime());
        var log = [];

        var piglowInterfaceMock = testUtil.createPiGlowMock(log);

        var piglowWatch = sandboxed.require('../index', {
            requires: {
                "piglow": piglowInterfaceMock
            }
        });

        piglowWatch.start({}, function() {});

        clock.tick(3000);

        clock.restore();

        expect(log).to.deep.equal([
            { l_0_1: 10, l_0_3: 10, l_0_4: 10, l_0_5: 10, l_1_0: 10, l_1_2: 10, l_1_4: 10, l_2_5: 10 },
            { l_0_1: 10, l_0_3: 10, l_0_4: 10, l_0_5: 10, l_1_0: 10, l_1_2: 10, l_1_4: 10, l_2_4: 10 },
            { l_0_1: 10, l_0_3: 10, l_0_4: 10, l_0_5: 10, l_1_0: 10, l_1_2: 10, l_1_4: 10, l_2_4: 10, l_2_5: 10 }
        ]);
    });

    it('should use the brightness', function() {
        var testDate = new Date(2000, 0, 1, 23, 42, 0);
        var clock = sinon.useFakeTimers(testDate.getTime());
        var log = [];

        var piglowInterfaceMock = testUtil.createPiGlowMock(log);

        var piglowWatch = sandboxed.require('../index', {
            requires: {
                "piglow": piglowInterfaceMock
            }
        });

        piglowWatch.start({brightness: 10}, function() {});

        clock.tick(3000);

        clock.restore();

        expect(log).to.deep.equal([
            { l_0_1: '|10|', l_0_3: '|10|', l_0_4: '|10|', l_0_5: '|10|', l_1_0: '|10|', l_1_2: '|10|', l_1_4: '|10|', l_2_5: '|10|' },
            { l_0_1: '|10|', l_0_3: '|10|', l_0_4: '|10|', l_0_5: '|10|', l_1_0: '|10|', l_1_2: '|10|', l_1_4: '|10|', l_2_4: '|10|' },
            { l_0_1: '|10|', l_0_3: '|10|', l_0_4: '|10|', l_0_5: '|10|', l_1_0: '|10|', l_1_2: '|10|', l_1_4: '|10|', l_2_4: '|10|', l_2_5: '|10|' }
        ]);
    });

});