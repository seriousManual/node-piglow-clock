function createPiGlowMock(log) {
    var piglowInterfaceMock = function(callback) {
        callback(null, {
            startTransaction: function() {
                var that = this;

                Object.keys(this).forEach(function(key) {
                    if(key.match(/l_/)) {
                        delete that[key];
                    }
                })
            },
            commitTransaction: function() {
                log.push(JSON.parse(JSON.stringify(this)));
            }
        });
    };

    piglowInterfaceMock.processValue = function(v) {
        return '|' + v + '|';
    };

    return piglowInterfaceMock;
}

module.exports.createPiGlowMock = createPiGlowMock;