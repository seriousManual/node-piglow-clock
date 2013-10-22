# node-piglow-clock

[![Build Status](https://travis-ci.org/zaphod1984/node-piglow-clock.png)](https://travis-ci.org/zaphod1984/node-piglow-clock)

[![NPM](https://nodei.co/npm/piglow-clock.png)](https://nodei.co/npm/piglow-clock/)

[![NPM](https://nodei.co/npm-dl/piglow-clock.png?months=3)](https://nodei.co/npm/piglow-clock/)


node-piglow-clock uses your piglow to show a binary clock. one leg is used for the seconds, one leg for the minutes, one arm for the hours.
details for setting up your system can be found on the [node-piglow](https://github.com/zaphod1984/node-piglow) page.

In action timelapse video: http://www.youtube.com/watch?v=FgzkyBT-Zkw

## Installation

```
$ npm install piglow-clock -g
```

## Run

### Command Line
```
$ piglow-clock [-b brightness]
```

Parameter:

- `brightness`: specifies how bright the LED should shine. range: 0-255, default: 10

#### End

End the `piglow-clock` process via `ctr+c` or via sending a `SIGINT` signal, it will reset the piglow LEDs then.

### From your program:

```javascript
var piglowClock = require('piglow-clock');

var options = {
  brightness: 255 //the maximum brightness, defaults to 10
};

piglowClock.start(options);

process.on('SIGINT', end);

function end() {
    //resets all leds
    piglowClock.stop(function() {
        process.exit();
    });
}
```

## made with
- **node-piglow** https://github.com/zaphod1984/node-piglow
- **optimist** https://github.com/substack/node-optimist
