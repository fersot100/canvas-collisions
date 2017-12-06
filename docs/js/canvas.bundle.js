/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = function () {
    function Vector2(x, y) {
        _classCallCheck(this, Vector2);

        this.x = x;
        this.y = y;
    }

    _createClass(Vector2, [{
        key: "add",
        value: function add(v) {
            return new Vector2(this.x + v.x, this.y + v.y);
        }
    }, {
        key: "subtract",
        value: function subtract(v) {
            return new Vector2(this.x - v.x, this.y - v.y);
        }
    }, {
        key: "normalize",
        value: function normalize() {
            var hyp = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
            return new Vector2(this.x / hyp, this.y / hyp);
        }
    }, {
        key: "multiply",
        value: function multiply(scalar) {
            return new Vector2(this.x * scalar, this.y * scalar);
        }
    }, {
        key: "copy",
        value: function copy() {
            return new Vector2(this.x, this.y);
        }
    }]);

    return Vector2;
}();

exports.default = Vector2;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.collide = undefined;

var _vectors = __webpack_require__(0);

var _vectors2 = _interopRequireDefault(_vectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rotate = function rotate(velocity, angle) {
    return new _vectors2.default(velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle), velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle));
};

var collide = exports.collide = function collide(rba, rbb) {
    var velocityDiff = rba.vel.subtract(rbb.vel);
    var distanceDiff = rbb.pos.subtract(rba.pos);

    if (velocityDiff.x * distanceDiff.x + velocityDiff.y * distanceDiff.y >= 0) {

        //Grab angle of collision
        var angle = -Math.atan2(rbb.pos.y - rba.pos.y, rbb.pos.x - rba.pos.x);

        //Rotate velocity vectors so we can calculate the collision in 1d
        var u1 = rotate(rba.vel, angle);
        var u2 = rotate(rbb.vel, angle);

        //Masses for formula
        var m1 = rba.mass;
        var m2 = rbb.mass;

        //Run elastic collision equation in the x axis, leave y as-is 
        var v1 = new _vectors2.default(u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), u1.y);
        var v2 = new _vectors2.default(u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), u2.y);

        //Rotate velocities back to their original orientation
        v1 = rotate(v1, -angle);
        v2 = rotate(v2, -angle);

        //Apply velocities to rigidbody
        rba.vel = v1.copy();
        rbb.vel = v2.copy();
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Time = function () {
    function Time(start) {
        _classCallCheck(this, Time);

        this.currentTime = start;
        this._deltaTime = 0;
    }

    _createClass(Time, [{
        key: "update",
        value: function update(newTime) {
            this._deltaTime = newTime - this.currentTime;
            this.currentTime = newTime;
            //Framerate is the inverse of the time between
            this.frameRate = 1000 / this._deltaTime;
        }
    }, {
        key: "deltaTime",
        get: function get() {
            //Return the delta in seconds
            return this._deltaTime / 1000;
        }
    }]);

    return Time;
}();

exports.default = Time;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _time = __webpack_require__(2);

var _time2 = _interopRequireDefault(_time);

var _vectors = __webpack_require__(0);

var _vectors2 = _interopRequireDefault(_vectors);

var _collider = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var Mouse = function () {
    function Mouse() {
        _classCallCheck(this, Mouse);

        this.pos = new _vectors2.default(canvas.width / 2, canvas.height / 2);
        this.animationPos = new _vectors2.default(canvas.width / 2, canvas.height / 2);
        this.grabbing = false;
    }

    _createClass(Mouse, [{
        key: 'update',
        value: function update() {
            this.vel = this.pos.subtract(this.animationPos).multiply(time.frameRate / 3);
            this.animationPos.x = this.pos.x;
            this.animationPos.y = this.pos.y;
        }
    }]);

    return Mouse;
}();

var mouse = new Mouse();

var time = void 0,
    mouseDown = false;

var colors = ['#2a2a2a', '#6b7783', '#511c16', '#0c3c60', '#ff703f'];

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.pos.x = event.clientX;
    mouse.pos.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    start();
});
canvas.addEventListener('mousedown', function (e) {
    if (e.button === 0) {
        mouseDown = true;
    }
});
canvas.addEventListener('mouseup', function (e) {
    if (e.button === 0) {
        mouseDown = false;
        mouse.grabbing = undefined;
    }
});

// Utility 
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(v1, v2) {
    var xDist = v2.x - v1.x;
    var yDist = v2.y - v1.y;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Basic Physics Object

var Rigidbody2D = function () {
    function Rigidbody2D() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : canvas.width / 2;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : canvas.height / 2;
        var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
        var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : randomColor(colors);

        _classCallCheck(this, Rigidbody2D);

        this.pos = new _vectors2.default(x, y);
        this.initialSpeed = 6;
        this.vel = new _vectors2.default(randomIntFromRange(-this.initialSpeed, this.initialSpeed), randomIntFromRange(-this.initialSpeed, this.initialSpeed));

        this.mass = 1;
        this.radius = radius;
        this.initialRadius = radius;
        this.maxRadius = 60;
        this.growSpeed = 20;
        this.grabbed = false;
        this.grabbedOffset = new _vectors2.default(0, 0);
        this.color = color;
    }

    _createClass(Rigidbody2D, [{
        key: 'handleScreenCollision',
        value: function handleScreenCollision() {
            if (this.pos.x <= this.radius || this.pos.x >= innerWidth - this.radius) {
                this.vel.x = -this.vel.x;
            }
            if (this.pos.y <= this.radius || this.pos.y >= innerHeight - this.radius) {
                this.vel.y = -this.vel.y;
            }
        }
    }, {
        key: 'checkMouse',
        value: function checkMouse() {
            this.filled = distance(this.pos, mouse.pos) <= 200;
        }
    }, {
        key: 'connect',
        value: function connect(rb) {
            c.beginPath();
            c.moveTo(this.pos.x, this.pos.y);
            c.lineTo(rb.pos.x, rb.pos.y);
            c.strokeStyle = this.color;
            c.stroke();
            c.closePath();
        }
    }, {
        key: 'update',
        value: function update(rbs) {

            this.checkMouse();
            this.handleScreenCollision();
            //Handle RB collisions
            for (var i = 0; i < rbs.length; i++) {
                if (this === rbs[i]) continue;
                if (distance(this.pos, rbs[i].pos) <= this.radius + rbs[i].radius) {
                    (0, _collider.collide)(this, rbs[i]);
                }
                if (distance(this.pos, rbs[i].pos) <= this.radius * 4) {
                    this.connect(rbs[i]);
                }
            }
            //Update position
            this.pos = this.pos.add(this.vel);
            this.draw();
        }
    }, {
        key: 'draw',
        value: function draw() {
            c.beginPath();
            c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = this.color;
            c.stroke();
            if (this.filled) {
                c.fillStyle = this.color;
                c.fill();
            }
            c.closePath();
        }
    }]);

    return Rigidbody2D;
}();

// Implementation


var balls = void 0;
function start() {
    balls = [];
    for (var i = 0; i < 100; i++) {
        var rb = new Rigidbody2D();
        var x = randomIntFromRange(rb.radius, canvas.width - rb.radius);
        var y = randomIntFromRange(rb.radius, canvas.height - rb.radius);
        rb.pos = new _vectors2.default(x, y);

        if (i != 0) {
            for (var j = 0; j < balls.length; j++) {
                if (distance(rb.pos, balls[j].pos) < rb.radius + balls[j].radius) {
                    rb.pos.x = randomIntFromRange(rb.radius, canvas.width - rb.radius);
                    rb.pos.y = randomIntFromRange(rb.radius, canvas.height - rb.radius);

                    j = -1;
                }
            }
        }
        balls.push(rb);
    }
}

// Animation Loop
function update(currentTime) {
    //Initialize time and mouse object and update with current timestamp
    if (!time) time = new _time2.default(currentTime);
    time.update(currentTime);
    mouse.update();
    requestAnimationFrame(update);

    //Clear and draw
    c.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball) {
        ball.update(balls);
    });
}

start();
update(0);

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map