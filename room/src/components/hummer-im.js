(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Hummer"] = factory();
	else
		root["Hummer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/hummerImIndex.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@protobufjs/aspromise/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@protobufjs/aspromise/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),

/***/ "./node_modules/@protobufjs/base64/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@protobufjs/base64/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),

/***/ "./node_modules/@protobufjs/codegen/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@protobufjs/codegen/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = codegen;

/**
 * Begins generating a function.
 * @memberof util
 * @param {string[]} functionParams Function parameter names
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 */
function codegen(functionParams, functionName) {

    /* istanbul ignore if */
    if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = undefined;
    }

    var body = [];

    /**
     * Appends code to the function's body or finishes generation.
     * @typedef Codegen
     * @type {function}
     * @param {string|Object.<string,*>} [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
     * @param {...*} [formatParams] Format parameters
     * @returns {Codegen|Function} Itself or the generated function if finished
     * @throws {Error} If format parameter counts do not match
     */

    function Codegen(formatStringOrScope) {
        // note that explicit array handling below makes this ~50% faster

        // finish the function
        if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose)
                console.log("codegen: " + source); // eslint-disable-line no-console
            source = "return " + source;
            if (formatStringOrScope) {
                var scopeKeys   = Object.keys(formatStringOrScope),
                    scopeParams = new Array(scopeKeys.length + 1),
                    scopeValues = new Array(scopeKeys.length),
                    scopeOffset = 0;
                while (scopeOffset < scopeKeys.length) {
                    scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                    scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
                }
                scopeParams[scopeOffset] = source;
                return Function.apply(null, scopeParams).apply(null, scopeValues); // eslint-disable-line no-new-func
            }
            return Function(source)(); // eslint-disable-line no-new-func
        }

        // otherwise append to body
        var formatParams = new Array(arguments.length - 1),
            formatOffset = 0;
        while (formatOffset < formatParams.length)
            formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
            var value = formatParams[formatOffset++];
            switch ($1) {
                case "d": case "f": return String(Number(value));
                case "i": return String(Math.floor(value));
                case "j": return JSON.stringify(value);
                case "s": return String(value);
            }
            return "%";
        });
        if (formatOffset !== formatParams.length)
            throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return Codegen;
    }

    function toString(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
    }

    Codegen.toString = toString;
    return Codegen;
}

/**
 * Begins generating a function.
 * @memberof util
 * @function codegen
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 * @variation 2
 */

/**
 * When set to `true`, codegen will log generated code to console. Useful for debugging.
 * @name util.codegen.verbose
 * @type {boolean}
 */
codegen.verbose = false;


/***/ }),

/***/ "./node_modules/@protobufjs/eventemitter/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@protobufjs/eventemitter/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),

/***/ "./node_modules/@protobufjs/fetch/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@protobufjs/fetch/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = fetch;

var asPromise = __webpack_require__(/*! @protobufjs/aspromise */ "./node_modules/@protobufjs/aspromise/index.js"),
    inquire   = __webpack_require__(/*! @protobufjs/inquire */ "./node_modules/@protobufjs/inquire/index.js");

var fs = inquire("fs");

/**
 * Node-style callback as used by {@link util.fetch}.
 * @typedef FetchCallback
 * @type {function}
 * @param {?Error} error Error, if any, otherwise `null`
 * @param {string} [contents] File contents, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Options as used by {@link util.fetch}.
 * @typedef FetchOptions
 * @type {Object}
 * @property {boolean} [binary=false] Whether expecting a binary response
 * @property {boolean} [xhr=false] If `true`, forces the use of XMLHttpRequest
 */

/**
 * Fetches the contents of a file.
 * @memberof util
 * @param {string} filename File path or url
 * @param {FetchOptions} options Fetch options
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 */
function fetch(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    } else if (!options)
        options = {};

    if (!callback)
        return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this

    // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.
    if (!options.xhr && fs && fs.readFile)
        return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
            return err && typeof XMLHttpRequest !== "undefined"
                ? fetch.xhr(filename, options, callback)
                : err
                ? callback(err)
                : callback(null, options.binary ? contents : contents.toString("utf8"));
        });

    // use the XHR version otherwise.
    return fetch.xhr(filename, options, callback);
}

/**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */

/**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchOptions} [options] Fetch options
 * @returns {Promise<string|Uint8Array>} Promise
 * @variation 3
 */

/**/
fetch.xhr = function fetch_xhr(filename, options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange /* works everywhere */ = function fetchOnReadyStateChange() {

        if (xhr.readyState !== 4)
            return undefined;

        // local cors security errors return status 0 / empty string, too. afaik this cannot be
        // reliably distinguished from an actually empty file for security reasons. feel free
        // to send a pull request if you are aware of a solution.
        if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));

        // if binary data is expected, make sure that some sort of array is returned, even if
        // ArrayBuffers are not supported. the binary string fallback, however, is unsafe.
        if (options.binary) {
            var buffer = xhr.response;
            if (!buffer) {
                buffer = [];
                for (var i = 0; i < xhr.responseText.length; ++i)
                    buffer.push(xhr.responseText.charCodeAt(i) & 255);
            }
            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
        }
        return callback(null, xhr.responseText);
    };

    if (options.binary) {
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Receiving_binary_data_in_older_browsers
        if ("overrideMimeType" in xhr)
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.responseType = "arraybuffer";
    }

    xhr.open("GET", filename);
    xhr.send();
};


/***/ }),

/***/ "./node_modules/@protobufjs/float/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@protobufjs/float/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),

/***/ "./node_modules/@protobufjs/inquire/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@protobufjs/inquire/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),

/***/ "./node_modules/@protobufjs/path/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/path/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal path module to resolve Unix, Windows and URL paths alike.
 * @memberof util
 * @namespace
 */
var path = exports;

var isAbsolute =
/**
 * Tests if the specified path is absolute.
 * @param {string} path Path to test
 * @returns {boolean} `true` if path is absolute
 */
path.isAbsolute = function isAbsolute(path) {
    return /^(?:\/|\w+:)/.test(path);
};

var normalize =
/**
 * Normalizes the specified path.
 * @param {string} path Path to normalize
 * @returns {string} Normalized path
 */
path.normalize = function normalize(path) {
    path = path.replace(/\\/g, "/")
               .replace(/\/{2,}/g, "/");
    var parts    = path.split("/"),
        absolute = isAbsolute(path),
        prefix   = "";
    if (absolute)
        prefix = parts.shift() + "/";
    for (var i = 0; i < parts.length;) {
        if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..")
                parts.splice(--i, 2);
            else if (absolute)
                parts.splice(i, 1);
            else
                ++i;
        } else if (parts[i] === ".")
            parts.splice(i, 1);
        else
            ++i;
    }
    return prefix + parts.join("/");
};

/**
 * Resolves the specified include path against the specified origin path.
 * @param {string} originPath Path to the origin file
 * @param {string} includePath Include path relative to origin path
 * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
 * @returns {string} Path to the include file
 */
path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
    if (!alreadyNormalized)
        includePath = normalize(includePath);
    if (isAbsolute(includePath))
        return includePath;
    if (!alreadyNormalized)
        originPath = normalize(originPath);
    return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
};


/***/ }),

/***/ "./node_modules/@protobufjs/pool/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/pool/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),

/***/ "./node_modules/@protobufjs/utf8/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/utf8/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),

/***/ "./node_modules/eventemitter2/lib/eventemitter2.js":
/*!*********************************************************!*\
  !*** ./node_modules/eventemitter2/lib/eventemitter2.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this._newListener = conf.newListener);
      conf.removeListener && (this._removeListener = conf.removeListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' +
        'leak detected. ' + count + ' listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.';

    if(this.verboseMemoryLeak){
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if(typeof process !== 'undefined' && process.emitWarning){
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace){
        console.trace();
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this._newListener = false;
    this._removeListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (
            !tree._listeners.warned &&
            this._maxListeners > 0 &&
            tree._listeners.length > this._maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';


  EventEmitter.prototype.once = function(event, fn) {
    return this._once(event, fn, false);
  };

  EventEmitter.prototype.prependOnceListener = function(event, fn) {
    return this._once(event, fn, true);
  };

  EventEmitter.prototype._once = function(event, fn, prepend) {
    this._many(event, 1, fn, prepend);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    return this._many(event, ttl, fn, false);
  }

  EventEmitter.prototype.prependMany = function(event, ttl, fn) {
    return this._many(event, ttl, fn, true);
  }

  EventEmitter.prototype._many = function(event, ttl, fn, prepend) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    this._on(event, listener, prepend);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this._newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) args[j] = arguments[j];
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this._newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    var promises= [];

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) args[j] = arguments[j];
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener) {
    return this._on(type, listener, false);
  };

  EventEmitter.prototype.prependListener = function(type, listener) {
    return this._on(type, listener, true);
  };

  EventEmitter.prototype.onAny = function(fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function(fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function(fn, prepend){
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if(prepend){
      this._all.unshift(fn);
    }else{
      this._all.push(fn);
    }

    return this;
  }

  EventEmitter.prototype._on = function(type, listener, prepend) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    if (this._newListener)
       this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if(prepend){
        this._events[type].unshift(listener);
      }else{
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._maxListeners > 0 &&
        this._events[type].length > this._maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  }

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);

        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if ((obj instanceof Function) || (typeof obj !== "object") || (obj === null))
          continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          if (this._removeListener)
            this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      if (this._removeListener) {
        for(i = 0, l = fns.length; i < l; i++)
          this.emit("removeListenerAny", fns[i]);
      }
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (type === undefined) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.eventNames = function(){
    return Object.keys(this._events);
  }

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (true) {
     // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return EventEmitter;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/js-md5/src/md5.js":
/*!****************************************!*\
  !*** ./node_modules/js-md5/src/md5.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js");
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
  var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  var blocks = [], buffer8;
  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  /**
   * @method hex
   * @memberof md5
   * @description Output hash as hex string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} Hex string
   * @example
   * md5.hex('The quick brown fox jumps over the lazy dog');
   * // equal to
   * md5('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method digest
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.digest('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method array
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.array('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method arrayBuffer
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.buffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method base64
   * @memberof md5
   * @description Output hash as base64 string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} base64 string
   * @example
   * md5.base64('The quick brown fox jumps over the lazy dog');
   */
  var createOutputMethod = function (outputType) {
    return function (message) {
      return new Md5(true).update(message)[outputType]();
    };
  };

  /**
   * @method create
   * @memberof md5
   * @description Create Md5 object
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.create();
   */
  /**
   * @method update
   * @memberof md5
   * @description Create and update Md5 object
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.update('The quick brown fox jumps over the lazy dog');
   * // equal to
   * var hash = md5.create();
   * hash.update('The quick brown fox jumps over the lazy dog');
   */
  var createMethod = function () {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Md5();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };

  var nodeWrap = function (method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
        message.constructor === Buffer) {
        return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  /**
   * Md5 class
   * @class Md5
   * @description This is internal class.
   * @see {@link md5.create}
   */
  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  /**
   * @method update
   * @memberof Md5
   * @instance
   * @description Update hash
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @see {@link md5.update}
   */
  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }

    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer8[i++] = message[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              buffer8[i++] = code;
            } else if (code < 0x800) {
              buffer8[i++] = 0xc0 | (code >> 6);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else if (code < 0xd800 || code >= 0xe000) {
              buffer8[i++] = 0xe0 | (code >> 12);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              buffer8[i++] = 0xf0 | (code >> 18);
              buffer8[i++] = 0x80 | ((code >> 12) & 0x3f);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.bytes << 3;
    blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a, b, c, d, bc, da, blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ (d & (a ^ -271733879))) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ (c & (d ^ a))) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ (b & (c ^ d))) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ (a & (b ^ c))) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ (d & (a ^ b))) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ (c & (d ^ a))) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }

    a += (d ^ (b & (c ^ d))) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;

    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };

  /**
   * @method hex
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.hex();
   */
  Md5.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;

    return HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
      HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
      HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
      HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
      HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
      HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
      HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
      HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
      HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
      HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
      HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
      HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
      HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
      HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
      HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
      HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F];
  };

  /**
   * @method toString
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.toString();
   */
  Md5.prototype.toString = Md5.prototype.hex;

  /**
   * @method digest
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.digest}
   * @example
   * hash.digest();
   */
  Md5.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
    return [
      h0 & 0xFF, (h0 >> 8) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 24) & 0xFF,
      h1 & 0xFF, (h1 >> 8) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 24) & 0xFF,
      h2 & 0xFF, (h2 >> 8) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 24) & 0xFF,
      h3 & 0xFF, (h3 >> 8) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 24) & 0xFF
    ];
  };

  /**
   * @method array
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.array}
   * @example
   * hash.array();
   */
  Md5.prototype.array = Md5.prototype.digest;

  /**
   * @method arrayBuffer
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.arrayBuffer}
   * @example
   * hash.arrayBuffer();
   */
  Md5.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };

  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.buffer}
   * @example
   * hash.buffer();
   */
  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  /**
   * @method base64
   * @memberof Md5
   * @instance
   * @description Output hash as base64 string
   * @returns {String} base64 string
   * @see {@link md5.base64}
   * @example
   * hash.base64();
   */
  Md5.prototype.base64 = function () {
    var v1, v2, v3, base64Str = '', bytes = this.array();
    for (var i = 0; i < 15;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
        BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
        BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
        BASE64_ENCODE_CHAR[v3 & 63];
    }
    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
      BASE64_ENCODE_CHAR[(v1 << 4) & 63] +
      '==';
    return base64Str;
  };

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
     * @method md5
     * @description Md5 hash function, export to global in browsers.
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} md5 hashes
     * @example
     * md5(''); // d41d8cd98f00b204e9800998ecf8427e
     * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
     * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
     *
     * // It also supports UTF-8 encoding
     * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
     *
     * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
     * md5([]); // d41d8cd98f00b204e9800998ecf8427e
     * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
     */
    root.md5 = exports;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/long/src/long.js":
/*!***************************************!*\
  !*** ./node_modules/long/src/long.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/protobufjs/index.js":
/*!******************************************!*\
  !*** ./node_modules/protobufjs/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// full library entry point.


module.exports = __webpack_require__(/*! ./src/index */ "./node_modules/protobufjs/src/index.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/common.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/common.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = common;

var commonRe = /\/|\./;

/**
 * Provides common type definitions.
 * Can also be used to provide additional google types or your own custom types.
 * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
 * @param {Object.<string,*>} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
 * @returns {undefined}
 * @property {INamespace} google/protobuf/any.proto Any
 * @property {INamespace} google/protobuf/duration.proto Duration
 * @property {INamespace} google/protobuf/empty.proto Empty
 * @property {INamespace} google/protobuf/field_mask.proto FieldMask
 * @property {INamespace} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
 * @property {INamespace} google/protobuf/timestamp.proto Timestamp
 * @property {INamespace} google/protobuf/wrappers.proto Wrappers
 * @example
 * // manually provides descriptor.proto (assumes google/protobuf/ namespace and .proto extension)
 * protobuf.common("descriptor", descriptorJson);
 *
 * // manually provides a custom definition (uses my.foo namespace)
 * protobuf.common("my/foo/bar.proto", myFooBarJson);
 */
function common(name, json) {
    if (!commonRe.test(name)) {
        name = "google/protobuf/" + name + ".proto";
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
    }
    common[name] = json;
}

// Not provided because of limited use (feel free to discuss or to provide yourself):
//
// google/protobuf/descriptor.proto
// google/protobuf/source_context.proto
// google/protobuf/type.proto
//
// Stripped and pre-parsed versions of these non-bundled files are instead available as part of
// the repository or package within the google/protobuf directory.

common("any", {

    /**
     * Properties of a google.protobuf.Any message.
     * @interface IAny
     * @type {Object}
     * @property {string} [typeUrl]
     * @property {Uint8Array} [bytes]
     * @memberof common
     */
    Any: {
        fields: {
            type_url: {
                type: "string",
                id: 1
            },
            value: {
                type: "bytes",
                id: 2
            }
        }
    }
});

var timeType;

common("duration", {

    /**
     * Properties of a google.protobuf.Duration message.
     * @interface IDuration
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */
    Duration: timeType = {
        fields: {
            seconds: {
                type: "int64",
                id: 1
            },
            nanos: {
                type: "int32",
                id: 2
            }
        }
    }
});

common("timestamp", {

    /**
     * Properties of a google.protobuf.Timestamp message.
     * @interface ITimestamp
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */
    Timestamp: timeType
});

common("empty", {

    /**
     * Properties of a google.protobuf.Empty message.
     * @interface IEmpty
     * @memberof common
     */
    Empty: {
        fields: {}
    }
});

common("struct", {

    /**
     * Properties of a google.protobuf.Struct message.
     * @interface IStruct
     * @type {Object}
     * @property {Object.<string,IValue>} [fields]
     * @memberof common
     */
    Struct: {
        fields: {
            fields: {
                keyType: "string",
                type: "Value",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Value message.
     * @interface IValue
     * @type {Object}
     * @property {string} [kind]
     * @property {0} [nullValue]
     * @property {number} [numberValue]
     * @property {string} [stringValue]
     * @property {boolean} [boolValue]
     * @property {IStruct} [structValue]
     * @property {IListValue} [listValue]
     * @memberof common
     */
    Value: {
        oneofs: {
            kind: {
                oneof: [
                    "nullValue",
                    "numberValue",
                    "stringValue",
                    "boolValue",
                    "structValue",
                    "listValue"
                ]
            }
        },
        fields: {
            nullValue: {
                type: "NullValue",
                id: 1
            },
            numberValue: {
                type: "double",
                id: 2
            },
            stringValue: {
                type: "string",
                id: 3
            },
            boolValue: {
                type: "bool",
                id: 4
            },
            structValue: {
                type: "Struct",
                id: 5
            },
            listValue: {
                type: "ListValue",
                id: 6
            }
        }
    },

    NullValue: {
        values: {
            NULL_VALUE: 0
        }
    },

    /**
     * Properties of a google.protobuf.ListValue message.
     * @interface IListValue
     * @type {Object}
     * @property {Array.<IValue>} [values]
     * @memberof common
     */
    ListValue: {
        fields: {
            values: {
                rule: "repeated",
                type: "Value",
                id: 1
            }
        }
    }
});

common("wrappers", {

    /**
     * Properties of a google.protobuf.DoubleValue message.
     * @interface IDoubleValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    DoubleValue: {
        fields: {
            value: {
                type: "double",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.FloatValue message.
     * @interface IFloatValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    FloatValue: {
        fields: {
            value: {
                type: "float",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Int64Value message.
     * @interface IInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */
    Int64Value: {
        fields: {
            value: {
                type: "int64",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.UInt64Value message.
     * @interface IUInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */
    UInt64Value: {
        fields: {
            value: {
                type: "uint64",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Int32Value message.
     * @interface IInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    Int32Value: {
        fields: {
            value: {
                type: "int32",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.UInt32Value message.
     * @interface IUInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    UInt32Value: {
        fields: {
            value: {
                type: "uint32",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.BoolValue message.
     * @interface IBoolValue
     * @type {Object}
     * @property {boolean} [value]
     * @memberof common
     */
    BoolValue: {
        fields: {
            value: {
                type: "bool",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.StringValue message.
     * @interface IStringValue
     * @type {Object}
     * @property {string} [value]
     * @memberof common
     */
    StringValue: {
        fields: {
            value: {
                type: "string",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.BytesValue message.
     * @interface IBytesValue
     * @type {Object}
     * @property {Uint8Array} [value]
     * @memberof common
     */
    BytesValue: {
        fields: {
            value: {
                type: "bytes",
                id: 1
            }
        }
    }
});

common("field_mask", {

    /**
     * Properties of a google.protobuf.FieldMask message.
     * @interface IDoubleValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    FieldMask: {
        fields: {
            paths: {
                rule: "repeated",
                type: "string",
                id: 1
            }
        }
    }
});

/**
 * Gets the root definition of the specified common proto file.
 *
 * Bundled definitions are:
 * - google/protobuf/any.proto
 * - google/protobuf/duration.proto
 * - google/protobuf/empty.proto
 * - google/protobuf/field_mask.proto
 * - google/protobuf/struct.proto
 * - google/protobuf/timestamp.proto
 * - google/protobuf/wrappers.proto
 *
 * @param {string} file Proto file name
 * @returns {INamespace|null} Root definition or `null` if not defined
 */
common.get = function get(file) {
    return common[file] || null;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/converter.js":
/*!**************************************************!*\
  !*** ./node_modules/protobufjs/src/converter.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Runtime message from/to plain object converters.
 * @namespace
 */
var converter = exports;

var Enum = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js"),
    util = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

/**
 * Generates a partial value fromObject conveter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(d%s){", prop);
            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
                if (field.repeated && values[keys[i]] === field.typeDefault) gen
                ("default:");
                gen
                ("case%j:", keys[i])
                ("case %i:", values[keys[i]])
                    ("m%s=%j", prop, values[keys[i]])
                    ("break");
            } gen
            ("}");
        } else gen
            ("if(typeof d%s!==\"object\")", prop)
                ("throw TypeError(%j)", field.fullName + ": object expected")
            ("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
                ("m%s=Number(d%s)", prop, prop); // also catches "NaN", "Infinity"
                break;
            case "uint32":
            case "fixed32": gen
                ("m%s=d%s>>>0", prop, prop);
                break;
            case "int32":
            case "sint32":
            case "sfixed32": gen
                ("m%s=d%s|0", prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(util.Long)")
                    ("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)
                ("else if(typeof d%s===\"string\")", prop)
                    ("m%s=parseInt(d%s,10)", prop, prop)
                ("else if(typeof d%s===\"number\")", prop)
                    ("m%s=d%s", prop, prop)
                ("else if(typeof d%s===\"object\")", prop)
                    ("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
                break;
            case "bytes": gen
                ("if(typeof d%s===\"string\")", prop)
                    ("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)
                ("else if(d%s.length)", prop)
                    ("m%s=d%s", prop, prop);
                break;
            case "string": gen
                ("m%s=String(d%s)", prop, prop);
                break;
            case "bool": gen
                ("m%s=Boolean(d%s)", prop, prop);
                break;
            /* default: gen
                ("m%s=d%s", prop, prop);
                break; */
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a plain object to runtime message converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.fromObject = function fromObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray;
    var gen = util.codegen(["d"], mtype.name + "$fromObject")
    ("if(d instanceof this.ctor)")
        ("return d");
    if (!fields.length) return gen
    ("return new this.ctor");
    gen
    ("var m=new this.ctor");
    for (var i = 0; i < fields.length; ++i) {
        var field  = fields[i].resolve(),
            prop   = util.safeProp(field.name);

        // Map fields
        if (field.map) { gen
    ("if(d%s){", prop)
        ("if(typeof d%s!==\"object\")", prop)
            ("throw TypeError(%j)", field.fullName + ": object expected")
        ("m%s={}", prop)
        ("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[ks[i]]")
        ("}")
    ("}");

        // Repeated fields
        } else if (field.repeated) { gen
    ("if(d%s){", prop)
        ("if(!Array.isArray(d%s))", prop)
            ("throw TypeError(%j)", field.fullName + ": array expected")
        ("m%s=[]", prop)
        ("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[i]")
        ("}")
    ("}");

        // Non-repeated fields
        } else {
            if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
    ("if(d%s!=null){", prop); // !== undefined && !== null
        genValuePartial_fromObject(gen, field, /* not sorted */ i, prop);
            if (!(field.resolvedType instanceof Enum)) gen
    ("}");
        }
    } return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};

/**
 * Generates a partial value toObject converter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_toObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) gen
            ("d%s=o.enums===String?types[%i].values[m%s]:m%s", prop, fieldIndex, prop, prop);
        else gen
            ("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
            ("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
            ("if(typeof m%s===\"number\")", prop)
                ("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)
            ("else") // Long-like
                ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true": "", prop);
                break;
            case "bytes": gen
            ("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
                break;
            default: gen
            ("d%s=m%s", prop, prop);
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a runtime message to plain object converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.toObject = function toObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
    if (!fields.length)
        return util.codegen()("return {}");
    var gen = util.codegen(["m", "o"], mtype.name + "$toObject")
    ("if(!o)")
        ("o={}")
    ("var d={}");

    var repeatedFields = [],
        mapFields = [],
        normalFields = [],
        i = 0;
    for (; i < fields.length; ++i)
        if (!fields[i].partOf)
            ( fields[i].resolve().repeated ? repeatedFields
            : fields[i].map ? mapFields
            : normalFields).push(fields[i]);

    if (repeatedFields.length) { gen
    ("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i) gen
        ("d%s=[]", util.safeProp(repeatedFields[i].name));
        gen
    ("}");
    }

    if (mapFields.length) { gen
    ("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i) gen
        ("d%s={}", util.safeProp(mapFields[i].name));
        gen
    ("}");
    }

    if (normalFields.length) { gen
    ("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i],
                prop  = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen
        ("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen
        ("if(util.Long){")
            ("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)
            ("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)
        ("}else")
            ("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) {
                var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
                gen
        ("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))
        ("else{")
            ("d%s=%s", prop, arrayDefault)
            ("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)
        ("}");
            } else gen
        ("d%s=%j", prop, field.typeDefault); // also messages (=null)
        } gen
    ("}");
    }
    var hasKs2 = false;
    for (i = 0; i < fields.length; ++i) {
        var field = fields[i],
            index = mtype._fieldsArray.indexOf(field),
            prop  = util.safeProp(field.name);
        if (field.map) {
            if (!hasKs2) { hasKs2 = true; gen
    ("var ks2");
            } gen
    ("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)
        ("d%s={}", prop)
        ("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[ks2[j]]")
        ("}");
        } else if (field.repeated) { gen
    ("if(m%s&&m%s.length){", prop, prop)
        ("d%s=[]", prop)
        ("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[j]")
        ("}");
        } else { gen
    ("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name); // !== undefined && !== null
        genValuePartial_toObject(gen, field, /* sorted */ index, prop);
        if (field.partOf) gen
        ("if(o.oneofs)")
            ("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen
    ("}");
    }
    return gen
    ("return d");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};


/***/ }),

/***/ "./node_modules/protobufjs/src/decoder.js":
/*!************************************************!*\
  !*** ./node_modules/protobufjs/src/decoder.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = decoder;

var Enum    = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js"),
    types   = __webpack_require__(/*! ./types */ "./node_modules/protobufjs/src/types.js"),
    util    = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

function missing(field) {
    return "missing required '" + field.name + "'";
}

/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function decoder(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen(["r", "l"], mtype.name + "$decode")
    ("if(!(r instanceof Reader))")
        ("r=Reader.create(r)")
    ("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field) { return field.map; }).length ? ",k" : ""))
    ("while(r.pos<c){")
        ("var t=r.uint32()");
    if (mtype.group) gen
        ("if((t&7)===4)")
            ("break");
    gen
        ("switch(t>>>3){");

    var i = 0;
    for (; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "int32" : field.type,
            ref   = "m" + util.safeProp(field.name); gen
            ("case %i:", field.id);

        // Map fields
        if (field.map) { gen
                ("r.skip().pos++") // assumes id 1 + key wireType
                ("if(%s===util.emptyObject)", ref)
                    ("%s={}", ref)
                ("k=r.%s()", field.keyType)
                ("r.pos++"); // assumes id 2 + value wireType
            if (types.long[field.keyType] !== undefined) {
                if (types.basic[type] === undefined) gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                else gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()", ref, type);
            } else {
                if (types.basic[type] === undefined) gen
                ("%s[k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                else gen
                ("%s[k]=r.%s()", ref, type);
            }

        // Repeated fields
        } else if (field.repeated) { gen

                ("if(!(%s&&%s.length))", ref, ref)
                    ("%s=[]", ref);

            // Packable (always check for forward and backward compatiblity)
            if (types.packed[type] !== undefined) gen
                ("if((t&7)===2){")
                    ("var c2=r.uint32()+r.pos")
                    ("while(r.pos<c2)")
                        ("%s.push(r.%s())", ref, type)
                ("}else");

            // Non-packed
            if (types.basic[type] === undefined) gen(field.resolvedType.group
                    ? "%s.push(types[%i].decode(r))"
                    : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
            else gen
                    ("%s.push(r.%s())", ref, type);

        // Non-repeated
        } else if (types.basic[type] === undefined) gen(field.resolvedType.group
                ? "%s=types[%i].decode(r)"
                : "%s=types[%i].decode(r,r.uint32())", ref, i);
        else gen
                ("%s=r.%s()", ref, type);
        gen
                ("break");
    // Unknown fields
    } gen
            ("default:")
                ("r.skipType(t&7)")
                ("break")

        ("}")
    ("}");

    // Field presence
    for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required) gen
    ("if(!m.hasOwnProperty(%j))", rfield.name)
        ("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
    }

    return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline */
}


/***/ }),

/***/ "./node_modules/protobufjs/src/encoder.js":
/*!************************************************!*\
  !*** ./node_modules/protobufjs/src/encoder.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = encoder;

var Enum     = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js"),
    types    = __webpack_require__(/*! ./types */ "./node_modules/protobufjs/src/types.js"),
    util     = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

/**
 * Generates a partial message type encoder.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genTypePartial(gen, field, fieldIndex, ref) {
    return field.resolvedType.group
        ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0)
        : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
}

/**
 * Generates an encoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function encoder(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var gen = util.codegen(["m", "w"], mtype.name + "$encode")
    ("if(!w)")
        ("w=Writer.create()");

    var i, ref;

    // "when a message is serialized its known fields should be written sequentially by field number"
    var fields = /* initializes */ mtype.fieldsArray.slice().sort(util.compareFieldsById);

    for (var i = 0; i < fields.length; ++i) {
        var field    = fields[i].resolve(),
            index    = mtype._fieldsArray.indexOf(field),
            type     = field.resolvedType instanceof Enum ? "int32" : field.type,
            wireType = types.basic[type];
            ref      = "m" + util.safeProp(field.name);

        // Map fields
        if (field.map) {
            gen
    ("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name) // !== undefined && !== null
        ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)
            ("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === undefined) gen
            ("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref); // can't be groups
            else gen
            (".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen
        ("}")
    ("}");

            // Repeated fields
        } else if (field.repeated) { gen
    ("if(%s!=null&&%s.length){", ref, ref); // !== undefined && !== null

            // Packed repeated
            if (field.packed && types.packed[type] !== undefined) { gen

        ("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)
        ("for(var i=0;i<%s.length;++i)", ref)
            ("w.%s(%s[i])", type, ref)
        ("w.ldelim()");

            // Non-packed
            } else { gen

        ("for(var i=0;i<%s.length;++i)", ref);
                if (wireType === undefined)
            genTypePartial(gen, field, index, ref + "[i]");
                else gen
            ("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);

            } gen
    ("}");

        // Non-repeated
        } else {
            if (field.optional) gen
    ("if(%s!=null&&m.hasOwnProperty(%j))", ref, field.name); // !== undefined && !== null

            if (wireType === undefined)
        genTypePartial(gen, field, index, ref);
            else gen
        ("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);

        }
    }

    return gen
    ("return w");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/***/ }),

/***/ "./node_modules/protobufjs/src/enum.js":
/*!*********************************************!*\
  !*** ./node_modules/protobufjs/src/enum.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Enum;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(/*! ./object */ "./node_modules/protobufjs/src/object.js");
((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";

var Namespace = __webpack_require__(/*! ./namespace */ "./node_modules/protobufjs/src/namespace.js"),
    util = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

/**
 * Constructs a new enum instance.
 * @classdesc Reflected enum.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {Object.<string,number>} [values] Enum values as an object, by name
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] The comment for this enum
 * @param {Object.<string,string>} [comments] The value comments for this enum
 */
function Enum(name, values, options, comment, comments) {
    ReflectionObject.call(this, name, options);

    if (values && typeof values !== "object")
        throw TypeError("values must be an object");

    /**
     * Enum values by id.
     * @type {Object.<number,string>}
     */
    this.valuesById = {};

    /**
     * Enum values by name.
     * @type {Object.<string,number>}
     */
    this.values = Object.create(this.valuesById); // toJSON, marker

    /**
     * Enum comment text.
     * @type {string|null}
     */
    this.comment = comment;

    /**
     * Value comment texts, if any.
     * @type {Object.<string,string>}
     */
    this.comments = comments || {};

    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */
    this.reserved = undefined; // toJSON

    // Note that values inherit valuesById on their prototype which makes them a TypeScript-
    // compatible enum. This is used by pbts to write actual enum definitions that work for
    // static and reflection code alike instead of emitting generic object definitions.

    if (values)
        for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
            if (typeof values[keys[i]] === "number") // use forward entries only
                this.valuesById[ this.values[keys[i]] = values[keys[i]] ] = keys[i];
}

/**
 * Enum descriptor.
 * @interface IEnum
 * @property {Object.<string,number>} values Enum values
 * @property {Object.<string,*>} [options] Enum options
 */

/**
 * Constructs an enum from an enum descriptor.
 * @param {string} name Enum name
 * @param {IEnum} json Enum descriptor
 * @returns {Enum} Created enum
 * @throws {TypeError} If arguments are invalid
 */
Enum.fromJSON = function fromJSON(name, json) {
    var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
    enm.reserved = json.reserved;
    return enm;
};

/**
 * Converts this enum to an enum descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IEnum} Enum descriptor
 */
Enum.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options"  , this.options,
        "values"   , this.values,
        "reserved" , this.reserved && this.reserved.length ? this.reserved : undefined,
        "comment"  , keepComments ? this.comment : undefined,
        "comments" , keepComments ? this.comments : undefined
    ]);
};

/**
 * Adds a value to this enum.
 * @param {string} name Value name
 * @param {number} id Value id
 * @param {string} [comment] Comment, if any
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a value with this name or id
 */
Enum.prototype.add = function add(name, id, comment) {
    // utilized by the parser but not by .fromJSON

    if (!util.isString(name))
        throw TypeError("name must be a string");

    if (!util.isInteger(id))
        throw TypeError("id must be an integer");

    if (this.values[name] !== undefined)
        throw Error("duplicate name '" + name + "' in " + this);

    if (this.isReservedId(id))
        throw Error("id " + id + " is reserved in " + this);

    if (this.isReservedName(name))
        throw Error("name '" + name + "' is reserved in " + this);

    if (this.valuesById[id] !== undefined) {
        if (!(this.options && this.options.allow_alias))
            throw Error("duplicate id " + id + " in " + this);
        this.values[name] = id;
    } else
        this.valuesById[this.values[name] = id] = name;

    this.comments[name] = comment || null;
    return this;
};

/**
 * Removes a value from this enum
 * @param {string} name Value name
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `name` is not a name of this enum
 */
Enum.prototype.remove = function remove(name) {

    if (!util.isString(name))
        throw TypeError("name must be a string");

    var val = this.values[name];
    if (val == null)
        throw Error("name '" + name + "' does not exist in " + this);

    delete this.valuesById[val];
    delete this.values[name];
    delete this.comments[name];

    return this;
};

/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Enum.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
};

/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Enum.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
};


/***/ }),

/***/ "./node_modules/protobufjs/src/field.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/field.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Field;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(/*! ./object */ "./node_modules/protobufjs/src/object.js");
((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";

var Enum  = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js"),
    types = __webpack_require__(/*! ./types */ "./node_modules/protobufjs/src/types.js"),
    util  = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

var Type; // cyclic

var ruleRe = /^required|optional|repeated$/;

/**
 * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
 * @name Field
 * @classdesc Reflected message field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 */

/**
 * Constructs a field from a field descriptor.
 * @param {string} name Field name
 * @param {IField} json Field descriptor
 * @returns {Field} Created field
 * @throws {TypeError} If arguments are invalid
 */
Field.fromJSON = function fromJSON(name, json) {
    return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
};

/**
 * Not an actual constructor. Use {@link Field} instead.
 * @classdesc Base class of all reflected message fields. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports FieldBase
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */
function Field(name, id, type, rule, extend, options, comment) {

    if (util.isObject(rule)) {
        comment = extend;
        options = rule;
        rule = extend = undefined;
    } else if (util.isObject(extend)) {
        comment = options;
        options = extend;
        extend = undefined;
    }

    ReflectionObject.call(this, name, options);

    if (!util.isInteger(id) || id < 0)
        throw TypeError("id must be a non-negative integer");

    if (!util.isString(type))
        throw TypeError("type must be a string");

    if (rule !== undefined && !ruleRe.test(rule = rule.toString().toLowerCase()))
        throw TypeError("rule must be a string rule");

    if (extend !== undefined && !util.isString(extend))
        throw TypeError("extend must be a string");

    /**
     * Field rule, if any.
     * @type {string|undefined}
     */
    this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON

    /**
     * Field type.
     * @type {string}
     */
    this.type = type; // toJSON

    /**
     * Unique field id.
     * @type {number}
     */
    this.id = id; // toJSON, marker

    /**
     * Extended type if different from parent.
     * @type {string|undefined}
     */
    this.extend = extend || undefined; // toJSON

    /**
     * Whether this field is required.
     * @type {boolean}
     */
    this.required = rule === "required";

    /**
     * Whether this field is optional.
     * @type {boolean}
     */
    this.optional = !this.required;

    /**
     * Whether this field is repeated.
     * @type {boolean}
     */
    this.repeated = rule === "repeated";

    /**
     * Whether this field is a map or not.
     * @type {boolean}
     */
    this.map = false;

    /**
     * Message this field belongs to.
     * @type {Type|null}
     */
    this.message = null;

    /**
     * OneOf this field belongs to, if any,
     * @type {OneOf|null}
     */
    this.partOf = null;

    /**
     * The field type's default value.
     * @type {*}
     */
    this.typeDefault = null;

    /**
     * The field's default value on prototypes.
     * @type {*}
     */
    this.defaultValue = null;

    /**
     * Whether this field's value should be treated as a long.
     * @type {boolean}
     */
    this.long = util.Long ? types.long[type] !== undefined : /* istanbul ignore next */ false;

    /**
     * Whether this field's value is a buffer.
     * @type {boolean}
     */
    this.bytes = type === "bytes";

    /**
     * Resolved type if not a basic type.
     * @type {Type|Enum|null}
     */
    this.resolvedType = null;

    /**
     * Sister-field within the extended type if a declaring extension field.
     * @type {Field|null}
     */
    this.extensionField = null;

    /**
     * Sister-field within the declaring namespace if an extended field.
     * @type {Field|null}
     */
    this.declaringField = null;

    /**
     * Internally remembers whether this field is packed.
     * @type {boolean|null}
     * @private
     */
    this._packed = null;

    /**
     * Comment for this field.
     * @type {string|null}
     */
    this.comment = comment;
}

/**
 * Determines whether this field is packed. Only relevant when repeated and working with proto2.
 * @name Field#packed
 * @type {boolean}
 * @readonly
 */
Object.defineProperty(Field.prototype, "packed", {
    get: function() {
        // defaults to packed=true if not explicity set to false
        if (this._packed === null)
            this._packed = this.getOption("packed") !== false;
        return this._packed;
    }
});

/**
 * @override
 */
Field.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (name === "packed") // clear cached before setting
        this._packed = null;
    return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
};

/**
 * Field descriptor.
 * @interface IField
 * @property {string} [rule="optional"] Field rule
 * @property {string} type Field type
 * @property {number} id Field id
 * @property {Object.<string,*>} [options] Field options
 */

/**
 * Extension field descriptor.
 * @interface IExtensionField
 * @extends IField
 * @property {string} extend Extended type
 */

/**
 * Converts this field to a field descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IField} Field descriptor
 */
Field.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "rule"    , this.rule !== "optional" && this.rule || undefined,
        "type"    , this.type,
        "id"      , this.id,
        "extend"  , this.extend,
        "options" , this.options,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * Resolves this field's type references.
 * @returns {Field} `this`
 * @throws {Error} If any reference cannot be resolved
 */
Field.prototype.resolve = function resolve() {

    if (this.resolved)
        return this;

    if ((this.typeDefault = types.defaults[this.type]) === undefined) { // if not a basic type, resolve it
        this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type)
            this.typeDefault = null;
        else // instanceof Enum
            this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]; // first defined
    }

    // use explicitly set default value if present
    if (this.options && this.options["default"] != null) {
        this.typeDefault = this.options["default"];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
            this.typeDefault = this.resolvedType.values[this.typeDefault];
    }

    // remove unnecessary options
    if (this.options) {
        if (this.options.packed === true || this.options.packed !== undefined && this.resolvedType && !(this.resolvedType instanceof Enum))
            delete this.options.packed;
        if (!Object.keys(this.options).length)
            this.options = undefined;
    }

    // convert to internal data type if necesssary
    if (this.long) {
        this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");

        /* istanbul ignore else */
        if (Object.freeze)
            Object.freeze(this.typeDefault); // long instances are meant to be immutable anyway (i.e. use small int cache that even requires it)

    } else if (this.bytes && typeof this.typeDefault === "string") {
        var buf;
        if (util.base64.test(this.typeDefault))
            util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
        else
            util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
        this.typeDefault = buf;
    }

    // take special care of maps and repeated fields
    if (this.map)
        this.defaultValue = util.emptyObject;
    else if (this.repeated)
        this.defaultValue = util.emptyArray;
    else
        this.defaultValue = this.typeDefault;

    // ensure proper value on prototype
    if (this.parent instanceof Type)
        this.parent.ctor.prototype[this.name] = this.defaultValue;

    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Decorator function as returned by {@link Field.d} and {@link MapField.d} (TypeScript).
 * @typedef FieldDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} fieldName Field name
 * @returns {undefined}
 */

/**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"string"|"bool"|"bytes"|Object} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @param {T} [defaultValue] Default value
 * @returns {FieldDecorator} Decorator function
 * @template T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[]
 */
Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {

    // submessage: decorate the submessage and use its name as the type
    if (typeof fieldType === "function")
        fieldType = util.decorateType(fieldType).name;

    // enum reference: create a reflected copy of the enum and keep reuseing it
    else if (fieldType && typeof fieldType === "object")
        fieldType = util.decorateEnum(fieldType).name;

    return function fieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor)
            .add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
    };
};

/**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {Constructor<T>|string} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @returns {FieldDecorator} Decorator function
 * @template T extends Message<T>
 * @variation 2
 */
// like Field.d but without a default value

// Sets up cyclic dependencies (called in index-light)
Field._configure = function configure(Type_) {
    Type = Type_;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/index-light.js":
/*!****************************************************!*\
  !*** ./node_modules/protobufjs/src/index-light.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = module.exports = __webpack_require__(/*! ./index-minimal */ "./node_modules/protobufjs/src/index-minimal.js");

protobuf.build = "light";

/**
 * A node-style callback as used by {@link load} and {@link Root#load}.
 * @typedef LoadCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Root} [root] Root, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} root Root namespace, defaults to create a new one if omitted.
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 */
function load(filename, root, callback) {
    if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback);
}

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Promise<Root>} Promise
 * @see {@link Root#load}
 * @variation 3
 */
// function load(filename:string, [root:Root]):Promise<Root>

protobuf.load = load;

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 * @see {@link Root#loadSync}
 */
function loadSync(filename, root) {
    if (!root)
        root = new protobuf.Root();
    return root.loadSync(filename);
}

protobuf.loadSync = loadSync;

// Serialization
protobuf.encoder          = __webpack_require__(/*! ./encoder */ "./node_modules/protobufjs/src/encoder.js");
protobuf.decoder          = __webpack_require__(/*! ./decoder */ "./node_modules/protobufjs/src/decoder.js");
protobuf.verifier         = __webpack_require__(/*! ./verifier */ "./node_modules/protobufjs/src/verifier.js");
protobuf.converter        = __webpack_require__(/*! ./converter */ "./node_modules/protobufjs/src/converter.js");

// Reflection
protobuf.ReflectionObject = __webpack_require__(/*! ./object */ "./node_modules/protobufjs/src/object.js");
protobuf.Namespace        = __webpack_require__(/*! ./namespace */ "./node_modules/protobufjs/src/namespace.js");
protobuf.Root             = __webpack_require__(/*! ./root */ "./node_modules/protobufjs/src/root.js");
protobuf.Enum             = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js");
protobuf.Type             = __webpack_require__(/*! ./type */ "./node_modules/protobufjs/src/type.js");
protobuf.Field            = __webpack_require__(/*! ./field */ "./node_modules/protobufjs/src/field.js");
protobuf.OneOf            = __webpack_require__(/*! ./oneof */ "./node_modules/protobufjs/src/oneof.js");
protobuf.MapField         = __webpack_require__(/*! ./mapfield */ "./node_modules/protobufjs/src/mapfield.js");
protobuf.Service          = __webpack_require__(/*! ./service */ "./node_modules/protobufjs/src/service.js");
protobuf.Method           = __webpack_require__(/*! ./method */ "./node_modules/protobufjs/src/method.js");

// Runtime
protobuf.Message          = __webpack_require__(/*! ./message */ "./node_modules/protobufjs/src/message.js");
protobuf.wrappers         = __webpack_require__(/*! ./wrappers */ "./node_modules/protobufjs/src/wrappers.js");

// Utility
protobuf.types            = __webpack_require__(/*! ./types */ "./node_modules/protobufjs/src/types.js");
protobuf.util             = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

// Set up possibly cyclic reflection dependencies
protobuf.ReflectionObject._configure(protobuf.Root);
protobuf.Namespace._configure(protobuf.Type, protobuf.Service, protobuf.Enum);
protobuf.Root._configure(protobuf.Type);
protobuf.Field._configure(protobuf.Type);


/***/ }),

/***/ "./node_modules/protobufjs/src/index-minimal.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/index-minimal.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
protobuf.BufferWriter = __webpack_require__(/*! ./writer_buffer */ "./node_modules/protobufjs/src/writer_buffer.js");
protobuf.Reader       = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
protobuf.BufferReader = __webpack_require__(/*! ./reader_buffer */ "./node_modules/protobufjs/src/reader_buffer.js");

// Utility
protobuf.util         = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");
protobuf.rpc          = __webpack_require__(/*! ./rpc */ "./node_modules/protobufjs/src/rpc.js");
protobuf.roots        = __webpack_require__(/*! ./roots */ "./node_modules/protobufjs/src/roots.js");
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
}

// Set up buffer utility according to the environment
protobuf.Writer._configure(protobuf.BufferWriter);
configure();


/***/ }),

/***/ "./node_modules/protobufjs/src/index.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = module.exports = __webpack_require__(/*! ./index-light */ "./node_modules/protobufjs/src/index-light.js");

protobuf.build = "full";

// Parser
protobuf.tokenize         = __webpack_require__(/*! ./tokenize */ "./node_modules/protobufjs/src/tokenize.js");
protobuf.parse            = __webpack_require__(/*! ./parse */ "./node_modules/protobufjs/src/parse.js");
protobuf.common           = __webpack_require__(/*! ./common */ "./node_modules/protobufjs/src/common.js");

// Configure parser
protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);


/***/ }),

/***/ "./node_modules/protobufjs/src/mapfield.js":
/*!*************************************************!*\
  !*** ./node_modules/protobufjs/src/mapfield.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = MapField;

// extends Field
var Field = __webpack_require__(/*! ./field */ "./node_modules/protobufjs/src/field.js");
((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";

var types   = __webpack_require__(/*! ./types */ "./node_modules/protobufjs/src/types.js"),
    util    = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

/**
 * Constructs a new map field instance.
 * @classdesc Reflected map field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} keyType Key type
 * @param {string} type Value type
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */
function MapField(name, id, keyType, type, options, comment) {
    Field.call(this, name, id, type, undefined, undefined, options, comment);

    /* istanbul ignore if */
    if (!util.isString(keyType))
        throw TypeError("keyType must be a string");

    /**
     * Key type.
     * @type {string}
     */
    this.keyType = keyType; // toJSON, marker

    /**
     * Resolved key type if not a basic type.
     * @type {ReflectionObject|null}
     */
    this.resolvedKeyType = null;

    // Overrides Field#map
    this.map = true;
}

/**
 * Map field descriptor.
 * @interface IMapField
 * @extends {IField}
 * @property {string} keyType Key type
 */

/**
 * Extension map field descriptor.
 * @interface IExtensionMapField
 * @extends IMapField
 * @property {string} extend Extended type
 */

/**
 * Constructs a map field from a map field descriptor.
 * @param {string} name Field name
 * @param {IMapField} json Map field descriptor
 * @returns {MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */
MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
};

/**
 * Converts this map field to a map field descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IMapField} Map field descriptor
 */
MapField.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "keyType" , this.keyType,
        "type"    , this.type,
        "id"      , this.id,
        "extend"  , this.extend,
        "options" , this.options,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * @override
 */
MapField.prototype.resolve = function resolve() {
    if (this.resolved)
        return this;

    // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"
    if (types.mapKey[this.keyType] === undefined)
        throw Error("invalid key type: " + this.keyType);

    return Field.prototype.resolve.call(this);
};

/**
 * Map field decorator (TypeScript).
 * @name MapField.d
 * @function
 * @param {number} fieldId Field id
 * @param {"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"} fieldKeyType Field key type
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"|"bytes"|Object|Constructor<{}>} fieldValueType Field value type
 * @returns {FieldDecorator} Decorator function
 * @template T extends { [key: string]: number | Long | string | boolean | Uint8Array | Buffer | number[] | Message<{}> }
 */
MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {

    // submessage value: decorate the submessage and use its name as the type
    if (typeof fieldValueType === "function")
        fieldValueType = util.decorateType(fieldValueType).name;

    // enum reference value: create a reflected copy of the enum and keep reuseing it
    else if (fieldValueType && typeof fieldValueType === "object")
        fieldValueType = util.decorateEnum(fieldValueType).name;

    return function mapFieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor)
            .add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
    };
};


/***/ }),

/***/ "./node_modules/protobufjs/src/message.js":
/*!************************************************!*\
  !*** ./node_modules/protobufjs/src/message.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Message;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new message instance.
 * @classdesc Abstract runtime message.
 * @constructor
 * @param {Properties<T>} [properties] Properties to set
 * @template T extends object = object
 */
function Message(properties) {
    // not used internally
    if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            this[keys[i]] = properties[keys[i]];
}

/**
 * Reference to the reflected type.
 * @name Message.$type
 * @type {Type}
 * @readonly
 */

/**
 * Reference to the reflected type.
 * @name Message#$type
 * @type {Type}
 * @readonly
 */

/*eslint-disable valid-jsdoc*/

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<T>} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.create = function create(properties) {
    return this.$type.create(properties);
};

/**
 * Encodes a message of this type.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.encode = function encode(message, writer) {
    return this.$type.encode(message, writer);
};

/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.encodeDelimited = function encodeDelimited(message, writer) {
    return this.$type.encodeDelimited(message, writer);
};

/**
 * Decodes a message of this type.
 * @name Message.decode
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.decode = function decode(reader) {
    return this.$type.decode(reader);
};

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Message.decodeDelimited
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.decodeDelimited = function decodeDelimited(reader) {
    return this.$type.decodeDelimited(reader);
};

/**
 * Verifies a message of this type.
 * @name Message.verify
 * @function
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {string|null} `null` if valid, otherwise the reason why it is not
 */
Message.verify = function verify(message) {
    return this.$type.verify(message);
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object
 * @returns {T} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.fromObject = function fromObject(object) {
    return this.$type.fromObject(object);
};

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {T} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.toObject = function toObject(message, options) {
    return this.$type.toObject(message, options);
};

/**
 * Converts this message to JSON.
 * @returns {Object.<string,*>} JSON object
 */
Message.prototype.toJSON = function toJSON() {
    return this.$type.toObject(this, util.toJSONOptions);
};

/*eslint-enable valid-jsdoc*/

/***/ }),

/***/ "./node_modules/protobufjs/src/method.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/method.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Method;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(/*! ./object */ "./node_modules/protobufjs/src/object.js");
((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";

var util = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

/**
 * Constructs a new service method instance.
 * @classdesc Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string|undefined} type Method type, usually `"rpc"`
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
 * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] The comment for this method
 */
function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment) {

    /* istanbul ignore next */
    if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }

    /* istanbul ignore if */
    if (!(type === undefined || util.isString(type)))
        throw TypeError("type must be a string");

    /* istanbul ignore if */
    if (!util.isString(requestType))
        throw TypeError("requestType must be a string");

    /* istanbul ignore if */
    if (!util.isString(responseType))
        throw TypeError("responseType must be a string");

    ReflectionObject.call(this, name, options);

    /**
     * Method type.
     * @type {string}
     */
    this.type = type || "rpc"; // toJSON

    /**
     * Request type.
     * @type {string}
     */
    this.requestType = requestType; // toJSON, marker

    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */
    this.requestStream = requestStream ? true : undefined; // toJSON

    /**
     * Response type.
     * @type {string}
     */
    this.responseType = responseType; // toJSON

    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */
    this.responseStream = responseStream ? true : undefined; // toJSON

    /**
     * Resolved request type.
     * @type {Type|null}
     */
    this.resolvedRequestType = null;

    /**
     * Resolved response type.
     * @type {Type|null}
     */
    this.resolvedResponseType = null;

    /**
     * Comment for this method
     * @type {string|null}
     */
    this.comment = comment;
}

/**
 * Method descriptor.
 * @interface IMethod
 * @property {string} [type="rpc"] Method type
 * @property {string} requestType Request type
 * @property {string} responseType Response type
 * @property {boolean} [requestStream=false] Whether requests are streamed
 * @property {boolean} [responseStream=false] Whether responses are streamed
 * @property {Object.<string,*>} [options] Method options
 */

/**
 * Constructs a method from a method descriptor.
 * @param {string} name Method name
 * @param {IMethod} json Method descriptor
 * @returns {Method} Created method
 * @throws {TypeError} If arguments are invalid
 */
Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment);
};

/**
 * Converts this method to a method descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IMethod} Method descriptor
 */
Method.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "type"           , this.type !== "rpc" && /* istanbul ignore next */ this.type || undefined,
        "requestType"    , this.requestType,
        "requestStream"  , this.requestStream,
        "responseType"   , this.responseType,
        "responseStream" , this.responseStream,
        "options"        , this.options,
        "comment"        , keepComments ? this.comment : undefined
    ]);
};

/**
 * @override
 */
Method.prototype.resolve = function resolve() {

    /* istanbul ignore if */
    if (this.resolved)
        return this;

    this.resolvedRequestType = this.parent.lookupType(this.requestType);
    this.resolvedResponseType = this.parent.lookupType(this.responseType);

    return ReflectionObject.prototype.resolve.call(this);
};


/***/ }),

/***/ "./node_modules/protobufjs/src/namespace.js":
/*!**************************************************!*\
  !*** ./node_modules/protobufjs/src/namespace.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Namespace;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(/*! ./object */ "./node_modules/protobufjs/src/object.js");
((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";

var Field    = __webpack_require__(/*! ./field */ "./node_modules/protobufjs/src/field.js"),
    util     = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

var Type,    // cyclic
    Service,
    Enum;

/**
 * Constructs a new namespace instance.
 * @name Namespace
 * @classdesc Reflected namespace.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 */

/**
 * Constructs a namespace from JSON.
 * @memberof Namespace
 * @function
 * @param {string} name Namespace name
 * @param {Object.<string,*>} json JSON object
 * @returns {Namespace} Created namespace
 * @throws {TypeError} If arguments are invalid
 */
Namespace.fromJSON = function fromJSON(name, json) {
    return new Namespace(name, json.options).addJSON(json.nested);
};

/**
 * Converts an array of reflection objects to JSON.
 * @memberof Namespace
 * @param {ReflectionObject[]} array Object array
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
 */
function arrayToJSON(array, toJSONOptions) {
    if (!(array && array.length))
        return undefined;
    var obj = {};
    for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON(toJSONOptions);
    return obj;
}

Namespace.arrayToJSON = arrayToJSON;

/**
 * Tests if the specified id is reserved.
 * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Namespace.isReservedId = function isReservedId(reserved, id) {
    if (reserved)
        for (var i = 0; i < reserved.length; ++i)
            if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] >= id)
                return true;
    return false;
};

/**
 * Tests if the specified name is reserved.
 * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Namespace.isReservedName = function isReservedName(reserved, name) {
    if (reserved)
        for (var i = 0; i < reserved.length; ++i)
            if (reserved[i] === name)
                return true;
    return false;
};

/**
 * Not an actual constructor. Use {@link Namespace} instead.
 * @classdesc Base class of all reflection objects containing nested objects. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports NamespaceBase
 * @extends ReflectionObject
 * @abstract
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 * @see {@link Namespace}
 */
function Namespace(name, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Nested objects by name.
     * @type {Object.<string,ReflectionObject>|undefined}
     */
    this.nested = undefined; // toJSON

    /**
     * Cached nested objects as an array.
     * @type {ReflectionObject[]|null}
     * @private
     */
    this._nestedArray = null;
}

function clearCache(namespace) {
    namespace._nestedArray = null;
    return namespace;
}

/**
 * Nested objects of this namespace as an array for iteration.
 * @name NamespaceBase#nestedArray
 * @type {ReflectionObject[]}
 * @readonly
 */
Object.defineProperty(Namespace.prototype, "nestedArray", {
    get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
    }
});

/**
 * Namespace descriptor.
 * @interface INamespace
 * @property {Object.<string,*>} [options] Namespace options
 * @property {Object.<string,AnyNestedObject>} [nested] Nested object descriptors
 */

/**
 * Any extension field descriptor.
 * @typedef AnyExtensionField
 * @type {IExtensionField|IExtensionMapField}
 */

/**
 * Any nested object descriptor.
 * @typedef AnyNestedObject
 * @type {IEnum|IType|IService|AnyExtensionField|INamespace}
 */
// ^ BEWARE: VSCode hangs forever when using more than 5 types (that's why AnyExtensionField exists in the first place)

/**
 * Converts this namespace to a namespace descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {INamespace} Namespace descriptor
 */
Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
    return util.toObject([
        "options" , this.options,
        "nested"  , arrayToJSON(this.nestedArray, toJSONOptions)
    ]);
};

/**
 * Adds nested objects to this namespace from nested object descriptors.
 * @param {Object.<string,AnyNestedObject>} nestedJson Any nested object descriptors
 * @returns {Namespace} `this`
 */
Namespace.prototype.addJSON = function addJSON(nestedJson) {
    var ns = this;
    /* istanbul ignore else */
    if (nestedJson) {
        for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
            nested = nestedJson[names[i]];
            ns.add( // most to least likely
                ( nested.fields !== undefined
                ? Type.fromJSON
                : nested.values !== undefined
                ? Enum.fromJSON
                : nested.methods !== undefined
                ? Service.fromJSON
                : nested.id !== undefined
                ? Field.fromJSON
                : Namespace.fromJSON )(names[i], nested)
            );
        }
    }
    return this;
};

/**
 * Gets the nested object of the specified name.
 * @param {string} name Nested object name
 * @returns {ReflectionObject|null} The reflection object or `null` if it doesn't exist
 */
Namespace.prototype.get = function get(name) {
    return this.nested && this.nested[name]
        || null;
};

/**
 * Gets the values of the nested {@link Enum|enum} of the specified name.
 * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
 * @param {string} name Nested enum name
 * @returns {Object.<string,number>} Enum values
 * @throws {Error} If there is no such enum
 */
Namespace.prototype.getEnum = function getEnum(name) {
    if (this.nested && this.nested[name] instanceof Enum)
        return this.nested[name].values;
    throw Error("no such enum: " + name);
};

/**
 * Adds a nested object to this namespace.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name
 */
Namespace.prototype.add = function add(object) {

    if (!(object instanceof Field && object.extend !== undefined || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace))
        throw TypeError("object must be a valid nested object");

    if (!this.nested)
        this.nested = {};
    else {
        var prev = this.get(object.name);
        if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
                // replace plain namespace but keep existing nested elements and options
                var nested = prev.nestedArray;
                for (var i = 0; i < nested.length; ++i)
                    object.add(nested[i]);
                this.remove(prev);
                if (!this.nested)
                    this.nested = {};
                object.setOptions(prev.options, true);

            } else
                throw Error("duplicate name '" + object.name + "' in " + this);
        }
    }
    this.nested[object.name] = object;
    object.onAdd(this);
    return clearCache(this);
};

/**
 * Removes a nested object from this namespace.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this namespace
 */
Namespace.prototype.remove = function remove(object) {

    if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
    if (object.parent !== this)
        throw Error(object + " is not a member of " + this);

    delete this.nested[object.name];
    if (!Object.keys(this.nested).length)
        this.nested = undefined;

    object.onRemove(this);
    return clearCache(this);
};

/**
 * Defines additial namespaces within this one if not yet existing.
 * @param {string|string[]} path Path to create
 * @param {*} [json] Nested types to create from JSON
 * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
 */
Namespace.prototype.define = function define(path, json) {

    if (util.isString(path))
        path = path.split(".");
    else if (!Array.isArray(path))
        throw TypeError("illegal path");
    if (path && path.length && path[0] === "")
        throw Error("path must be relative");

    var ptr = this;
    while (path.length > 0) {
        var part = path.shift();
        if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace))
                throw Error("path conflicts with non-namespace objects");
        } else
            ptr.add(ptr = new Namespace(part));
    }
    if (json)
        ptr.addJSON(json);
    return ptr;
};

/**
 * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree, but comes at a cost.
 * @returns {Namespace} `this`
 */
Namespace.prototype.resolveAll = function resolveAll() {
    var nested = this.nestedArray, i = 0;
    while (i < nested.length)
        if (nested[i] instanceof Namespace)
            nested[i++].resolveAll();
        else
            nested[i++].resolve();
    return this.resolve();
};

/**
 * Recursively looks up the reflection object matching the specified path in the scope of this namespace.
 * @param {string|string[]} path Path to look up
 * @param {*|Array.<*>} filterTypes Filter types, any combination of the constructors of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
 * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 */
Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {

    /* istanbul ignore next */
    if (typeof filterTypes === "boolean") {
        parentAlreadyChecked = filterTypes;
        filterTypes = undefined;
    } else if (filterTypes && !Array.isArray(filterTypes))
        filterTypes = [ filterTypes ];

    if (util.isString(path) && path.length) {
        if (path === ".")
            return this.root;
        path = path.split(".");
    } else if (!path.length)
        return this;

    // Start at root if path is absolute
    if (path[0] === "")
        return this.root.lookup(path.slice(1), filterTypes);

    // Test if the first part matches any nested object, and if so, traverse if path contains more
    var found = this.get(path[0]);
    if (found) {
        if (path.length === 1) {
            if (!filterTypes || filterTypes.indexOf(found.constructor) > -1)
                return found;
        } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true)))
            return found;

    // Otherwise try each nested namespace
    } else
        for (var i = 0; i < this.nestedArray.length; ++i)
            if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true)))
                return found;

    // If there hasn't been a match, try again at the parent
    if (this.parent === null || parentAlreadyChecked)
        return null;
    return this.parent.lookup(path, filterTypes);
};

/**
 * Looks up the reflection object at the specified path, relative to this namespace.
 * @name NamespaceBase#lookup
 * @function
 * @param {string|string[]} path Path to look up
 * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 * @variation 2
 */
// lookup(path: string, [parentAlreadyChecked: boolean])

/**
 * Looks up the {@link Type|type} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type
 * @throws {Error} If `path` does not point to a type
 */
Namespace.prototype.lookupType = function lookupType(path) {
    var found = this.lookup(path, [ Type ]);
    if (!found)
        throw Error("no such type: " + path);
    return found;
};

/**
 * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Enum} Looked up enum
 * @throws {Error} If `path` does not point to an enum
 */
Namespace.prototype.lookupEnum = function lookupEnum(path) {
    var found = this.lookup(path, [ Enum ]);
    if (!found)
        throw Error("no such Enum '" + path + "' in " + this);
    return found;
};

/**
 * Looks up the {@link Type|type} or {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type or enum
 * @throws {Error} If `path` does not point to a type or enum
 */
Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
    var found = this.lookup(path, [ Type, Enum ]);
    if (!found)
        throw Error("no such Type or Enum '" + path + "' in " + this);
    return found;
};

/**
 * Looks up the {@link Service|service} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Service} Looked up service
 * @throws {Error} If `path` does not point to a service
 */
Namespace.prototype.lookupService = function lookupService(path) {
    var found = this.lookup(path, [ Service ]);
    if (!found)
        throw Error("no such Service '" + path + "' in " + this);
    return found;
};

// Sets up cyclic dependencies (called in index-light)
Namespace._configure = function(Type_, Service_, Enum_) {
    Type    = Type_;
    Service = Service_;
    Enum    = Enum_;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/object.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/object.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = ReflectionObject;

ReflectionObject.className = "ReflectionObject";

var util = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

var Root; // cyclic

/**
 * Constructs a new reflection object instance.
 * @classdesc Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {Object.<string,*>} [options] Declared options
 * @abstract
 */
function ReflectionObject(name, options) {

    if (!util.isString(name))
        throw TypeError("name must be a string");

    if (options && !util.isObject(options))
        throw TypeError("options must be an object");

    /**
     * Options.
     * @type {Object.<string,*>|undefined}
     */
    this.options = options; // toJSON

    /**
     * Unique name within its namespace.
     * @type {string}
     */
    this.name = name;

    /**
     * Parent namespace.
     * @type {Namespace|null}
     */
    this.parent = null;

    /**
     * Whether already resolved or not.
     * @type {boolean}
     */
    this.resolved = false;

    /**
     * Comment text, if any.
     * @type {string|null}
     */
    this.comment = null;

    /**
     * Defining file name.
     * @type {string|null}
     */
    this.filename = null;
}

Object.defineProperties(ReflectionObject.prototype, {

    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {Root}
     * @readonly
     */
    root: {
        get: function() {
            var ptr = this;
            while (ptr.parent !== null)
                ptr = ptr.parent;
            return ptr;
        }
    },

    /**
     * Full name including leading dot.
     * @name ReflectionObject#fullName
     * @type {string}
     * @readonly
     */
    fullName: {
        get: function() {
            var path = [ this.name ],
                ptr = this.parent;
            while (ptr) {
                path.unshift(ptr.name);
                ptr = ptr.parent;
            }
            return path.join(".");
        }
    }
});

/**
 * Converts this reflection object to its descriptor representation.
 * @returns {Object.<string,*>} Descriptor
 * @abstract
 */
ReflectionObject.prototype.toJSON = /* istanbul ignore next */ function toJSON() {
    throw Error(); // not implemented, shouldn't happen
};

/**
 * Called when this object is added to a parent.
 * @param {ReflectionObject} parent Parent added to
 * @returns {undefined}
 */
ReflectionObject.prototype.onAdd = function onAdd(parent) {
    if (this.parent && this.parent !== parent)
        this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    var root = parent.root;
    if (root instanceof Root)
        root._handleAdd(this);
};

/**
 * Called when this object is removed from a parent.
 * @param {ReflectionObject} parent Parent removed from
 * @returns {undefined}
 */
ReflectionObject.prototype.onRemove = function onRemove(parent) {
    var root = parent.root;
    if (root instanceof Root)
        root._handleRemove(this);
    this.parent = null;
    this.resolved = false;
};

/**
 * Resolves this objects type references.
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    if (this.root instanceof Root)
        this.resolved = true; // only if part of a root
    return this;
};

/**
 * Gets an option value.
 * @param {string} name Option name
 * @returns {*} Option value or `undefined` if not set
 */
ReflectionObject.prototype.getOption = function getOption(name) {
    if (this.options)
        return this.options[name];
    return undefined;
};

/**
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (!ifNotSet || !this.options || this.options[name] === undefined)
        (this.options || (this.options = {}))[name] = value;
    return this;
};

/**
 * Sets multiple options.
 * @param {Object.<string,*>} options Options to set
 * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
    if (options)
        for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
            this.setOption(keys[i], options[keys[i]], ifNotSet);
    return this;
};

/**
 * Converts this instance to its string representation.
 * @returns {string} Class name[, space, full name]
 */
ReflectionObject.prototype.toString = function toString() {
    var className = this.constructor.className,
        fullName  = this.fullName;
    if (fullName.length)
        return className + " " + fullName;
    return className;
};

// Sets up cyclic dependencies (called in index-light)
ReflectionObject._configure = function(Root_) {
    Root = Root_;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/oneof.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/oneof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = OneOf;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(/*! ./object */ "./node_modules/protobufjs/src/object.js");
((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";

var Field = __webpack_require__(/*! ./field */ "./node_modules/protobufjs/src/field.js"),
    util  = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

/**
 * Constructs a new oneof instance.
 * @classdesc Reflected oneof.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Oneof name
 * @param {string[]|Object.<string,*>} [fieldNames] Field names
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */
function OneOf(name, fieldNames, options, comment) {
    if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = undefined;
    }
    ReflectionObject.call(this, name, options);

    /* istanbul ignore if */
    if (!(fieldNames === undefined || Array.isArray(fieldNames)))
        throw TypeError("fieldNames must be an Array");

    /**
     * Field names that belong to this oneof.
     * @type {string[]}
     */
    this.oneof = fieldNames || []; // toJSON, marker

    /**
     * Fields that belong to this oneof as an array for iteration.
     * @type {Field[]}
     * @readonly
     */
    this.fieldsArray = []; // declared readonly for conformance, possibly not yet added to parent

    /**
     * Comment for this field.
     * @type {string|null}
     */
    this.comment = comment;
}

/**
 * Oneof descriptor.
 * @interface IOneOf
 * @property {Array.<string>} oneof Oneof field names
 * @property {Object.<string,*>} [options] Oneof options
 */

/**
 * Constructs a oneof from a oneof descriptor.
 * @param {string} name Oneof name
 * @param {IOneOf} json Oneof descriptor
 * @returns {OneOf} Created oneof
 * @throws {TypeError} If arguments are invalid
 */
OneOf.fromJSON = function fromJSON(name, json) {
    return new OneOf(name, json.oneof, json.options, json.comment);
};

/**
 * Converts this oneof to a oneof descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IOneOf} Oneof descriptor
 */
OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options" , this.options,
        "oneof"   , this.oneof,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * Adds the fields of the specified oneof to the parent if not already done so.
 * @param {OneOf} oneof The oneof
 * @returns {undefined}
 * @inner
 * @ignore
 */
function addFieldsToParent(oneof) {
    if (oneof.parent)
        for (var i = 0; i < oneof.fieldsArray.length; ++i)
            if (!oneof.fieldsArray[i].parent)
                oneof.parent.add(oneof.fieldsArray[i]);
}

/**
 * Adds a field to this oneof and removes it from its current parent, if any.
 * @param {Field} field Field to add
 * @returns {OneOf} `this`
 */
OneOf.prototype.add = function add(field) {

    /* istanbul ignore if */
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");

    if (field.parent && field.parent !== this.parent)
        field.parent.remove(field);
    this.oneof.push(field.name);
    this.fieldsArray.push(field);
    field.partOf = this; // field.parent remains null
    addFieldsToParent(this);
    return this;
};

/**
 * Removes a field from this oneof and puts it back to the oneof's parent.
 * @param {Field} field Field to remove
 * @returns {OneOf} `this`
 */
OneOf.prototype.remove = function remove(field) {

    /* istanbul ignore if */
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");

    var index = this.fieldsArray.indexOf(field);

    /* istanbul ignore if */
    if (index < 0)
        throw Error(field + " is not a member of " + this);

    this.fieldsArray.splice(index, 1);
    index = this.oneof.indexOf(field.name);

    /* istanbul ignore else */
    if (index > -1) // theoretical
        this.oneof.splice(index, 1);

    field.partOf = null;
    return this;
};

/**
 * @override
 */
OneOf.prototype.onAdd = function onAdd(parent) {
    ReflectionObject.prototype.onAdd.call(this, parent);
    var self = this;
    // Collect present fields
    for (var i = 0; i < this.oneof.length; ++i) {
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
            field.partOf = self;
            self.fieldsArray.push(field);
        }
    }
    // Add not yet present fields
    addFieldsToParent(this);
};

/**
 * @override
 */
OneOf.prototype.onRemove = function onRemove(parent) {
    for (var i = 0, field; i < this.fieldsArray.length; ++i)
        if ((field = this.fieldsArray[i]).parent)
            field.parent.remove(field);
    ReflectionObject.prototype.onRemove.call(this, parent);
};

/**
 * Decorator function as returned by {@link OneOf.d} (TypeScript).
 * @typedef OneOfDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} oneofName OneOf name
 * @returns {undefined}
 */

/**
 * OneOf decorator (TypeScript).
 * @function
 * @param {...string} fieldNames Field names
 * @returns {OneOfDecorator} Decorator function
 * @template T extends string
 */
OneOf.d = function decorateOneOf() {
    var fieldNames = new Array(arguments.length),
        index = 0;
    while (index < arguments.length)
        fieldNames[index] = arguments[index++];
    return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor)
            .add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
        });
    };
};


/***/ }),

/***/ "./node_modules/protobufjs/src/parse.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/parse.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = parse;

parse.filename = null;
parse.defaults = { keepCase: false };

var tokenize  = __webpack_require__(/*! ./tokenize */ "./node_modules/protobufjs/src/tokenize.js"),
    Root      = __webpack_require__(/*! ./root */ "./node_modules/protobufjs/src/root.js"),
    Type      = __webpack_require__(/*! ./type */ "./node_modules/protobufjs/src/type.js"),
    Field     = __webpack_require__(/*! ./field */ "./node_modules/protobufjs/src/field.js"),
    MapField  = __webpack_require__(/*! ./mapfield */ "./node_modules/protobufjs/src/mapfield.js"),
    OneOf     = __webpack_require__(/*! ./oneof */ "./node_modules/protobufjs/src/oneof.js"),
    Enum      = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js"),
    Service   = __webpack_require__(/*! ./service */ "./node_modules/protobufjs/src/service.js"),
    Method    = __webpack_require__(/*! ./method */ "./node_modules/protobufjs/src/method.js"),
    types     = __webpack_require__(/*! ./types */ "./node_modules/protobufjs/src/types.js"),
    util      = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

var base10Re    = /^[1-9][0-9]*$/,
    base10NegRe = /^-?[1-9][0-9]*$/,
    base16Re    = /^0[x][0-9a-fA-F]+$/,
    base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
    base8Re     = /^0[0-7]+$/,
    base8NegRe  = /^-?0[0-7]+$/,
    numberRe    = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
    nameRe      = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    typeRefRe   = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
    fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;

/**
 * Result object returned from {@link parse}.
 * @interface IParserResult
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
 * @property {Root} root Populated root instance
 */

/**
 * Options modifying the behavior of {@link parse}.
 * @interface IParseOptions
 * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
 * @property {boolean} [alternateCommentMode=false] Recognize double-slash comments in addition to doc-block comments.
 */

/**
 * Options modifying the behavior of JSON serialization.
 * @interface IToJSONOptions
 * @property {boolean} [keepComments=false] Serializes comments.
 */

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @param {string} source Source contents
 * @param {Root} root Root to populate
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 */
function parse(source, root, options) {
    /* eslint-disable callback-return */
    if (!(root instanceof Root)) {
        options = root;
        root = new Root();
    }
    if (!options)
        options = parse.defaults;

    var tn = tokenize(source, options.alternateCommentMode || false),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip,
        cmnt = tn.cmnt;

    var head = true,
        pkg,
        imports,
        weakImports,
        syntax,
        isProto3 = false;

    var ptr = root;

    var applyCase = options.keepCase ? function(name) { return name; } : util.camelCase;

    /* istanbul ignore next */
    function illegal(token, name, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch)
            parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
    }

    function readString() {
        var values = [],
            token;
        do {
            /* istanbul ignore if */
            if ((token = next()) !== "\"" && token !== "'")
                throw illegal(token);

            values.push(next());
            skip(token);
            token = peek();
        } while (token === "\"" || token === "'");
        return values.join("");
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (token) {
            case "'":
            case "\"":
                push(token);
                return readString();
            case "true": case "TRUE":
                return true;
            case "false": case "FALSE":
                return false;
        }
        try {
            return parseNumber(token, /* insideTryCatch */ true);
        } catch (e) {

            /* istanbul ignore else */
            if (acceptTypeRef && typeRefRe.test(token))
                return token;

            /* istanbul ignore next */
            throw illegal(token, "value");
        }
    }

    function readRanges(target, acceptStrings) {
        var token, start;
        do {
            if (acceptStrings && ((token = peek()) === "\"" || token === "'"))
                target.push(readString());
            else
                target.push([ start = parseId(next()), skip("to", true) ? parseId(next()) : start ]);
        } while (skip(",", true));
        skip(";");
    }

    function parseNumber(token, insideTryCatch) {
        var sign = 1;
        if (token.charAt(0) === "-") {
            sign = -1;
            token = token.substring(1);
        }
        switch (token) {
            case "inf": case "INF": case "Inf":
                return sign * Infinity;
            case "nan": case "NAN": case "Nan": case "NaN":
                return NaN;
            case "0":
                return 0;
        }
        if (base10Re.test(token))
            return sign * parseInt(token, 10);
        if (base16Re.test(token))
            return sign * parseInt(token, 16);
        if (base8Re.test(token))
            return sign * parseInt(token, 8);

        /* istanbul ignore else */
        if (numberRe.test(token))
            return sign * parseFloat(token);

        /* istanbul ignore next */
        throw illegal(token, "number", insideTryCatch);
    }

    function parseId(token, acceptNegative) {
        switch (token) {
            case "max": case "MAX": case "Max":
                return 536870911;
            case "0":
                return 0;
        }

        /* istanbul ignore if */
        if (!acceptNegative && token.charAt(0) === "-")
            throw illegal(token, "id");

        if (base10NegRe.test(token))
            return parseInt(token, 10);
        if (base16NegRe.test(token))
            return parseInt(token, 16);

        /* istanbul ignore else */
        if (base8NegRe.test(token))
            return parseInt(token, 8);

        /* istanbul ignore next */
        throw illegal(token, "id");
    }

    function parsePackage() {

        /* istanbul ignore if */
        if (pkg !== undefined)
            throw illegal("package");

        pkg = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(pkg))
            throw illegal(pkg, "name");

        ptr = ptr.define(pkg);
        skip(";");
    }

    function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
            case "public":
                next();
                // eslint-disable-line no-fallthrough
            default:
                whichImports = imports || (imports = []);
                break;
        }
        token = readString();
        skip(";");
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = readString();
        isProto3 = syntax === "proto3";

        /* istanbul ignore if */
        if (!isProto3 && syntax !== "proto2")
            throw illegal(syntax, "syntax");

        skip(";");
    }

    function parseCommon(parent, token) {
        switch (token) {

            case "option":
                parseOption(parent, token);
                skip(";");
                return true;

            case "message":
                parseType(parent, token);
                return true;

            case "enum":
                parseEnum(parent, token);
                return true;

            case "service":
                parseService(parent, token);
                return true;

            case "extend":
                parseExtension(parent, token);
                return true;
        }
        return false;
    }

    function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
            obj.comment = cmnt(); // try block-type comment
            obj.filename = parse.filename;
        }
        if (skip("{", true)) {
            var token;
            while ((token = next()) !== "}")
                fnIf(token);
            skip(";", true);
        } else {
            if (fnElse)
                fnElse();
            skip(";");
            if (obj && typeof obj.comment !== "string")
                obj.comment = cmnt(trailingLine); // try line-type comment if no block
        }
    }

    function parseType(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "type name");

        var type = new Type(token);
        ifBlock(type, function parseType_block(token) {
            if (parseCommon(type, token))
                return;

            switch (token) {

                case "map":
                    parseMapField(type, token);
                    break;

                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;

                case "oneof":
                    parseOneOf(type, token);
                    break;

                case "extensions":
                    readRanges(type.extensions || (type.extensions = []));
                    break;

                case "reserved":
                    readRanges(type.reserved || (type.reserved = []), true);
                    break;

                default:
                    /* istanbul ignore if */
                    if (!isProto3 || !typeRefRe.test(token))
                        throw illegal(token);

                    push(token);
                    parseField(type, "optional");
                    break;
            }
        });
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
            parseGroup(parent, rule);
            return;
        }

        /* istanbul ignore if */
        if (!typeRefRe.test(type))
            throw illegal(type, "type");

        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        name = applyCase(name);
        skip("=");

        var field = new Field(name, parseId(next()), type, rule, extend);
        ifBlock(field, function parseField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal(token);

        }, function parseField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);

        // JSON defaults to packed=true if not set so we have to set packed=false explicity when
        // parsing proto2 descriptors without the option, where applicable. This must be done for
        // all known packable types and anything that could be an enum (= is not a basic type).
        if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined))
            field.setOption("packed", false, /* ifNotSet */ true);
    }

    function parseGroup(parent, rule) {
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        var fieldName = util.lcFirst(name);
        if (name === fieldName)
            name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule);
        field.filename = parse.filename;
        ifBlock(type, function parseGroup_block(token) {
            switch (token) {

                case "option":
                    parseOption(type, token);
                    skip(";");
                    break;

                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;

                /* istanbul ignore next */
                default:
                    throw illegal(token); // there are no groups with proto3 semantics
            }
        });
        parent.add(type)
              .add(field);
    }

    function parseMapField(parent) {
        skip("<");
        var keyType = next();

        /* istanbul ignore if */
        if (types.mapKey[keyType] === undefined)
            throw illegal(keyType, "type");

        skip(",");
        var valueType = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(valueType))
            throw illegal(valueType, "type");

        skip(">");
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        skip("=");
        var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
        ifBlock(field, function parseMapField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal(token);

        }, function parseMapField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);
    }

    function parseOneOf(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var oneof = new OneOf(applyCase(token));
        ifBlock(oneof, function parseOneOf_block(token) {
            if (token === "option") {
                parseOption(oneof, token);
                skip(";");
            } else {
                push(token);
                parseField(oneof, "optional");
            }
        });
        parent.add(oneof);
    }

    function parseEnum(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var enm = new Enum(token);
        ifBlock(enm, function parseEnum_block(token) {
          switch(token) {
            case "option":
              parseOption(enm, token);
              skip(";");
              break;

            case "reserved":
              readRanges(enm.reserved || (enm.reserved = []), true);
              break;

            default:
              parseEnumValue(enm, token);
          }
        });
        parent.add(enm);
    }

    function parseEnumValue(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token))
            throw illegal(token, "name");

        skip("=");
        var value = parseId(next(), true),
            dummy = {};
        ifBlock(dummy, function parseEnumValue_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(dummy, token); // skip
                skip(";");
            } else
                throw illegal(token);

        }, function parseEnumValue_line() {
            parseInlineOptions(dummy); // skip
        });
        parent.add(token, value, dummy.comment);
    }

    function parseOption(parent, token) {
        var isCustom = skip("(", true);

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token, "name");

        var name = token;
        if (isCustom) {
            skip(")");
            name = "(" + name + ")";
            token = peek();
            if (fqTypeRefRe.test(token)) {
                name += token;
                next();
            }
        }
        skip("=");
        parseOptionValue(parent, name);
    }

    function parseOptionValue(parent, name) {
        if (skip("{", true)) { // { a: "foo" b { c: "bar" } }
            do {
                /* istanbul ignore if */
                if (!nameRe.test(token = next()))
                    throw illegal(token, "name");

                if (peek() === "{")
                    parseOptionValue(parent, name + "." + token);
                else {
                    skip(":");
                    if (peek() === "{")
                        parseOptionValue(parent, name + "." + token);
                    else
                        setOption(parent, name + "." + token, readValue(true));
                }
                skip(",", true);
            } while (!skip("}", true));
        } else
            setOption(parent, name, readValue(true));
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (parent.setOption)
            parent.setOption(name, value);
    }

    function parseInlineOptions(parent) {
        if (skip("[", true)) {
            do {
                parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
        }
        return parent;
    }

    function parseService(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "service name");

        var service = new Service(token);
        ifBlock(service, function parseService_block(token) {
            if (parseCommon(service, token))
                return;

            /* istanbul ignore else */
            if (token === "rpc")
                parseMethod(service, token);
            else
                throw illegal(token);
        });
        parent.add(service);
    }

    function parseMethod(parent, token) {
        var type = token;

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var name = token,
            requestType, requestStream,
            responseType, responseStream;

        skip("(");
        if (skip("stream", true))
            requestStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token);

        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (skip("stream", true))
            responseStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token);

        responseType = token;
        skip(")");

        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        ifBlock(method, function parseMethod_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(method, token);
                skip(";");
            } else
                throw illegal(token);

        });
        parent.add(method);
    }

    function parseExtension(parent, token) {

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token, "reference");

        var reference = token;
        ifBlock(null, function parseExtension_block(token) {
            switch (token) {

                case "required":
                case "repeated":
                case "optional":
                    parseField(parent, token, reference);
                    break;

                default:
                    /* istanbul ignore if */
                    if (!isProto3 || !typeRefRe.test(token))
                        throw illegal(token);
                    push(token);
                    parseField(parent, "optional", reference);
                    break;
            }
        });
    }

    var token;
    while ((token = next()) !== null) {
        switch (token) {

            case "package":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parsePackage();
                break;

            case "import":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseImport();
                break;

            case "syntax":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseSyntax();
                break;

            case "option":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseOption(ptr, token);
                skip(";");
                break;

            default:

                /* istanbul ignore else */
                if (parseCommon(ptr, token)) {
                    head = false;
                    continue;
                }

                /* istanbul ignore next */
                throw illegal(token);
        }
    }

    parse.filename = null;
    return {
        "package"     : pkg,
        "imports"     : imports,
         weakImports  : weakImports,
         syntax       : syntax,
         root         : root
    };
}

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @name parse
 * @function
 * @param {string} source Source contents
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 * @variation 2
 */


/***/ }),

/***/ "./node_modules/protobufjs/src/reader.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/reader.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = util.Buffer
    ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
            return util.Buffer.isBuffer(buffer)
                ? new BufferReader(buffer)
                /* istanbul ignore next */
                : create_array(buffer);
        })(buffer);
    }
    /* istanbul ignore next */
    : create_array;

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),

/***/ "./node_modules/protobufjs/src/reader_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/reader_buffer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

/* istanbul ignore else */
if (util.Buffer)
    BufferReader.prototype._slice = util.Buffer.prototype.slice;

/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */


/***/ }),

/***/ "./node_modules/protobufjs/src/root.js":
/*!*********************************************!*\
  !*** ./node_modules/protobufjs/src/root.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Root;

// extends Namespace
var Namespace = __webpack_require__(/*! ./namespace */ "./node_modules/protobufjs/src/namespace.js");
((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";

var Field   = __webpack_require__(/*! ./field */ "./node_modules/protobufjs/src/field.js"),
    Enum    = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js"),
    OneOf   = __webpack_require__(/*! ./oneof */ "./node_modules/protobufjs/src/oneof.js"),
    util    = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

var Type,   // cyclic
    parse,  // might be excluded
    common; // "

/**
 * Constructs a new root namespace instance.
 * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
 * @extends NamespaceBase
 * @constructor
 * @param {Object.<string,*>} [options] Top level options
 */
function Root(options) {
    Namespace.call(this, "", options);

    /**
     * Deferred extension fields.
     * @type {Field[]}
     */
    this.deferred = [];

    /**
     * Resolved file names of loaded files.
     * @type {string[]}
     */
    this.files = [];
}

/**
 * Loads a namespace descriptor into a root namespace.
 * @param {INamespace} json Nameespace descriptor
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted
 * @returns {Root} Root namespace
 */
Root.fromJSON = function fromJSON(json, root) {
    if (!root)
        root = new Root();
    if (json.options)
        root.setOptions(json.options);
    return root.addJSON(json.nested);
};

/**
 * Resolves the path of an imported file, relative to the importing origin.
 * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
 * @function
 * @param {string} origin The file name of the importing file
 * @param {string} target The file name being imported
 * @returns {string|null} Resolved path to `target` or `null` to skip the file
 */
Root.prototype.resolvePath = util.path.resolve;

// A symbol-like function to safely signal synchronous loading
/* istanbul ignore next */
function SYNC() {} // eslint-disable-line no-empty-function

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} options Parse options
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 */
Root.prototype.load = function load(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = undefined;
    }
    var self = this;
    if (!callback)
        return util.asPromise(load, self, filename, options);

    var sync = callback === SYNC; // undocumented

    // Finishes loading by calling the callback (exactly once)
    function finish(err, root) {
        /* istanbul ignore if */
        if (!callback)
            return;
        var cb = callback;
        callback = null;
        if (sync)
            throw err;
        cb(err, root);
    }

    // Processes a single file
    function process(filename, source) {
        try {
            if (util.isString(source) && source.charAt(0) === "{")
                source = JSON.parse(source);
            if (!util.isString(source))
                self.setOptions(source.options).addJSON(source.nested);
            else {
                parse.filename = filename;
                var parsed = parse(source, self, options),
                    resolved,
                    i = 0;
                if (parsed.imports)
                    for (; i < parsed.imports.length; ++i)
                        if (resolved = self.resolvePath(filename, parsed.imports[i]))
                            fetch(resolved);
                if (parsed.weakImports)
                    for (i = 0; i < parsed.weakImports.length; ++i)
                        if (resolved = self.resolvePath(filename, parsed.weakImports[i]))
                            fetch(resolved, true);
            }
        } catch (err) {
            finish(err);
        }
        if (!sync && !queued)
            finish(null, self); // only once anyway
    }

    // Fetches a single file
    function fetch(filename, weak) {

        // Strip path if this file references a bundled definition
        var idx = filename.lastIndexOf("google/protobuf/");
        if (idx > -1) {
            var altname = filename.substring(idx);
            if (altname in common)
                filename = altname;
        }

        // Skip if already loaded / attempted
        if (self.files.indexOf(filename) > -1)
            return;
        self.files.push(filename);

        // Shortcut bundled definitions
        if (filename in common) {
            if (sync)
                process(filename, common[filename]);
            else {
                ++queued;
                setTimeout(function() {
                    --queued;
                    process(filename, common[filename]);
                });
            }
            return;
        }

        // Otherwise fetch from disk or network
        if (sync) {
            var source;
            try {
                source = util.fs.readFileSync(filename).toString("utf8");
            } catch (err) {
                if (!weak)
                    finish(err);
                return;
            }
            process(filename, source);
        } else {
            ++queued;
            util.fetch(filename, function(err, source) {
                --queued;
                /* istanbul ignore if */
                if (!callback)
                    return; // terminated meanwhile
                if (err) {
                    /* istanbul ignore else */
                    if (!weak)
                        finish(err);
                    else if (!queued) // can't be covered reliably
                        finish(null, self);
                    return;
                }
                process(filename, source);
            });
        }
    }
    var queued = 0;

    // Assembling the root namespace doesn't require working type
    // references anymore, so we can load everything in parallel
    if (util.isString(filename))
        filename = [ filename ];
    for (var i = 0, resolved; i < filename.length; ++i)
        if (resolved = self.resolvePath("", filename[i]))
            fetch(resolved);

    if (sync)
        return self;
    if (!queued)
        finish(null, self);
    return undefined;
};
// function load(filename:string, options:IParseOptions, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Promise<Root>} Promise
 * @variation 3
 */
// function load(filename:string, [options:IParseOptions]):Promise<Root>

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace (node only).
 * @function Root#loadSync
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 */
Root.prototype.loadSync = function loadSync(filename, options) {
    if (!util.isNode)
        throw Error("not supported");
    return this.load(filename, options, SYNC);
};

/**
 * @override
 */
Root.prototype.resolveAll = function resolveAll() {
    if (this.deferred.length)
        throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
            return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
    return Namespace.prototype.resolveAll.call(this);
};

// only uppercased (and thus conflict-free) children are exposed, see below
var exposeRe = /^[A-Z]/;

/**
 * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
 * @param {Root} root Root instance
 * @param {Field} field Declaring extension field witin the declaring type
 * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
 * @inner
 * @ignore
 */
function tryHandleExtension(root, field) {
    var extendedType = field.parent.lookup(field.extend);
    if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
    }
    return false;
}

/**
 * Called when any object is added to this root or its sub-namespaces.
 * @param {ReflectionObject} object Object added
 * @returns {undefined}
 * @private
 */
Root.prototype._handleAdd = function _handleAdd(object) {
    if (object instanceof Field) {

        if (/* an extension field (implies not part of a oneof) */ object.extend !== undefined && /* not already handled */ !object.extensionField)
            if (!tryHandleExtension(this, object))
                this.deferred.push(object);

    } else if (object instanceof Enum) {

        if (exposeRe.test(object.name))
            object.parent[object.name] = object.values; // expose enum values as property of its parent

    } else if (!(object instanceof OneOf)) /* everything else is a namespace */ {

        if (object instanceof Type) // Try to handle any deferred extensions
            for (var i = 0; i < this.deferred.length;)
                if (tryHandleExtension(this, this.deferred[i]))
                    this.deferred.splice(i, 1);
                else
                    ++i;
        for (var j = 0; j < /* initializes */ object.nestedArray.length; ++j) // recurse into the namespace
            this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name))
            object.parent[object.name] = object; // expose namespace as property of its parent
    }

    // The above also adds uppercased (and thus conflict-free) nested types, services and enums as
    // properties of namespaces just like static code does. This allows using a .d.ts generated for
    // a static module with reflection-based solutions where the condition is met.
};

/**
 * Called when any object is removed from this root or its sub-namespaces.
 * @param {ReflectionObject} object Object removed
 * @returns {undefined}
 * @private
 */
Root.prototype._handleRemove = function _handleRemove(object) {
    if (object instanceof Field) {

        if (/* an extension field */ object.extend !== undefined) {
            if (/* already handled */ object.extensionField) { // remove its sister field
                object.extensionField.parent.remove(object.extensionField);
                object.extensionField = null;
            } else { // cancel the extension
                var index = this.deferred.indexOf(object);
                /* istanbul ignore else */
                if (index > -1)
                    this.deferred.splice(index, 1);
            }
        }

    } else if (object instanceof Enum) {

        if (exposeRe.test(object.name))
            delete object.parent[object.name]; // unexpose enum values

    } else if (object instanceof Namespace) {

        for (var i = 0; i < /* initializes */ object.nestedArray.length; ++i) // recurse into the namespace
            this._handleRemove(object._nestedArray[i]);

        if (exposeRe.test(object.name))
            delete object.parent[object.name]; // unexpose namespaces

    }
};

// Sets up cyclic dependencies (called in index-light)
Root._configure = function(Type_, parse_, common_) {
    Type   = Type_;
    parse  = parse_;
    common = common_;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/roots.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/roots.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc.js":
/*!********************************************!*\
  !*** ./node_modules/protobufjs/src/rpc.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(/*! ./rpc/service */ "./node_modules/protobufjs/src/rpc/service.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc/service.js":
/*!****************************************************!*\
  !*** ./node_modules/protobufjs/src/rpc/service.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/service.js":
/*!************************************************!*\
  !*** ./node_modules/protobufjs/src/service.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

// extends Namespace
var Namespace = __webpack_require__(/*! ./namespace */ "./node_modules/protobufjs/src/namespace.js");
((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";

var Method = __webpack_require__(/*! ./method */ "./node_modules/protobufjs/src/method.js"),
    util   = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js"),
    rpc    = __webpack_require__(/*! ./rpc */ "./node_modules/protobufjs/src/rpc.js");

/**
 * Constructs a new service instance.
 * @classdesc Reflected service.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Service name
 * @param {Object.<string,*>} [options] Service options
 * @throws {TypeError} If arguments are invalid
 */
function Service(name, options) {
    Namespace.call(this, name, options);

    /**
     * Service methods.
     * @type {Object.<string,Method>}
     */
    this.methods = {}; // toJSON, marker

    /**
     * Cached methods as an array.
     * @type {Method[]|null}
     * @private
     */
    this._methodsArray = null;
}

/**
 * Service descriptor.
 * @interface IService
 * @extends INamespace
 * @property {Object.<string,IMethod>} methods Method descriptors
 */

/**
 * Constructs a service from a service descriptor.
 * @param {string} name Service name
 * @param {IService} json Service descriptor
 * @returns {Service} Created service
 * @throws {TypeError} If arguments are invalid
 */
Service.fromJSON = function fromJSON(name, json) {
    var service = new Service(name, json.options);
    /* istanbul ignore else */
    if (json.methods)
        for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
            service.add(Method.fromJSON(names[i], json.methods[names[i]]));
    if (json.nested)
        service.addJSON(json.nested);
    service.comment = json.comment;
    return service;
};

/**
 * Converts this service to a service descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IService} Service descriptor
 */
Service.prototype.toJSON = function toJSON(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options" , inherited && inherited.options || undefined,
        "methods" , Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */ {},
        "nested"  , inherited && inherited.nested || undefined,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * Methods of this service as an array for iteration.
 * @name Service#methodsArray
 * @type {Method[]}
 * @readonly
 */
Object.defineProperty(Service.prototype, "methodsArray", {
    get: function() {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
    }
});

function clearCache(service) {
    service._methodsArray = null;
    return service;
}

/**
 * @override
 */
Service.prototype.get = function get(name) {
    return this.methods[name]
        || Namespace.prototype.get.call(this, name);
};

/**
 * @override
 */
Service.prototype.resolveAll = function resolveAll() {
    var methods = this.methodsArray;
    for (var i = 0; i < methods.length; ++i)
        methods[i].resolve();
    return Namespace.prototype.resolve.call(this);
};

/**
 * @override
 */
Service.prototype.add = function add(object) {

    /* istanbul ignore if */
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);

    if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};

/**
 * @override
 */
Service.prototype.remove = function remove(object) {
    if (object instanceof Method) {

        /* istanbul ignore if */
        if (this.methods[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};

/**
 * Creates a runtime service using the specified rpc implementation.
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 * @returns {rpc.Service} RPC service. Useful where requests and/or responses are streamed.
 */
Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
    var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
    for (var i = 0, method; i < /* initializes */ this.methodsArray.length; ++i) {
        var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
        rpcService[methodName] = util.codegen(["r","c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
            m: method,
            q: method.resolvedRequestType.ctor,
            s: method.resolvedResponseType.ctor
        });
    }
    return rpcService;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/tokenize.js":
/*!*************************************************!*\
  !*** ./node_modules/protobufjs/src/tokenize.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = tokenize;

var delimRe        = /[\s{}=;:[\],'"()<>]/g,
    stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
    stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;

var setCommentRe = /^ *[*/]+ */,
    setCommentAltRe = /^\s*\*?\/*/,
    setCommentSplitRe = /\n/g,
    whitespaceRe = /\s/,
    unescapeRe = /\\(.?)/g;

var unescapeMap = {
    "0": "\0",
    "r": "\r",
    "n": "\n",
    "t": "\t"
};

/**
 * Unescapes a string.
 * @param {string} str String to unescape
 * @returns {string} Unescaped string
 * @property {Object.<string,string>} map Special characters map
 * @memberof tokenize
 */
function unescape(str) {
    return str.replace(unescapeRe, function($0, $1) {
        switch ($1) {
            case "\\":
            case "":
                return $1;
            default:
                return unescapeMap[$1] || "";
        }
    });
}

tokenize.unescape = unescape;

/**
 * Gets the next token and advances.
 * @typedef TokenizerHandleNext
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */

/**
 * Peeks for the next token.
 * @typedef TokenizerHandlePeek
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */

/**
 * Pushes a token back to the stack.
 * @typedef TokenizerHandlePush
 * @type {function}
 * @param {string} token Token
 * @returns {undefined}
 */

/**
 * Skips the next token.
 * @typedef TokenizerHandleSkip
 * @type {function}
 * @param {string} expected Expected token
 * @param {boolean} [optional=false] If optional
 * @returns {boolean} Whether the token matched
 * @throws {Error} If the token didn't match and is not optional
 */

/**
 * Gets the comment on the previous line or, alternatively, the line comment on the specified line.
 * @typedef TokenizerHandleCmnt
 * @type {function}
 * @param {number} [line] Line number
 * @returns {string|null} Comment text or `null` if none
 */

/**
 * Handle object returned from {@link tokenize}.
 * @interface ITokenizerHandle
 * @property {TokenizerHandleNext} next Gets the next token and advances (`null` on eof)
 * @property {TokenizerHandlePeek} peek Peeks for the next token (`null` on eof)
 * @property {TokenizerHandlePush} push Pushes a token back to the stack
 * @property {TokenizerHandleSkip} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
 * @property {TokenizerHandleCmnt} cmnt Gets the comment on the previous line or the line comment on the specified line, if any
 * @property {number} line Current line number
 */

/**
 * Tokenizes the given .proto source and returns an object with useful utility functions.
 * @param {string} source Source contents
 * @param {boolean} alternateCommentMode Whether we should activate alternate comment parsing mode.
 * @returns {ITokenizerHandle} Tokenizer handle
 */
function tokenize(source, alternateCommentMode) {
    /* eslint-disable callback-return */
    source = source.toString();

    var offset = 0,
        length = source.length,
        line = 1,
        commentType = null,
        commentText = null,
        commentLine = 0,
        commentLineEmpty = false;

    var stack = [];

    var stringDelim = null;

    /* istanbul ignore next */
    /**
     * Creates an error for illegal syntax.
     * @param {string} subject Subject
     * @returns {Error} Error created
     * @inner
     */
    function illegal(subject) {
        return Error("illegal " + subject + " (line " + line + ")");
    }

    /**
     * Reads a string till its end.
     * @returns {string} String read
     * @inner
     */
    function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
            throw illegal("string");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape(match[1]);
    }

    /**
     * Gets the character at `pos` within the source.
     * @param {number} pos Position
     * @returns {string} Character
     * @inner
     */
    function charAt(pos) {
        return source.charAt(pos);
    }

    /**
     * Sets the current comment text.
     * @param {number} start Start offset
     * @param {number} end End offset
     * @returns {undefined}
     * @inner
     */
    function setComment(start, end) {
        commentType = source.charAt(start++);
        commentLine = line;
        commentLineEmpty = false;
        var lookback;
        if (alternateCommentMode) {
            lookback = 2;  // alternate comment parsing: "//" or "/*"
        } else {
            lookback = 3;  // "///" or "/**"
        }
        var commentOffset = start - lookback,
            c;
        do {
            if (--commentOffset < 0 ||
                    (c = source.charAt(commentOffset)) === "\n") {
                commentLineEmpty = true;
                break;
            }
        } while (c === " " || c === "\t");
        var lines = source
            .substring(start, end)
            .split(setCommentSplitRe);
        for (var i = 0; i < lines.length; ++i)
            lines[i] = lines[i]
                .replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "")
                .trim();
        commentText = lines
            .join("\n")
            .trim();
    }

    function isDoubleSlashCommentLine(startOffset) {
        var endOffset = findEndOfLine(startOffset);

        // see if remaining line matches comment pattern
        var lineText = source.substring(startOffset, endOffset);
        // look for 1 or 2 slashes since startOffset would already point past
        // the first slash that started the comment.
        var isComment = /^\s*\/{1,2}/.test(lineText);
        return isComment;
    }

    function findEndOfLine(cursor) {
        // find end of cursor's line
        var endOffset = cursor;
        while (endOffset < length && charAt(endOffset) !== "\n") {
            endOffset++;
        }
        return endOffset;
    }

    /**
     * Obtains the next token.
     * @returns {string|null} Next token or `null` on eof
     * @inner
     */
    function next() {
        if (stack.length > 0)
            return stack.shift();
        if (stringDelim)
            return readString();
        var repeat,
            prev,
            curr,
            start,
            isDoc;
        do {
            if (offset === length)
                return null;
            repeat = false;
            while (whitespaceRe.test(curr = charAt(offset))) {
                if (curr === "\n")
                    ++line;
                if (++offset === length)
                    return null;
            }

            if (charAt(offset) === "/") {
                if (++offset === length) {
                    throw illegal("comment");
                }
                if (charAt(offset) === "/") { // Line
                    if (!alternateCommentMode) {
                        // check for triple-slash comment
                        isDoc = charAt(start = offset + 1) === "/";

                        while (charAt(++offset) !== "\n") {
                            if (offset === length) {
                                return null;
                            }
                        }
                        ++offset;
                        if (isDoc) {
                            setComment(start, offset - 1);
                        }
                        ++line;
                        repeat = true;
                    } else {
                        // check for double-slash comments, consolidating consecutive lines
                        start = offset;
                        isDoc = false;
                        if (isDoubleSlashCommentLine(offset)) {
                            isDoc = true;
                            do {
                                offset = findEndOfLine(offset);
                                if (offset === length) {
                                    break;
                                }
                                offset++;
                            } while (isDoubleSlashCommentLine(offset));
                        } else {
                            offset = Math.min(length, findEndOfLine(offset) + 1);
                        }
                        if (isDoc) {
                            setComment(start, offset);
                        }
                        line++;
                        repeat = true;
                    }
                } else if ((curr = charAt(offset)) === "*") { /* Block */
                    // check for /** (regular comment mode) or /* (alternate comment mode)
                    start = offset + 1;
                    isDoc = alternateCommentMode || charAt(start) === "*";
                    do {
                        if (curr === "\n") {
                            ++line;
                        }
                        if (++offset === length) {
                            throw illegal("comment");
                        }
                        prev = curr;
                        curr = charAt(offset);
                    } while (prev !== "*" || curr !== "/");
                    ++offset;
                    if (isDoc) {
                        setComment(start, offset - 2);
                    }
                    repeat = true;
                } else {
                    return "/";
                }
            }
        } while (repeat);

        // offset !== length if we got here

        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(charAt(end++));
        if (!delim)
            while (end < length && !delimRe.test(charAt(end)))
                ++end;
        var token = source.substring(offset, offset = end);
        if (token === "\"" || token === "'")
            stringDelim = token;
        return token;
    }

    /**
     * Pushes a token back to the stack.
     * @param {string} token Token
     * @returns {undefined}
     * @inner
     */
    function push(token) {
        stack.push(token);
    }

    /**
     * Peeks for the next token.
     * @returns {string|null} Token or `null` on eof
     * @inner
     */
    function peek() {
        if (!stack.length) {
            var token = next();
            if (token === null)
                return null;
            push(token);
        }
        return stack[0];
    }

    /**
     * Skips a token.
     * @param {string} expected Expected token
     * @param {boolean} [optional=false] Whether the token is optional
     * @returns {boolean} `true` when skipped, `false` if not
     * @throws {Error} When a required token is not present
     * @inner
     */
    function skip(expected, optional) {
        var actual = peek(),
            equals = actual === expected;
        if (equals) {
            next();
            return true;
        }
        if (!optional)
            throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
    }

    /**
     * Gets a comment.
     * @param {number} [trailingLine] Line number if looking for a trailing comment
     * @returns {string|null} Comment text
     * @inner
     */
    function cmnt(trailingLine) {
        var ret = null;
        if (trailingLine === undefined) {
            if (commentLine === line - 1 && (alternateCommentMode || commentType === "*" || commentLineEmpty)) {
                ret = commentText;
            }
        } else {
            /* istanbul ignore else */
            if (commentLine < trailingLine) {
                peek();
            }
            if (commentLine === trailingLine && !commentLineEmpty && (alternateCommentMode || commentType === "/")) {
                ret = commentText;
            }
        }
        return ret;
    }

    return Object.defineProperty({
        next: next,
        peek: peek,
        push: push,
        skip: skip,
        cmnt: cmnt
    }, "line", {
        get: function() { return line; }
    });
    /* eslint-enable callback-return */
}


/***/ }),

/***/ "./node_modules/protobufjs/src/type.js":
/*!*********************************************!*\
  !*** ./node_modules/protobufjs/src/type.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Type;

// extends Namespace
var Namespace = __webpack_require__(/*! ./namespace */ "./node_modules/protobufjs/src/namespace.js");
((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";

var Enum      = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js"),
    OneOf     = __webpack_require__(/*! ./oneof */ "./node_modules/protobufjs/src/oneof.js"),
    Field     = __webpack_require__(/*! ./field */ "./node_modules/protobufjs/src/field.js"),
    MapField  = __webpack_require__(/*! ./mapfield */ "./node_modules/protobufjs/src/mapfield.js"),
    Service   = __webpack_require__(/*! ./service */ "./node_modules/protobufjs/src/service.js"),
    Message   = __webpack_require__(/*! ./message */ "./node_modules/protobufjs/src/message.js"),
    Reader    = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js"),
    Writer    = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js"),
    util      = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js"),
    encoder   = __webpack_require__(/*! ./encoder */ "./node_modules/protobufjs/src/encoder.js"),
    decoder   = __webpack_require__(/*! ./decoder */ "./node_modules/protobufjs/src/decoder.js"),
    verifier  = __webpack_require__(/*! ./verifier */ "./node_modules/protobufjs/src/verifier.js"),
    converter = __webpack_require__(/*! ./converter */ "./node_modules/protobufjs/src/converter.js"),
    wrappers  = __webpack_require__(/*! ./wrappers */ "./node_modules/protobufjs/src/wrappers.js");

/**
 * Constructs a new reflected message type instance.
 * @classdesc Reflected message type.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Message name
 * @param {Object.<string,*>} [options] Declared options
 */
function Type(name, options) {
    Namespace.call(this, name, options);

    /**
     * Message fields.
     * @type {Object.<string,Field>}
     */
    this.fields = {};  // toJSON, marker

    /**
     * Oneofs declared within this namespace, if any.
     * @type {Object.<string,OneOf>}
     */
    this.oneofs = undefined; // toJSON

    /**
     * Extension ranges, if any.
     * @type {number[][]}
     */
    this.extensions = undefined; // toJSON

    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */
    this.reserved = undefined; // toJSON

    /*?
     * Whether this type is a legacy group.
     * @type {boolean|undefined}
     */
    this.group = undefined; // toJSON

    /**
     * Cached fields by id.
     * @type {Object.<number,Field>|null}
     * @private
     */
    this._fieldsById = null;

    /**
     * Cached fields as an array.
     * @type {Field[]|null}
     * @private
     */
    this._fieldsArray = null;

    /**
     * Cached oneofs as an array.
     * @type {OneOf[]|null}
     * @private
     */
    this._oneofsArray = null;

    /**
     * Cached constructor.
     * @type {Constructor<{}>}
     * @private
     */
    this._ctor = null;
}

Object.defineProperties(Type.prototype, {

    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */
    fieldsById: {
        get: function() {

            /* istanbul ignore if */
            if (this._fieldsById)
                return this._fieldsById;

            this._fieldsById = {};
            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
                var field = this.fields[names[i]],
                    id = field.id;

                /* istanbul ignore if */
                if (this._fieldsById[id])
                    throw Error("duplicate id " + id + " in " + this);

                this._fieldsById[id] = field;
            }
            return this._fieldsById;
        }
    },

    /**
     * Fields of this message as an array for iteration.
     * @name Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
    },

    /**
     * Oneofs of this message as an array for iteration.
     * @name Type#oneofsArray
     * @type {OneOf[]}
     * @readonly
     */
    oneofsArray: {
        get: function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
    },

    /**
     * The registered constructor, if any registered, otherwise a generic constructor.
     * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
     * @name Type#ctor
     * @type {Constructor<{}>}
     */
    ctor: {
        get: function() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function(ctor) {

            // Ensure proper prototype
            var prototype = ctor.prototype;
            if (!(prototype instanceof Message)) {
                (ctor.prototype = new Message()).constructor = ctor;
                util.merge(ctor.prototype, prototype);
            }

            // Classes and messages reference their reflected type
            ctor.$type = ctor.prototype.$type = this;

            // Mix in static methods
            util.merge(ctor, Message, true);

            this._ctor = ctor;

            // Messages have non-enumerable default values on their prototype
            var i = 0;
            for (; i < /* initializes */ this.fieldsArray.length; ++i)
                this._fieldsArray[i].resolve(); // ensures a proper value

            // Messages have non-enumerable getters and setters for each virtual oneof field
            var ctorProperties = {};
            for (i = 0; i < /* initializes */ this.oneofsArray.length; ++i)
                ctorProperties[this._oneofsArray[i].resolve().name] = {
                    get: util.oneOfGetter(this._oneofsArray[i].oneof),
                    set: util.oneOfSetter(this._oneofsArray[i].oneof)
                };
            if (i)
                Object.defineProperties(ctor.prototype, ctorProperties);
        }
    }
});

/**
 * Generates a constructor function for the specified type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
Type.generateConstructor = function generateConstructor(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen(["p"], mtype.name);
    // explicitly initialize mutable object/array fields so that these aren't just inherited from the prototype
    for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
        if ((field = mtype._fieldsArray[i]).map) gen
            ("this%s={}", util.safeProp(field.name));
        else if (field.repeated) gen
            ("this%s=[]", util.safeProp(field.name));
    return gen
    ("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)") // omit undefined or null
        ("this[ks[i]]=p[ks[i]]");
    /* eslint-enable no-unexpected-multiline */
};

function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._oneofsArray = null;
    delete type.encode;
    delete type.decode;
    delete type.verify;
    return type;
}

/**
 * Message type descriptor.
 * @interface IType
 * @extends INamespace
 * @property {Object.<string,IOneOf>} [oneofs] Oneof descriptors
 * @property {Object.<string,IField>} fields Field descriptors
 * @property {number[][]} [extensions] Extension ranges
 * @property {number[][]} [reserved] Reserved ranges
 * @property {boolean} [group=false] Whether a legacy group or not
 */

/**
 * Creates a message type from a message type descriptor.
 * @param {string} name Message name
 * @param {IType} json Message type descriptor
 * @returns {Type} Created message type
 */
Type.fromJSON = function fromJSON(name, json) {
    var type = new Type(name, json.options);
    type.extensions = json.extensions;
    type.reserved = json.reserved;
    var names = Object.keys(json.fields),
        i = 0;
    for (; i < names.length; ++i)
        type.add(
            ( typeof json.fields[names[i]].keyType !== "undefined"
            ? MapField.fromJSON
            : Field.fromJSON )(names[i], json.fields[names[i]])
        );
    if (json.oneofs)
        for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
            type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
    if (json.nested)
        for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
            var nested = json.nested[names[i]];
            type.add( // most to least likely
                ( nested.id !== undefined
                ? Field.fromJSON
                : nested.fields !== undefined
                ? Type.fromJSON
                : nested.values !== undefined
                ? Enum.fromJSON
                : nested.methods !== undefined
                ? Service.fromJSON
                : Namespace.fromJSON )(names[i], nested)
            );
        }
    if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
    if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
    if (json.group)
        type.group = true;
    if (json.comment)
        type.comment = json.comment;
    return type;
};

/**
 * Converts this message type to a message type descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IType} Message type descriptor
 */
Type.prototype.toJSON = function toJSON(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options"    , inherited && inherited.options || undefined,
        "oneofs"     , Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
        "fields"     , Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) { return !obj.declaringField; }), toJSONOptions) || {},
        "extensions" , this.extensions && this.extensions.length ? this.extensions : undefined,
        "reserved"   , this.reserved && this.reserved.length ? this.reserved : undefined,
        "group"      , this.group || undefined,
        "nested"     , inherited && inherited.nested || undefined,
        "comment"    , keepComments ? this.comment : undefined
    ]);
};

/**
 * @override
 */
Type.prototype.resolveAll = function resolveAll() {
    var fields = this.fieldsArray, i = 0;
    while (i < fields.length)
        fields[i++].resolve();
    var oneofs = this.oneofsArray; i = 0;
    while (i < oneofs.length)
        oneofs[i++].resolve();
    return Namespace.prototype.resolveAll.call(this);
};

/**
 * @override
 */
Type.prototype.get = function get(name) {
    return this.fields[name]
        || this.oneofs && this.oneofs[name]
        || this.nested && this.nested[name]
        || null;
};

/**
 * Adds a nested object to this type.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
 */
Type.prototype.add = function add(object) {

    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);

    if (object instanceof Field && object.extend === undefined) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.

        // avoids calling the getter if not absolutely necessary because it's called quite frequently
        if (this._fieldsById ? /* istanbul ignore next */ this._fieldsById[object.id] : this.fieldsById[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id))
            throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name))
            throw Error("name '" + object.name + "' is reserved in " + this);

        if (object.parent)
            object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {
        if (!this.oneofs)
            this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};

/**
 * Removes a nested object from this type.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this type
 */
Type.prototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.

        /* istanbul ignore if */
        if (!this.fields || this.fields[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {

        /* istanbul ignore if */
        if (!this.oneofs || this.oneofs[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};

/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
};

/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<{}>} Message instance
 */
Type.prototype.create = function create(properties) {
    return new this.ctor(properties);
};

/**
 * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
 * @returns {Type} `this`
 */
Type.prototype.setup = function setup() {
    // Sets up everything at once so that the prototype chain does not have to be re-evaluated
    // multiple times (V8, soft-deopt prototype-check).

    var fullName = this.fullName,
        types    = [];
    for (var i = 0; i < /* initializes */ this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);

    // Replace setup methods with type-specific generated functions
    this.encode = encoder(this)({
        Writer : Writer,
        types  : types,
        util   : util
    });
    this.decode = decoder(this)({
        Reader : Reader,
        types  : types,
        util   : util
    });
    this.verify = verifier(this)({
        types : types,
        util  : util
    });
    this.fromObject = converter.fromObject(this)({
        types : types,
        util  : util
    });
    this.toObject = converter.toObject(this)({
        types : types,
        util  : util
    });

    // Inject custom wrappers for common types
    var wrapper = wrappers[fullName];
    if (wrapper) {
        var originalThis = Object.create(this);
        // if (wrapper.fromObject) {
            originalThis.fromObject = this.fromObject;
            this.fromObject = wrapper.fromObject.bind(originalThis);
        // }
        // if (wrapper.toObject) {
            originalThis.toObject = this.toObject;
            this.toObject = wrapper.toObject.bind(originalThis);
        // }
    }

    return this;
};

/**
 * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encode = function encode_setup(message, writer) {
    return this.setup().encode(message, writer); // overrides this method
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
};

/**
 * Decodes a message of this type.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError<{}>} If required fields are missing
 */
Type.prototype.decode = function decode_setup(reader, length) {
    return this.setup().decode(reader, length); // overrides this method
};

/**
 * Decodes a message of this type preceeded by its byte length as a varint.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError} If required fields are missing
 */
Type.prototype.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof Reader))
        reader = Reader.create(reader);
    return this.decode(reader, reader.uint32());
};

/**
 * Verifies that field values are valid and that required fields are present.
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {null|string} `null` if valid, otherwise the reason why it is not
 */
Type.prototype.verify = function verify_setup(message) {
    return this.setup().verify(message); // overrides this method
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object to convert
 * @returns {Message<{}>} Message instance
 */
Type.prototype.fromObject = function fromObject(object) {
    return this.setup().fromObject(object);
};

/**
 * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
 * @interface IConversionOptions
 * @property {Function} [longs] Long conversion type.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
 * @property {Function} [enums] Enum value conversion type.
 * Only valid value is `String` (the global type).
 * Defaults to copy the present value, which is the numeric id.
 * @property {Function} [bytes] Bytes value conversion type.
 * Valid values are `Array` and (a base64 encoded) `String` (the global types).
 * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
 * @property {boolean} [defaults=false] Also sets default values on the resulting object
 * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
 * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
 * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
 * @property {boolean} [json=false] Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings
 */

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 */
Type.prototype.toObject = function toObject(message, options) {
    return this.setup().toObject(message, options);
};

/**
 * Decorator function as returned by {@link Type.d} (TypeScript).
 * @typedef TypeDecorator
 * @type {function}
 * @param {Constructor<T>} target Target constructor
 * @returns {undefined}
 * @template T extends Message<T>
 */

/**
 * Type decorator (TypeScript).
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {TypeDecorator<T>} Decorator function
 * @template T extends Message<T>
 */
Type.d = function decorateType(typeName) {
    return function typeDecorator(target) {
        util.decorateType(target, typeName);
    };
};


/***/ }),

/***/ "./node_modules/protobufjs/src/types.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/types.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Common type constants.
 * @namespace
 */
var types = exports;

var util = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

var s = [
    "double",   // 0
    "float",    // 1
    "int32",    // 2
    "uint32",   // 3
    "sint32",   // 4
    "fixed32",  // 5
    "sfixed32", // 6
    "int64",    // 7
    "uint64",   // 8
    "sint64",   // 9
    "fixed64",  // 10
    "sfixed64", // 11
    "bool",     // 12
    "string",   // 13
    "bytes"     // 14
];

function bake(values, offset) {
    var i = 0, o = {};
    offset |= 0;
    while (i < values.length) o[s[i + offset]] = values[i++];
    return o;
}

/**
 * Basic type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 * @property {number} bytes=2 Ldelim wire type
 */
types.basic = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2,
    /* bytes    */ 2
]);

/**
 * Basic type defaults.
 * @type {Object.<string,*>}
 * @const
 * @property {number} double=0 Double default
 * @property {number} float=0 Float default
 * @property {number} int32=0 Int32 default
 * @property {number} uint32=0 Uint32 default
 * @property {number} sint32=0 Sint32 default
 * @property {number} fixed32=0 Fixed32 default
 * @property {number} sfixed32=0 Sfixed32 default
 * @property {number} int64=0 Int64 default
 * @property {number} uint64=0 Uint64 default
 * @property {number} sint64=0 Sint32 default
 * @property {number} fixed64=0 Fixed64 default
 * @property {number} sfixed64=0 Sfixed64 default
 * @property {boolean} bool=false Bool default
 * @property {string} string="" String default
 * @property {Array.<number>} bytes=Array(0) Bytes default
 * @property {null} message=null Message default
 */
types.defaults = bake([
    /* double   */ 0,
    /* float    */ 0,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 0,
    /* sfixed32 */ 0,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 0,
    /* sfixed64 */ 0,
    /* bool     */ false,
    /* string   */ "",
    /* bytes    */ util.emptyArray,
    /* message  */ null
]);

/**
 * Basic long type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 */
types.long = bake([
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1
], 7);

/**
 * Allowed types for map keys with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 */
types.mapKey = bake([
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2
], 2);

/**
 * Allowed types for packed repeated fields with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 */
types.packed = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0
]);


/***/ }),

/***/ "./node_modules/protobufjs/src/util.js":
/*!*********************************************!*\
  !*** ./node_modules/protobufjs/src/util.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Various utility functions.
 * @namespace
 */
var util = module.exports = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var roots = __webpack_require__(/*! ./roots */ "./node_modules/protobufjs/src/roots.js");

var Type, // cyclic
    Enum;

util.codegen = __webpack_require__(/*! @protobufjs/codegen */ "./node_modules/@protobufjs/codegen/index.js");
util.fetch   = __webpack_require__(/*! @protobufjs/fetch */ "./node_modules/@protobufjs/fetch/index.js");
util.path    = __webpack_require__(/*! @protobufjs/path */ "./node_modules/@protobufjs/path/index.js");

/**
 * Node's fs module if available.
 * @type {Object.<string,*>}
 */
util.fs = util.inquire("fs");

/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */
util.toArray = function toArray(object) {
    if (object) {
        var keys  = Object.keys(object),
            array = new Array(keys.length),
            index = 0;
        while (index < keys.length)
            array[index] = object[keys[index++]];
        return array;
    }
    return [];
};

/**
 * Converts an array of keys immediately followed by their respective value to an object, omitting undefined values.
 * @param {Array.<*>} array Array to convert
 * @returns {Object.<string,*>} Converted object
 */
util.toObject = function toObject(array) {
    var object = {},
        index  = 0;
    while (index < array.length) {
        var key = array[index++],
            val = array[index++];
        if (val !== undefined)
            object[key] = val;
    }
    return object;
};

var safePropBackslashRe = /\\/g,
    safePropQuoteRe     = /"/g;

/**
 * Tests whether the specified name is a reserved word in JS.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
util.isReserved = function isReserved(name) {
    return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
};

/**
 * Returns a safe property accessor for the specified property name.
 * @param {string} prop Property name
 * @returns {string} Safe accessor
 */
util.safeProp = function safeProp(prop) {
    if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop))
        return "[\"" + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, "\\\"") + "\"]";
    return "." + prop;
};

/**
 * Converts the first character of a string to upper case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.ucFirst = function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
};

var camelCaseRe = /_([a-z])/g;

/**
 * Converts a string to camel case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.camelCase = function camelCase(str) {
    return str.substring(0, 1)
         + str.substring(1)
               .replace(camelCaseRe, function($0, $1) { return $1.toUpperCase(); });
};

/**
 * Compares reflected fields by id.
 * @param {Field} a First field
 * @param {Field} b Second field
 * @returns {number} Comparison value
 */
util.compareFieldsById = function compareFieldsById(a, b) {
    return a.id - b.id;
};

/**
 * Decorator helper for types (TypeScript).
 * @param {Constructor<T>} ctor Constructor function
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {Type} Reflected type
 * @template T extends Message<T>
 * @property {Root} root Decorators root
 */
util.decorateType = function decorateType(ctor, typeName) {

    /* istanbul ignore if */
    if (ctor.$type) {
        if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
        }
        return ctor.$type;
    }

    /* istanbul ignore next */
    if (!Type)
        Type = __webpack_require__(/*! ./type */ "./node_modules/protobufjs/src/type.js");

    var type = new Type(typeName || ctor.name);
    util.decorateRoot.add(type);
    type.ctor = ctor; // sets up .encode, .decode etc.
    Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
    Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
    return type;
};

var decorateEnumIndex = 0;

/**
 * Decorator helper for enums (TypeScript).
 * @param {Object} object Enum object
 * @returns {Enum} Reflected enum
 */
util.decorateEnum = function decorateEnum(object) {

    /* istanbul ignore if */
    if (object.$type)
        return object.$type;

    /* istanbul ignore next */
    if (!Enum)
        Enum = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js");

    var enm = new Enum("Enum" + decorateEnumIndex++, object);
    util.decorateRoot.add(enm);
    Object.defineProperty(object, "$type", { value: enm, enumerable: false });
    return enm;
};

/**
 * Decorator root (TypeScript).
 * @name util.decorateRoot
 * @type {Root}
 * @readonly
 */
Object.defineProperty(util, "decorateRoot", {
    get: function() {
        return roots["decorated"] || (roots["decorated"] = new (__webpack_require__(/*! ./root */ "./node_modules/protobufjs/src/root.js"))());
    }
});


/***/ }),

/***/ "./node_modules/protobufjs/src/util/longbits.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/util/longbits.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/util/minimal.js":
/*!*****************************************************!*\
  !*** ./node_modules/protobufjs/src/util/minimal.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(/*! @protobufjs/aspromise */ "./node_modules/@protobufjs/aspromise/index.js");

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(/*! @protobufjs/base64 */ "./node_modules/@protobufjs/base64/index.js");

// base class of rpc.Service
util.EventEmitter = __webpack_require__(/*! @protobufjs/eventemitter */ "./node_modules/@protobufjs/eventemitter/index.js");

// float handling accross browsers
util.float = __webpack_require__(/*! @protobufjs/float */ "./node_modules/@protobufjs/float/index.js");

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(/*! @protobufjs/inquire */ "./node_modules/@protobufjs/inquire/index.js");

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(/*! @protobufjs/utf8 */ "./node_modules/@protobufjs/utf8/index.js");

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(/*! @protobufjs/pool */ "./node_modules/@protobufjs/pool/index.js");

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(/*! ./longbits */ "./node_modules/protobufjs/src/util/longbits.js");

// global object reference
util.global = typeof window !== "undefined" && window
           || typeof global !== "undefined" && global
           || typeof self   !== "undefined" && self
           || this; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 * @const
 */
util.isNode = Boolean(util.global.process && util.global.process.versions && util.global.process.versions.node);

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: (new Error()).stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/protobufjs/src/verifier.js":
/*!*************************************************!*\
  !*** ./node_modules/protobufjs/src/verifier.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = verifier;

var Enum      = __webpack_require__(/*! ./enum */ "./node_modules/protobufjs/src/enum.js"),
    util      = __webpack_require__(/*! ./util */ "./node_modules/protobufjs/src/util.js");

function invalid(field, expected) {
    return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:"+field.keyType+"}" : "") + " expected";
}

/**
 * Generates a partial value verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyValue(gen, field, fieldIndex, ref) {
    /* eslint-disable no-unexpected-multiline */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(%s){", ref)
                ("default:")
                    ("return%j", invalid(field, "enum value"));
            for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) gen
                ("case %i:", field.resolvedType.values[keys[j]]);
            gen
                    ("break")
            ("}");
        } else {
            gen
            ("{")
                ("var e=types[%i].verify(%s);", fieldIndex, ref)
                ("if(e)")
                    ("return%j+e", field.name + ".")
            ("}");
        }
    } else {
        switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32": gen
                ("if(!util.isInteger(%s))", ref)
                    ("return%j", invalid(field, "integer"));
                break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)
                    ("return%j", invalid(field, "integer|Long"));
                break;
            case "float":
            case "double": gen
                ("if(typeof %s!==\"number\")", ref)
                    ("return%j", invalid(field, "number"));
                break;
            case "bool": gen
                ("if(typeof %s!==\"boolean\")", ref)
                    ("return%j", invalid(field, "boolean"));
                break;
            case "string": gen
                ("if(!util.isString(%s))", ref)
                    ("return%j", invalid(field, "string"));
                break;
            case "bytes": gen
                ("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)
                    ("return%j", invalid(field, "buffer"));
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a partial key verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyKey(gen, field, ref) {
    /* eslint-disable no-unexpected-multiline */
    switch (field.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32": gen
            ("if(!util.key32Re.test(%s))", ref)
                ("return%j", invalid(field, "integer key"));
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64": gen
            ("if(!util.key64Re.test(%s))", ref) // see comment above: x is ok, d is not
                ("return%j", invalid(field, "integer|Long key"));
            break;
        case "bool": gen
            ("if(!util.key2Re.test(%s))", ref)
                ("return%j", invalid(field, "boolean key"));
            break;
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a verifier specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function verifier(mtype) {
    /* eslint-disable no-unexpected-multiline */

    var gen = util.codegen(["m"], mtype.name + "$verify")
    ("if(typeof m!==\"object\"||m===null)")
        ("return%j", "object expected");
    var oneofs = mtype.oneofsArray,
        seenFirstField = {};
    if (oneofs.length) gen
    ("var p={}");

    for (var i = 0; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            ref   = "m" + util.safeProp(field.name);

        if (field.optional) gen
        ("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name); // !== undefined && !== null

        // map fields
        if (field.map) { gen
            ("if(!util.isObject(%s))", ref)
                ("return%j", invalid(field, "object"))
            ("var k=Object.keys(%s)", ref)
            ("for(var i=0;i<k.length;++i){");
                genVerifyKey(gen, field, "k[i]");
                genVerifyValue(gen, field, i, ref + "[k[i]]")
            ("}");

        // repeated fields
        } else if (field.repeated) { gen
            ("if(!Array.isArray(%s))", ref)
                ("return%j", invalid(field, "array"))
            ("for(var i=0;i<%s.length;++i){", ref);
                genVerifyValue(gen, field, i, ref + "[i]")
            ("}");

        // required or present fields
        } else {
            if (field.partOf) {
                var oneofProp = util.safeProp(field.partOf.name);
                if (seenFirstField[field.partOf.name] === 1) gen
            ("if(p%s===1)", oneofProp)
                ("return%j", field.partOf.name + ": multiple values");
                seenFirstField[field.partOf.name] = 1;
                gen
            ("p%s=1", oneofProp);
            }
            genVerifyValue(gen, field, i, ref);
        }
        if (field.optional) gen
        ("}");
    }
    return gen
    ("return null");
    /* eslint-enable no-unexpected-multiline */
}

/***/ }),

/***/ "./node_modules/protobufjs/src/wrappers.js":
/*!*************************************************!*\
  !*** ./node_modules/protobufjs/src/wrappers.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Wrappers for common types.
 * @type {Object.<string,IWrapper>}
 * @const
 */
var wrappers = exports;

var Message = __webpack_require__(/*! ./message */ "./node_modules/protobufjs/src/message.js");

/**
 * From object converter part of an {@link IWrapper}.
 * @typedef WrapperFromObjectConverter
 * @type {function}
 * @param {Object.<string,*>} object Plain object
 * @returns {Message<{}>} Message instance
 * @this Type
 */

/**
 * To object converter part of an {@link IWrapper}.
 * @typedef WrapperToObjectConverter
 * @type {function}
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @this Type
 */

/**
 * Common type wrapper part of {@link wrappers}.
 * @interface IWrapper
 * @property {WrapperFromObjectConverter} [fromObject] From object converter
 * @property {WrapperToObjectConverter} [toObject] To object converter
 */

// Custom wrapper for Any
wrappers[".google.protobuf.Any"] = {

    fromObject: function(object) {

        // unwrap value type if mapped
        if (object && object["@type"]) {
            var type = this.lookup(object["@type"]);
            /* istanbul ignore else */
            if (type) {
                // type_url does not accept leading "."
                var type_url = object["@type"].charAt(0) === "." ?
                    object["@type"].substr(1) : object["@type"];
                // type_url prefix is optional, but path seperator is required
                return this.create({
                    type_url: "/" + type_url,
                    value: type.encode(type.fromObject(object)).finish()
                });
            }
        }

        return this.fromObject(object);
    },

    toObject: function(message, options) {

        // decode value if requested and unmapped
        if (options && options.json && message.type_url && message.value) {
            // Only use fully qualified type name after the last '/'
            var name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            /* istanbul ignore else */
            if (type)
                message = type.decode(message.value);
        }

        // wrap value if unmapped
        if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            object["@type"] = message.$type.fullName;
            return object;
        }

        return this.toObject(message, options);
    }
};


/***/ }),

/***/ "./node_modules/protobufjs/src/writer.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/writer.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = util.Buffer
    ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
            return new BufferWriter();
        })();
    }
    /* istanbul ignore next */
    : function create_array() {
        return new Writer();
    };

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/writer_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/writer_buffer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var Buffer = util.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
};

var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set"
    ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                           // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
    };

/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else
        buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */


/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/ap/ap.ts":
/*!**********************!*\
  !*** ./src/ap/ap.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const versionInfo_1 = __webpack_require__(/*! ../versionInfo */ "./src/versionInfo.ts");
const common_1 = __webpack_require__(/*! ../common */ "./src/common.ts");
const ProtoLink_1 = __webpack_require__(/*! ../utils/ProtoLink */ "./src/utils/ProtoLink.ts");
const logger_1 = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
const PSvcRouteReq_1 = __webpack_require__(/*! ../protocol/PSvcRouteReq */ "./src/protocol/PSvcRouteReq.ts");
const PSvcLoginReq_1 = __webpack_require__(/*! ../protocol/PSvcLoginReq */ "./src/protocol/PSvcLoginReq.ts");
const uri_1 = __webpack_require__(/*! ../protobase/uri */ "./src/protobase/uri.ts");
const ProtoUnmarshall_1 = __webpack_require__(/*! ../protobase/ProtoUnmarshall */ "./src/protobase/ProtoUnmarshall.ts");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
const PSvcPong_1 = __webpack_require__(/*! ../protocol/PSvcPong */ "./src/protocol/PSvcPong.ts");
const PSvcPing_1 = __webpack_require__(/*! ../protocol/PSvcPing */ "./src/protocol/PSvcPing.ts");
const PSvcLogoutReq_1 = __webpack_require__(/*! ../protocol/PSvcLogoutReq */ "./src/protocol/PSvcLogoutReq.ts");
const linkstate_1 = __webpack_require__(/*! ./linkstate */ "./src/ap/linkstate.ts");
const timeUtil_1 = __webpack_require__(/*! ../utils/timeUtil */ "./src/utils/timeUtil.ts");
const hiidoUtil_1 = __webpack_require__(/*! ../utils/hiidoUtil */ "./src/utils/hiidoUtil.ts");
const appidconst_1 = __webpack_require__(/*! ../appidconst */ "./src/appidconst.ts");
const metricsUtil_1 = __webpack_require__(/*! ../utils/metricsUtil */ "./src/utils/metricsUtil.ts");
const PSvcUnicast_1 = __webpack_require__(/*! ../protocol/PSvcUnicast */ "./src/protocol/PSvcUnicast.ts");
const PSvcUnicastRes_1 = __webpack_require__(/*! ../protocol/PSvcUnicastRes */ "./src/protocol/PSvcUnicastRes.ts");
const PSvcBroadcast_1 = __webpack_require__(/*! ../protocol/PSvcBroadcast */ "./src/protocol/PSvcBroadcast.ts");
const PAPForceOut_1 = __webpack_require__(/*! ../protocol/PAPForceOut */ "./src/protocol/PAPForceOut.ts");
const PCS_ServiceBroadCastV2_1 = __webpack_require__(/*! ../signal_protocol/PCS_ServiceBroadCastV2 */ "./src/signal_protocol/PCS_ServiceBroadCastV2.ts");
const PSvcRouteRes_1 = __webpack_require__(/*! ../protocol/PSvcRouteRes */ "./src/protocol/PSvcRouteRes.ts");
;
;
class Ap {
    constructor() {
        this.hummerHandler = null;
        this.svcHandler = null;
        this.latenceStat = { min: 0, max: 0, avg: 0, count: 0, sum: 0, timeout: 0 };
        this.handleDic = new Map();
        this.handleBcDic = new Map(); // 广播handler字典
        this.wsAddr = common_1.WSHOST;
        this.wsState = linkstate_1.default.INIT; //init-connecting-connected-closing-closed
        this.logined = false;
        this.link = null;
        this.lastTimerCheck = timeUtil_1.default.now();
        this.lastRecvPong = timeUtil_1.default.now();
        //this.latenceStat = {min:0, max:0, avg:0, count:0, sum:0, timeout:0};
        this.sendBuf = []; //未登录成功前发送的消息，
        this.registerHandle();
    }
    setHummerHandler(hummerHandler) {
        this.hummerHandler = hummerHandler;
        this.h5_g_globals = this.hummerHandler.h5_g_globals;
    }
    setSvcHandler(svcHandler) {
        this.svcHandler = svcHandler;
    }
    registerHandle() {
        //注册handler
        this.addHandle(uri_1.default.PSvcRouteResURI, this.onPSvcRouteRes.bind(this));
        this.addHandle(uri_1.default.PSvcUnicastURI, this.onPSvcUnicast.bind(this));
        this.addHandle(uri_1.default.PSvcBroadcastURI, this.onPSvcBroadcast.bind(this));
        this.addHandle(uri_1.default.PCS_ServiceBroadCastV2URI, this.onPSvcBroadcastV2.bind(this)); // channel新增
        this.addHandle(uri_1.default.PAPForceOutURI, this.onAPForceOut.bind(this));
    }
    addHandle(uri, handleFunc) {
        this.handleDic.set(uri, handleFunc);
    }
    //定时器驱动
    onCheckTimer(now, checkTimes) {
        if (this.wsState == linkstate_1.default.CLOSED || !this.link) {
            logger_1.default.log("Ap.onCheckTimer check ap not ready. re-connect. wsState=" + this.wsState);
            this.connect();
        }
        else if (this.wsState == linkstate_1.default.CONNECTED) {
            if (now - this.lastTimerCheck >= 5000) {
                this.lastTimerCheck = now;
                if (this.h5_g_globals.loginedUDB) {
                    if (this.logined) {
                        this.pingAp().catch(reason => {
                            console.error(reason);
                        });
                    }
                    else {
                        this.loginAp();
                    }
                }
                else {
                    //this.svcHandler && this.svcHandler.loginUDB(); //TODO 不要频繁重试
                }
            }
        }
        //检查实名用户的uid是否发生变化（小程序环境不检测）
        if (!this.h5_g_globals.isMiniProgram && !this.isGuestLogin()) {
            //let ckUid = parseInt(Utils.getCookie("hummer_uid", this.h5_g_globals.isMiniProgram));
            let ckUid = utils_1.default.getCookie("hummer_uid", this.h5_g_globals.isMiniProgram);
            let ckToken = utils_1.default.getCookie("hummer_token", this.h5_g_globals.isMiniProgram);
            //登录身份已变更
            if (ckUid != this.h5_g_globals.uid && ckToken) {
                logger_1.default.error("Ap.onCheckTimer login id changed! please refresh. cookie:" + ckUid + "pre-uid:" + this.h5_g_globals.uid + " cookie-token:" + ckToken);
                this.stop(this.h5_g_globals.uid, "login id changed!");
                this.svcHandler && this.svcHandler.invokeCallback({
                    type: "udb",
                    code: -1,
                    msg: "login.id.changed@sdk"
                });
            }
        }
        if (checkTimes % 60 == 0) {
            this.reportRtt();
        }
    }
    /**
     * 停止频道服务
     * @param uid 用户id
     * @param reason 原因
     */
    stop(uid, reason) {
        logger_1.default.log("Ap.stop uid:" + uid + " reason:" + reason);
        this.h5_g_globals.logout();
        this.close();
        // this.stopTimer();
    }
    //清空缓存协议报文的队列
    clearSendBuf() {
        if (this.sendBuf.length > 500) {
            this.sendBuf = [];
        }
    }
    //发送缓存的协议报文
    flushBuf() {
        let len = this.sendBuf.length;
        if (0 != len) {
            logger_1.default.log("Ap.flushBuf len=" + len);
            for (let i = 0; i < len; ++i) {
                let obj = this.sendBuf[i];
                if (obj.origin) {
                    this.send(obj.data);
                }
                else {
                    let tmp = this.wrapApRouter(obj);
                    this.send(tmp.buf);
                }
            }
        }
        this.sendBuf = [];
    }
    //登录ap success
    onLoginAp(obj) {
        this.loginStatus = obj.code;
        //console.log('Ap.onLoginAp: code=', obj.code);
        if (obj.code == common_1.LoginStatus.Logined) {
            this.logined = true;
        }
        this.svcHandler && this.svcHandler.onLoginAp(obj);
    }
    appidReady() {
        return (this.link && (this.wsState == linkstate_1.default.CONNECTED) && this.logined);
    }
    resetWsState() {
        logger_1.default.log("Ap.resetWsState");
        this.wsState = linkstate_1.default.CLOSED;
        if (this.link) {
            this.link.reset();
        }
        this.logined = false;
        //TODO: tanweiqiang 是否可以做到断连接不需要重新登录UDB？
        //this.h5_g_globals.loginedUDB = false; //因为otp一次过期
        this.h5_g_globals.loginedUDB = true; // todo js-sdk没有udb！！！
        //重连也尽量不丢消息
        //但如果用户尝试了两次消费？会不会造成问题？如果是这种情况，业务应该会有设计流水号什么的，不会导致重复消费？这貌似对于业务是必要的设计？
        this.clearSendBuf();
    }
    onopen() {
        logger_1.default.log("Ap.onopen");
        if (this.h5_g_globals.bLostConnection) { //之前掉过线
            this.h5_g_globals.bLostConnection = false;
        }
        this.wsState = linkstate_1.default.CONNECTED;
        this.hummerHandler && this.hummerHandler.onApOpen();
        //if (this.h5_g_globals.loginedUDB) {
        this.loginAp();
        //}
    }
    onclose() {
        logger_1.default.log("Ap.onclose");
        if (this.wsState == linkstate_1.default.CONNECTED && !this.h5_g_globals.bLostConnection) {
            this.h5_g_globals.bLostConnection = true;
        }
        this.hummerHandler && this.hummerHandler.onApClose();
        this.resetWsState();
    }
    onerror(err) {
        //logger.log("Ap.onerror err=" + JSON.stringify(err));
        this.hummerHandler && this.hummerHandler.onApError(err);
        this.resetWsState();
    }
    onData(uri, view) {
        let ush = new ProtoUnmarshall_1.default(view);
        if (uri == uri_1.default.PSvcPongURI) { //收到ping回复
            let pong = new PSvcPong_1.default();
            pong.unmarshall(ush);
            // logger.log("Ap.onData got PSvcPongURI:" + JSON.stringify(pong));
            let seqCtx = this.h5_g_globals.seqContext[pong.context];
            if (seqCtx) {
                delete this.h5_g_globals.seqContext[pong.context];
                seqCtx.resolve(pong);
            }
            this.lastRecvPong = timeUtil_1.default.now(); //TODO 这个参数似乎无卵用
        }
        else {
            this.onProto(uri, ush);
        }
    }
    onProto(uri, unmarshall) {
        let handler = this.handleDic.get(uri);
        if (typeof (handler) !== 'undefined') {
            handler(unmarshall);
        }
        else {
            logger_1.default.log('Ap.onProto UNKNOWN uri=' + ((uri >> 8) & utils_1.default.getUintMax()) + '/' + (uri & 0xFF));
        }
    }
    send(arraybuffer) {
        if (this.link && this.wsState == linkstate_1.default.CONNECTED) {
            this.link.send(arraybuffer);
        }
        else {
            logger_1.default.warn("Ap.send failed");
        }
    }
    wrapApRouter(obj) {
        let appid = obj.appid;
        let svcName = obj.svcName;
        let fnName = obj.fnName;
        let routeArgs = obj.routeArgs;
        let clientHeaders = obj.clientHeaders;
        let protoType = obj.protoType;
        let router = new PSvcRouteReq_1.default();
        if (obj.preAllocSeq) {
            router.context = obj.preAllocSeq;
        }
        else {
            router.context = this.h5_g_globals.getSeqId().toString();
        }
        router.uid = (this.h5_g_globals.loginedUDB ? this.h5_g_globals.uid : '0');
        router.appid = appid;
        router.instId = this.h5_g_globals.instId;
        router.svcName = svcName;
        //请求的traceId pc/web/android/ios_instId_seqId
        router.traceId = "web_" + router.instId.toString() + "_" + router.context;
        if (fnName) {
            router.fnName = fnName;
        }
        if (protoType) {
            router.protoType = protoType;
        }
        router.data = obj.data;
        router.dataCRC = 0;
        if (routeArgs) {
            router.routeArgs = routeArgs;
        }
        //处理header
        if (clientHeaders) {
            if (!utils_1.default.isMap(clientHeaders)) {
                logger_1.default.error("Ap.wrapApRouter clientHeaders should be a map!!!");
                return;
            }
            for (let [k, v] of this.h5_g_globals.defaultHeaderMap) {
                if (clientHeaders.has(k)) { //有重复的以业务请求中的为主
                    continue;
                }
                else {
                    clientHeaders.set(k, v); //追加默认的
                }
            }
            router.clientHeaders = clientHeaders;
        }
        else {
            router.clientHeaders = this.h5_g_globals.defaultHeaderMap;
        }
        let buffer = router.marshall();
        logger_1.default.log("Ap.wrapApRouter send service route request:" + router.toString());
        return { buf: buffer, seqId: router.context };
    }
    /**
     * 实例化sendData 并且预处理
     * @param appid
     * @param svcName
     * @param fnName
     * @param {*} data
     */
    sendData(appid, svcName, fnName, data) {
        return new Promise((resolve, reject) => {
            console.log('====== send ======', svcName, fnName);
            const id = Date.now();
            console.time(`sendData_${id}`);
            const obj = {
                appid: appid,
                svcName: svcName,
                fnName: fnName,
                data: data,
                routeArgs: new Map(),
                clientHeaders: new Map(),
                protoType: 'yyp' // 选填
            };
            this.sendAppData(obj).then((res) => {
                console.log('sendAppData cb', svcName, fnName);
                console.timeEnd(`sendData_${id}`);
                if (!res) {
                    return reject(res);
                }
                resolve(res);
            }).catch(e => {
                reject(e);
            });
        });
    }
    //TODO 以下两个方法有什么不同哦，命名看得人蛋疼
    sendAppData(obj) {
        return this.sendApRouter(obj);
    }
    sendApRouter(obj) {
        let seqId = "";
        let promise = new Promise((resolve, reject) => {
            if (this.appidReady()) {
                let tmp = this.wrapApRouter(obj);
                seqId = tmp.seqId;
                //logger.log("appid ready: seqId:" + seqId);
                this.send(tmp.buf);
            }
            else {
                let tmp = Object.assign({}, obj);
                tmp.resolve = resolve;
                tmp.reject = reject;
                tmp.preAllocSeq = this.h5_g_globals.getSeqId().toString();
                tmp.fnName = obj.fnName; //海外游戏直播业务保存uri，电狐业务保存fnName，dw_yangqiao
                tmp.uri = obj.uri;
                seqId = tmp.preAllocSeq;
                //logger.log("appid not ready: seqId:" + seqId);
                this.sendBuf.push(tmp);
            }
            this.h5_g_globals.seqContext[seqId] = {
                resolve: resolve,
                reject: reject,
                appid: obj.appid,
                svcName: obj.svcName,
                fnName: obj.fnName,
                protoType: obj.protoType,
                uri: (!!obj.uri ? obj.uri : 0),
                routeReqStartTs: timeUtil_1.default.now(),
                //请求的traceId pc/web/android/ios_instId_seqId
                traceId: "web_" + this.h5_g_globals.instId.toString() + "_" + seqId
            };
        });
        let timeout = utils_1.default.DelayPromise(11000).then(() => {
            const h5_g_globals = this.h5_g_globals;
            let seqCtx = h5_g_globals.seqContext[seqId];
            if (seqCtx) {
                let errMsg = "appid:" + seqCtx.appid + " svcName:" + seqCtx.svcName + " fnName:" + seqCtx.fnName + " traceId:" + seqCtx.traceId;
                logger_1.default.log("Ap.sendApRouter seqId:" + seqId + " time out." + errMsg);
                //==============================hiido统计==============================
                let statMap = new Map();
                statMap.set('appid', h5_g_globals.appid);
                statMap.set('uid', h5_g_globals.uid);
                statMap.set('serviceName', seqCtx.svcName);
                statMap.set('functionName', seqCtx.fnName);
                statMap.set('traceId', seqCtx.traceId);
                // statMap.set('resCode', pkg.resCode);
                //如果收到了rpc的res, sdkResCode默认填1；否则sdk自己填入
                statMap.set('cost', 11000); //默认11s
                statMap.set('uri', seqCtx.uri); //超时用req uri; 正常情况下用res uri
                statMap.set('sdkResCode', -3); //-3标识超时
                let tempUrl = hiidoUtil_1.default.genUrl(statMap);
                hiidoUtil_1.default.sendUrl(tempUrl, h5_g_globals.isMiniProgram);
                //==============================hiido统计==============================
                //=============================Metrics统计=============================
                metricsUtil_1.default.report(h5_g_globals.scode, seqCtx.svcName, seqCtx.functionName, seqCtx.protoType, 11000, -3);
                //=============================Metrics统计=============================
                //由于service通道不可用导致发送公屏协议超时失败，此时业务会提示[重新发送]，需要用户手动点击重发，这是IM常用的流程
                //此时如果不把公屏协议从缓存队列里删除，当service通道恢复的时候会flush buffer，相当于自动重发公屏协议，不合常规
                //所以有下面的逻辑，把公屏协议从缓存队列里删除 dw_yangqiao
                if (this.sendBuf) {
                    let size = this.sendBuf.length;
                    //电狐业务比较特殊，公屏等服务自己做的，只是用信令sdk做转发，由于sdk不知其协议uri（或者业务没填），所以sdk只保存了其fnName
                    if (h5_g_globals.appid == appidconst_1.default.MOSCHAT_PUB || h5_g_globals.appid == appidconst_1.default.MOSCHAT_DEV) {
                        for (let i = size - 1; i >= 0; i--) { //从数组末尾开始删除效率更高
                            let fnName = this.sendBuf[i].fnName;
                            if (fnName == "sendChatMessage" || fnName == "createChannel") {
                                logger_1.default.warn('Ap.sendApRouter remove cached data, preAllocSeq=' + this.sendBuf[i].preAllocSeq + ' fnName=' + fnName);
                                this.sendBuf.splice(i, 1);
                            }
                        }
                    }
                    else { //其它业务如海外游戏直播
                        for (let i = size - 1; i >= 0; i--) { //从数组末尾开始删除效率更高
                            let uri = this.sendBuf[i].uri;
                            if (uri == uri_1.default.PTextChatReqURI) {
                                logger_1.default.warn('Ap.sendApRouter remove cached data, preAllocSeq=' + this.sendBuf[i].preAllocSeq + ' uri=' + uri);
                                this.sendBuf.splice(i, 1);
                            }
                        }
                    }
                }
                delete h5_g_globals.seqContext[seqId];
                throw new Error('Operation time out after 11000 ms:' + errMsg);
            }
            else {
                // console.log(" [svc_sdk] seqId", seqId, " race静默结束.");
            }
        });
        return Promise.race([promise, timeout]);
    }
    /**
     * 收到route响应包
     * @param ush
     */
    onPSvcRouteRes(ush) {
        let pkg = new PSvcRouteRes_1.default();
        pkg.unmarshall(ush);
        const h5_g_globals = this.h5_g_globals;
        let seqCtx = h5_g_globals.seqContext[pkg.context];
        // logger.log('Ap.onPSvcRouteRes context=' + pkg.context + ' seqCtx=' + seqCtx);
        if (seqCtx) {
            let resolve = seqCtx.resolve;
            let reject = seqCtx.reject;
            delete h5_g_globals.seqContext[pkg.context];
            logger_1.default.log("Ap.onPSvcRouteRes:" + pkg.toString());
            //==============================hiido统计==============================
            let rtt = timeUtil_1.default.now() - seqCtx.routeReqStartTs;
            let statMap = new Map();
            this.fillStatMap(statMap, ush.uri, pkg);
            statMap.set('rtt', rtt);
            this.checkAndSendStatMap(statMap);
            //==============================hiido统计==============================
            //=============================Metrics统计=============================
            metricsUtil_1.default.report(h5_g_globals.scode, seqCtx.svcName, seqCtx.fnName, seqCtx.protoType, rtt, pkg.resCode);
            //=============================Metrics统计=============================
            if (200 == pkg.resCode) {
                if (resolve) {
                    resolve(pkg);
                }
            }
            else {
                if (reject) {
                    reject({
                        rescode: pkg.resCode,
                        msg: pkg.resMsg,
                        appid: seqCtx.appid,
                        svcName: seqCtx.svcName,
                        fnName: seqCtx.fnName,
                        traceId: pkg.traceId
                    });
                }
            }
            return;
        }
        logger_1.default.log("Ap.onPSvcRouteRes: svcName=" + pkg.svcName);
    }
    //根据响应包的内容填充统计map
    fillStatMap(statMap, uri, pkg) {
        const h5_g_globals = this.h5_g_globals;
        statMap.set('said', h5_g_globals.appid);
        statMap.set('uid', h5_g_globals.uid);
        statMap.set('uri', uri); //res报文的uri
        statMap.set('sdkv', 'web_' + versionInfo_1.version); //res报文的uri
        if (!!pkg.svcName) {
            statMap.set('sn', pkg.svcName);
        }
        if (!!pkg.fnName) {
            statMap.set('fn', pkg.fnName);
        }
        if (!!pkg.traceId) {
            //上报的traceId uid_pc/web/android/ios_instId_seqId
            statMap.set('tid', h5_g_globals.uid + '_' + pkg.traceId);
        }
        if (!!pkg.resCode) {
            statMap.set('sc', pkg.resCode);
        }
        //如果收到了rpc的res, sdkResCode默认填1；否则sdk自己填入
        statMap.set('cc', 1);
    }
    //check并上报统计数据
    checkAndSendStatMap(statMap, act = 'ystrpc') {
        if (statMap.get('rtt') < 0) {
            statMap.set('rtt', utils_1.default.getUintMax); //标识为异常
            logger_1.default.warn('Ap.checkAndSendStatMap invalid cost value, set it to uint.max, map:' + JSON.stringify(statMap));
        }
        let tempUrl = hiidoUtil_1.default.genUrl(statMap, act, this.h5_g_globals.hiidoHost);
        hiidoUtil_1.default.sendUrl(tempUrl, this.h5_g_globals.isMiniProgram);
    }
    connect() {
        if (this.wsState != linkstate_1.default.CONNECTING) {
            const h5_g_globals = this.h5_g_globals;
            let addr = this.wsAddr
                + "/websocket?appid=" + h5_g_globals.appid
                + "&version=" + encodeURIComponent(versionInfo_1.version.toString())
                + "&uuid=" + encodeURIComponent(h5_g_globals.uuid);
            logger_1.default.log("Ap.connect start to connect ws server. url=" + addr);
            this.link = new ProtoLink_1.default(this, h5_g_globals.isMiniProgram);
            this.wsState = linkstate_1.default.CONNECTING;
            this.link.connect(addr);
            this.hummerHandler && this.hummerHandler.onApConnecting();
        }
        else {
            logger_1.default.log("Ap.connect websocket is connecting...");
        }
    }
    close() {
        if (this.wsState == linkstate_1.default.CLOSING) {
            logger_1.default.log("Ap.connect websocket is closing...");
            return;
        }
        // console.log(" [svc_sdk] require to close ws.", this.appid, this.wsSock);
        this.wsState = linkstate_1.default.CLOSING;
        if (this.link) {
            this.link.reset();
        }
    }
    reportRtt() {
        logger_1.default.info("Ap.reportRtt:" + JSON.stringify(this.latenceStat));
        this.latenceStat = { min: 0, max: 0, avg: 0, count: 0, sum: 0, timeout: 0 };
    }
    pingAp() {
        let seqId = "";
        let startTs = timeUtil_1.default.now();
        const h5_g_globals = this.h5_g_globals;
        let promise = new Promise((resolve, reject) => {
            let ping = new PSvcPing_1.default();
            ping.context = h5_g_globals.getSeqId().toString();
            seqId = ping.context;
            // logger.log("Ap.pingAp context=" + ping.context);
            this.send(ping.marshall());
            h5_g_globals.seqContext[seqId] = {
                resolve: () => {
                    let endTs = timeUtil_1.default.now();
                    let rtt = endTs - startTs;
                    if (rtt < this.latenceStat.min) {
                        this.latenceStat.min = rtt;
                    }
                    else if (0 == this.latenceStat.min) {
                        this.latenceStat.min = rtt;
                    }
                    if (rtt > this.latenceStat.max) {
                        this.latenceStat.max = rtt;
                    }
                    else if (0 == this.latenceStat.max) {
                        this.latenceStat.max = rtt;
                    }
                    this.latenceStat.sum += rtt;
                    this.latenceStat.count += 1;
                    this.latenceStat.avg = Math.round(this.latenceStat.sum / this.latenceStat.count);
                    // logger.log("Ap.pingAp :" + JSON.stringify(_this.latenceStat) + " current:" + rtt);
                },
                reject: () => {
                    this.latenceStat.timeout += 1;
                }
            };
        });
        let timeout = utils_1.default.DelayPromise(11000).then(() => {
            let seqCtx = h5_g_globals.seqContext[seqId];
            if (seqCtx) {
                logger_1.default.log("Ap.pingAp ping seqId:" + seqId + " time out.");
                delete h5_g_globals.seqContext[seqId];
                this.latenceStat.timeout += 1;
                //ping ap超时后就断开重连
                this.resetWsState();
                this.hummerHandler && this.hummerHandler.onApClose();
                throw new Error('ping seqId:' + seqId + ' time out after 11000 ms');
            }
            else {
                // console.log(" [svc_sdk] seqId", seqId, " race静默结束.");
            }
        });
        return Promise.race([promise, timeout]);
    }
    loginAp() {
        if (this.isGuestLogin()) {
            logger_1.default.log("Ap.loginAp anonymous user no need to loginAp.");
            return;
        }
        if (this.logined) {
            logger_1.default.log("Ap.loginAp already logined.");
            return;
        }
        const h5_g_globals = this.h5_g_globals;
        let now = timeUtil_1.default.now();
        if (h5_g_globals.loginApStartTs > 0 && now - h5_g_globals.loginApStartTs < 2000) {
            logger_1.default.log("Ap.loginAp ignore frequently login request. now=" + now + " loginApStartTs=" + h5_g_globals.loginApStartTs);
            return;
        }
        h5_g_globals.loginApStartTs = now;
        let login = new PSvcLoginReq_1.default();
        login.context = h5_g_globals.getSeqId().toString();
        login.uid = h5_g_globals.uid;
        login.appid = h5_g_globals.appid;
        login.instId = h5_g_globals.instId;
        login.seqId = parseInt(login.context);
        //login.tokenType = 1; // 第三方登录
        login.tokenType = this.h5_g_globals.tokenType;
        /*
        if (h5_g_globals.ticket) {
            login.otp = h5_g_globals.ticket.toString();
        }
         */
        login.otp = h5_g_globals.token;
        logger_1.default.log("Ap.loginAp: otp len=" + login.otp.length);
        //NOTICE!!! 不要用login.clientHeaders["SCKTerminal"] = "web" 这样的写法，值无法写到map里
        login.clientHeaders.set("SCKTerminal", "web");
        login.clientHeaders.set("SCKSvcSdkVer", versionInfo_1.version.toString());
        logger_1.default.log("Ap.loginAp start to login ap:" + JSON.stringify(login));
        this.send(login.marshall());
    }
    logoutAp() {
        this.logined = false;
        if (this.isGuestLogin()) {
            logger_1.default.log("Ap.logout anonymous user no need to logout.");
            return;
        }
        const h5_g_globals = this.h5_g_globals;
        h5_g_globals.logoutApStartTs = timeUtil_1.default.now();
        let logout = new PSvcLogoutReq_1.default();
        logout.context = h5_g_globals.getSeqId().toString();
        logout.uid = h5_g_globals.uid;
        logout.appid = h5_g_globals.appid;
        logout.instId = h5_g_globals.instId;
        logger_1.default.log("Ap.logout " + JSON.stringify(logout));
        this.send(logout.marshall());
    }
    start() {
        logger_1.default.log("Ap.start");
        this.connect();
    }
    isGuestLogin() {
        return this.h5_g_globals.userType == 0;
    }
    /**
     * 收到单播
     * @param ush
     */
    onPSvcUnicast(ush) {
        let pkg = new PSvcUnicast_1.default();
        pkg.unmarshall(ush);
        //==============================统计==============================
        let statMap = new Map();
        this.fillStatMap(statMap, ush.uri, pkg);
        //消息长度
        statMap.set('length', pkg.data.byteLength);
        this.checkAndSendStatMap(statMap);
        //==============================统计==============================
        //单播到达不用上报到Metrics
        logger_1.default.log("Ap.onPSvcUnicast:" + pkg.toString());
        this.svcHandler && this.svcHandler.invokeCallback({
            type: "on_unicast",
            appid: pkg.appid,
            svcName: pkg.svcName,
            fnName: pkg.fnName,
            protoType: pkg.protoType,
            traceId: pkg.traceId,
            data: pkg.data
        });
        //回复单播
        let unicastRes = new PSvcUnicastRes_1.default();
        unicastRes.context = pkg.context;
        let buffer = unicastRes.marshall();
        this.send(buffer);
    }
    /**
     * 收到广播
     * @param ush
     */
    onPSvcBroadcast(ush) {
        let pkg = new PSvcBroadcast_1.default();
        pkg.unmarshall(ush);
        //收到广播数据不用上报
        let bcKey = pkg.groupType.toString64() + "_" + pkg.groupId.toString64();
        logger_1.default.log("Ap.onPSvcBroadcast:" + pkg.toString() + ' bcKey=' + bcKey + ' isInnerBcGroup=' + this.h5_g_globals.innerBcGroups[bcKey]);
        if (this.h5_g_globals.innerBcGroups[bcKey]) {
            //由于底层内存是共享的，为了避免索引问题，这里拷贝一份res.data，然后释放掉旧的 dw_yangqiao
            let tempUint8Array = new Uint8Array(pkg.data.byteLength);
            tempUint8Array.set(pkg.data, 0);
            pkg.data = null;
            //操作临时分配的内存区域
            let view = new DataView(tempUint8Array.buffer);
            let ush = new ProtoUnmarshall_1.default(view);
            let handler = this.handleBcDic.get(ush.uri);
            if (typeof (handler) !== 'undefined') {
                handler(ush, pkg.traceId);
            }
            else {
                logger_1.default.warn('Ap.onPSvcBroadcast unhandle yyp uri=' + ((ush.uri >> 8) & utils_1.default.getUintMax()) + '/' + (ush.uri & 0xFF));
            }
        }
        else {
            this.svcHandler && this.svcHandler.invokeCallback({
                type: "on_data",
                appid: pkg.appid,
                bc_group: {
                    bcType: pkg.groupType,
                    bcId: pkg.groupId
                },
                svcName: pkg.svcName,
                fnName: pkg.fnName,
                protoType: pkg.protoType,
                traceId: pkg.traceId,
                data: pkg.data
            });
        }
    }
    /**
     * 收到广播V2
     * @param ush
     */
    onPSvcBroadcastV2(ush) {
        let pkg = new PCS_ServiceBroadCastV2_1.default();
        pkg.unmarshall(ush);
        //收到广播数据不用上报
        let bcKey = pkg.ugid;
        logger_1.default.log("Ap.onPSvcBroadcastV2:" + pkg.toString() + ' bcKey=' + bcKey + ' isInnerBcGroup=' + this.h5_g_globals.innerBcGroups[bcKey]);
        if (this.h5_g_globals.innerBcGroups[bcKey]) {
            let handler = this.handleBcDic.get(ush.uri);
            if (typeof (handler) !== 'undefined') {
                //由于底层内存是共享的，为了避免索引问题，这里拷贝一份res.data，然后释放掉旧的
                let tempUint8Array = new Uint8Array(pkg.data.byteLength);
                tempUint8Array.set(pkg.data, 0);
                pkg.data = null;
                //操作临时分配的内存区域
                let view = new DataView(tempUint8Array.buffer);
                let ush = new ProtoUnmarshall_1.default(view);
                handler(ush, pkg.traceId);
            }
            else {
                this.invokeBroadCastCallback(pkg);
            }
        }
        else {
            this.invokeBroadCastCallback(pkg);
        }
    }
    invokeBroadCastCallback(pkg) {
        this.svcHandler && this.svcHandler.invokeCallback({
            type: "on_broadcast",
            appid: pkg.appid,
            bc_group: pkg.ugid,
            svcName: pkg.svcName,
            fnName: pkg.fnName,
            protoType: pkg.protoType,
            traceId: pkg.traceId,
            data: pkg.data
        });
    }
    /**
     * 被强制下线
     * @param ush
     */
    onAPForceOut(ush) {
        let pkg = new PAPForceOut_1.default();
        pkg.unmarshall(ush);
        //服务器通知，不用统计
        this.stop(pkg.uid, pkg.desc);
        this.svcHandler && this.svcHandler.invokeCallback({
            type: "force_out",
            code: pkg.code,
            msg: pkg.desc
        });
    }
}
exports.default = Ap;


/***/ }),

/***/ "./src/ap/linkstate.ts":
/*!*****************************!*\
  !*** ./src/ap/linkstate.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    INIT: "init",
    CONNECTING: "connecting",
    CONNECTED: "connected",
    CLOSING: "closing",
    CLOSED: "closed"
};


/***/ }),

/***/ "./src/appidconst.ts":
/*!***************************!*\
  !*** ./src/appidconst.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//这相当于hardcode，没法办，找不到更好的区分业务的方法了
exports.default = {
    MOSCHAT_PUB: 1494645593,
    MOSCHAT_DEV: 1207472126,
    HAMO: 1249193970 //海外游戏直播
};


/***/ }),

/***/ "./src/chatroom_protocol/PCS_CreateChatRoomReq.ts":
/*!********************************************************!*\
  !*** ./src/chatroom_protocol/PCS_CreateChatRoomReq.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProtoMarshall_1 = __webpack_require__(/*! ../protobase/ProtoMarshall */ "./src/protobase/ProtoMarshall.ts");
const Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
class PCS_CreateChatRoomReq {
    constructor() {
        this.appid = 0;
        this.uid = '0';
        this.props = new Map();
    }
    marshall() {
        let msh = new ProtoMarshall_1.default(false);
        msh.pushUInt32(this.appid);
        let uidL = Long.fromString(this.uid.toString());
        msh.pushUInt32(uidL.low);
        msh.pushUInt32(uidL.high);
        msh.pushUInt32(this.props.size);
        for (let [k, v] of this.props) {
            msh.pushString(k.toString());
            msh.pushUtf8String(v.toString());
        }
        return msh.marshall();
    }
}
exports.default = PCS_CreateChatRoomReq;
// struct PCS_CreateChatRoomReq : public Marshallable
// {
//   enum {uri = (105 << 8 | CHAT_ROOM_SVID)};
// 
//   uint32_t appkey;
//   uint64_t uid;
//   std::map<std::string, std::string> props;
// 
//   virtual void marshal(Pack &p) const{
//     p << appkey << uid ;
//     marshal_container(p, props);
//   }
//   virtual void unmarshal(const Unpack &p){
//     p >> appkey >> uid ;
//     unmarshal_container(p, std::inserter(props, props.begin()));
//   }
// };


/***/ }),

/***/ "./src/common.ts":
/*!***********************!*\
  !*** ./src/common.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = __webpack_require__(/*! ./utils/utf8 */ "./src/utils/utf8.ts");
exports.WSHOST = 'wss://web-ap-service.sunclouds.com';
//export const WSHOST = 'wss://hummer-test.sunclouds.com';  // 测试ws域名
exports.Utify = {
    encodeStringToUtf8Bytes: utf8_1.encodeStringToUtf8Bytes,
    decodeUtf8BytesToString: utf8_1.decodeUtf8BytesToString
};
var LoginStatus;
(function (LoginStatus) {
    LoginStatus[LoginStatus["Idle"] = -1] = "Idle";
    LoginStatus[LoginStatus["Logined"] = 0] = "Logined";
})(LoginStatus = exports.LoginStatus || (exports.LoginStatus = {}));
var ConnectStatus;
(function (ConnectStatus) {
    ConnectStatus[ConnectStatus["Disconnected"] = 0] = "Disconnected";
    ConnectStatus[ConnectStatus["Connecting"] = 1] = "Connecting";
    ConnectStatus[ConnectStatus["Connected"] = 2] = "Connected";
})(ConnectStatus = exports.ConnectStatus || (exports.ConnectStatus = {}));
// 互斥key字符串设置值设置
var MutexKey;
(function (MutexKey) {
    MutexKey["joinChatRoom"] = "chatroom.joinChatRoom";
    MutexKey["leaveChatRoom"] = "chatroom.leaveChatRoom";
    MutexKey["pullMsgIfAny"] = "im.pullMsgIfAny";
    MutexKey["processIMPushMsg"] = "im.processIMPushMsg";
    MutexKey["joinChannel"] = "channel.joinChannel";
    MutexKey["leaveChannel"] = "channel.leaveChannel";
    MutexKey["pullMsg"] = "channel.pullMsg";
})(MutexKey = exports.MutexKey || (exports.MutexKey = {}));


/***/ }),

/***/ "./src/hummer.ts":
/*!***********************!*\
  !*** ./src/hummer.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(/*! ./utils/logger */ "./src/utils/logger.ts");
const utils_1 = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
const ap_1 = __webpack_require__(/*! ./ap/ap */ "./src/ap/ap.ts");
const globalvars_1 = __webpack_require__(/*! ./utils/globalvars */ "./src/utils/globalvars.ts");
const eventemitter2_1 = __webpack_require__(/*! eventemitter2 */ "./node_modules/eventemitter2/lib/eventemitter2.js");
const linkstate_1 = __webpack_require__(/*! ./ap/linkstate */ "./src/ap/linkstate.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
const PCS_CreateChatRoomReq_1 = __webpack_require__(/*! ./chatroom_protocol/PCS_CreateChatRoomReq */ "./src/chatroom_protocol/PCS_CreateChatRoomReq.ts");
const HummerProto_1 = __webpack_require__(/*! ./hummer_protocol/HummerProto */ "./src/hummer_protocol/HummerProto.ts");
const uri_1 = __webpack_require__(/*! ./protobase/uri */ "./src/protobase/uri.ts");
const PSvcLoginRes_1 = __webpack_require__(/*! ./protocol/PSvcLoginRes */ "./src/protocol/PSvcLoginRes.ts");
const timeUtil_1 = __webpack_require__(/*! ./utils/timeUtil */ "./src/utils/timeUtil.ts");
const metricsUtil_1 = __webpack_require__(/*! ./utils/metricsUtil */ "./src/utils/metricsUtil.ts");
class Hummer {
    constructor({ appid, wxAppid, uid, token, token_type, area, onConnectStatus, onLoginStatus, onerror }) {
        this.checkTimer = null;
        if (!!onConnectStatus) {
            this.onConnectStatus = onConnectStatus;
        }
        if (!!onLoginStatus) {
            this.onLoginStatus = onLoginStatus;
        }
        if (utils_1.default.isEmpty(uid) || !utils_1.default.isString(uid)) {
            logger_1.default.error('uid must be string(64bit)');
            if (!!onerror) {
                onerror({ code: -1, msg: 'uid must be string(64bit)' });
            }
            return;
        }
        this.appid = appid;
        this.observer = new eventemitter2_1.EventEmitter2();
        this.h5_g_globals = new globalvars_1.default();
        const tokenType = this.getTokenType(token_type); // 获取token类型
        if (tokenType === -1) {
            onerror({ code: -1, msg: 'token-type is error' });
            return;
        }
        this.h5_g_globals.tokenType = tokenType;
        this.h5_g_globals.appid = appid;
        this.h5_g_globals.thirdUdbAppId = "";
        this.h5_g_globals.wxAppid = wxAppid;
        this.h5_g_globals.loginedUDB = true; // todo js-sdk没有udb！！！
        this.h5_g_globals.uid = uid;
        this.h5_g_globals.domain = ""; // domain先不暴露
        this.h5_g_globals.hiidoHost = this.getHiidoHost(area); // hiido统计上报host
        this.env = this.parseEnvParams(area);
        this.setScode(50275);
        //小程序环境。页面的脚本逻辑是在 JsCore 中运行， JsCore 是一个没有窗口对象的环境，所以不能在脚本中使用 window ，也无法在脚本中操作组件
        if (typeof (window) == 'undefined') {
            if (!wxAppid) {
                //logger.error("new Hummer parameters error! \"wxAppid\" are required!" + JSON.stringify(arguments));
                if (!!onerror) {
                    onerror({ code: -1, msg: '\\"wxAppid\\" are required!' });
                    return;
                }
            }
            this.h5_g_globals.isMiniProgram = true;
            this.h5_g_globals.bShareAnonymousUid = false; //小程序环境不允许共享匿名uid
        }
        //从cookie中获取uid和udb_c
        //let uid = Utils.getCookie("osudb_uid", bIsMiniProgram);
        //let credit = Utils.getCookie("osudb_c", bIsMiniProgram);
        if (!this.h5_g_globals.isMiniProgram) {
            let secure = (document.location.protocol == "https:" ? true : false);
            utils_1.default.setCookie("hummer_uid", uid, 168, "/", this.h5_g_globals.domain, secure);
            utils_1.default.setCookie("hummer_token", token, 168, "/", this.h5_g_globals.domain, secure);
        }
        else {
            utils_1.default.setWxCookie("hummer_uid", uid);
            utils_1.default.setWxCookie("hummer_token", token);
        }
        /*
        if (!token || !uid) {
            uid = 0;
            this.h5_g_globals.userType = 0;
        } else {
            this.h5_g_globals.userType = 1;
        }
         */
        // 只支持实名
        this.h5_g_globals.userType = 1;
        this.h5_g_globals.uid = uid;
        this.h5_g_globals.token = token;
        this.ap = new ap_1.default();
        this.ap.setHummerHandler(this);
        this.checkTimes = 0;
        this.checkTimer = setInterval(this.onCheckTimer.bind(this), 1000);
        this.addHandle(uri_1.default.PSvcLoginResURI, this.onPSvcLoginRes.bind(this));
        this.start();
        if (!!onerror) {
            onerror({ code: 0, msg: 'ok' });
        }
    }
    on(event, listener) {
        this.observer.on(event, listener);
    }
    off(event, listener) {
        this.observer.removeListener(event, listener);
    }
    trigger(event, ...data) {
        setTimeout(() => this.emit(event, ...data), 0);
    }
    emit(event, ...data) {
        this.observer.emit(event, event, ...data);
    }
    start() {
        logger_1.default.log("Hummer.start");
        if (this.ap) {
            this.ap.start();
        }
    }
    onCheckTimer() {
        let now = timeUtil_1.default.now();
        this.checkTimes++;
        //匿名用户进频道后，每10s发一次保活报文
        //if (this.checkTimes % 10 == 0 && this.bAnonymouseUserPingAlive) {
        //	this.pingAlive();
        //}
        if (this.ap) {
            this.ap.onCheckTimer(now, this.checkTimes);
        }
    }
    addHandle(uri, handleFunc) {
        this.ap.handleDic.set(uri, handleFunc);
    }
    //收到login ap响应
    onPSvcLoginRes(ush) {
        let pkg = new PSvcLoginRes_1.default();
        pkg.unmarshall(ush);
        //==============================hiido统计==============================
        let rtt = timeUtil_1.default.now() - this.h5_g_globals.loginApStartTs;
        let statMap = new Map();
        this.ap.fillStatMap(statMap, ush.uri, pkg);
        statMap.set('rtt', rtt); //统计login ap耗时
        this.ap.checkAndSendStatMap(statMap, 'ystsvclogin');
        //==============================hiido统计==============================
        //=============================Metrics统计=============================
        //参考pc svc_login对应service登录
        metricsUtil_1.default.report(this.h5_g_globals.scode, "svc_login", "", "", rtt, pkg.resCode);
        //=============================Metrics统计=============================
        if (pkg.resCode == 200) {
            logger_1.default.log("Hummer.onPSvcLoginRes success:");
            this.onLoginAp({ code: common_1.LoginStatus.Logined, msg: 'success' });
        }
        else {
            logger_1.default.error("Hummer.onPSvcLoginRes error:" + JSON.stringify(pkg));
            this.onLoginAp({ code: pkg.resCode, msg: 'login fail' });
            this.ap.start();
        }
    }
    getEnv() {
        return this.env;
    }
    parseEnvParams(env) {
        const env_map = new Map([
            ['CN', { area: 'china', type: 'public', name: 'shared' }],
            ['CN-INNER', { area: 'china', type: 'private', name: 'share' }],
            ['CN-TEST', { area: 'shenzhen', type: 'test', name: '2' }],
            ['CN-TEST1', { area: 'shenzhen', type: 'test', name: '1' }]
        ]);
        let elements = env.split("/");
        if (elements.length == 3) {
            let area = elements[0];
            let type = elements[1];
            let name = elements[2];
            return { area, type, name };
        }
        else if (elements.length == 1) {
            let area = elements[0];
            let obj = env_map.get(area);
            if (typeof (obj) !== 'undefined') {
                return { area: obj.area, type: obj.type, name: obj.name };
            }
        }
        return null;
    }
    getHiidoHost(area) {
        const cnRanges = ['CN', 'CN-TEST', 'CN-INNER', 'CN-TEST1'];
        return (cnRanges.indexOf(area) > -1) ? 'ylog.hiido.com' : 'hlog.hiido.com';
    }
    /**
     * 设置Metrics系统专用的服务名称
     */
    setScode(scode) {
        if (!utils_1.default.isNumber(scode)) {
            logger_1.default.error("Hummer.setScode scode must be a number");
            return;
        }
        if (scode <= 0) {
            scode = 0;
        }
        logger_1.default.debug("Hummer.setScode scode=" + scode);
        this.h5_g_globals.scode = scode;
    }
    getTokenType(token_type) {
        if (!token_type) {
            return 1; // default: 第三方登录
        }
        const type_map = new Map([
            ["OTP_TOKEN", 0],
            ["TOKEN_3RD", 1],
            ["YY_TOKEN", 2]
        ]);
        let type = type_map.get(token_type);
        if (typeof (type) == 'undefined') {
            //throw new Error('token_type error');
            return -1;
        }
        return type;
    }
    /*
    DEBUG = -1;
    LOG = 0;
    INFO = 1;
    WARN = 2;
    ERROR = 3;
     */
    setLogLevel({ level }) {
        logger_1.default.setLevel(level);
    }
    getLog() {
        return logger_1.default.getLog();
    }
    refreshToken({ uid, token }) {
        if (utils_1.default.isEmpty(uid) || !utils_1.default.isString(uid)) {
            logger_1.default.error("uid must be string(64bit)");
            return Promise.reject({
                rescode: -1,
                msg: "uid must be string(64bit)",
            });
        }
        if (this.h5_g_globals.userType == 0) {
            return Promise.reject({
                rescode: -1,
                msg: "admission control",
            });
        }
        if (!this.h5_g_globals.isMiniProgram) {
            let secure = (document.location.protocol == "https:" ? true : false);
            utils_1.default.setCookie("hummer_uid", uid, 168, "/", this.h5_g_globals.domain, secure);
            utils_1.default.setCookie("hummer_token", token, 168, "/", this.h5_g_globals.domain, secure);
        }
        else {
            utils_1.default.setWxCookie("hummer_uid", uid);
            utils_1.default.setWxCookie("hummer_token", token);
        }
        this.h5_g_globals.uid = uid;
        this.h5_g_globals.token = token;
        return Promise.resolve({
            rescode: 0,
            msg: "refresh success"
        });
    }
    //连接open
    onApOpen() {
        this.onConnectStatus({
            code: common_1.ConnectStatus.Connected,
            msg: "connected"
        });
        if (this.h5_g_globals.bLostConnection) { //之前掉过线
            this.h5_g_globals.bLostConnection = false;
        }
        if (!this.h5_g_globals.loginedUDB) {
            //logger.log("hummer.onApOpen start to login UDB, isAnonymous:" + this.isGuestLogin());
            //this.loginUDB();
            this.ap.loginAp();
        }
    }
    onApConnecting() {
        this.onConnectStatus({
            code: common_1.ConnectStatus.Connecting,
            msg: "connecting"
        });
    }
    //连接断开
    onApClose() {
        if (this.ap.wsState == linkstate_1.default.CONNECTED && !this.h5_g_globals.bLostConnection) {
            this.h5_g_globals.bLostConnection = true;
            this.onConnectStatus({
                code: common_1.ConnectStatus.Disconnected,
                errMsg: "connection lost"
            });
        }
    }
    onApError(err) {
        logger_1.default.error("onApError:" + JSON.stringify(err));
        if (!this.h5_g_globals.bLostConnection) {
            this.h5_g_globals.bLostConnection = true;
            this.onConnectStatus({
                code: common_1.ConnectStatus.Disconnected,
                errMsg: "connection lost"
            });
        }
    }
    onLoginAp(obj) {
        this.ap.onLoginAp(obj);
        this.onLoginStatus(obj);
    }
    //创建聊天室ChatRoomId
    createChatRoomId(request) {
        let pkg = new PCS_CreateChatRoomReq_1.default();
        pkg.appid = this.appid;
        pkg.uid = this.h5_g_globals.uid;
        pkg.props = utils_1.default.toMap(request.props);
        let data = pkg.marshall();
        return this.send('svc_chn_chatroom_auther', 'CreateChatRoom', data);
    }
    /**
     * 发送信息
     * @param {*} svcName
     * @param {*} fnName
     * @param {*} data
     */
    send(svcName, fnName, data) {
        if (this.h5_g_globals.bLostConnection) {
            return Promise.reject({
                rescode: -1,
                msg: "disconnect",
            });
        }
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.ap.sendData(this.appid, svcName, fnName, data);
                const cb = HummerProto_1.default.decodeRouteRes(res);
                resolve(cb);
            }
            catch (e) {
                reject(e);
            }
        }));
    }
}
;
exports.default = Hummer;


/***/ }),

/***/ "./src/hummerImIndex.ts":
/*!******************************!*\
  !*** ./src/hummerImIndex.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hummer_1 = __webpack_require__(/*! ./hummer */ "./src/hummer.ts");
const im_1 = __webpack_require__(/*! ./im */ "./src/im.ts");
exports.default = {
    Hummer: hummer_1.default,
    IM: im_1.default
};


/***/ }),

/***/ "./src/hummer_protocol/HummerProto.ts":
/*!********************************************!*\
  !*** ./src/hummer_protocol/HummerProto.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PCS_CommonOperatorRes_1 = __webpack_require__(/*! ./PCS_CommonOperatorRes */ "./src/hummer_protocol/PCS_CommonOperatorRes.ts");
class HummerProto {
    static decodeRouteRes(d) {
        let cb = null;
        if (d.svcName == "svc_chn_chatroom_auther" || d.svcName == "svc_chn_chatroom_textchat") {
            cb = new PCS_CommonOperatorRes_1.default();
            cb.unmarshall(d.data);
        }
        return cb;
    }
}
;
exports.default = HummerProto;


/***/ }),

/***/ "./src/hummer_protocol/PCS_CommonOperatorRes.ts":
/*!******************************************************!*\
  !*** ./src/hummer_protocol/PCS_CommonOperatorRes.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProtoUnmarshall_1 = __webpack_require__(/*! ../protobase/ProtoUnmarshall */ "./src/protobase/ProtoUnmarshall.ts");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
const Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
class PCS_CommonOperatorRes {
    constructor() {
        this.appid = 0;
        //this.innerUri = 0;
        this.uid = '0';
        this.roomid = 0;
        this.rescode = 0;
        this.props = {};
        this.msg = '';
    }
    unmarshall(msg) {
        let view = utils_1.default.payload2DataView(msg);
        msg = null;
        let ush = new ProtoUnmarshall_1.default(view, false); //不带header
        this.appid = ush.popUInt32();
        //this.innerUri = ush.popUInt32();
        ush.popUInt32();
        //uid
        let v = ush.popUInt64();
        let uid = new Long(v.low, v.high, true);
        this.uid = uid.toString();
        this.roomid = ush.popUInt32();
        this.rescode = ush.popUInt32();
        let size = ush.popUInt32();
        for (let i = 0; i < size; i++) {
            let k = ush.popString();
            let v = ush.popUtf8String();
            this.props[k] = v;
        }
        this.msg = ush.popUtf8String();
    }
}
exports.default = PCS_CommonOperatorRes;
// //新协议（聊天室协议）通用返回包
// struct PCS_CommonOperatorRes: public Marshallable
// {
//   enum{uri = (100 << 8) | OVER_SEA_SVID};
// 
//   PCS_CommonOperatorRes()
//     : res(OPERATOR_SUCCESS) 
//     , props()
//   {}
// 
//   uint32_t appkey;
//   uint32_t innerUri;
//   uint64_t uid;
//   uint32_t roomid;
//   uint32_t res;
//   std::map<std::string, std::string> props;
// 
//   virtual void marshal(Pack &p) const 
//   {
//     p << appkey << innerUri << uid << roomid << res;
//     marshal_container(p, props);
//   }
//   virtual void unmarshal(const Unpack &p) 
//   {
//     p >> appkey >> innerUri >> uid >> roomid >> res;
//     unmarshal_container(p, std::inserter(props, props.begin()));
//   }
// };


/***/ }),

/***/ "./src/im.ts":
/*!*******************!*\
  !*** ./src/im.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protobufjsH5 = __webpack_require__(/*! protobufjs */ "./node_modules/protobufjs/index.js");
const utils_1 = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
const uri_1 = __webpack_require__(/*! ./protobase/uri */ "./src/protobase/uri.ts");
const logger_1 = __webpack_require__(/*! ./utils/logger */ "./src/utils/logger.ts");
const PSvcLogoutRes_1 = __webpack_require__(/*! ./protocol/PSvcLogoutRes */ "./src/protocol/PSvcLogoutRes.ts");
const timeUtil_1 = __webpack_require__(/*! ./utils/timeUtil */ "./src/utils/timeUtil.ts");
const metricsUtil_1 = __webpack_require__(/*! ./utils/metricsUtil */ "./src/utils/metricsUtil.ts");
const IMProtocol_1 = __webpack_require__(/*! ./im_protocol/IMProtocol */ "./src/im_protocol/IMProtocol.ts");
const imProto_1 = __webpack_require__(/*! ./im_protocol/imProto */ "./src/im_protocol/imProto.ts");
const Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
const queue_1 = __webpack_require__(/*! ./utils/queue */ "./src/utils/queue.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
const mutex_1 = __webpack_require__(/*! ./utils/mutex */ "./src/utils/mutex.ts");
const LIMIT = 100;
const periodPollIntervalInMills = 5 * 60 * 1000; // 5 minutes? // TODO
var PullMode;
(function (PullMode) {
    PullMode[PullMode["LatestMode"] = 0] = "LatestMode";
    PullMode[PullMode["LastSeqIdMode"] = 1] = "LastSeqIdMode";
    PullMode[PullMode["TotalAmoutMode"] = 2] = "TotalAmoutMode";
})(PullMode || (PullMode = {}));
class IM {
    constructor(hummer, { onRecvIMPushMsg, onerror }) {
        this.uid = '0';
        this.serviceName = '';
        protobufjsH5.util.Long = Long;
        protobufjsH5.configure();
        this.hummer = hummer;
        this.mutex = new mutex_1.default();
        const env_obj = this.hummer.getEnv();
        if (!env_obj) {
            console.error("area params error");
            if (!!onerror) {
                onerror({ code: -1, msg: 'area params error' });
            }
            return;
        }
        //this.serviceName = 'svc_shenzhen_cim_test_2_proxy';
        this.serviceName = `svc_${env_obj.area}_cim_${env_obj.type}_${env_obj.name}_proxy`;
        logger_1.default.log("new IM: " + this.serviceName);
        this.uuidQueue = new queue_1.default(100);
        this.h5_g_globals = this.hummer.h5_g_globals;
        this.ap = this.hummer.ap;
        this.ap.setSvcHandler(this);
        this.appid = this.h5_g_globals.appid;
        this.uid = this.h5_g_globals.uid;
        this.udbAppid = this.h5_g_globals.thirdUdbAppId;
        this.h5Cb = null;
        //注册handler
        this.addHandle(uri_1.default.PSvcLogoutResURI, this.onPSvcLogoutRes.bind(this));
        /*
        //小程序环境当前匿名，则尝试小程序登录，成功后开始实名会话流程，失败则进行匿名会话流程
        if (this.h5_g_globals.isMiniProgram && this.h5_g_globals.userType == 0) {
            this.loginUdb(this.h5_g_globals.domain, this.h5_g_globals.thirdUdbAppId, this.h5_g_globals.wxAppid);
        }
         */
        // 设置接收消息回调function
        this.handleRecvCb = new Map([
            ["onRecvIMPushMsg", onRecvIMPushMsg]
        ]);
        this.setCallback((d) => {
            console.log('====== setCallback ======', d.type, d);
            switch (d.type) {
                case 'udb': // 登录UDB结果，只有登录UDB成功后，才会获得实名用户身份
                    logger_1.default.log('web socket udb ready');
                    break;
                case 'ap': // 登录service通道结果，在登录service通道成功后，才进行订阅广播组等操作
                    logger_1.default.log('web socket ap ready');
                    break;
                case 'on_data':
                    break;
                case 'on_unicast':
                    this.onUnicast(d);
                    break;
                case 'connection_status':
                    //console.log('断线了？重连不？', d);
                    break;
                default:
                    break;
            }
            // console.log('===============  setCallback  ============== isLogin  isAp', isLogin, isAp, 'type', d.type)
        });
        //listen browser beforeunload event
        if (!this.h5_g_globals.isMiniProgram) {
            window.addEventListener('beforeunload', this.onWindowBeforeUnload.bind(this));
        }
        else {
            //TODO 小程序的onUnload由业务侧处理？
        }
        this.start();
        if (!!onerror) {
            onerror({ code: 0, msg: 'ok' });
        }
    }
    onWindowError(errorMsg, url, lineNumber) {
        logger_1.default.warn('onWindowError errorMsg=' + errorMsg + ' url=' + url);
    }
    onWindowBeforeUnload(event) {
        this.stop();
    }
    start() {
        this.onLoginStatus(this.getLoginStatus());
    }
    onLoginStatus(status) {
        switch (status) {
            case common_1.LoginStatus.Idle:
                break;
            case common_1.LoginStatus.Logined: {
                // p2p pull
                if (!this.pollTimer) {
                    this.pollTimer = setInterval(this.processIMPushMsgPeriod.bind(this), periodPollIntervalInMills);
                }
                break;
            }
            default:
                break;
        }
    }
    onUnicast(d) {
        const cb = IMProtocol_1.default.decodeUnicastRes(d, this.h5_g_globals.isMiniProgram);
        console.warn('im.onUnicast: cb=', cb);
        if (cb) {
            this.handleRcvData("onRecvIMPushMsg", cb);
        }
    }
    setIMRecvCb({ onRecvIMPushMsg }) {
        if (!!onRecvIMPushMsg) {
            this.handleRecvCb.set("onRecvIMPushMsg", onRecvIMPushMsg);
        }
    }
    addHandle(uri, handleFunc) {
        this.ap.handleDic.set(uri, handleFunc);
    }
    handleRcvData(func, data) {
        let handle = this.handleRecvCb.get(func);
        if (typeof (handle) !== 'undefined') {
            if (func === 'onRecvIMPushMsg') {
                this.processIMPushMsg(handle); // pullMsg拉取数据
            }
            else {
                handle(data);
            }
        }
    }
    // 周期5m定时拉取
    processIMPushMsgPeriod() {
        let handle = this.handleRecvCb.get('onRecvIMPushMsg');
        if (typeof (handle) !== 'undefined') {
            this.processIMPushMsg(handle);
        }
    }
    processIMPushMsg(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.mutex.wait(common_1.MutexKey.processIMPushMsg);
                this.mutex.lock(common_1.MutexKey.processIMPushMsg);
                const res = yield this.getMaxAcquiredSeqID();
                const start_seq_id = (res.code === 0) ? res.seq_id : '0';
                logger_1.default.log("IM.processIMPushMsg: start_seq_id=" + start_seq_id);
                yield this.pullMsgIfAny(handle, start_seq_id, LIMIT);
            }
            catch (e) {
                logger_1.default.warn("IM.processIMPushMsg: " + JSON.stringify(e));
            }
            finally {
                this.mutex.unlock(common_1.MutexKey.processIMPushMsg);
            }
        });
    }
    pullMsgIfAny(handle, seq_id, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.mutex.wait(common_1.MutexKey.pullMsgIfAny);
                this.mutex.lock(common_1.MutexKey.pullMsgIfAny);
                const res = yield this.pullMsg({ start_seq_id: seq_id, limit: limit });
                res.mq_data.forEach(item => {
                    handle(item);
                });
                if (res.has_more) {
                    logger_1.default.info("IM.pullMsgIfAny: has more. schedule a new pull");
                    //this.pullMsgIfAny(handle, res.max_seq_id, limit);
                    setTimeout(this.pullMsgIfAny.bind(this), 100, handle, res.max_seq_id, limit);
                }
                else {
                    // 已拉取完
                    let max_seq_id = res.max_seq_id !== '0' ? res.max_seq_id : seq_id;
                    //logger.log("IM.SetMaxAcquiredSeqID: res.max_seq_id=" + res.max_seq_id + ", max_seq_id=" + max_seq_id);
                    yield this.SetMaxAcquiredSeqID({ seq_id: max_seq_id });
                }
            }
            catch (e) {
                logger_1.default.warn("IM.pullMsgIfAny: " + JSON.stringify(e));
            }
            finally {
                this.mutex.unlock(common_1.MutexKey.pullMsgIfAny);
            }
        });
    }
    /**
     * 收到登出ap响应
     * @param ush
     */
    onPSvcLogoutRes(ush) {
        let pkg = new PSvcLogoutRes_1.default();
        pkg.unmarshall(ush);
        //==============================hiido统计==============================
        let cost = timeUtil_1.default.now() - this.h5_g_globals.logoutApStartTs;
        let statMap = new Map();
        this.fillStatMap(statMap, ush.uri, pkg);
        statMap.set('cost', cost);
        this.checkAndSendStatMap(statMap);
        //==============================hiido统计==============================
        //=============================Metrics统计=============================
        //参考pc svc_logout对应service登出
        metricsUtil_1.default.report(this.h5_g_globals.scode, "svc_logout", "", "", cost, pkg.resCode);
        //=============================Metrics统计=============================
        logger_1.default.log("IM.onPSvcLogoutRes success." + JSON.stringify(pkg));
    }
    setCallback(cb) {
        this.h5Cb = cb;
    }
    invokeCallback(obj) {
        if (this.h5Cb) {
            this.h5Cb(obj);
        }
        else {
            logger_1.default.error("IM.invokeCallback h5Cb should not be null!");
        }
    }
    /**
     * 断开连接，重新登录UDB以获取新的ticket来登录AP
     */
    restart() {
        logger_1.default.warn('IM.restart');
        //this.h5_g_globals.loginedUDB = false;
        this.h5_g_globals.loginedUDB = true;
        if (this.ap) {
            this.ap.start();
        }
    }
    login() {
        const h5_g_globals = this.h5_g_globals;
        //存在这样一种情况：先发送匿名进频道请求，没收到回复时又尝试发起实名进频道请求
        this.ap.logoutAp();
        h5_g_globals.logout();
        //再次从cookie中解出uid/udb_c
        let uid = utils_1.default.getCookie("hummer_uid", h5_g_globals.isMiniProgram);
        let token = utils_1.default.getCookie("hummer_token", h5_g_globals.isMiniProgram);
        if (!uid || !token) {
            uid = '0';
            h5_g_globals.userType = 0;
        }
        else {
            h5_g_globals.userType = 1;
        }
        h5_g_globals.uid = uid;
        h5_g_globals.token = token;
        logger_1.default.log("IM.login uid:" + h5_g_globals.uid + " credit:" + h5_g_globals.token);
        //this.loginUDB();
    }
    //TODO 以下两个方法有什么不同哦，命名看得人蛋疼
    sendAppData(obj) {
        return this.ap.sendApRouter(obj);
    }
    sendAppSender(obj) {
        //原信令sdk用Sender给各个协议加上头部（4+4+2)
        //重写后在创建各个对象的时候已经加了头，调用marshall()函数即能达到效果，不必要用Sender
        obj.data = obj.struct.marshall();
        return this.ap.sendApRouter(obj);
    }
    //仅用于实名logout至匿名
    logout(notDelCookie) {
        const h5_g_globals = this.h5_g_globals;
        logger_1.default.log("IM.logout uid:" + h5_g_globals.uid + " bGuestLogin=" + this.isGuestLogin());
        let preTopSid = h5_g_globals.topSid;
        let preSubSid = h5_g_globals.subSid;
        // this.ap.reportLog("logout", "start");
        this.ap.logoutAp();
        h5_g_globals.logout();
        //匿名无需登录AP，直接设置udb和ap的标记为true
        h5_g_globals.loginedUDB = true;
        this.ap.logined = true;
        if (!notDelCookie && !h5_g_globals.isMiniProgram) {
            logger_1.default.warn("IM.logout clear osudb cookie.");
            //清除前缀为osudb的cookie
            let data = document.cookie.split(';');
            for (let i = 0; i < data.length; i++) {
                if (/^osudb/.test(data[i].split('=')[0].replace(/\s/, ''))) {
                    document.cookie = data[i].split('=')[0].replace(/\s/, '') + '=' + data[i].split('=')[1] + ';expires=' + (new Date(1)) + ';domain=' + h5_g_globals.domain + ';path=/';
                }
            }
        }
    }
    onLoginAp(obj) {
        this.ap.onLoginAp(obj);
        this.ap.flushBuf();
        switch (obj.code) {
            case common_1.LoginStatus.Idle:
                break;
            case common_1.LoginStatus.Logined: {
                // p2p pull
                if (!this.pollTimer) {
                    this.pollTimer = setInterval(this.processIMPushMsgPeriod.bind(this), periodPollIntervalInMills);
                }
                break;
            }
            default:
                break;
        }
    }
    ;
    isGuestLogin() {
        return this.h5_g_globals.userType == 0;
    }
    //匿名用户才需要ping保活，其实就是定时joinChannel，注意前后guid要一致
    //server检测到guid已存在，就认为此匿名用户alive
    // !!! 需要设计ping保活
    pingAlive() {
    }
    getLoginStatus() {
        return this.ap.loginStatus;
    }
    //根据响应包的内容填充统计map
    fillStatMap(statMap, uri, pkg) {
        this.ap.fillStatMap(statMap, uri, pkg);
    }
    //check并上报统计数据
    checkAndSendStatMap(statMap, act = 'ystrpc') {
        this.ap.checkAndSendStatMap(statMap, act);
    }
    isWsChannelReady() {
        return this.ap.appidReady();
    }
    /**
     * 停止服务，具体包括：退频道，清空globalvars，并断掉ws连接
     */
    stop() {
        if (this.h5_g_globals.uid != '0') {
            this.ap.stop(this.h5_g_globals.uid, "Graceful exit!");
        }
        if (this.pollTimer) {
            clearInterval(this.pollTimer);
            delete this.pollTimer;
            this.pollTimer = null;
        }
    }
    /**
     * 获取实例信息
     */
    getInstance() {
        if (this.h5_g_globals.bLostConnection) {
            return Promise.resolve({
                rescode: -1,
                msg: "disconnected"
            });
        }
        return Promise.resolve({
            rescode: 0,
            uid: this.h5_g_globals.uid,
            instanceId: this.h5_g_globals.instId,
            isAnonymous: this.h5_g_globals.userType == 0,
            appid: this.h5_g_globals.appid,
        });
    }
    /**
     * 发送信息
     * @param svcName
     * @param fnName
     * @param {*} data
     */
    send(svcName, fnName, data) {
        if (this.h5_g_globals.bLostConnection) {
            return Promise.reject({
                rescode: -1,
                msg: "disconnect",
            });
        }
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.ap.sendData(this.appid, svcName, fnName, data);
                const cb = IMProtocol_1.default.decodeRouteRes(res, this.uuidQueue, this.h5_g_globals.isMiniProgram);
                resolve(cb);
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    generateLogId() {
        let beginTime = Math.round(Date.now() / 1000);
        let idL = new Long(this.h5_g_globals.seqId, beginTime, true);
        //logger.log("IM.generateLogId: LogId=" + JSON.stringify(idL) + ", LogId=" + idL.toString());
        return idL;
    }
    getMaxSeqId() {
        let imPb = protobufjsH5.parse(imProto_1.imProto, { keepCase: true }).root;
        /* GetMaxSeqIdRequest */
        let typeName = "com.hummer.im._internals.proto.GetMaxSeqIdRequest";
        let maxSeqIdReq = imPb.lookupType(typeName);
        let data, message, pbBin;
        data = {
            log_id: this.generateLogId(),
            app_id: Long.fromNumber(this.appid, true),
            self_uid: Long.fromString(this.uid),
            topic: ''
        };
        //logger.log("IM.GetMaxSeqId " + JSON.stringify(data));
        message = maxSeqIdReq.create(data);
        pbBin = maxSeqIdReq.encode(message).finish();
        return this.send(this.serviceName, 'cim.proto.ProxyService.GetMaxSeqId', pbBin);
    }
    SetMaxAcquiredSeqID({ seq_id }) {
        if (utils_1.default.isEmpty(seq_id)) {
            return Promise.reject({ code: -1, errMsg: 'seq_id is empty!' });
        }
        if (!utils_1.default.isString(seq_id)) {
            return Promise.reject({ code: -1, errMsg: 'seq_id is not string!' });
        }
        let imPb = protobufjsH5.parse(imProto_1.imProto, { keepCase: true }).root;
        /* SetMaxAcquiredSeqID */
        let typeName = "com.hummer.im._internals.proto.SetMaxAcquiredSeqIDRequest";
        let LoginReq = imPb.lookupType(typeName);
        let data, message, pbBin;
        data = {
            log_id: this.generateLogId(),
            app_id: Long.fromNumber(this.appid, true),
            self_uid: Long.fromString(this.uid, true),
            seq_id: Long.fromString(seq_id),
            topic: '',
        };
        //logger.log("IM.SetMaxAcquiredSeqID " + JSON.stringify(data));
        message = LoginReq.create(data);
        pbBin = LoginReq.encode(message).finish();
        return this.send(this.serviceName, 'cim.proto.ProxyService.SetMaxAcquiredSeqID', pbBin);
    }
    getMaxAcquiredSeqID() {
        let imPb = protobufjsH5.parse(imProto_1.imProto, { keepCase: true }).root;
        /* SetMaxAcquiredSeqID */
        let typeName = "com.hummer.im._internals.proto.GetMaxAcquiredSeqIDRequest";
        let LoginReq = imPb.lookupType(typeName);
        let data, message, pbBin;
        data = {
            log_id: this.generateLogId(),
            app_id: new Long(this.appid, 0, true),
            self_uid: Long.fromString(this.uid, true),
            topic: '',
        };
        //logger.log("IM.GetMaxAcquiredSeqID " + JSON.stringify(data));
        message = LoginReq.create(data);
        pbBin = LoginReq.encode(message).finish();
        return this.send(this.serviceName, 'cim.proto.ProxyService.GetMaxAcquiredSeqID', pbBin);
    }
    // 单聊
    sendP2PMessage({ content, msg_type, receiver, appExtra, onmessage }) {
        if (utils_1.default.isEmpty(receiver) || !utils_1.default.isString(receiver)) {
            return Promise.reject({
                code: -1,
                msg: "receiver must be string(64bit)",
            });
        }
        if (msg_type !== 0) {
            return Promise.reject({
                code: -1,
                msg: "this version only support to send text(msg_type=0)",
            });
        }
        return new Promise(((resolve, reject) => {
            let uuid = utils_1.default.getUUID("sunclouds.com");
            this.sendP2P({ content, msg_type, receiver, onmessage, uuid, appExtra }).then(res => {
                resolve({ uuid: uuid, log_id: res.log_id, code: res.code, msg: res.msg, timestamp: res.timestamp });
            }).catch(err => {
                reject({ uuid: uuid, code: -1, msg: err });
            });
        }));
    }
    sendP2P({ content, msg_type, receiver, onmessage, uuid, appExtra }) {
        let imPb = protobufjsH5.parse(imProto_1.imProto, { keepCase: true }).root;
        /* TextMsg content encode protobuf */
        let typeText = "com.hummer.im._internals.proto.TextMsg";
        let textReq = imPb.lookupType(typeText);
        let textData, textMsg, textPbBin;
        textData = {
            text: content
        };
        textMsg = textReq.create(textData);
        textPbBin = textReq.encode(textMsg).finish();
        /* P2PChatRequest */
        let typeName = "com.hummer.im._internals.proto.P2PChatRequest";
        let LoginReq = imPb.lookupType(typeName);
        let data, message, pbBin;
        let extension = appExtra ? appExtra : '';
        data = {
            log_id: this.generateLogId(),
            app_id: new Long(this.appid, 0, true),
            from_uid: Long.fromString(this.uid, true),
            to_uid: Long.fromString(receiver, true),
            msg_type: Number(msg_type),
            content: textPbBin,
            os_push_msg: {
                title: 'p2p',
                //content: content,
                //payload: '',
                icon: '',
                disable_os_push: false
            },
            uuid: uuid,
            extension: extension
        };
        this.uuidQueue.enqueue(uuid);
        if (!!onmessage) {
            onmessage({ uuid: uuid, log_id: data.log_id.toString(), from_uid: this.uid, to_uid: receiver, msg_type: msg_type, content: content });
        }
        //logger.log("IM.SendP2PChat " + JSON.stringify(data));
        message = LoginReq.create(data);
        pbBin = LoginReq.encode(message).finish();
        return this.send(this.serviceName, 'cim.proto.ProxyService.P2PChat', pbBin);
    }
    // pull P2P消息
    initPullMsg(request) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.initPull({ mode: request.mode });
                console.log("initPullMsg: ", res);
                if (res && res.hasOwnProperty('mq_data')) {
                    resolve({ rescode: 0, mq_data: res.mq_data });
                }
                else {
                    resolve({ rescode: 0, mq_data: [] });
                }
                if (res && res.hasOwnProperty('max_seq_id')) {
                    this.SetMaxAcquiredSeqID({ seq_id: res.max_seq_id });
                }
                else {
                    logger_1.default.log("no max_seq_id");
                }
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    //pull P2P消息
    initPull({ mode }) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                switch (parseInt(mode)) {
                    case PullMode.LatestMode: { // 拉取最新的
                        const res = yield this.getMaxSeqId();
                        const start_seq_id = (res.code === 0) ? res.max_seq_id : '0';
                        const rsp = yield this.pullMsg({ start_seq_id: start_seq_id, limit: LIMIT });
                        resolve(rsp);
                        break;
                    }
                    case PullMode.LastSeqIdMode: { // 基于上次的setSeqId拉取
                        const res = yield this.getMaxAcquiredSeqID();
                        const start_seq_id = (res.code === 0) ? res.seq_id : '0';
                        const rsp = yield this.pullMsg({ start_seq_id: start_seq_id, limit: LIMIT });
                        resolve(rsp);
                        break;
                    }
                    case PullMode.TotalAmoutMode: { // 全量拉取
                        const rsp = yield this.pullMsg({ start_seq_id: '0', limit: LIMIT });
                        resolve(rsp);
                        break;
                    }
                    default: {
                        logger_1.default.error("mode is invalid");
                        reject({ type: "initPullMsg", code: -1, msg: 'mode is invalid' });
                        break;
                    }
                }
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    //pull P2P消息
    pullMsg(request) {
        if (utils_1.default.isEmpty(request.start_seq_id)) {
            return Promise.reject({ code: -1, msg: 'start_seq_id is empty!' });
        }
        if (!utils_1.default.isString(request.start_seq_id)) {
            return Promise.reject({ code: -1, msg: 'start_seq_id is not string!' });
        }
        if (request.limit == 0) {
            return Promise.reject({ code: -1, msg: 'limit is zero!' });
        }
        let imPb = protobufjsH5.parse(imProto_1.imProto, { keepCase: true }).root;
        let typeName = "com.hummer.im._internals.proto.PullMsgRequest";
        let LoginReq = imPb.lookupType(typeName);
        let data, message, pbBin;
        data = {
            log_id: this.generateLogId(),
            app_id: new Long(this.appid, 0, true),
            self_uid: Long.fromString(this.uid, true),
            exclusive_start_seq_id: Long.fromString(request.start_seq_id, true),
            limit: Number(request.limit),
            user_tags: '',
            statis_delivery_delay: true,
            topic: ''
        };
        //logger.log("IM.PullMsg " + JSON.stringify(data));
        message = LoginReq.create(data);
        pbBin = LoginReq.encode(message).finish();
        return this.send(this.serviceName, 'cim.proto.ProxyService.PullMsg', pbBin);
    }
}
exports.default = IM;


/***/ }),

/***/ "./src/im_protocol/IMProtocol.ts":
/*!***************************************!*\
  !*** ./src/im_protocol/IMProtocol.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const protobufjsH5 = __webpack_require__(/*! protobufjs */ "./node_modules/protobufjs/index.js");
const imProto_1 = __webpack_require__(/*! ./imProto */ "./src/im_protocol/imProto.ts");
const logger_1 = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
var Action;
(function (Action) {
    Action[Action["kP2PChat"] = 3000] = "kP2PChat";
})(Action || (Action = {}));
var MsgType;
(function (MsgType) {
    MsgType[MsgType["kText"] = 0] = "kText";
    MsgType[MsgType["kImage"] = 1] = "kImage";
    MsgType[MsgType["kUrl"] = 2] = "kUrl";
    MsgType[MsgType["kAudio"] = 3] = "kAudio";
    MsgType[MsgType["kVideo"] = 4] = "kVideo";
    MsgType[MsgType["kCustomStart"] = 10000] = "kCustomStart";
})(MsgType || (MsgType = {}));
class IMProtocol {
    static decodeRouteRes(d, uuidQueue, isMiniProgram) {
        try {
            let imPb = protobufjsH5.parse(imProto_1.imProto, { keepCase: true }).root;
            let imRes;
            if (d.fnName == "cim.proto.ProxyService.GetMaxSeqId") {
                let typeName = "com.hummer.im._internals.proto.GetMaxSeqIdResponse";
                let p2pRes = imPb.lookupType(typeName);
                imRes = p2pRes.decode(new Uint8Array(d.data));
                // logger.log("IMProtocol.decodeRouteRes: GetMaxSeqIdResponse=" + JSON.stringify(imRes));
                return {
                    log_id: imRes.log_id.toString(),
                    code: imRes.code,
                    msg: imRes.msg,
                    max_seq_id: imRes.max_seq_id.toString()
                };
            }
            else if (d.fnName == "cim.proto.ProxyService.SetMaxAcquiredSeqID") {
                let typeName = "com.hummer.im._internals.proto.SetMaxAcquiredSeqIDResponse";
                let p2pRes = imPb.lookupType(typeName);
                imRes = p2pRes.decode(new Uint8Array(d.data));
                //logger.log("IMProtocol.decodeRouteRes: SetMaxAcquiredSeqIDResponse=" + JSON.stringify(imRes));
                return { log_id: imRes.log_id.toString(), code: imRes.code, msg: imRes.msg };
            }
            else if (d.fnName == "cim.proto.ProxyService.GetMaxAcquiredSeqID") {
                let typeName = "com.hummer.im._internals.proto.GetMaxAcquiredSeqIDResponse";
                let p2pRes = imPb.lookupType(typeName);
                imRes = p2pRes.decode(new Uint8Array(d.data));
                //logger.log("IMProtocol.decodeRouteRes: GetMaxAcquiredSeqIDResponse=" + JSON.stringify(imRes));
                return {
                    log_id: imRes.log_id.toString(),
                    code: imRes.code,
                    msg: imRes.msg,
                    seq_id: imRes.seq_id.toString()
                };
            }
            else if (d.fnName == "cim.proto.ProxyService.P2PChat") {
                let typeName = "com.hummer.im._internals.proto.P2PChatResponse";
                let p2pRes = imPb.lookupType(typeName);
                imRes = p2pRes.decode(new Uint8Array(d.data));
                //logger.log("IMProtocol.decodeRouteRes: P2PChatResponse=" + JSON.stringify(imRes));
                return {
                    log_id: imRes.log_id.toString(),
                    code: imRes.code,
                    msg: imRes.msg,
                    timestamp: imRes.timestamp.toString()
                };
            }
            else if (d.fnName == "cim.proto.ProxyService.PullMsg") {
                let mqRes = [];
                let typeName = "com.hummer.im._internals.proto.PullMsgResponse";
                let pullRes = imPb.lookupType(typeName);
                imRes = pullRes.decode(new Uint8Array(d.data));
                for (let msgPb of imRes.msgs) {
                    if (msgPb.action != Action.kP2PChat) {
                        continue;
                    }
                    let typeName = "com.hummer.im._internals.proto.P2PChatRequest";
                    let p2pMsg = imPb.lookupType(typeName);
                    let imData = p2pMsg.decode(new Uint8Array(msgPb.content));
                    //logger.log("IMProtocol.decodeRouteRes: imData=" + JSON.stringify(imData));
                    let content;
                    if (imData.msg_type === MsgType.kText) {
                        let typePb = "com.hummer.im._internals.proto.TextMsg";
                        let textReq = imPb.lookupType(typePb);
                        let textContent = textReq.decode(new Uint8Array(imData.content));
                        //logger.log("IMProtocol.decodeRouteRes: textContent=" + JSON.stringify(textContent));
                        content = textContent.text;
                    }
                    else if (imData.msg_type === MsgType.kImage) {
                        let typePb = "com.hummer.im._internals.proto.ImageMsg";
                        let imageReq = imPb.lookupType(typePb);
                        let imageContent = imageReq.decode(new Uint8Array(imData.content));
                        //logger.log("IMProtocol.decodeRouteRes: imageContent=" + JSON.stringify(imageContent));
                        content = imageContent;
                    }
                    else if (imData.msg_type === MsgType.kUrl) {
                        let typePb = "com.hummer.im._internals.proto.UrlMsg";
                        let urlReq = imPb.lookupType(typePb);
                        let urlContent = urlReq.decode(new Uint8Array(imData.content));
                        //logger.log("IMProtocol.decodeRouteRes: urlContent=" + JSON.stringify(urlContent));
                        content = urlContent.url;
                    }
                    else /*if (imData.msg_type >= 10000)*/ {
                        //logger.log("IMProtocol.decodeRouteRes: customContent=" + imData.content);
                        logger_1.default.log("IMProtocol.decodeRouteRes: other msg_type=" + imData.msg_type);
                        content = imData.content;
                    }
                    // 1.文字，图片，url； 2.自定义表情，图片+url 3. 其他透传
                    let index = uuidQueue.indexOf(imData.uuid);
                    if (index > -1) {
                        uuidQueue.remove(index);
                        continue;
                    }
                    let mqObj = {
                        from_uid: imData.from_uid.toString(),
                        to_uid: imData.to_uid.toString(),
                        msg_type: imData.msg_type,
                        content: content,
                        //seq_id: msgPb.seq_id.toString(),
                        uuid: imData.uuid,
                        timestamp: msgPb.timestamp.toString()
                    };
                    mqRes.push(mqObj);
                    logger_1.default.log("IMProtocol.decodeRouteRes: mq object=" + JSON.stringify(mqObj));
                }
                logger_1.default.log("IMProtocol.decodeRouteRes: PullMsgResponse=" + JSON.stringify(imRes));
                return {
                    log_id: imRes.log_id.toString(),
                    max_seq_id: imRes.max_seq_id.toString(),
                    has_more: imRes.has_more,
                    mq_data: mqRes
                };
            }
            return {};
        }
        catch (e) {
            logger_1.default.error('IMProtocol.decodeRouteRes: err=' + JSON.stringify(e));
        }
    }
    static decodeUnicastRes(d, isMiniProgram) {
        logger_1.default.log("IMProtocol.decodeUnicastRes: d=" + JSON.stringify(d));
        if (d.svcName != "service_api_gateway" && d.svcName != "service_api_gateway_dev") {
            return null;
        }
        try {
            let imPb = protobufjsH5.parse(imProto_1.imProto, { keepCase: true }).root;
            let typeName = "com.hummer.im._internals.proto.IMPushMsgRequest";
            let imRes = imPb.lookupType(typeName);
            let cb = imRes.decode(new Uint8Array(d.data));
            let res = {
                log_id: cb.log_id.toString(),
                seq_id: cb.seq_id.toString(),
                region: cb.region,
                env_type: cb.env_type,
                env_name: cb.env_name,
            };
            logger_1.default.log("IMProtocol.decodeUnicastRes: IMPushMsgRequest=" + JSON.stringify(res));
            return res;
        }
        catch (e) {
            logger_1.default.error('IMProtocol.decodeUnicastRes: err=' + JSON.stringify(e));
        }
    }
}
;
exports.default = IMProtocol;


/***/ }),

/***/ "./src/im_protocol/imProto.ts":
/*!************************************!*\
  !*** ./src/im_protocol/imProto.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.imProto = "syntax = \"proto3\";\
package com.hummer.im._internals.proto; \
option objc_class_prefix = \"HMRPB\"; \
enum Action { \
kP2PChat = 3000; \
} \
message GetMaxSeqIdRequest { \
int64 log_id = 1; \
int64 app_id = 2; \
int64 self_uid = 3; \
string topic = 4; \
} \
message GetMaxSeqIdResponse { \
int64 log_id = 1; \
int32 code = 2; \
string msg = 3; \
int64 max_seq_id = 4; \
} \
message SetMaxAcquiredSeqIDRequest { \
int64 log_id = 1; \
int64 app_id = 2; \
int64 self_uid = 3; \
int64 seq_id = 4; \
string topic = 5; \
} \
message SetMaxAcquiredSeqIDResponse { \
    int64 log_id = 1; \
    int32 code = 2; \
    string msg = 3; \
} \
message GetMaxAcquiredSeqIDRequest { \
    int64 log_id = 1; \
    int64 app_id = 2; \
    int64 self_uid = 3; \
    string topic = 4; \
} \
message GetMaxAcquiredSeqIDResponse { \
    int64 log_id = 1; \
    int32 code = 2; \
    string msg = 3; \
    int64 seq_id = 4; \
} \
enum MsgType { \
kText = 0; \
kImage = 1; \
kUrl = 2; \
kAudio = 3; \
kVideo = 4; \
kCustomStart = 10000; \
} \
message TextMsg {\
    string text = 1;\
} \
message ImageMsg { \
int32 original_width = 1; \
int32 original_height = 2; \
string thumbnail_url = 3; \
string original_url = 4; \
int32 storage_provider = 5; \
} \
message UrlMsg {\
    string url = 1;\
} \
message OsPushMsg { \
    string title = 1; \
    string content = 2; \
    bytes payload = 3; \
    string icon = 4; \
    bool disable_os_push = 5; \
} \
message P2PChatRequest { \
    int64 log_id = 1; \
    int64 app_id = 2; \
    int64 from_uid = 3; \
    int64 to_uid = 4; \
    int32 msg_type = 5; \
    bytes content = 6; \
    OsPushMsg os_push_msg = 7; \
    string uuid = 8; \
    string extension = 9; \
} \
message P2PChatResponse { \
    int64 log_id = 1; \
    int32 code = 2; \
    string msg = 3; \
    int64 timestamp = 4; \
}\
message IMPushMsgRequest {\
    int64 log_id = 1;\
    int64 uid = 2;\
    int64 seq_id = 3;\
    int64 group_id = 4;\
    string region = 5;\
    string env_type = 6;\
    string env_name = 7;\
    string topic = 8;\
}\
message IMPushMsgResponse {\
    int64 log_id = 1;\
    int32 code = 2;\
    string msg = 3;\
}\
message PullMsgRequest { \
    int64 log_id = 1;\
    int64 app_id = 2;\
    int64 self_uid = 3;\
    int64 exclusive_start_seq_id = 4;\
    int32 limit = 5;\
    repeated string user_tags = 6;\
    bool statis_delivery_delay = 7;\
    string topic = 8;\
}\
message PullMsgResponse {\
    int64 log_id = 1;\
    int32 code = 2;\
    string msg = 3;\
    repeated Msg msgs = 4;\
    int64 max_seq_id = 5;\
    bool has_more = 6;\
}\
message Msg {\
    int64 seq_id = 1;\
    Action action = 2;\
    bytes content = 3;\
    int64 timestamp = 4;\
}";


/***/ }),

/***/ "./src/protobase/ProtoMarshall.ts":
/*!****************************************!*\
  !*** ./src/protobase/ProtoMarshall.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UtfUtil_1 = __webpack_require__(/*! ../utils/UtfUtil */ "./src/utils/UtfUtil.ts");
'use strict';
/**
 * ProtoMarshall
 */
class ProtoMarshall {
    constructor(hasHeader = true) {
        this.hasHeader = hasHeader;
        this.segments = [];
        this.data = null;
        this.totalLen = 0;
        this.uri = 0;
        if (this.hasHeader) {
            this.pushUInt32(10);
            this.pushUInt32(this.uri);
            this.pushUInt16(200);
        }
    }
    destroy() {
    }
    marshall() {
        if (this.segments.length === 0) {
            return null;
        }
        this.data = new Uint8Array(this.totalLen);
        let offset = 0;
        for (let i = 0; i < this.segments.length; ++i) {
            let segment = this.segments[i];
            this.data.set(segment, offset);
            offset += segment.length;
        }
        if (this.hasHeader) {
            this.replaceUInt32(0, this.totalLen);
            this.replaceUInt32(4, this.uri);
        }
        return this.data;
    }
    setUri(uri) {
        this.uri = uri;
    }
    replaceUInt32(pos, val) {
        let view = new DataView(this.data.buffer);
        view.setUint32(pos, val, true);
    }
    pushUInt8(val) {
        let arr = new Uint8Array(1);
        let view = new DataView(arr.buffer);
        view.setUint8(0, val);
        this.segments.push(arr);
        this.totalLen++;
    }
    pushBool(val) {
        this.pushUInt8(val ? 1 : 0);
    }
    pushUInt16(val) {
        let arr = new Uint8Array(2);
        let view = new DataView(arr.buffer);
        view.setUint16(0, val, true);
        this.segments.push(arr);
        this.totalLen += 2;
    }
    pushUInt32(val) {
        let arr = new Uint8Array(4);
        let view = new DataView(arr.buffer);
        view.setUint32(0, val, true);
        this.segments.push(arr);
        this.totalLen += 4;
    }
    pushUInt64(val) {
        let arr = new Uint8Array(8);
        let view = new DataView(arr.buffer);
        view.setUint32(0, val.low, true);
        view.setUint32(4, val.high, true);
        this.segments.push(arr);
        this.totalLen += 8;
    }
    pushUGID(val) {
        this.pushUInt16(12);
        this.pushUInt32(val.sid);
        this.pushUInt32(val.appId);
        this.pushUInt32(val.channelId);
    }
    pushUint8Array(val) {
        this.pushUInt16(val.length);
        this.segments.push(val);
        this.totalLen += val.length;
    }
    pushUint8ArrayWithoutLen(val) {
        this.segments.push(val);
        this.totalLen += val.length;
    }
    pushUint8Array32(val) {
        this.pushUInt32(val.length);
        this.segments.push(val);
        this.totalLen += val.length;
    }
    pushUIntArray(val) {
        this.pushUInt32(val.length);
        for (let i = 0; i < val.length; i++) {
            this.pushUInt32(val[i]);
        }
    }
    pushString(val) {
        this.pushUInt16(val.length);
        let uint8 = new Uint8Array(val.length);
        let view = new DataView(uint8.buffer);
        for (let i = 0; i < val.length; ++i) {
            view.setUint8(i, val.charCodeAt(i));
        }
        this.segments.push(uint8);
        this.totalLen += val.length;
    }
    pushString32(val) {
        this.pushUInt32(val.length);
        let uint8 = new Uint8Array(val.length);
        let view = new DataView(uint8.buffer);
        for (let i = 0; i < val.length; ++i) {
            view.setUint8(i, val.charCodeAt(i));
        }
        this.segments.push(uint8);
        this.totalLen += val.length;
    }
    pushUInt32AndUInt32Map(map) {
        this.pushUInt32(map.size);
        for (let kv of map) {
            this.pushUInt32(kv[0]);
            this.pushUInt32(kv[1]);
        }
    }
    //先对字符串进行utf8编码，然后序列化为2个字节表示长度的字节流
    pushUtf8String(str) {
        let temp = UtfUtil_1.default.encodeUtf8(str);
        this.pushUint8Array(temp);
    }
    //先对字符串进行utf8编码，然后序列化为4个字节表示长度的字节流
    pushUtf8String32(str) {
        let temp = UtfUtil_1.default.encodeUtf8(str);
        this.pushUint8Array32(temp);
    }
}
exports.default = ProtoMarshall;


/***/ }),

/***/ "./src/protobase/ProtoUGID.ts":
/*!************************************!*\
  !*** ./src/protobase/ProtoUGID.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * usergroupid subsid + appid + channelid 过渡期channelid=videotype
 */
class ProtoUGID {
    constructor(sid = 0, appId = 0, channelId = 0) {
        this.sid = sid;
        this.appId = appId;
        this.channelId = channelId; //过渡阶段值为videoType
    }
    fromString(keyString) {
        this.sid = 0;
        this.appId = 0;
        this.channelId = 0; //过渡阶段值为videoType
        if (keyString.toString().indexOf('-') !== -1) {
            let arr = keyString.split('-');
            this.sid = parseInt(arr[0]) || 0;
            this.appId = parseInt(arr[1]) || 0;
            this.channelId = parseInt(arr[2]) || 0;
            return true;
        }
        return false;
    }
    toString() {
        return this.sid + '-' + this.appId + '-' + this.channelId;
    }
    equal(other) {
        return this.toString() === other.toString();
    }
    toBigint() {
        return this.sid * 4294967296 + this.appId;
    }
}
exports.default = ProtoUGID;


/***/ }),

/***/ "./src/protobase/ProtoUInt64.ts":
/*!**************************************!*\
  !*** ./src/protobase/ProtoUInt64.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
* uint64
*/
class ProtoUInt64 {
    constructor(high = 0, low = 0) {
        this.high = high;
        this.low = low;
    }
    destroy() {
    }
    equal(other) {
        if (other === null) {
            return false;
        }
        return (this.low === other.low && this.high === other.high);
    }
    toString64() {
        let highStr = Number(this.high).toString(16);
        let lowStr = Number(this.low).toString(16);
        if (lowStr.length < 8) {
            let addCnt = 8 - lowStr.length;
            while (addCnt) {
                lowStr = '0' + lowStr;
                addCnt--;
            }
        }
        return highStr + lowStr;
    }
}
exports.default = ProtoUInt64;


/***/ }),

/***/ "./src/protobase/ProtoUnmarshall.ts":
/*!******************************************!*\
  !*** ./src/protobase/ProtoUnmarshall.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * proto unmarshall
 */
const ProtoUInt64_1 = __webpack_require__(/*! ./ProtoUInt64 */ "./src/protobase/ProtoUInt64.ts");
const ProtoUGID_1 = __webpack_require__(/*! ./ProtoUGID */ "./src/protobase/ProtoUGID.ts");
const UtfUtil_1 = __webpack_require__(/*! ../utils/UtfUtil */ "./src/utils/UtfUtil.ts");
class ProtoUnmarshall {
    constructor(view, hasHeader = true) {
        this.view = view;
        this.pos = 0;
        this.len = 0;
        this.uri = 0;
        this.resCode = 0;
        if (hasHeader === true) {
            this.len = this.popUInt32();
            this.uri = this.popUInt32();
            this.resCode = this.popUInt16();
        }
    }
    destroy() {
    }
    bytesAvailable() {
        return this.view.byteLength - this.pos;
    }
    popBool() {
        if (this.pos + 1 > this.view.byteLength) {
            return false;
        }
        let val = this.view.getUint8(this.pos);
        this.pos++;
        return val.toString() === '1';
    }
    popUInt8() {
        if (this.pos + 1 > this.view.byteLength) {
            return 0;
        }
        let val = this.view.getUint8(this.pos);
        this.pos++;
        return val;
    }
    popUInt16() {
        if (this.pos + 2 > this.view.byteLength) {
            return 0;
        }
        let val = this.view.getUint16(this.pos, true);
        this.pos += 2;
        return val;
    }
    popUInt32() {
        if (this.pos + 4 > this.view.byteLength) {
            return 0;
        }
        let val = this.view.getUint32(this.pos, true);
        this.pos += 4;
        return val;
    }
    popUInt64() {
        if (this.pos + 8 > this.view.byteLength) {
            return new ProtoUInt64_1.default();
        }
        let low = this.view.getUint32(this.pos, true);
        this.pos += 4;
        let high = (this.view.getUint32(this.pos, true));
        this.pos += 4;
        return new ProtoUInt64_1.default(high, low);
    }
    popUGID() {
        let len = this.popUInt16();
        let sid = this.popUInt32();
        let appid = this.popUInt32();
        let channelid = this.popUInt32();
        return new ProtoUGID_1.default(sid, appid, channelid);
    }
    popUint8Array() {
        let len = this.popUInt16();
        if (this.pos + len > this.view.byteLength) {
            return null;
        }
        let arr = new Uint8Array(this.view.buffer, this.pos, len);
        this.pos += len;
        return arr;
    }
    popUint8Array32() {
        let len = this.popUInt32();
        if ((this.pos + len) > this.view.byteLength) {
            return null;
        }
        let arr = new Uint8Array(this.view.buffer, this.pos, len);
        this.pos += len;
        return arr;
    }
    popUInt32Vector() {
        let len = this.popUInt32();
        if ((this.pos + (len * 4)) > this.view.byteLength) {
            return null;
        }
        let arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(this.popUInt32());
        }
        return arr;
    }
    popUInt16Vector() {
        let len = this.popUInt32();
        if ((this.pos + (len * 2)) > this.view.byteLength) {
            return null;
        }
        let arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(this.popUInt16());
        }
        return arr;
    }
    popString() {
        let len = this.popUInt16();
        if (this.pos + len > this.view.byteLength) {
            return null;
        }
        let str = '';
        for (let i = 0; i < len; ++i) {
            str += String.fromCharCode(this.popUInt8());
        }
        return str;
    }
    //先取出2个字节表示长度的字节流，返回utf8解码后的字符串
    popUtf8String() {
        let temp = this.popUint8Array();
        return UtfUtil_1.default.decodeUtf8(temp);
    }
    //先取出4个字节表示长度的字节流，返回utf8解码后的字符串
    popUtf8String32() {
        let temp = this.popUint8Array32();
        return UtfUtil_1.default.decodeUtf8(temp);
    }
}
exports.default = ProtoUnmarshall;


/***/ }),

/***/ "./src/protobase/uri.ts":
/*!******************************!*\
  !*** ./src/protobase/uri.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    //login service ap req
    PSvcLoginReqURI: (5651 << 8 | 88),
    //login service ap res
    PSvcLoginResURI: (5652 << 8 | 88),
    //logout service ap req
    PSvcLogoutReqURI: (5653 << 8 | 88),
    //logout service ap res
    PSvcLogoutResURI: (5654 << 8 | 88),
    //ping service ap
    PSvcPingURI: (5655 << 8 | 88),
    //service ap ping res
    PSvcPongURI: (5656 << 8 | 88),
    //强制下线
    PAPForceOutURI: (5657 << 8 | 88),
    //route
    PSvcRouteReqURI: (5661 << 8 | 88),
    //route res
    PSvcRouteResURI: (5662 << 8 | 88),
    //单播
    PSvcUnicastURI: (5663 << 8 | 88),
    //单播响应
    PSvcUnicastResURI: (5664 << 8 | 88),
    //订阅广播组
    PSvcSubsGroupReqURI: (5665 << 8 | 88),
    //订阅广播组响应
    PSvcSubsGroupResURI: (5666 << 8 | 88),
    //广播
    PSvcBroadcastURI: (5667 << 8 | 88),
    /* signal新增广播协议 */
    //订阅广播组
    PCS_ServiceSubcribeUserGroupV2URI: (5673 << 8 | 88),
    //订阅广播组响应
    PCS_ServiceSubcribeUserGroupResV2URI: (5674 << 8 | 88),
    //广播
    PCS_ServiceBroadCastV2URI: (5675 << 8 | 88),
    // 用户数变更
    PCS_UserGroupChangeBcURI: (13376 << 8 | 205),
    //通用鉴权响应
    CommonAuthOpsResURI: (1000 << 8 | 205),
    //实名进频道
    PJoinChannelReqURI: (1001 << 8 | 205),
    //实名退频道
    PLeaveChannelReqURI: (1003 << 8) | 205,
    //公屏
    PTextChatReqURI: (1020 << 8 | 205),
    //公屏广播
    PTextChatBroadResURI: (1021 << 8 | 205),
    //频道信息广播
    PChlInfoUpdateBcURI: (1050 << 8 | 205),
    //踢出频道广告
    PKickOffUserBcURI: (1053 << 8 | 205),
    //禁言或者解禁广播
    DisableUserTextBcURI: (1055 << 8 | 205),
    //禁止频道发言广播
    DisableChannelTextBcURI: (1057 << 8 | 205),
    //匿名进频道
    PAnonJoinChannelReqURI: (1100 << 8 | 205),
    //匿名退频道
    PAnonLeaveChannelReqURI: (1101 << 8 | 205),
    // chatroom
    PCS_DismissChatRoomBcURI: (1055 << 8 | 205),
    PCS_UpdateChatRoomInfoBcURI: (1056 << 8 | 205),
    PCS_UpdateChatRoomRolerBcURI: (1057 << 8 | 205),
    PCS_KickOffUserBcURI: (1058 << 8 | 205),
    PCS_SendBroadcastBcURI: (1060 << 8 | 205),
    PCS_TextChatBcURI: (3022 << 8 | 205),
    PCS_ChatRoomUserCountBcURI: (13364 << 8 | 205),
    PCS_ChatRoomUserBcURI: (13374 << 8 | 205),
    PCS_SendUnicastUcURI: (2054 << 8 | 205),
    PCS_UserInfoChangeBcURI: (1063 << 8 | 205),
    //通过lbs获取ap信息req
    PGetApInfoReqURI: (115 << 8 | 30),
    //通过lbs获取ap信息res
    PGetApInfoResURI: (116 << 8 | 30),
    //查用户信息req
    PGetUserInfoReqURI: (102 << 8 | 3),
    //查用户信息res
    PGetUserInfoResURI: (103 << 8) | 3,
    //查频道信息req
    PGetChannelInfoReqURI: (93 << 8 | 7),
    //查频道信息res
    PGetChannelInfoResURI: (94 << 8 | 7),
    //频道人数
    PPushChannelUserCountURI: (12264 << 8 | 2),
    //pb login res （pbloginres没有uri，虚拟的）
    PLoginUdbResURI: 0xFFFFFFFF
};


/***/ }),

/***/ "./src/protocol/PAPForceOut.ts":
/*!*************************************!*\
  !*** ./src/protocol/PAPForceOut.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
class PAPForceOut {
    constructor() {
        this.uid = null;
        this.appid = 0;
        this.instId = 0;
        this.code = 0;
        this.desc = "";
    }
    unmarshall(ush) {
        let uidL = ush.popUInt64();
        this.uid = new Long(uidL.low, uidL.high, true).toString();
        this.appid = ush.popUInt32();
        this.instId = ush.popUInt32();
        this.code = ush.popUInt32();
        this.desc = ush.popString();
    }
}
exports.default = PAPForceOut;
// 强制下线(连接保留)
// struct PCS_ServiceForceOut : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5657 << 8 | SERVICE_SVID)};
//     PCS_ServiceForceOut():uid(0),appid(0),instid(0),code(0){}
//     uint64_t uid; // [必填] 校验用
//     uint32_t appid; // [必填]
//     uint32_t instid; // [必填]
//     uint32_t code; // [必填]下线原因分类码
//     std::string desc; // [可选]下线原因描述
//     virtual void marshal(Pack &pk) const {
//         pk << uid;
//         pk << appid;
//         pk << instid;
//         pk << code;
//         pk << desc;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> uid;
//         up >> appid;
//         up >> instid;
//         up >> code;
//         up >> desc;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, uid);
//         JSONPUSH(jpk, appid);
//         JSONPUSH(jpk, instid);
//         JSONPUSH(jpk, code);
//         JSONPUSH(jpk, desc);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, uid);
//         JSONPOP(jup, appid);
//         JSONPOP(jup, instid);
//         JSONPOP(jup, code);
//         JSONPOP(jup, desc);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, uid, level);
//         YFDUMP(ss, appid, level);
//         YFDUMP(ss, instid, level);
//         YFDUMP(ss, code, level);
//         YFDUMP(ss, desc, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcBroadcast.ts":
/*!***************************************!*\
  !*** ./src/protocol/PSvcBroadcast.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PSvcBroadcast {
    constructor() {
        this.appid = 0;
        this.groupType = null;
        this.groupId = null;
        this.svcName = "";
        this.fnName = "";
        this.protoType = "";
        this.data = null;
        this.dataCRC = 0;
        this.serverId = null;
        this.seqId = null;
        this.traceId = "";
    }
    unmarshall(ush) {
        this.appid = ush.popUInt32();
        this.groupType = ush.popUInt64();
        this.groupId = ush.popUInt64();
        this.svcName = ush.popString();
        this.fnName = ush.popString();
        this.protoType = ush.popString();
        this.data = ush.popUint8Array32();
        this.dataCRC = ush.popUInt32();
        this.serverId = ush.popUInt64();
        this.seqId = ush.popUInt64();
        this.traceId = ush.popString();
    }
    toString() {
        //不打印data字段
        return "appid=" + this.appid + " groupType=" + JSON.stringify(this.groupType) + " groupId=" + JSON.stringify(this.groupId)
            + " svcName=" + this.svcName + " fnName=" + this.fnName + " protoType=" + this.protoType
            + " dataCRC=" + this.dataCRC + " serverId=" + JSON.stringify(this.serverId) + " seqId=" + JSON.stringify(this.seqId)
            + " traceId=" + this.traceId;
    }
}
exports.default = PSvcBroadcast;
// 广播接口
// struct PCS_ServiceBroadCast : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5667 << 8 | SERVICE_SVID)};
//     PCS_ServiceBroadCast():appid(0),dataCRC(0),serverId(0),seqId(0){}
//     uint32_t appid; // [必填] 应用标识
//     UserGroupIdType ugid; // [必填] 广播组
//     std::string serviceName; // [必填]业务路由配置依据(大类)(合法字符[0-9a-zA-Z])
//     std::string functionName; // [可选]业务路由配置依据(小类)(合法字符[0-9a-zA-Z])
//     std::string protoType; // [可选]协议类型
//     PACK_LEN_U32(); std::string data; // [必填]业务包
//     uint32_t dataCRC; // [必填]业务包32位CRC校验
//     // 多路去重
//     uint64_t serverId; // 发起广播进程标识
//     uint64_t seqId; // 序号
//     std::string traceId; // [必填]追踪监控用
//     virtual void marshal(Pack &pk) const {
//         pk << appid;
//         pk << ugid;
//         pk << serviceName;
//         pk << functionName;
//         pk << protoType;
//         PACK_STR_L32(pk, data);
//         pk << dataCRC;
//         pk << serverId;
//         pk << seqId;
//         pk << traceId;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> appid;
//         up >> ugid;
//         up >> serviceName;
//         up >> functionName;
//         up >> protoType;
//         UNPACK_STR_L32(up, data);
//         up >> dataCRC;
//         up >> serverId;
//         up >> seqId;
//         up >> traceId;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, appid);
//         JSONPUSH(jpk, ugid);
//         JSONPUSH(jpk, serviceName);
//         JSONPUSH(jpk, functionName);
//         JSONPUSH(jpk, protoType);
//         JSONPUSH(jpk, data);
//         JSONPUSH(jpk, dataCRC);
//         JSONPUSH(jpk, serverId);
//         JSONPUSH(jpk, seqId);
//         JSONPUSH(jpk, traceId);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, appid);
//         JSONPOP(jup, ugid);
//         JSONPOP(jup, serviceName);
//         JSONPOP(jup, functionName);
//         JSONPOP(jup, protoType);
//         JSONPOP(jup, data);
//         JSONPOP(jup, dataCRC);
//         JSONPOP(jup, serverId);
//         JSONPOP(jup, seqId);
//         JSONPOP(jup, traceId);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, appid, level);
//         YFDUMP(ss, ugid, level);
//         YFDUMP(ss, serviceName, level);
//         YFDUMP(ss, functionName, level);
//         YFDUMP(ss, protoType, level);
//         YFDUMP(ss, data, level);
//         YFDUMP(ss, dataCRC, level);
//         YFDUMP(ss, serverId, level);
//         YFDUMP(ss, seqId, level);
//         YFDUMP(ss, traceId, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcLoginReq.ts":
/*!**************************************!*\
  !*** ./src/protocol/PSvcLoginReq.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProtoMarshall_1 = __webpack_require__(/*! ../protobase/ProtoMarshall */ "./src/protobase/ProtoMarshall.ts");
const uri_1 = __webpack_require__(/*! ../protobase/uri */ "./src/protobase/uri.ts");
const Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
class PSvcLoginReq {
    constructor() {
        this.context = "";
        this.uid = '';
        this.appid = 0;
        this.instId = 0;
        this.seqId = 0;
        this.user = "";
        this.password = "";
        this.otp = "";
        this.clientHeaders = new Map();
        this.tokenType = 0;
        this.traceId = "";
    }
    marshall() {
        let msh = new ProtoMarshall_1.default();
        msh.setUri(uri_1.default.PSvcLoginReqURI);
        msh.pushString(this.context);
        let uidL = Long.fromString(this.uid);
        msh.pushUInt32(uidL.low);
        msh.pushUInt32(uidL.high);
        msh.pushUInt32(this.appid);
        msh.pushUInt32(this.instId);
        let seqIdL = Long.fromString(this.seqId.toString());
        msh.pushUInt32(seqIdL.low);
        msh.pushUInt32(seqIdL.high);
        msh.pushString(this.user);
        msh.pushString(this.password);
        msh.pushString(this.otp);
        msh.pushUInt32(this.clientHeaders.size);
        for (let [k, v] of this.clientHeaders) {
            msh.pushString(k);
            msh.pushString(v);
        }
        msh.pushUInt32(this.tokenType);
        msh.pushString(this.traceId);
        return msh.marshall();
    }
}
exports.default = PSvcLoginReq;
// 登陆ap
// struct PCS_ServiceLoginRequest : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5651 << 8 | SERVICE_SVID)};
//     PCS_ServiceLoginRequest():uid(0),appid(0),instid(0),seqId(0){}
//     std::string context; // [可选]如无外层包，必需提供上下文字段
//     uint64_t uid; // [必填] 匿名填0
//     uint32_t appid; // [必填]
//     uint32_t instid; // [必填]
//     uint64_t seqId; // [必填] 每次发login后递增(无论成功失败)，方便统计
//     std::string user; // [必填] 用户名
//     std::string password; // [必填] 密码hash
//     std::string token; // [必填] otp票据
//     std::map<std::string, std::string> clientHeaders;  // [可选] 填imei/终端类型/sdk版本/应用版本...
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//         pk << uid;
//         pk << appid;
//         pk << instid;
//         pk << seqId;
//         pk << user;
//         pk << password;
//         pk << token;
//         pk << clientHeaders;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//         up >> uid;
//         up >> appid;
//         up >> instid;
//         up >> seqId;
//         up >> user;
//         up >> password;
//         up >> token;
//         up >> clientHeaders;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//         JSONPUSH(jpk, uid);
//         JSONPUSH(jpk, appid);
//         JSONPUSH(jpk, instid);
//         JSONPUSH(jpk, seqId);
//         JSONPUSH(jpk, user);
//         JSONPUSH(jpk, password);
//         JSONPUSH(jpk, token);
//         JSONPUSH(jpk, clientHeaders);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//         JSONPOP(jup, uid);
//         JSONPOP(jup, appid);
//         JSONPOP(jup, instid);
//         JSONPOP(jup, seqId);
//         JSONPOP(jup, user);
//         JSONPOP(jup, password);
//         JSONPOP(jup, token);
//         JSONPOP(jup, clientHeaders);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         YFDUMP(ss, uid, level);
//         YFDUMP(ss, appid, level);
//         YFDUMP(ss, instid, level);
//         YFDUMP(ss, seqId, level);
//         YFDUMP(ss, user, level);
//         YFDUMP(ss, password, level);
//         YFDUMP(ss, token, level);
//         YFDUMP(ss, clientHeaders, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcLoginRes.ts":
/*!**************************************!*\
  !*** ./src/protocol/PSvcLoginRes.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PSvcLoginRes {
    constructor() {
        this.context = "";
        this.resCode = 0;
        this.resMsg = "";
        this.serverHeaders = new Map();
    }
    unmarshall(ush) {
        this.context = ush.popString();
        this.resCode = ush.popUInt32();
        this.resMsg = ush.popString();
        let size = ush.popUInt32();
        for (let i = 0; i < size; i++) {
            let k = ush.popString();
            let v = ush.popString();
            this.serverHeaders.set(k, v);
        }
    }
}
exports.default = PSvcLoginRes;
// struct PCS_ServiceLoginResponse : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5652 << 8 | SERVICE_SVID)};
//     PCS_ServiceLoginResponse():rescode(0){}
//     std::string context; // [可选]如无外层包，必需提供上下文字段
//     uint32_t rescode; // [必填]返回码
//     std::string resMsg; // [可选]返回码描述
//     std::map<std::string, std::string> serverHeaders;  // [可选] 填用户ip/port/服务器时间戳...
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//         pk << rescode;
//         pk << resMsg;
//         pk << serverHeaders;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//         up >> rescode;
//         up >> resMsg;
//         up >> serverHeaders;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//         JSONPUSH(jpk, rescode);
//         JSONPUSH(jpk, resMsg);
//         JSONPUSH(jpk, serverHeaders);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//         JSONPOP(jup, rescode);
//         JSONPOP(jup, resMsg);
//         JSONPOP(jup, serverHeaders);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         YFDUMP(ss, rescode, level);
//         YFDUMP(ss, resMsg, level);
//         YFDUMP(ss, serverHeaders, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcLogoutReq.ts":
/*!***************************************!*\
  !*** ./src/protocol/PSvcLogoutReq.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProtoMarshall_1 = __webpack_require__(/*! ../protobase/ProtoMarshall */ "./src/protobase/ProtoMarshall.ts");
const uri_1 = __webpack_require__(/*! ../protobase/uri */ "./src/protobase/uri.ts");
const Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
class PSvcLogoutReq {
    constructor() {
        this.context = "";
        this.uid = '';
        this.appid = 0;
        this.instId = 0;
    }
    marshall() {
        let msh = new ProtoMarshall_1.default();
        msh.setUri(uri_1.default.PSvcLogoutReqURI);
        msh.pushString(this.context);
        let uidL = Long.fromString(this.uid);
        msh.pushUInt32(uidL.low);
        msh.pushUInt32(uidL.high);
        msh.pushUInt32(this.appid);
        msh.pushUInt32(this.instId);
        return msh.marshall();
    }
}
exports.default = PSvcLogoutReq;
// 登出ap(tcp连接可保持)
// struct PCS_ServiceLogoutRequest : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5653 << 8 | SERVICE_SVID)};
//     PCS_ServiceLogoutRequest():uid(0),appid(0),instid(0){}
//     std::string context; // [可选]如无外层包，必需提供上下文字段
//     uint64_t uid; // [必填] 校验用
//     uint32_t appid; // [必填]
//     uint32_t instid; // [必填]
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//         pk << uid;
//         pk << appid;
//         pk << instid;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//         up >> uid;
//         up >> appid;
//         up >> instid;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//         JSONPUSH(jpk, uid);
//         JSONPUSH(jpk, appid);
//         JSONPUSH(jpk, instid);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//         JSONPOP(jup, uid);
//         JSONPOP(jup, appid);
//         JSONPOP(jup, instid);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         YFDUMP(ss, uid, level);
//         YFDUMP(ss, appid, level);
//         YFDUMP(ss, instid, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcLogoutRes.ts":
/*!***************************************!*\
  !*** ./src/protocol/PSvcLogoutRes.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PSvcLogoutRes {
    constructor() {
        this.context = "";
        this.resCode = 0;
        this.resMsg = "";
    }
    unmarshall(ush) {
        this.context = ush.popString();
        this.resCode = ush.popUInt32();
        this.resMsg = ush.popString();
    }
}
exports.default = PSvcLogoutRes;
// struct PCS_ServiceLogoutResponse : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5654 << 8 | SERVICE_SVID)};
//     PCS_ServiceLogoutResponse():rescode(0){}
//     std::string context; // [可选]如无外层包，必需提供上下文字段
//     uint32_t rescode; // [必填]返回码
//     std::string resMsg; // [可选]返回码描述
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//         pk << rescode;
//         pk << resMsg;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//         up >> rescode;
//         up >> resMsg;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//         JSONPUSH(jpk, rescode);
//         JSONPUSH(jpk, resMsg);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//         JSONPOP(jup, rescode);
//         JSONPOP(jup, resMsg);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         YFDUMP(ss, rescode, level);
//         YFDUMP(ss, resMsg, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcPing.ts":
/*!**********************************!*\
  !*** ./src/protocol/PSvcPing.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProtoMarshall_1 = __webpack_require__(/*! ../protobase/ProtoMarshall */ "./src/protobase/ProtoMarshall.ts");
const uri_1 = __webpack_require__(/*! ../protobase/uri */ "./src/protobase/uri.ts");
class PSvcPing {
    constructor() {
        this.context = "";
    }
    marshall() {
        let msh = new ProtoMarshall_1.default();
        msh.setUri(uri_1.default.PSvcPingURI);
        msh.pushString(this.context);
        return msh.marshall();
    }
}
exports.default = PSvcPing;
// 连接保活
// struct PCS_ServicePingRequest : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5655 << 8 | SERVICE_SVID)};
//     std::string context; // [可选]如无外层包，必需提供上下文字段
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcPong.ts":
/*!**********************************!*\
  !*** ./src/protocol/PSvcPong.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PSvcPong {
    constructor() {
        this.context = "";
        this.timestamp = null;
    }
    unmarshall(ush) {
        this.context = ush.popString();
        this.timestamp = ush.popUInt64();
    }
}
exports.default = PSvcPong;
// 连接保活
// struct PCS_ServicePingResponse : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5656 << 8 | SERVICE_SVID)};
//     PCS_ServicePingResponse():timestamp(0){}
//     std::string context; // [可选]如无外层包，必需提供上下文字段
//     uint64_t timestamp; // [必填]服务器时间戳
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//         pk << timestamp;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//         up >> timestamp;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//         JSONPUSH(jpk, timestamp);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//         JSONPOP(jup, timestamp);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         YFDUMP(ss, timestamp, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcRouteReq.ts":
/*!**************************************!*\
  !*** ./src/protocol/PSvcRouteReq.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProtoMarshall_1 = __webpack_require__(/*! ../protobase/ProtoMarshall */ "./src/protobase/ProtoMarshall.ts");
const uri_1 = __webpack_require__(/*! ../protobase/uri */ "./src/protobase/uri.ts");
const Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
class PSvcRouteReq {
    constructor() {
        this.context = "";
        this.uid = "0";
        this.appid = 0;
        this.instId = 0;
        this.svcName = "";
        this.fnName = "";
        this.protoType = "";
        this.data = null;
        this.dataCRC = 0;
        this.routeArgs = new Map();
        this.clientHeaders = new Map();
        this.traceId = "";
    }
    marshall() {
        let msh = new ProtoMarshall_1.default();
        msh.setUri(uri_1.default.PSvcRouteReqURI);
        msh.pushString(this.context);
        let uidL = Long.fromString(this.uid);
        msh.pushUInt32(uidL.low);
        msh.pushUInt32(uidL.high);
        msh.pushUInt32(this.appid);
        msh.pushUInt32(this.instId);
        msh.pushString(this.svcName);
        msh.pushString(this.fnName);
        msh.pushString(this.protoType);
        if (typeof (this.data) == 'string') {
            msh.pushString32(this.data);
        }
        else {
            msh.pushUint8Array32(this.data);
        }
        msh.pushUInt32(this.dataCRC);
        msh.pushUInt32(this.routeArgs.size);
        for (let [k, v] of this.routeArgs) {
            msh.pushString(k);
            msh.pushString(v);
        }
        msh.pushUInt32(this.clientHeaders.size);
        for (let [k, v] of this.clientHeaders) {
            msh.pushString(k);
            msh.pushString(v);
        }
        msh.pushString(this.traceId);
        return msh.marshall();
    }
    //输出调试信息
    toString() {
        return ("context=" + this.context + " uid=" + this.uid + " appid=" + this.appid + " instId=" + this.instId + " svcName=" + this.svcName
            + " fnName=" + this.fnName + " traceId=" + this.traceId + " clientHeaders=" + utils_1.default.stringfyMap(this.clientHeaders));
    }
}
exports.default = PSvcRouteReq;
// 上下行接口
// 支持匿名请求，可路由到受限的服务(udb)(只读公开信息)
// 通道会检查uid
// 15s 超时
// struct PCS_ServiceRouteRequest : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5661 << 8 | SERVICE_SVID)};
//     PCS_ServiceRouteRequest():uid(0),appid(0),instid(0),dataCRC(0){}
//     std::string context; // [可选]如无外层包，必需提供上下文字段
//     uint64_t uid; // [必填] 匿名填0
//     uint32_t appid; // [必填]
//     uint32_t instid; // [必填]
//     std::string serviceName; // [必填]业务路由配置依据(大类)(合法字符[0-9a-zA-Z])
//     std::string functionName; // [可选]业务路由配置依据(小类)(合法字符[0-9a-zA-Z])
//     std::string protoType; // [可选]协议类型
//     PACK_LEN_U32(); std::string data; // [必填]业务包
//     uint32_t dataCRC; // [必填]业务包32位CRC校验
//     // [可选]路由参数(相当于http请求'?'后面的参数)
//     // key: 路由配置管理后台里用到的字段；(合法字符[_0-9a-zA-Z])
//     // value: 字段值；(合法字符 URL安全字符集)
//     // 例如业务希望能用频道id作为哈希路由的key，可以让客户端填 ”topsid”:”12345678”；
//     // 管理后台相应配置”topsid”
//     std::map<std::string, std::string> routeArgs;
//     // [可选]客户端信息(相当于http请求的header)
//     // key: (合法字符 URL安全字符集)
//     // value: (合法字符 URL安全字符集)
//     // 接入点会修改
//     // 暂不支持相同key
//     std::map<std::string, std::string> clientHeaders; 
//     std::string traceId; // [必填]追踪监控用
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//         pk << uid;
//         pk << appid;
//         pk << instid;
//         pk << serviceName;
//         pk << functionName;
//         pk << protoType;
//         PACK_STR_L32(pk, data);
//         pk << dataCRC;
//         pk << routeArgs;
//         pk << clientHeaders;
//         pk << traceId;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//         up >> uid;
//         up >> appid;
//         up >> instid;
//         up >> serviceName;
//         up >> functionName;
//         up >> protoType;
//         UNPACK_STR_L32(up, data);
//         up >> dataCRC;
//         up >> routeArgs;
//         up >> clientHeaders;
//         up >> traceId;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//         JSONPUSH(jpk, uid);
//         JSONPUSH(jpk, appid);
//         JSONPUSH(jpk, instid);
//         JSONPUSH(jpk, serviceName);
//         JSONPUSH(jpk, functionName);
//         JSONPUSH(jpk, protoType);
//         JSONPUSH(jpk, data);
//         JSONPUSH(jpk, dataCRC);
//         JSONPUSH(jpk, routeArgs);
//         JSONPUSH(jpk, clientHeaders);
//         JSONPUSH(jpk, traceId);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//         JSONPOP(jup, uid);
//         JSONPOP(jup, appid);
//         JSONPOP(jup, instid);
//         JSONPOP(jup, serviceName);
//         JSONPOP(jup, functionName);
//         JSONPOP(jup, protoType);
//         JSONPOP(jup, data);
//         JSONPOP(jup, dataCRC);
//         JSONPOP(jup, routeArgs);
//         JSONPOP(jup, clientHeaders);
//         JSONPOP(jup, traceId);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         YFDUMP(ss, uid, level);
//         YFDUMP(ss, appid, level);
//         YFDUMP(ss, instid, level);
//         YFDUMP(ss, serviceName, level);
//         YFDUMP(ss, functionName, level);
//         YFDUMP(ss, protoType, level);
//         YFDUMP(ss, data, level);
//         YFDUMP(ss, dataCRC, level);
//         YFDUMP(ss, routeArgs, level);
//         YFDUMP(ss, clientHeaders, level);
//         YFDUMP(ss, traceId, level);
//         return ss;
//     }
// };
//------------------------------------------------------------PCS_ServiceRouteRequest//


/***/ }),

/***/ "./src/protocol/PSvcRouteRes.ts":
/*!**************************************!*\
  !*** ./src/protocol/PSvcRouteRes.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
class PSvcRouteRes {
    constructor() {
        this.context = "";
        this.resCode = 0;
        this.resMsg = "";
        this.svcName = "";
        this.fnName = "";
        this.protoType = "";
        this.data = null;
        this.dataCRC = 0;
        this.serverHeaders = new Map();
        this.traceId = "";
    }
    unmarshall(ush) {
        this.context = ush.popString();
        this.resCode = ush.popUInt32();
        this.resMsg = ush.popString();
        this.svcName = ush.popString();
        this.fnName = ush.popString();
        this.protoType = ush.popString();
        this.data = ush.popUint8Array32();
        this.dataCRC = ush.popUInt32();
        let size = ush.popUInt32();
        for (let i = 0; i < size; i++) {
            this.serverHeaders.set(ush.popString(), ush.popString());
        }
        this.traceId = ush.popString();
    }
    toString() {
        return ("context=" + this.context + " resCode=" + this.resCode + " resMsg=" + this.resMsg + " svcName=" + this.svcName
            + " fnName=" + this.fnName + " traceId=" + this.traceId + " serverHeaders=" + utils_1.default.stringfyMap(this.serverHeaders));
    }
}
exports.default = PSvcRouteRes;
// struct PCS_ServiceRouteResponse : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5662 << 8 | SERVICE_SVID)};
//     PCS_ServiceRouteResponse():rescode(0),dataCRC(0){}
//     std::string context; // [可选]回填Request上下文
//     uint32_t rescode; // [必填]返回码
//     std::string resMsg; // [可选]返回码描述
//     // 若超时无回复，以下字段填空返回
//     std::string serviceName; // [必填]业务路由配置依据(大类)(合法字符[0-9a-zA-Z])
//     std::string functionName; // [可选]业务路由配置依据(小类)(合法字符[0-9a-zA-Z])
//     std::string protoType; // [可选]协议类型
//     PACK_LEN_U32(); std::string data; // [必填]业务包
//     uint32_t dataCRC; // [必填]业务包32位CRC校验
//     // [可选]服务端信息(相当于http回复的header)
//     // key: (合法字符 URL安全字符集)
//     // value: (合法字符 URL安全字符集)
//     // 暂不支持相同key
//     std::map<std::string, std::string> serverHeaders; 
//     std::string traceId; // [必填]追踪监控用
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//         pk << rescode;
//         pk << resMsg;
//         pk << serviceName;
//         pk << functionName;
//         pk << protoType;
//         PACK_STR_L32(pk, data);
//         pk << dataCRC;
//         pk << serverHeaders;
//         pk << traceId;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//         up >> rescode;
//         up >> resMsg;
//         up >> serviceName;
//         up >> functionName;
//         up >> protoType;
//         UNPACK_STR_L32(up, data);
//         up >> dataCRC;
//         up >> serverHeaders;
//         up >> traceId;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//         JSONPUSH(jpk, rescode);
//         JSONPUSH(jpk, resMsg);
//         JSONPUSH(jpk, serviceName);
//         JSONPUSH(jpk, functionName);
//         JSONPUSH(jpk, protoType);
//         JSONPUSH(jpk, data);
//         JSONPUSH(jpk, dataCRC);
//         JSONPUSH(jpk, serverHeaders);
//         JSONPUSH(jpk, traceId);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//         JSONPOP(jup, rescode);
//         JSONPOP(jup, resMsg);
//         JSONPOP(jup, serviceName);
//         JSONPOP(jup, functionName);
//         JSONPOP(jup, protoType);
//         JSONPOP(jup, data);
//         JSONPOP(jup, dataCRC);
//         JSONPOP(jup, serverHeaders);
//         JSONPOP(jup, traceId);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         YFDUMP(ss, rescode, level);
//         YFDUMP(ss, resMsg, level);
//         YFDUMP(ss, serviceName, level);
//         YFDUMP(ss, functionName, level);
//         YFDUMP(ss, protoType, level);
//         YFDUMP(ss, data, level);
//         YFDUMP(ss, dataCRC, level);
//         YFDUMP(ss, serverHeaders, level);
//         YFDUMP(ss, traceId, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcUnicast.ts":
/*!*************************************!*\
  !*** ./src/protocol/PSvcUnicast.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PSvcUnicast {
    constructor() {
        this.context = null; //std::string context
        this.uid = null; //uint64_t uid
        this.appid = 0; //uint32_t appid
        this.instId = 0; //uint32_t instid
        this.svcName = ""; //std::string serviceName
        this.fnName = ""; //std::string functionName
        this.protoType = ""; //std::string protoType
        this.data = null; //std::string data
        this.dataCRC = 0; //uint32_t dataCRC
        this.serverId = null; //uint64_t serverId 发起单播进程标识
        this.seqId = null; //uint64_t seqId 序号
        this.traceId = ""; //std::string 追踪监控用
    }
    unmarshall(ush) {
        this.context = ush.popString();
        this.uid = ush.popUInt64();
        this.appid = ush.popUInt32();
        this.instId = ush.popUInt32();
        this.svcName = ush.popString();
        this.fnName = ush.popString();
        this.protoType = ush.popString();
        this.data = ush.popUint8Array32();
        this.dataCRC = ush.popUInt32();
        this.serverId = ush.popUInt64();
        this.seqId = ush.popUInt64();
        this.traceId = ush.popString();
    }
    toString() {
        return ("context=" + this.context + " uid=" + JSON.stringify(this.uid) + " appid=" + this.appid + " instId=" + this.instId
            + " svcName=" + this.svcName + " fnName=" + this.fnName + " protoType=" + this.protoType
            + " dataCRC=" + this.dataCRC + " serverId=" + JSON.stringify(this.serverId) + " seqId=" + JSON.stringify(this.seqId)
            + " traceId=" + this.traceId);
    }
}
exports.default = PSvcUnicast;
// 单播接口
// struct PCS_ServiceUnicast : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5663 << 8 | SERVICE_SVID)};
//     PCS_ServiceUnicast():uid(0),appid(0),instid(0),dataCRC(0),serverId(0),seqId(0){}
//     std::string context; // [可选]回填Request上下文
//     uint64_t uid; // [可选] 日志统计，客户端校验
//     uint32_t appid; // [可选]
//     uint32_t instid; // [可选]
//     std::string serviceName; // [必填]业务路由配置依据(大类)(合法字符[0-9a-zA-Z])
//     std::string functionName; // [可选]业务路由配置依据(小类)(合法字符[0-9a-zA-Z])
//     std::string protoType; // [可选]协议类型
//     PACK_LEN_U32(); std::string data; // [必填]业务包
//     uint32_t dataCRC; // [必填]业务包32位CRC校验
//     // 多路去重
//     uint64_t serverId; // 发起单播进程标识
//     uint64_t seqId; // 序号
//     std::string traceId; // [必填]追踪监控用
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//         pk << uid;
//         pk << appid;
//         pk << instid;
//         pk << serviceName;
//         pk << functionName;
//         pk << protoType;
//         PACK_STR_L32(pk, data);
//         pk << dataCRC;
//         pk << serverId;
//         pk << seqId;
//         pk << traceId;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//         up >> uid;
//         up >> appid;
//         up >> instid;
//         up >> serviceName;
//         up >> functionName;
//         up >> protoType;
//         UNPACK_STR_L32(up, data);
//         up >> dataCRC;
//         up >> serverId;
//         up >> seqId;
//         up >> traceId;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//         JSONPUSH(jpk, uid);
//         JSONPUSH(jpk, appid);
//         JSONPUSH(jpk, instid);
//         JSONPUSH(jpk, serviceName);
//         JSONPUSH(jpk, functionName);
//         JSONPUSH(jpk, protoType);
//         JSONPUSH(jpk, data);
//         JSONPUSH(jpk, dataCRC);
//         JSONPUSH(jpk, serverId);
//         JSONPUSH(jpk, seqId);
//         JSONPUSH(jpk, traceId);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//         JSONPOP(jup, uid);
//         JSONPOP(jup, appid);
//         JSONPOP(jup, instid);
//         JSONPOP(jup, serviceName);
//         JSONPOP(jup, functionName);
//         JSONPOP(jup, protoType);
//         JSONPOP(jup, data);
//         JSONPOP(jup, dataCRC);
//         JSONPOP(jup, serverId);
//         JSONPOP(jup, seqId);
//         JSONPOP(jup, traceId);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         YFDUMP(ss, uid, level);
//         YFDUMP(ss, appid, level);
//         YFDUMP(ss, instid, level);
//         YFDUMP(ss, serviceName, level);
//         YFDUMP(ss, functionName, level);
//         YFDUMP(ss, protoType, level);
//         YFDUMP(ss, data, level);
//         YFDUMP(ss, dataCRC, level);
//         YFDUMP(ss, serverId, level);
//         YFDUMP(ss, seqId, level);
//         YFDUMP(ss, traceId, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/protocol/PSvcUnicastRes.ts":
/*!****************************************!*\
  !*** ./src/protocol/PSvcUnicastRes.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProtoMarshall_1 = __webpack_require__(/*! ../protobase/ProtoMarshall */ "./src/protobase/ProtoMarshall.ts");
const uri_1 = __webpack_require__(/*! ../protobase/uri */ "./src/protobase/uri.ts");
class PSvcUnicastRes {
    constructor() {
    }
    marshall() {
        let msh = new ProtoMarshall_1.default();
        msh.setUri(uri_1.default.PSvcUnicastResURI);
        msh.pushString(this.context);
        return msh.marshall();
    }
}
exports.default = PSvcUnicastRes;
// struct PCS_ServiceUnicastRes : public Marshallable, public JsonMarshable
// {
//     enum {uri = (5664 << 8 | SERVICE_SVID)};
//     std::string context; // [必填]回填PCS_ServiceUnicast上下文
//     virtual void marshal(Pack &pk) const {
//         pk << context;
//     }
//     virtual void unmarshal(const Unpack &up) {
//         up >> context;
//     }
//     virtual void jsonmarshal(JsonPack &jpk) const {
//         JSONPUSH(jpk, context);
//     }
//     virtual void jsonunmarshal(const JsonUnpack &jup) {
//         JSONPOP(jup, context);
//     }
//     virtual std::ostream & dumpToStream(std::ostream & ss, int level) const {
//         YFDUMP(ss, context, level);
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/signal_protocol/PCS_ServiceBroadCastV2.ts":
/*!*******************************************************!*\
  !*** ./src/signal_protocol/PCS_ServiceBroadCastV2.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PCS_ServiceBroadCastV2 {
    constructor() {
        this.appid = 0;
        this.ugid = "";
        this.svcName = "";
        this.fnName = "";
        this.protoType = "";
        this.data = null;
        this.dataCRC = 0;
        this.serverId = null;
        this.seqId = null;
        this.traceId = "";
    }
    unmarshall(ush) {
        this.appid = ush.popUInt32();
        this.ugid = ush.popString();
        this.svcName = ush.popString();
        this.fnName = ush.popString();
        this.protoType = ush.popString();
        this.data = ush.popUint8Array32();
        this.dataCRC = ush.popUInt32();
        this.serverId = ush.popUInt64();
        this.seqId = ush.popUInt64();
        this.traceId = ush.popString();
    }
    toString() {
        //不打印data字段
        return "appid=" + this.appid + " ugid=" + this.ugid
            + " svcName=" + this.svcName + " fnName=" + this.fnName + " protoType=" + this.protoType
            + " dataCRC=" + this.dataCRC + " serverId=" + JSON.stringify(this.serverId) + " seqId=" + JSON.stringify(this.seqId)
            + " traceId=" + this.traceId;
    }
}
exports.default = PCS_ServiceBroadCastV2;
// 广播接口
// struct PCS_ServiceBroadCastV2 : public Marshallable
// {
//     enum {uri = (5675 << 8 | SERVICE_SVID)};
//
//     PCS_ServiceBroadCastV2():appid(0),serverId(0),seqId(0){}
//     
//     uint32_t appid; // [必填] 应用标识
//     std::string ugid; // [必填] 广播组
//     
//     std::string serviceName; // [必填]业务路由配置依据(大类)(合法字符[0-9a-zA-Z])
//     std::string functionName; // [可选]业务路由配置依据(小类)(合法字符[0-9a-zA-Z])
//     std::string protoType; // [可选]协议类型
//     PACK_LEN_U32();std::string data; // [必填]业务包
//     uint32_t dataCRC; // [必填]业务包32位CRC校验
//     // 多路去重
//     uint64_t serverId; // 发起广播进程标识
//     uint64_t seqId; // 序号
//     std::string traceId; // [必填]追踪监控用
//     
//     virtual void marshal(Pack &pk) const {
//         pk << appid;
//         pk << ugid;
//         pk << serviceName;
//         pk << functionName;
//         pk << protoType;
//         PACK_STR_L32(pk, data);
//         pk << dataCRC;
//         pk << serverId;
//         pk << seqId;
//         pk << traceId;
//     }
//     
//     virtual void unmarshal(const Unpack &up) {
//         up >> appid;
//         up >> ugid;
//         up >> serviceName;
//         up >> functionName;
//         up >> protoType;
//         UNPACK_STR_L32(up, data);
//         up >> dataCRC;
//         up >> serverId;
//         up >> seqId;
//         up >> traceId;
//     }
//     
//     virtual std::ostream & trace(std::ostream & ss) const {
//         return ss;
//     }
// };


/***/ }),

/***/ "./src/utils/ProtoLink.ts":
/*!********************************!*\
  !*** ./src/utils/ProtoLink.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(/*! ./logger */ "./src/utils/logger.ts");
class ProtoLink {
    constructor(linkHandler, bMiniProgram = false) {
        this.linkHandler = linkHandler;
        this.ws = null;
        this.connected = false;
        this.bMiniProgram = bMiniProgram;
    }
    destroy() {
        this.linkHandler = null;
        this.reset();
    }
    //create websocket and connect server
    connect(addr) {
        //logger.log('ProtoLink.connect addr=' + addr);
        this.reset();
        if (!this.bMiniProgram) {
            this.ws = new WebSocket(addr);
            this.ws.binaryType = 'arraybuffer';
            this.ws.onopen = this.onopen.bind(this);
            this.ws.onerror = this.onerror.bind(this);
            this.ws.onclose = this.onclose.bind(this);
            this.ws.onmessage = this.onmessage.bind(this);
        }
        else {
            this.ws = wx.connectSocket({ url: addr });
            // 监听WebSocket连接打开事件。
            wx.onSocketOpen(res => {
                logger_1.default.log('ProtoLink.onopen');
                this.connected = true;
                if (this.linkHandler) {
                    this.linkHandler.onopen();
                }
            });
            wx.onSocketClose(res => {
                logger_1.default.log('ProtoLink.onclose ' + JSON.stringify(res));
                this.connected = false;
                this.ws = null;
                if (this.linkHandler) {
                    this.linkHandler.onclose();
                    this.linkHandler = null;
                }
            });
            // 监听WebSocket错误。
            wx.onSocketError(res => {
                logger_1.default.log('ProtoLink.onerror event=' + JSON.stringify(res));
                this.connected = false;
                this.ws = null;
                if (this.linkHandler) {
                    this.linkHandler.onerror(res);
                    this.linkHandler = null;
                }
            });
            // 监听WebSocket接受到服务器的消息事件。
            wx.onSocketMessage(res => {
                if (res.data instanceof ArrayBuffer) {
                    this.processArrayBuffer(res.data);
                }
                else {
                    this.processText(res.data);
                }
            });
        }
    }
    reset() {
        if (this.ws) {
            this.connected = false;
            if (!this.bMiniProgram) {
                this.ws.onopen = null;
                this.ws.onerror = null;
                this.ws.onclose = null;
                this.ws.onmessage = null;
                this.ws.close();
            }
            else {
                wx.closeSocket();
            }
            this.ws = null;
            //logger.warn('ProtoLink.reset: ws connection close.');
        }
    }
    send(data) {
        if (this.ws && this.connected) {
            if (!this.bMiniProgram) {
                this.ws.send(data);
            }
            else {
                //注意!!!小程序里通过socket发数据，data的类型为String/ArrayBuffer，如果传入Uint8Array，在微信IDE里可行，在真机环境会发送失败
                //为了避免这个大坑，小程序环境统一发送Uint8Array.buffer，即ArrayBuffer
                wx.sendSocketMessage({
                    data: data.buffer,
                    fail: function (err) {
                        logger_1.default.error('ProtoLink.send wx sendSocketMessage failed err=' + JSON.stringify(err));
                    }
                });
            }
        }
    }
    onopen() {
        //logger.log('ProtoLink.onopen');
        this.connected = true;
        if (this.linkHandler) {
            this.linkHandler.onopen();
        }
    }
    onerror(err) {
        //logger.log('ProtoLink.onerror event=' + err);
        this.connected = false;
        this.ws = null;
        if (this.linkHandler) {
            this.linkHandler.onerror(err);
            this.linkHandler = null;
        }
    }
    onclose() {
        //logger.log('ProtoLink.onclose');
        this.connected = false;
        this.ws = null;
        if (this.linkHandler) {
            this.linkHandler.onclose();
            this.linkHandler = null;
        }
    }
    //recv message
    onmessage(msg) {
        if (msg.data instanceof ArrayBuffer) {
            this.processArrayBuffer(msg.data);
        }
        else {
            this.processText(msg.data);
        }
    }
    processText(data) {
        logger_1.default.log('ProtoLink.processText data=' + data);
    }
    processArrayBuffer(data) {
        let view = new DataView(data);
        let pos = 0;
        let pktLen = 0;
        let uri = 0;
        while (pos + 10 < data.byteLength) {
            pktLen = view.getUint32(pos, true);
            if (pos + pktLen > data.byteLength || pktLen < 10) {
                logger_1.default.error('ProtoLink.processArrayBuffer length error pktLen=' + pktLen + ' bufferLen=' + data.byteLength);
                return;
            }
            uri = view.getUint32(pos + 4, true);
            let view2 = new DataView(data, pos, pktLen);
            if (this.linkHandler) {
                this.linkHandler.onData(uri, view2);
            }
            pos += pktLen;
        }
    }
}
exports.default = ProtoLink;


/***/ }),

/***/ "./src/utils/UtfUtil.ts":
/*!******************************!*\
  !*** ./src/utils/UtfUtil.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/utils.ts");
class UtfUtil {
    // 在JavaScript语言出现的时候，还没有UTF-16编码
    // UTF-16编码迟至1996年7月才公布，明确宣布是UCS-2的超集，即基本平面字符沿用UCS-2编码，辅助平面字符定义了4个字节的表示方法。
    // 两者的关系简单说，就是UTF-16取代了UCS-2，或者说UCS-2整合进了UTF-16
    /**
     * Unicode字符串经ucs2编码，然后写入字节流
     * @param str
     */
    static encodeUCS2(str) {
        //charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数，这个范围恰好是无符号16位整数的范围
        let codeArray = [];
        let length = str.length;
        for (let i = 0; i < length; i++) {
            codeArray.push(str.charCodeAt(i));
        }
        //先用Uint16Array保存，然后转成Uint8Array，如果直接从codeArray生成Uint8Array可能会值溢出
        let tempUint16Array = Uint16Array.from(codeArray);
        let ret = new Uint8Array(tempUint16Array.buffer);
        return ret;
    }
    /**
     * 从字节流中读取经ucs2解码的Unicode字符串
     * @param uint8Array
     */
    static decodeUCS2(byteStream) {
        //copy && release，避免索引问题
        let view = utils_1.default.payload2DataView(byteStream);
        byteStream = null;
        let pos = 0;
        let codeArray = [];
        while (pos + 2 <= view.byteLength) {
            codeArray.push(view.getUint16(pos, true)); //小端读取
            pos += 2;
        }
        let length = codeArray.length;
        let ret = '';
        for (let i = 0; i < length; i++) {
            ret += String.fromCharCode(codeArray[i]);
        }
        return ret;
    }
    //testcase 1 -> "h" 104
    //testcase 2 -> "ϫ" 1003
    //testcase 3 -> "中" 20013
    // 如果UNICODE字符由2个字节表示，则编码成UTF-8很可能需要3个字节。
    // 而如果UNICODE字符由4个字节表示，则编码成UTF-8可能需要6个字节。用4个或6个字节去编码一个UNICODE字符可能太多了，但很少会遇到那样的UNICODE字符。
    // UTF-8编码规则：如果只有一个字节则其最高二进制位为0；如果是多字节，其第一个字节从最高位开始，连续的二进制位值为1的个数决定了其编码的字节数，其余各字节均以10开头。UTF-8转换表表示如下：
    // 基本定义范围：0~FFFF(3 bytes)
    // Unicode6.1定义范围：0~10 FFFF(4 bytes)
    // 说明：此非unicode编码范围，属于UCS-4 编码(5~6 bytes)
    // 早期的规范UTF-8可以到达6字节序列，可以覆盖到31位元（通用字符集原来的极限）。尽管如此，2003年11月UTF-8 被 RFC 3629 重新规范，只能使用原来Unicode定义的区域， U+0000到U+10FFFF。
    // 根据规范，这些字节值将无法出现在合法 UTF-8序列中
    /**
     * 将Unicode字符串打包成utf8编码的字节流
     * @param str
     */
    static encodeUtf8(str) {
        //3   11
        //15  1111
        //31  11111
        //63  111111
        //128 10000000
        //192 11000000
        //224 11100000
        //240 11110000
        //248 11111000
        //252 11111100
        let back = [];
        let byteSize = 0;
        let length = str.length;
        for (let i = 0; i < length; i++) {
            let code = str.charCodeAt(i);
            if (0x00 <= code && code <= 0x7f) { //1个字节：Unicode码为0 - 127
                byteSize += 1;
                back.push(code);
            }
            else if (0x80 <= code && code <= 0x7ff) { //2个字节：Unicode码为128 - 2047
                byteSize += 2;
                back.push((192 | (31 & (code >> 6))));
                back.push((128 | (63 & code)));
                // } else if ((0x800 <= code && code <= 0xd7ff) || (0xe000 <= code && code <= 0xffff)) { //3个字节：Unicode码为2048 - 0xFFFF
            }
            else if (0x800 <= code && code <= 0xffff) {
                byteSize += 3;
                back.push((224 | (15 & (code >> 12))));
                back.push((128 | (63 & (code >> 6))));
                back.push((128 | (63 & code)));
            }
            else if (0x10000 <= code && code <= 0x1fffff) { //4个字节
                byteSize += 4;
                back.push((240 | (7 & (code >> 18))));
                back.push((128 | (63 & (code >> 12))));
                back.push((128 | (63 & (code >> 6))));
                back.push((128 | (63 & code)));
            }
            else if (0x200000 <= code && code <= 0x3ffffff) { //5个字节
                byteSize += 5;
                back.push((248 | (3 & (code >> 24))));
                back.push((128 | (63 & (code >> 18))));
                back.push((128 | (63 & (code >> 12))));
                back.push((128 | (63 & (code >> 6))));
                back.push((128 | (63 & code)));
            }
            else if (0x4000000 <= code && code <= 0x7fffffff) { //6个字节
                byteSize += 6;
                back.push((252 | (1 & (code >> 30))));
                back.push((128 | (63 & (code >> 24))));
                back.push((128 | (63 & (code >> 18))));
                back.push((128 | (63 & (code >> 12))));
                back.push((128 | (63 & (code >> 6))));
                back.push((128 | (63 & code)));
            }
        }
        let backLength = back.length;
        for (let i = 0; i < backLength; i++) {
            back[i] &= 0xff;
        }
        return Uint8Array.from(back);
    }
    /**
     * 将utf8编码的字节流解包为Unicode字符串
     * @param bytesStream
     */
    static decodeUtf8(bytesStream) {
        let ret = '', length = bytesStream.byteLength;
        for (let i = 0; i < length; i++) {
            let one = bytesStream[i].toString(2), v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                let bytesLength = v[0].length;
                let store = bytesStream[i].toString(2).slice(bytesLength + 1);
                for (let st = 1; st < bytesLength; st++) {
                    store += bytesStream[st + i].toString(2).slice(2);
                }
                // String.fromCodePoint()可以多达21位数字，是ES6新加入的方法，是为了能够处理所有合法的Unicode
                ret += String.fromCodePoint(parseInt(store, 2));
                i += bytesLength - 1;
            }
            else {
                // String.fromCharCode()最大支持16位的数字，而且ES中很早就开始支持，兼容性好
                ret += String.fromCharCode(bytesStream[i]);
            }
        }
        return ret;
    }
    static sizeof(text) {
        /// 计算保存该 UTF-8 字符串所需的字节长度。
        var count = 0;
        for (var i = 0; i < text.length; ++i) {
            var char = text.charCodeAt(i); /// UTF-16 代理对。
            if (char >= 0xd800 && char <= 0xdbff && i + 1 < text.length) {
                var tail = text.charCodeAt(i + 1); /// 后尾代理。
                if (tail >= 0xdc00 && tail <= 0xdfff) {
                    ++i;
                    count += 4;
                    continue;
                }
            }
            count += char <= 0x7f ? 1 : char <= 0x7ff ? 2 : 3;
        }
        return count;
    }
}
exports.default = UtfUtil;


/***/ }),

/***/ "./src/utils/extend.ts":
/*!*****************************!*\
  !*** ./src/utils/extend.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * https://www.npmjs.com/package/extend
 */

Object.defineProperty(exports, "__esModule", { value: true });
let hasOwn = Object.prototype.hasOwnProperty;
let toStr = Object.prototype.toString;
let isArray = function isArray(arr) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(arr);
    }
    return toStr.call(arr) === '[object Array]';
};
let isPlainObject = function isPlainObject(obj) {
    if (!obj || toStr.call(obj) !== '[object Object]') {
        return false;
    }
    let hasOwnConstructor = hasOwn.call(obj, 'constructor');
    let hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
    }
    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    let key;
    for (key in obj) { /**/ }
    return typeof key === 'undefined' || hasOwn.call(obj, key);
};
let extend = function (...args) {
    let options, name, src, copy, copyIsArray, clone;
    let target = arguments[0];
    let i = 1;
    let length = arguments.length;
    let deep = false;
    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }
    if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
        target = {};
    }
    for (; i < length; ++i) {
        options = arguments[i];
        // Only deal with non-null/undefined values
        if (options != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
                if (target !== copy) {
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        }
                        else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = extend(deep, clone, copy);
                        // Don't bring in undefined values
                    }
                    else if (typeof copy !== 'undefined') {
                        target[name] = copy;
                    }
                }
            }
        }
    }
    // Return the modified object
    return target;
};
exports.default = extend;


/***/ }),

/***/ "./src/utils/globalvars.ts":
/*!*********************************!*\
  !*** ./src/utils/globalvars.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
class GlobalVars {
    constructor() {
        this.isMiniProgram = false;
        this.bShareAnonymousUid = true;
        this.defaultHeaderMap = new Map();
        this.appid = 0;
        this.thirdUdbAppId = "";
        this.wxAppid = "";
        this.hiidoHost = "";
        this.scode = 0;
        this.bRetry = false;
        this.seqId = 0;
        this.seqContext = {}; //callback context
        this.domain = ""; //决定udb_c写在哪个域下
        this.chlAppkey = 0; //进频道请求中的appkey
        this.chlPassword = ""; //缓存上一次进频道的密码
        this.uid = '0';
        this.anonymousUid = 0; //匿名的uid，匿名进/退频道时用，由sdk在指定号段生成（参考媒体sdk）dw_yangqiao
        this.yyid = 0;
        //海外业务允许匿名多开，即开多个tab 登录ap的uid是一样的，此时server通过instId做区分，我们提高instId的生成范围防冲撞
        this.instId = Math.round(Math.random() * 0xffffffff);
        this.credit = "";
        this.token = "";
        this.tokenType = 1; // 默认为3rd
        this.ticket = null; //otp as login ap
        this.topSid = 0;
        this.subSid = 0;
        this.tryTopSid = 0; //需要尝试的顶级频道号（跳频道时临时保存）
        this.trySubSid = 0; //需要尝试的子频道号（跳频道时临时保存）
        this.asid = 0;
        this.loginedUDB = false;
        this.channelJoined = false;
        this.exclusiveJoin = false; //是否进频道互踢
        this.lastSentJoinChl = -2000;
        this.lastSendLeaveChl = 0;
        this.userType = 0; //0-匿名；1-实名
        this.nick = "";
        this.channelInfo = null;
        this.channelUserCount = {};
        this.micList = { "micList": [], "linkedMicList": [] };
        this.userInfos = {};
        this.userGroups = { subs: {}, unsubs: {} };
        this.innerBcGroups = {};
        this.uuid = uuid_1.v4(); //Utils.getUUID("sunclouds.com"); //无法获取设备号时，使用浏览器uuid
        this.bLostConnection = false; //当先连上ap然后又断开连接的时候置为true，标识断线过 dw_yangqiao
        this.everJoinChannel = false;
        //起始时间戳默认都从0开始，不用uint.max，免得比较的时候出幺蛾子
        this.loginUdbStartTs = 0;
        this.logoutUdbStartTs = 0;
        this.loginApStartTs = 0;
        this.logoutApStartTs = 0;
        this.sendChatMsgStartTs = 0;
    }
    getSeqId() {
        this.seqId += 1;
        return this.seqId;
    }
    logout() {
        this.bRetry = false;
        this.seqContext = {};
        this.ticket = null;
        this.uid = '0';
        this.yyid = 0;
        this.credit = null;
        this.token = null;
        this.tokenType = 1;
        this.topSid = 0;
        this.subSid = 0;
        this.tryTopSid = 0;
        this.trySubSid = 0;
        this.asid = 0;
        this.loginedUDB = false;
        this.channelJoined = false;
        // this.lastSentJoinChl = 0;
        // this.lastSendLeaveChl = 0;
        this.userType = 0; //0-匿名；1-实名
        this.nick = "";
        this.channelInfo = null;
        this.channelUserCount = {};
        this.micList = {};
        this.userInfos = {};
        this.userGroups = { subs: {}, unsubs: {} };
    }
}
exports.default = GlobalVars;


/***/ }),

/***/ "./src/utils/hiidoUtil.ts":
/*!********************************!*\
  !*** ./src/utils/hiidoUtil.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(/*! ./logger */ "./src/utils/logger.ts");
const timeUtil_1 = __webpack_require__(/*! ./timeUtil */ "./src/utils/timeUtil.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/utils.ts");
const md5 = __webpack_require__(/*! js-md5 */ "./node_modules/js-md5/src/md5.js");
class HiidoUtil {
    /**
     * 生成上报的url
     * @param statMap 存储统计值的map
     * @param act 上报关键字
     */
    static genUrl(statMap, act = 'ystrpc', hiidoHost = 'ylog.hiido.com') {
        let uri = 'https://' + hiidoHost + '/c.gif?';
        let time = timeUtil_1.default.utc();
        let key = act + time + 'HiidoYYSystem';
        key = md5(key);
        let url = uri + 'act=' + act + '&time=' + time + '&key=' + key;
        for (let [k, v] of statMap) {
            url += '&' + k + '=' + v;
        }
        return url;
    }
    // 发送url
    static sendUrl(url, bMiniProgram) {
        logger_1.default.log('HiidoUtil.sendUrl url:' + url);
        if (!bMiniProgram) {
            let img = new Image();
            img.src = url;
        }
        else {
            //see https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html
            //注意！按照wx的接口要求来，避免引起不明觉厉的问题
            let index = url.indexOf('?');
            let tempUrl = url.slice(0, index);
            let paramArray = url.slice(index + 1).split('&');
            let length = paramArray.length;
            let tempData = {};
            for (let i = 0; i < length; i++) {
                index = paramArray[i].indexOf('=');
                tempData[paramArray[i].slice(0, index)] = paramArray[i].slice(index + 1);
            }
            // logger.log('debug tempUrl=' + tempUrl + ' data=' + JSON.stringify(tempData));
            utils_1.default.yFetch({ url: tempUrl, data: tempData });
        }
    }
}
exports.default = HiidoUtil;


/***/ }),

/***/ "./src/utils/hiido_internal.esm.js":
/*!*****************************************!*\
  !*** ./src/utils/hiido_internal.esm.js ***!
  \*****************************************/
/*! exports provided: report, Metrics, oldMetrics, setSiteId, setSpeId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "report", function() { return report; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Metrics", function() { return Metrics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oldMetrics", function() { return oldMetrics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSiteId", function() { return setSiteId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSpeId", function() { return setSpeId; });
/* @version hiido_internal.esm.js: v2.2.0 2018-11-27 12:00:38 */
var commonjsGlobal="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function createCommonjsModule(e,n){return e(n={exports:{}},n.exports),n.exports}var md5=createCommonjsModule(function(e){!function(n){function t(e,n){var t=(65535&e)+(65535&n);return(e>>16)+(n>>16)+(t>>16)<<16|65535&t}function r(e,n,r,i,o,a){return t((s=t(t(n,e),t(i,a)))<<(c=o)|s>>>32-c,r);var s,c}function i(e,n,t,i,o,a,s){return r(n&t|~n&i,e,n,o,a,s)}function o(e,n,t,i,o,a,s){return r(n&i|t&~i,e,n,o,a,s)}function a(e,n,t,i,o,a,s){return r(n^t^i,e,n,o,a,s)}function s(e,n,t,i,o,a,s){return r(t^(n|~i),e,n,o,a,s)}function c(e,n){var r,c,u,d,l;e[n>>5]|=128<<n%32,e[14+(n+64>>>9<<4)]=n;var f=1732584193,b=-271733879,p=-1732584194,m=271733878;for(r=0;r<e.length;r+=16)c=f,u=b,d=p,l=m,b=s(b=s(b=s(b=s(b=a(b=a(b=a(b=a(b=o(b=o(b=o(b=o(b=i(b=i(b=i(b=i(b,p=i(p,m=i(m,f=i(f,b,p,m,e[r],7,-680876936),b,p,e[r+1],12,-389564586),f,b,e[r+2],17,606105819),m,f,e[r+3],22,-1044525330),p=i(p,m=i(m,f=i(f,b,p,m,e[r+4],7,-176418897),b,p,e[r+5],12,1200080426),f,b,e[r+6],17,-1473231341),m,f,e[r+7],22,-45705983),p=i(p,m=i(m,f=i(f,b,p,m,e[r+8],7,1770035416),b,p,e[r+9],12,-1958414417),f,b,e[r+10],17,-42063),m,f,e[r+11],22,-1990404162),p=i(p,m=i(m,f=i(f,b,p,m,e[r+12],7,1804603682),b,p,e[r+13],12,-40341101),f,b,e[r+14],17,-1502002290),m,f,e[r+15],22,1236535329),p=o(p,m=o(m,f=o(f,b,p,m,e[r+1],5,-165796510),b,p,e[r+6],9,-1069501632),f,b,e[r+11],14,643717713),m,f,e[r],20,-373897302),p=o(p,m=o(m,f=o(f,b,p,m,e[r+5],5,-701558691),b,p,e[r+10],9,38016083),f,b,e[r+15],14,-660478335),m,f,e[r+4],20,-405537848),p=o(p,m=o(m,f=o(f,b,p,m,e[r+9],5,568446438),b,p,e[r+14],9,-1019803690),f,b,e[r+3],14,-187363961),m,f,e[r+8],20,1163531501),p=o(p,m=o(m,f=o(f,b,p,m,e[r+13],5,-1444681467),b,p,e[r+2],9,-51403784),f,b,e[r+7],14,1735328473),m,f,e[r+12],20,-1926607734),p=a(p,m=a(m,f=a(f,b,p,m,e[r+5],4,-378558),b,p,e[r+8],11,-2022574463),f,b,e[r+11],16,1839030562),m,f,e[r+14],23,-35309556),p=a(p,m=a(m,f=a(f,b,p,m,e[r+1],4,-1530992060),b,p,e[r+4],11,1272893353),f,b,e[r+7],16,-155497632),m,f,e[r+10],23,-1094730640),p=a(p,m=a(m,f=a(f,b,p,m,e[r+13],4,681279174),b,p,e[r],11,-358537222),f,b,e[r+3],16,-722521979),m,f,e[r+6],23,76029189),p=a(p,m=a(m,f=a(f,b,p,m,e[r+9],4,-640364487),b,p,e[r+12],11,-421815835),f,b,e[r+15],16,530742520),m,f,e[r+2],23,-995338651),p=s(p,m=s(m,f=s(f,b,p,m,e[r],6,-198630844),b,p,e[r+7],10,1126891415),f,b,e[r+14],15,-1416354905),m,f,e[r+5],21,-57434055),p=s(p,m=s(m,f=s(f,b,p,m,e[r+12],6,1700485571),b,p,e[r+3],10,-1894986606),f,b,e[r+10],15,-1051523),m,f,e[r+1],21,-2054922799),p=s(p,m=s(m,f=s(f,b,p,m,e[r+8],6,1873313359),b,p,e[r+15],10,-30611744),f,b,e[r+6],15,-1560198380),m,f,e[r+13],21,1309151649),p=s(p,m=s(m,f=s(f,b,p,m,e[r+4],6,-145523070),b,p,e[r+11],10,-1120210379),f,b,e[r+2],15,718787259),m,f,e[r+9],21,-343485551),f=t(f,c),b=t(b,u),p=t(p,d),m=t(m,l);return[f,b,p,m]}function u(e){var n,t="",r=32*e.length;for(n=0;n<r;n+=8)t+=String.fromCharCode(e[n>>5]>>>n%32&255);return t}function d(e){var n,t=[];for(t[(e.length>>2)-1]=undefined,n=0;n<t.length;n+=1)t[n]=0;var r=8*e.length;for(n=0;n<r;n+=8)t[n>>5]|=(255&e.charCodeAt(n/8))<<n%32;return t}function l(e){var n,t,r="";for(t=0;t<e.length;t+=1)n=e.charCodeAt(t),r+="0123456789abcdef".charAt(n>>>4&15)+"0123456789abcdef".charAt(15&n);return r}function f(e){return unescape(encodeURIComponent(e))}function b(e){return function(e){return u(c(d(e),8*e.length))}(f(e))}function p(e,n){return function(e,n){var t,r,i=d(e),o=[],a=[];for(o[15]=a[15]=undefined,i.length>16&&(i=c(i,8*e.length)),t=0;t<16;t+=1)o[t]=909522486^i[t],a[t]=1549556828^i[t];return r=c(o.concat(d(n)),512+8*n.length),u(c(a.concat(r),640))}(f(e),f(n))}function m(e,n,t){return n?t?p(n,e):l(p(n,e)):t?b(e):l(b(e))} false?undefined:e.exports?e.exports=m:n.md5=m}(commonjsGlobal)}),ACT_KEY_GENERATE_SALT="HiidoYYSystem",COOKIE_KEY_SESSIONID="hdjs_session_id",COOKIE_KEY_SESSIONTIME="hdjs_session_time",DEFER_MODE_TAG="_HIIDO_DEFER_",DEVICE_TYPES={PC:1,MOBILE:2},LINUX_CODE=["ubuntu","centos","fedora","debian","gentoo","suse","mandriva","slackware","freebsd","archlinux"],MOBILE_OS_REGEXS={android:/android (\d+\.\d+)/i,ios:/cpu (?:iphone )os (\d+_\d+)/i,wp:[/windows phone(?:[ os]{3})? (\d+\.\d+)/i,/windows nt (\d\.\d)/i],blackberry:/(?:Version|Blackberry[\w]+)\/(\d\.\d)/i,symbian:/symbian(?:os)?\/(\d+[.\d]{0,2})/i,tizen:/tizen (\d+\.\d+)/i},REPORT_URL="//ylog.hiido.com/j.gif",REPORT_URL_OVERSEA="//hlog.hiido.com/j.gif",REPORT_TAG_OVERSEA="_HIIDO_OVERSEA_",NOT_FOUND=-1,SESSION_GAP=18e5,SE_LIST=[{engine:"baidu.com",rule:"wd|word|w|kw|key",value:1},{engine:"haosou.com",rule:"q",value:2},{engine:"sogou.com",rule:"query",value:3},{engine:"google.",rule:"q",value:4},{engine:"bing.com",rule:"q",value:5},{engine:"yahoo.com",rule:"p|q",value:6},{engine:"youdao.com",rule:"q",value:7},{engine:"yodao.com",rule:"q",value:8},{engine:"iask.sina.com.cn",rule:"searchWord|k",value:9},{engine:"zhongsou.com",rule:"w|word",value:10},{engine:"search.com",rule:"q",value:11},{engine:"sm.cn",rule:"q",value:12},{engine:"chinaso.com",rule:"q",value:13},{engine:"soku.com",rule:"keyword",value:14},{engine:"alexa.com",rule:"q",value:15},{engine:"s.weibo.com",rule:function(e){return e.split("&")[0].split("/").pop()},value:16},{engine:"qq.com",rule:"k",value:17},{engine:"lofter.com",rule:function(e){var n;return e.indexOf("queryString")>-1&&null!==(n=new RegExp("(^|)queryString=([^&]*)(&|$)","gi").exec(e))?n[2]:e.split("?")[0].split("/").pop()},value:18}],UI_COOKIE_TOKEN="hd_newui",_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},classCallCheck=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},NA_VERSION="-1",NA={name:"na",version:NA_VERSION};function typeOf(e){return function(n){return Object.prototype.toString.call(n)==="[object "+e+"]"}}var isString=typeOf("String"),isRegExp=typeOf("RegExp"),isObject=typeOf("Object"),isFunction=typeOf("Function");function each(e,n){for(var t=0,r=e.length;t<r&&!1!==n.call(e,e[t],t);t++);}function detect(e,n,t){var r=isFunction(n)?n.call(null,t):n;if(!r)return null;var i={name:e,version:NA_VERSION,codename:""};if(!0===r)return i;if(isString(r)){if(-1!==t.indexOf(r))return i}else{if(isObject(r))return r.hasOwnProperty("version")&&(i.version=r.version),i;if(isRegExp(r)){var o=r.exec(t);if(o)return o.length>=2&&o[1]?i.version=o[1].replace(/_/g,"."):i.version=NA_VERSION,i}}}function init(e,n,t,r){var i=NA;each(n,function(n){var t=detect(n[0],n[1],e);if(t)return i=t,!1}),t.call(r,i.name,i.version)}var Detector=function(){function e(n){classCallCheck(this,e),this._rules=n}return e.prototype.parse=function(e){var n={};init(e=(e||"").toLowerCase(),this._rules.device,function(e,t){var r=parseFloat(t);n.device={name:e,version:r,fullVersion:t},n.device[e]=r},n),init(e,this._rules.os,function(e,t){var r=parseFloat(t);n.os={name:e,version:r,fullVersion:t},n.os[e]=r},n);var t=this.IEMode(e);return init(e,this._rules.engine,function(e,r){var i=r;t&&(r=t.engineVersion||t.engineMode,i=t.engineMode);var o=parseFloat(r);n.engine={name:e,version:o,fullVersion:r,mode:parseFloat(i),fullMode:i,compatible:!!t&&t.compatible},n.engine[e]=o},n),init(e,this._rules.browser,function(e,r){var i=r;t&&("ie"===e&&(r=t.browserVersion),i=t.browserMode);var o=parseFloat(r);n.browser={name:e,version:o,fullVersion:r,mode:parseFloat(i),fullMode:i,compatible:!!t&&t.compatible},n.browser[e]=o},n),n},e.prototype.IEMode=function(e){if(!this._rules.re_msie.test(e))return null;var n,t,r=void 0,i=void 0,o=void 0;if(-1!==e.indexOf("trident/")&&(r=/\btrident\/([0-9.]+)/.exec(e))&&r.length>=2){i=r[1];var a=r[1].split(".");a[0]=parseInt(a[0],10)+4,o=a.join(".")}t=(r=this._rules.re_msie.exec(e))[1];var s=r[1].split(".");return void 0===o&&(o=t),s[0]=parseInt(s[0],10)-4,n=s.join("."),void 0===i&&(i=n),{browserVersion:o,browserMode:t,engineVersion:i,engineMode:n,compatible:i!==n}},e}(),detector=Detector,win="undefined"==typeof window?commonjsGlobal:window,external=win.external,re_msie=/\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/,re_blackberry_10=/\bbb10\b.+?\bversion\/([\d.]+)/,re_blackberry_6_7=/\bblackberry\b.+\bversion\/([\d.]+)/,re_blackberry_4_5=/\bblackberry\d+\/([\d.]+)/,NA_VERSION$1="-1",DEVICES=[["nokia",function(e){return-1!==e.indexOf("nokia ")?/\bnokia ([0-9]+)?/:/\bnokia([a-z0-9]+)?/}],["samsung",function(e){return-1!==e.indexOf("samsung")?/\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/:/\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/}],["wp",function(e){return-1!==e.indexOf("windows phone ")||-1!==e.indexOf("xblwp")||-1!==e.indexOf("zunewp")||-1!==e.indexOf("windows ce")}],["pc","windows"],["ipad","ipad"],["ipod","ipod"],["iphone",/\biphone\b|\biph(\d)/],["mac","macintosh"],["mi",/\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/],["hongmi",/\bhm[ \-]?([a-z0-9]+)/],["aliyun",/\baliyunos\b(?:[\-](\d+))?/],["meizu",function(e){return e.indexOf("meizu")>=0?/\bmeizu[\/ ]([a-z0-9]+)\b/:/\bm([0-9cx]{1,4})\b/}],["nexus",/\bnexus ([0-9s.]+)/],["huawei",function(e){var n=/\bmediapad (.+?)(?= build\/huaweimediapad\b)/;return-1!==e.indexOf("huawei-huawei")?/\bhuawei\-huawei\-([a-z0-9\-]+)/:n.test(e)?n:/\bhuawei[ _\-]?([a-z0-9]+)/}],["lenovo",function(e){return-1!==e.indexOf("lenovo-lenovo")?/\blenovo\-lenovo[ \-]([a-z0-9]+)/:/\blenovo[ \-]?([a-z0-9]+)/}],["zte",function(e){return/\bzte\-[tu]/.test(e)?/\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/:/\bzte[ _\-]?([a-su-z0-9\+]+)/}],["vivo",/\bvivo(?: ([a-z0-9]+))?/],["htc",function(e){return/\bhtc[a-z0-9 _\-]+(?= build\b)/.test(e)?/\bhtc[ _\-]?([a-z0-9 ]+(?= build))/:/\bhtc[ _\-]?([a-z0-9 ]+)/}],["oppo",/\boppo[_]([a-z0-9]+)/],["konka",/\bkonka[_\-]([a-z0-9]+)/],["sonyericsson",/\bmt([a-z0-9]+)/],["coolpad",/\bcoolpad[_ ]?([a-z0-9]+)/],["lg",/\blg[\-]([a-z0-9]+)/],["android",/\bandroid\b|\badr\b/],["blackberry",function(e){return e.indexOf("blackberry")>=0?/\bblackberry\s?(\d+)/:"bb10"}]],OS=[["wp",function(e){return-1!==e.indexOf("windows phone ")?/\bwindows phone (?:os )?([0-9.]+)/:-1!==e.indexOf("xblwp")?/\bxblwp([0-9.]+)/:-1!==e.indexOf("zunewp")?/\bzunewp([0-9.]+)/:"windows phone"}],["windows",/\bwindows nt ([0-9.]+)/],["macosx",/\bmac os x ([0-9._]+)/],["ios",function(e){return/\bcpu(?: iphone)? os /.test(e)?/\bcpu(?: iphone)? os ([0-9._]+)/:-1!==e.indexOf("iph os ")?/\biph os ([0-9_]+)/:/\bios\b/}],["yunos",/\baliyunos ([0-9.]+)/],["android",function(e){return e.indexOf("android")>=0?/\bandroid[ \/-]?([0-9.x]+)?/:e.indexOf("adr")>=0?e.indexOf("mqqbrowser")>=0?/\badr[ ]\(linux; u; ([0-9.]+)?/:/\badr(?:[ ]([0-9.]+))?/:"android"}],["chromeos",/\bcros i686 ([0-9.]+)/],["linux","linux"],["windowsce",/\bwindows ce(?: ([0-9.]+))?/],["symbian",/\bsymbian(?:os)?\/([0-9.]+)/],["blackberry",function(e){var n=e.match(re_blackberry_10)||e.match(re_blackberry_6_7)||e.match(re_blackberry_4_5);return n?{version:n[1]}:"blackberry"}]];function checkTW360External(e){if(external)try{var n=external.twGetRunPath.toLowerCase(),t=external.twGetSecurityID(win),r=external.twGetVersion(t);if(n&&-1===n.indexOf(e))return!1;if(r)return{version:r}}catch(i){}}var ENGINE=[["edgehtml",/edge\/([0-9.]+)/],["trident",re_msie],["blink",function(){return"chrome"in win&&"CSS"in win&&/\bapplewebkit[\/]?([0-9.+]+)/}],["webkit",/\bapplewebkit[\/]?([0-9.+]+)/],["gecko",function(e){var n=e.match(/\brv:([\d\w.]+).*\bgecko\/(\d+)/);if(n)return{version:n[1]+"."+n[2]}}],["presto",/\bpresto\/([0-9.]+)/],["androidwebkit",/\bandroidwebkit\/([0-9.]+)/],["coolpadwebkit",/\bcoolpadwebkit\/([0-9.]+)/],["u2",/\bu2\/([0-9.]+)/],["u3",/\bu3\/([0-9.]+)/]],BROWSER=[["edge",/edge\/([0-9.]+)/],["sogou",function(e){return e.indexOf("sogoumobilebrowser")>=0?/sogoumobilebrowser\/([0-9.]+)/:e.indexOf("sogoumse")>=0||/ se ([0-9.x]+)/}],["theworld",function(){var e=checkTW360External("theworld");return void 0!==e?e:/theworld(?: ([\d.])+)?/}],["360",function(e){var n=checkTW360External("360se");return void 0!==n?n:-1!==e.indexOf("360 aphone browser")?/\b360 aphone browser \(([^\)]+)\)/:/\b360(?:se|ee|chrome|browser)\b/}],["maxthon",function(){try{if(external&&(external.mxVersion||external.max_version))return{version:external.mxVersion||external.max_version}}catch(e){}return/\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/}],["micromessenger",/\bmicromessenger\/([\d.]+)/],["qq",/\bm?qqbrowser\/([0-9.]+)/],["green","greenbrowser"],["tt",/\btencenttraveler ([0-9.]+)/],["liebao",function(e){if(e.indexOf("liebaofast")>=0)return/\bliebaofast\/([0-9.]+)/;if(-1===e.indexOf("lbbrowser"))return!1;var n=void 0;try{external&&external.LiebaoGetVersion&&(n=external.LiebaoGetVersion())}catch(t){}return{version:n||NA_VERSION$1}}],["tao",/\btaobrowser\/([0-9.]+)/],["coolnovo",/\bcoolnovo\/([0-9.]+)/],["saayaa","saayaa"],["baidu",/\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],["ie",re_msie],["mi",/\bmiuibrowser\/([0-9.]+)/],["opera",function(e){var n=/\bopera.+version\/([0-9.ab]+)/;return n.test(e)?n:/\bopr\/([0-9.]+)/}],["oupeng",/\boupeng\/([0-9.]+)/],["yandex",/yabrowser\/([0-9.]+)/],["ali-ap",function(e){return e.indexOf("aliapp")>0?/\baliapp\(ap\/([0-9.]+)\)/:/\balipayclient\/([0-9.]+)\b/}],["ali-ap-pd",/\baliapp\(ap-pd\/([0-9.]+)\)/],["ali-am",/\baliapp\(am\/([0-9.]+)\)/],["ali-tb",/\baliapp\(tb\/([0-9.]+)\)/],["ali-tb-pd",/\baliapp\(tb-pd\/([0-9.]+)\)/],["ali-tm",/\baliapp\(tm\/([0-9.]+)\)/],["ali-tm-pd",/\baliapp\(tm-pd\/([0-9.]+)\)/],["uc",function(e){return e.indexOf("ucbrowser/")>=0?/\bucbrowser\/([0-9.]+)/:e.indexOf("ubrowser/")>=0?/\bubrowser\/([0-9.]+)/:/\buc\/[0-9]/.test(e)?/\buc\/([0-9.]+)/:e.indexOf("ucweb")>=0?/\bucweb([0-9.]+)?/:/\b(?:ucbrowser|uc)\b/}],["chrome",/ (?:chrome|crios|crmo)\/([0-9.]+)/],["android",function(e){if(-1!==e.indexOf("android"))return/\bversion\/([0-9.]+(?: beta)?)/}],["blackberry",function(e){var n=e.match(re_blackberry_10)||e.match(re_blackberry_6_7)||e.match(re_blackberry_4_5);return n?{version:n[1]}:"blackberry"}],["safari",/\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],["webview",/\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/],["firefox",/\bfirefox\/([0-9.ab]+)/],["nokia",/\bnokiabrowser\/([0-9.]+)/]],webRules={device:DEVICES,os:OS,browser:BROWSER,engine:ENGINE,re_msie:re_msie},userAgent=navigator.userAgent||"",appVersion=navigator.appVersion||"",vendor=navigator.vendor||"",ua=userAgent+" "+appVersion+" "+vendor,detector$1=new detector(webRules);function IEMode(e){if(!webRules.re_msie.test(e))return null;var n,t,r=void 0,i=void 0,o=void 0;if(-1!==e.indexOf("trident/")&&(r=/\btrident\/([0-9.]+)/.exec(e))&&r.length>=2){i=r[1];var a=r[1].split(".");a[0]=parseInt(a[0],10)+4,o=a.join(".")}t=(r=webRules.re_msie.exec(e))[1];var s=r[1].split(".");return void 0===o&&(o=t),s[0]=parseInt(s[0],10)-4,n=s.join("."),void 0===i&&(i=n),{browserVersion:o,browserMode:t,engineVersion:i,engineMode:n,compatible:i!==n}}function WebParse(e){var n=detector$1.parse(e),t=IEMode(e);if(t){var r=n.engine.name,i=t.engineVersion||t.engineMode,o=parseFloat(i),a=t.engineMode;n.engine={name:r,version:o,fullVersion:i,mode:parseFloat(a),fullMode:a,compatible:!!t&&t.compatible},n.engine[n.engine.name]=o;var s=n.browser.name,c=n.browser.fullVersion;"ie"===s&&(c=t.browserVersion);var u=t.browserMode,d=parseFloat(c);n.browser={name:s,version:d,fullVersion:c,mode:parseFloat(u),fullMode:u,compatible:!!t&&t.compatible},n.browser[s]=d}return n}var Tan=WebParse(ua);Tan.parse=WebParse;var webDetector=Tan,MOBILE_BRAND_CN_MAP={"金立":"gionee","大显":"daxian","天语":"tianyu"},MOBILE_OTHER_BRANDS=[{name:"blackberry",regex:/playbook/},{name:"philips",regex:/philips/},{name:"nec",regex:/nec/},{name:"palm",regex:/palm/},{name:"benq",regex:/benq/},{name:"taixin",regex:/telson/},{name:"cect",regex:/cect/},{name:"dbtel",regex:/dbtel/},{name:"konka",regex:/konka/},{name:"changhong",regex:/changhong/},{name:"wanlida",regex:/malata/},{name:"pantech",regex:/pantech/},{name:"dongxin",regex:/eastcom/},{name:"duowei",regex:/doov/},{name:"koobee",regex:/koobee/},{name:"alcatel",regex:/alcatel/},{name:"bird",regex:/bird/}];function getPcmb(e){return/mobile|phone|wpdesktop|windows ce|android|iphone|ipad|ipod|blackberry|bb10|rim tablet os|webos|opera|symbian|symbos|series60|series40|syb-[0-9]+|s60|palm|tizen|xblwp7|zunewp7|yunos|ucweb|midp|mqq|htc|nokia|samsung/i.test(e)?DEVICE_TYPES.MOBILE:DEVICE_TYPES.PC}function getOS(e){var n,t=webDetector.parse(e).os,r=t.name,i=t.fullVersion;if("windows"===r){if(e.indexOf("wpdesktop")>-1)return"wp|";r="win",e.indexOf("windows nt 5.0")>-1||e.indexOf("windows nt 5.01")>-1||e.indexOf("windows 2000")>-1?i="2000":e.indexOf("windows nt 5.1")>-1||e.indexOf("windows xp")>-1?i="xp":e.indexOf("windows nt 5.2")>-1||e.indexOf("windows 2003")>-1?i="2003":e.indexOf("windows nt 6.0")>-1||e.indexOf("windows vista")>-1?i="vista":e.indexOf("windows nt 6.1")>-1||e.indexOf("windows 2008")>-1||e.indexOf("windows 7")>-1?i="7":e.indexOf("windows nt 6.2")>-1||e.indexOf("windows 8")>-1?i="8.0":e.indexOf("windows nt 6.3")>-1?i="8.1":e.indexOf("windows nt 10.0")>-1&&(i="10.0")}else if("linux"===r){for(var o=LINUX_CODE,a=o.length,s=0;s<a;s++)if(e.indexOf(o[s])>-1){i=o[s];break}}else"blackberry"===r&&"-1"===i?(n=e.match(MOBILE_OS_REGEXS.blackberry))&&(i=n[1]):"symbian"===r&&"3"===i&&(i="^3");return/tizen/.test(e)&&(r="tizen",(n=e.match(MOBILE_OS_REGEXS.tizen))&&(i=n[1])),"chromeos"===r&&(r="cros"),"na"===r&&(/symbian|symbos|series\s?60|series40|syb-[0-9]+|s60/.test(e)&&(r="symbian",(n=e.match(MOBILE_OS_REGEXS.symbian))&&(i="3"===n[1]?"^3":n[1])),/blackberry|bb10|rim tablet os/.test(e)&&(r="blackberry",(n=e.match(MOBILE_OS_REGEXS.blackberry))&&(i=n[1])),/hisense/.test(e)&&(r="android")),i&&(i="-1"===i?"":(i=i.split(".")).length>1?i[0]+"."+i[1]:i[0]),r+"|"+i}function getBrowser(e){if(/baiduboxapp/.test(e))return"baidubox";if(/spark/.test(e))return"baiduspark";if(/qiyu/.test(e))return"qiyu";if(/yunhai/.test(e))return"yunhai";if(/yy/.test(e))return"yy";if(/myie/.test(e))return"mayi";if(/11[45]{1}browser/.test(e))return"115";if(/2345/.test(e))return"2345";var n=webDetector.parse(e).browser,t=n.name,r=n.fullVersion;if("ie"===t)switch(r){case"6.0":t="ie6";break;case"7.0":t="ie7";break;case"8.0":t="ie8";break;case"9.0":t="ie9";break;case"10.0":t="ie10";break;case"11.0":t="ie11";break;case"12.0":t="ie12"}return"micromessenger"===t&&(t="wechat"),"tao"===t&&(t="taobao"),"oupeng"===t&&(t="opera"),t.indexOf("dolfin")>-1&&(t="dolphin"),(t.indexOf("ie")>-1||"android"===t)&&/2345/.test(e)&&(t="2345"),"na"===t&&(/android/.test(e)?t="android":/yandex/.test(e)&&(t="yandex")),t}function getMobileBrand(e){var n,t,r=webDetector.parse(e).device,i=MOBILE_OTHER_BRANDS.length;if("pc"===r.name||"mac"===r.name)return"";if("hongmi"===r.name)return"mi";if(/\bhonor/.test(e)||/\b(h\d+-l\d+)/.test(e))return"huawei";if(/\bsmartisan\b/.test(e)||/sm-?(\d{3,})/.test(e))return"smartisan";if(/\ba0001 build/.test(e))return"oneplus";if(/hisense/.test(e))return"hisense";if(/\bmot[-]([a-z0-9]+)/.test(e)||/ (xt\d+) build/.test(e))return"moto";if(MOBILE_BRAND_CN_MAP[r.name])return MOBILE_BRAND_CN_MAP[r.name];if("na"===r.name){for(n=0;n<i;n++)if((t=MOBILE_OTHER_BRANDS[n]).regex.test(e))return t.name;return""}return r.name}function detector$2(e){var n=getPcmb(e=e.toLowerCase());return{pcmb:n,os:getOS(e,n),bs:getBrowser(e),mb:getMobileBrand(e)}}function getCookie(e){var n=("; "+document.cookie).split("; "+e+"=");return 1===n.length?"":decodeURIComponent(n[1].split(";")[0])}function setCookie(e,n,t){t=t||{};var r=e+"="+encodeURIComponent(n);if(t.expires&&"number"==typeof t.expires){var i=new Date;t.expires=1e3*t.expires*60*60*24,r=r+"; expires="+(i=new Date(i.getTime()+t.expires)).toUTCString()}r=r+"; path="+(t.path?t.path:"/"),r+=t.domain?"; domain="+t.domain:"",document.cookie=r}function getReferrerInfo(e){return e?{host:e.split("/")[2],origin:e}:{host:"",origin:""}}function getSearchInfo(e){var n=e.host,t=e.origin;if(!n)return{engine:"",key:""};for(var r=SE_LIST.length,i=!1,o={engine:"",key:""},a=0;a<r&&!i;a++){var s=SE_LIST[a],c=s.engine;if(n.indexOf(c)>-1){i=!0,o.engine=s.value;var u,d=s.rule;if("function"==typeof d)o.key=d(t);else{u=d.split("|");for(var l=0;l<u.length;l++){var f=u[l],b=new RegExp("(^|)"+f+"=([^&]*)(&|$)","gi").exec(t);if(null!==b){o.key=b[2];break}}}}}return o}function getHost(){return window.location.hostname}function getSpeId(e){var n,t=e||window._hiido_wid,r=Object.prototype.toString;if(t)if("[object Array]"===r.call(t))n=t.join("|");else if("function"==typeof t)try{n=t.call(window),"[object Array]"===r.call(n)&&(n=n.join("|"))}catch(i){window.console.log("[HiidoJS]: _hiido_wid 函数实现错误!"),window.console.dir(i),n=""}return n||""}function getScreenColor(){return(window.screen.colorDepth||0)+"-bit"}function getScreenInfo(){return window.screen.width+"."+window.screen.height}function getLanguage(){return navigator.language||""}function getJavaSupport(){try{return navigator.javaEnabled()?1:0}catch(e){return 0}}function getActiveXVersion(e){var n=NOT_FOUND;try{n=e.GetVariable("$version")}catch(t){}return n}function getActiveXObject(e){var n=NOT_FOUND;try{n=new ActiveXObject(e)}catch(t){n={activeXError:!0}}return n}function getFlashVersion(){var e=[{name:"ShockwaveFlash.ShockwaveFlash.7",version:function(e){return getActiveXVersion(e)}},{name:"ShockwaveFlash.ShockwaveFlash.6",version:function(e){var n="6,0,21";try{e.AllowScriptAccess="always",n=getActiveXVersion(e)}catch(t){}return n}},{name:"ShockwaveFlash.ShockwaveFlash",version:function(e){return getActiveXVersion(e)}}],n=NOT_FOUND,t=navigator;try{if(t.plugins){for(var r=0;r<t.plugins.length;r++)if(t.plugins[r].name.indexOf("Shockwave Flash")>-1){(n=t.plugins[r].description.split("Shockwave Flash ")).length>1?(n=n[1])&&(n=n.split(".")[0]):n=n[0];break}}else if(window.ActiveXObject)for(var i=0;i<e.length&&n===NOT_FOUND;i++){var o=getActiveXObject(e[i].name);o.activeXError||(n=e[i].version(o))!==NOT_FOUND&&(n=n.split(",")[0].split(" ")[1])}}catch(a){}return n}function getCookieSupport(){return navigator.cookieEnabled?1:0}function getPageLink(){return window.location.href}var version="2.2.0",internal_version="2.2.0";function getVersion(e){return"v"+(e?internal_version:version)}var DOMAIN_WHITELIST=[{domain:"duowan.com",key:"duowan"},{domain:"yy.com",key:"yy"},{domain:"yy.tv",key:"yytv"},{domain:"kuaikuai.cn",key:"kuaikuai"},{domain:"hiido.com",key:"hiido"},{domain:"hiido.cn",key:"hiidocn"},{domain:"hiido.net",key:"hiidonet"},{domain:"bengou.com",key:"bengou"},{domain:"5253.com",key:"5253"},{domain:"duowan.cn",key:"duowancn"},{domain:"zzvv.com",key:"zzvv"},{domain:"99d.com",key:"99d"},{domain:"sc2.com.cn",key:"sc2"},{domain:"100.com",key:"100"},{domain:"5153.com",key:"5153"},{domain:"huya.com",key:"huya"},{domain:"1931.com",key:"1931"},{domain:"fengkaobiguo.com",key:"fengkaobiguo"},{domain:"up24.com",key:"up24"},{domain:"edu24ol.com",key:"edu24ol"},{domain:"ruixueys.com",key:"ruixueys"},{domain:"hqgwy.cn",key:"hqgwy"},{domain:"erdmusic.com",key:"erdmusic"},{domain:"zhiniu8.com",key:"zhiniu8"},{domain:"100yy.com",key:"100yy"},{domain:"dwmoniqi.com",key:"dwmoniqi"},{domain:"bigo.tv",key:"bigotv"},{domain:"bigo.sg",key:"bigosg"},{domain:"like.video",key:"bigolike"},{domain:"mcpemaster.com",key:"mcpemaster"},{domain:"cubetv.sg",key:"cubetvsg"}];function getSiteId(e){for(var n,t,r,i,o="",a=e.split("."),s="",c=0;c<DOMAIN_WHITELIST.length;c++)if(t=(n=DOMAIN_WHITELIST[c]).domain,e.indexOf(t)>-1){if(r=t.split("."),a[i=a.length-r.length]!==r[0]||e.substr(e.length-t.length)!==t)continue;var u=window._hiido_no;o=void 0!==u&&0===u?n.key:(0===i?"www":a[i-1])+"@"+n.key,s=n.domain;break}var d=getCookie("hiido_ui");return d||setCookie("hiido_ui",d=Math.random(),{expires:700,domain:"."+s}),o}function HiidoJSError(e){this.name="HiidoJSError",this.message="[HiidoJS]: "+e||false}function getScriptQueryObject(){var e,n,t=document.getElementById("_hiido_script_id_")||document.currentScript||(n=document.getElementsByTagName("script"))[n.length-1];if(!t||!t.src)throw new HiidoJSError("Cannot find Script!");if((e=t.src.split("?")).length>1){for(var r=e[1].split("&"),i={},o=0;o<r.length;o++){var a=r[o].split("=");i[a[0]]=a[1]}return i}return{}}function getSiteId$1(){var e=getScriptQueryObject();return e.siteid?e.siteid:""}function getSns(e,n){if("wechat"===e)return"wechat";for(var t=null,r=SE_LIST,i=r.length,o=0;o<i&&null===t;o++)n.engine===r[o].value&&(t=r[o].engine);return"s.weibo.com"===t?"weibo":""}function getUi(e){var n=getCookie(UI_COOKIE_TOKEN),t=window.location.hostname;return t=t.split("."),n||(n=Math.random(),e&&t.length>1?setCookie(UI_COOKIE_TOKEN,n,{expires:36500,domain:"."+t[t.length-2]+"."+t[t.length-1]}):setCookie(UI_COOKIE_TOKEN,n,{expires:36500})),n}function isNewUi(){return!getCookie(UI_COOKIE_TOKEN)}function resetSessionId(){var e=Math.random()+"";return setCookie(COOKIE_KEY_SESSIONID,e),e}function resetSessionTime(){var e=new Date;return e=e.getTime(),setCookie(COOKIE_KEY_SESSIONTIME,e),e}function checkQueryStringLen(e){return"string"==typeof e&&e.length<=2e3}HiidoJSError.prototype=new Error,HiidoJSError.prototype.constructor=HiidoJSError;var MOBILE=DEVICE_TYPES.MOBILE,hasOwn=Object.prototype.hasOwnProperty,REPORT_URL$1=window.location.protocol+REPORT_URL;function Tracker(e){var n=Tracker.isInternal;e=e.toLowerCase();var t=getReferrerInfo(document.referrer),r=getSearchInfo(t),i=n?getSiteId(window.location.hostname):getSiteId$1(),o=detector$2(e),a=isNewUi();if("undefined"==typeof window["_hdjs_loaded_"+i]){window["_hdjs_loaded_"+i]=!0,this.isInternal=n,this.detect=o,this.data={ht:getHost(),siteid:i,speid:getSpeId(),ui:getUi(n),sc:getScreenInfo(),cl:getScreenColor(),pcmb:o.pcmb,os:o.os,bs:o.bs,mb:o.mb,se:r.engine,wd:r.key,rfh:t.host,rf:t.origin,sns:getSns(o.bs,r),fl:getFlashVersion(),ln:getLanguage(),ja:getJavaSupport(),ck:getCookieSupport(),ot:"",lt:"",xy:"",ext:"",v:getVersion(n),pl:getPageLink()},this.options={isOversea:!1},a&&(this.data.isnew=1),this._hasBootstrapReport=!1,this._inactiveThreshold=2e4,this.data.hsid=this.getSessionId(),Tracker.module||window[DEFER_MODE_TAG]||this._bootstrapReport();var s=this;this.report=window.hd=function(e,n,t){t=t||{},s.options.isOversea=!!t.isOversea,n=n||{};var r=new Date-0+"",i={hsid:getCookie(COOKIE_KEY_SESSIONID),ht:s.data.ht,ui:s.data.ui,siteid:s.data.siteid,pl:s.data.pl,v:s.data.v,rf:s.data.rf,rfh:s.data.rfh,pcmb:s.data.pcmb,rnd:s.data.ui+r,ut:r};if("event"===e){if(!n.eventAction)return void window.console.warn("[HiidoJS] 请使用正确的字段进行事件上报; 详情请查询 https://hdjs.hiido.com/docs/#/events");i.ea=n.eventAction,i.ec=n.eventCategory||"",i.el=n.eventLabel||"",i.ev=n.eventValue||"",s.log("webaction",i)}else"view"===e&&(Tracker.module||window[DEFER_MODE_TAG]?(n.uid&&(s.data.uid=n.uid),n.reserve&&(s.data.reserve=Tracker.JSON.stringify(n.reserve)),s._bootstrapReport()):window.console.warn("[HiidoJS] 请在hiido.js加载前设置defer模式,详见:","http://hdjs.hiido.com/docs/#/usage?id=手动触发上报"))},this.attachMetricMethods()}}var TrackerBasePrototype=Tracker.prototype={constructor:Tracker,_bootstrapReport:function(){this._hasBootstrapReport?window.console.warn("[HiidoJS] 请不要重复调用手动上报方法!"):(this._hasBootstrapReport=!0,this.reportEnter(),this.recordLifetime(),this.attachEvents())},attachMetricMethods:function(){var e=this;this.oldMetrics=null,window.Metrics&&(window.__oldMetrics__=window.Metrics,this.oldMetrics=window.__oldMetrics__),window.__Metrics__=window.Metrics=this.Metrics={setOptions:function(n){e.setOptions(n)},serviceReport:function(n){if(e.validateMetricsReportData(n)){var t=(new Date).getTime(),r=e.generateMetricBasicData(t,n);r.reqdata=JSON.stringify([{scode:n.scode,uri:n.uri,reqtime:n.timeSpent,ret:n.code,rtime:t}]),e.log("mmetric",r)}},countReport:function(n){if(e.validateMetricsReportData(n)){var t=(new Date).getTime(),r=e.generateMetricBasicData(t,n);r.counterdata=JSON.stringify([{scode:n.scode,uri:n.uri,counterName:n.countName,value:n.count,invokecount:1}]),e.log("mmetric",r)}},customReport:function(n){if(e.validateMetricsReportData(n)){var t=(new Date).getTime(),r=e.generateMetricBasicData(t,n);r.flatdata=JSON.stringify([{scode:n.scode,uri:n.uri,topic:n.topic,val:n.val,extra:n.extra}]),e.log("mmetric",r)}},noConflict:function(){window.__oldMetrics__&&(window.Metrics=window.__oldMetrics__)}}},generateActKey:function(e,n){return md5(e+n+ACT_KEY_GENERATE_SALT).toLowerCase()},generateMetricBasicData:function(e,n){var t=e;e=Math.round(e/1e3);var r=this.generateActKey("mmetric",e),i=this.detect,o=i.os.split("|"),a=i.bs,s=o[0],c={ios:0,wp:1,android:2,macosx:3,win:4},u=Tracker.JSON.stringify([]);return{time:e,key:r,appkey:"",ver:n.ver,sdkver:getVersion(this.isInternal),sys:hasOwn.call(c,s)?c[s]:s,osver:a,model:i.mb,sjp:i.mb,net:"",clienttime:t,reqdata:u,counterdata:u,flatdata:u}},reportEnter:function(){if(!this._enterReportSent){var e=new Date-0+"",n=Tracker.assign(this.data,{io:1,ut:e,rnd:this.data.ui+e});this.log("webstat",n),this._enterReportSent=!0}},recordLifetime:function(){var e,n=this,t=window.requestAnimationFrame,r=window.cancelAnimationFrame;function i(){e.start()}function o(){e.stop()}this.data.lt=0,e=this._heartbeat=function(){var e;function i(){var r=new Date,o=r-n._ltStart;n.data.lt=n.data.lt+o,n._inactiveTime=n._inactiveTime+o,n._ltStart=r,e=n._inactiveTime<=n._inactiveThreshold?t(i):null}return{start:function(){e||(n._ltStart=new Date,e=t(i))},stop:function(){e&&(r(e),e=null)}}}(),"onfocusin"in document?(document.onfocusin=i,document.onfocusout=o):(window.onfocus=i,window.onblur=o);var a,s,c,u=["","webkit","moz","ms","o"];if(this.data.pcmb===MOBILE){for(var d=0;d<u.length;d++)if((s=(a=u[d])?a+"Hidden":"hidden")in document){c=a+"visibilitychange";break}c&&Tracker.addEvent(document,c,function(){document[s]?o():i()})}this._inactiveTime=0,e.start()},reportLeave:function(){if(!this._leaveReportSent){var e=new Date-0+"",n=Tracker.assign(this.data,{io:0,ut:e,rnd:this.data.ui+e,hsid:getCookie(COOKIE_KEY_SESSIONID)});this.log("webstat",n),this._leaveReportSent=!0}},log:function(e,n){var t=this,r=[];for(var i in n)r.push(encodeURIComponent(i)+"="+encodeURIComponent(n[i]));var o,a=r.join("&"),s="log_"+(new Date).getTime(),c=new Image(1,1);if(window[s]=c,c.onerror=function(){(!0===window[REPORT_TAG_OVERSEA]||t.options.isOversea)&&(c.src=REPORT_URL$1+"?act="+e+"&"+a,c.onerror=function(){window[s]=null}),window[s]=null},c.onload=function(){window[s]=null},!checkQueryStringLen(o=!0===window[REPORT_TAG_OVERSEA]||t.options.isOversea?REPORT_URL_OVERSEA+"?act="+e+"&"+a:REPORT_URL$1+"?act="+e+"&"+a))throw new HiidoJSError("Exceeding Maximum URL length - 2000 Characters");c.src=o},attachEvents:function(){var e=this;Tracker.addEvent(document,"click",function(n){var t=n.target||n.srcElement;(function(e){for(var n;e&&"a"!==(n=e.tagName.toLowerCase())&&"html"!==n;)e=e.parentNode;return"a"===n})(t)&&(e.data.ot=t.href),e.data.xy=n.clientX+","+n.clientY},!0),window.onbeforeunload=function(){e.reportLeave()},window.onunload=function(){e.reportLeave()},this.data.pcmb===MOBILE&&(Tracker.addEvent(window,"pageshow",function(n){n.persisted&&(e._leaveReportSent=!1,e._enterReportSent=!1,e.data.lt=0,e.reportEnter())}),Tracker.addEvent(window,"pagehide",function(n){n.persisted&&e.reportLeave()}),Tracker.addEvent(window,"touchstart",function(){e._inactiveTime=0,e._heartbeat.start()}))},getSessionId:function(){var e,n=getCookie(COOKIE_KEY_SESSIONTIME);return""===n?(e=resetSessionId(),resetSessionTime()):""!==this.data.rfh&&-1===this.data.rfh.indexOf(this.data.ht)?e=resetSessionId():(n=getCookie(COOKIE_KEY_SESSIONTIME),e=(new Date).getTime()-n>SESSION_GAP?resetSessionId():getCookie(COOKIE_KEY_SESSIONID)),resetSessionTime(),e},validateMetricsReportData:function(e){for(var n,t=["scode","ver","uri"],r=0;r<t.length;r++)if(!e[n=t[r]])return window.console.warn("HiidoJS: Metrics 上报必须上报"+n+". 详情请查询 https://hdjs.hiido.com/docs/#/metrics"),!1;return!0},setOptions:function(e){this.options=Tracker.assign({},this.options,e)}};function assign(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i]);return t}function addEvent(e,n,t,r){e.addEventListener?e.addEventListener(n,t,!!r):e.attachEvent&&(e["e"+n+t]=t,e[n+t]=function(){e["e"+n+t](window.event)},e.attachEvent("on"+n,e[n+t]))}function injectPollyfills(e){for(var n=0,t=["ms","moz","webkit","o"],r=0;r<t.length&&!e.requestAnimationFrame;++r)e.requestAnimationFrame=e[t[r]+"RequestAnimationFrame"],e.cancelAnimationFrame=e[t[r]+"CancelAnimationFrame"]||e[t[r]+"CancelRequestAnimationFrame"];if(e.requestAnimationFrame||(e.requestAnimationFrame=function(t){var r=(new Date).getTime(),i=Math.max(0,16-(r-n)),o=e.setTimeout(function(){t(r+i)},i);return n=r+i,o}),e.cancelAnimationFrame||(e.cancelAnimationFrame=function(n){e.clearTimeout(n)}),!window.console){var i={log:function(){},dir:function(e){for(var n in e)i.log(n+" ",e[n])}};i.warn=i.log,window.console=i}window.console.dir||(window.console.dir=function(e){for(var n in e)window.console.log(n+" ",e[n])}),window.console.warn||(window.console.warn=window.console.log)}var tracker,json3=createCommonjsModule(function(e,n){(function(){var t= false&&false,r={"function":!0,object:!0},i=n&&!n.nodeType&&n,o=r["undefined"==typeof window?"undefined":_typeof(window)]&&window||this,a=i&&r.object&&e&&!e.nodeType&&"object"==_typeof(commonjsGlobal)&&commonjsGlobal;function s(e,n){e||(e=o.Object()),n||(n=o.Object());var t=e.Number||o.Number,i=e.String||o.String,a=e.Object||o.Object,c=e.Date||o.Date,u=e.SyntaxError||o.SyntaxError,d=e.TypeError||o.TypeError,l=e.Math||o.Math,f=e.JSON||o.JSON;"object"==(void 0===f?"undefined":_typeof(f))&&f&&(n.stringify=f.stringify,n.parse=f.parse);var b,p,m,w=a.prototype,h=w.toString,g=new c(-0xc782b5b800cec);try{g=-109252==g.getUTCFullYear()&&0===g.getUTCMonth()&&1===g.getUTCDate()&&10==g.getUTCHours()&&37==g.getUTCMinutes()&&6==g.getUTCSeconds()&&708==g.getUTCMilliseconds()}catch(D){}function v(e){if(v[e]!==m)return v[e];var r;if("bug-string-char-index"==e)r="a"!="a"[0];else if("json"==e)r=v("json-stringify")&&v("json-parse");else{var o,a='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==e){var s=n.stringify,u="function"==typeof s&&g;if(u){(o=function(){return 1}).toJSON=o;try{u="0"===s(0)&&"0"===s(new t)&&'""'==s(new i)&&s(h)===m&&s(m)===m&&s()===m&&"1"===s(o)&&"[1]"==s([o])&&"[null]"==s([m])&&"null"==s(null)&&"[null,null,null]"==s([m,h,null])&&s({a:[o,!0,!1,null,"\0\b\n\f\r\t"]})==a&&"1"===s(null,o)&&"[\n 1,\n 2\n]"==s([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==s(new c(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==s(new c(864e13))&&'"-000001-01-01T00:00:00.000Z"'==s(new c(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==s(new c(-1))}catch(D){u=!1}}r=u}if("json-parse"==e){var d=n.parse;if("function"==typeof d)try{if(0===d("0")&&!d(!1)){var l=5==(o=d(a)).a.length&&1===o.a[0];if(l){try{l=!d('"\t"')}catch(D){}if(l)try{l=1!==d("01")}catch(D){}if(l)try{l=1!==d("1.")}catch(D){}}}}catch(D){l=!1}r=l}}return v[e]=!!r}if(!v("json")){var _=v("bug-string-char-index");if(!g)var y=l.floor,O=[0,31,59,90,120,151,181,212,243,273,304,334],k=function(e,n){return O[n]+365*(e-1970)+y((e-1969+(n=+(n>1)))/4)-y((e-1901+n)/100)+y((e-1601+n)/400)};if((b=w.hasOwnProperty)||(b=function(e){var n,t={};return(t.__proto__=null,t.__proto__={toString:1},t).toString!=h?b=function(e){var n=this.__proto__,t=e in(this.__proto__=null,this);return this.__proto__=n,t}:(n=t.constructor,b=function(e){var t=(this.constructor||n).prototype;return e in this&&!(e in t&&this[e]===t[e])}),t=null,b.call(this,e)}),p=function(e,n){var t,i,o,a=0;for(o in(t=function(){this.valueOf=0}).prototype.valueOf=0,i=new t)b.call(i,o)&&a++;return t=i=null,a?p=2==a?function(e,n){var t,r={},i="[object Function]"==h.call(e);for(t in e)i&&"prototype"==t||b.call(r,t)||!(r[t]=1)||!b.call(e,t)||n(t)}:function(e,n){var t,r,i="[object Function]"==h.call(e);for(t in e)i&&"prototype"==t||!b.call(e,t)||(r="constructor"===t)||n(t);(r||b.call(e,t="constructor"))&&n(t)}:(i=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],p=function(e,n){var t,o,a="[object Function]"==h.call(e),s=!a&&"function"!=typeof e.constructor&&r[_typeof(e.hasOwnProperty)]&&e.hasOwnProperty||b;for(t in e)a&&"prototype"==t||!s.call(e,t)||n(t);for(o=i.length;t=i[--o];s.call(e,t)&&n(t));}),p(e,n)},!v("json-stringify")){var S={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},E=function(e,n){return("000000"+(n||0)).slice(-e)},x=function(e){for(var n='"',t=0,r=e.length,i=!_||r>10,o=i&&(_?e.split(""):e);t<r;t++){var a=e.charCodeAt(t);switch(a){case 8:case 9:case 10:case 12:case 13:case 34:case 92:n+=S[a];break;default:if(a<32){n+="\\u00"+E(2,a.toString(16));break}n+=i?o[t]:e.charAt(t)}}return n+'"'};n.stringify=function(e,n,t){var i,o,a,s;if(r[void 0===n?"undefined":_typeof(n)]&&n)if("[object Function]"==(s=h.call(n)))o=n;else if("[object Array]"==s){a={};for(var c,u=0,l=n.length;u<l;c=n[u++],("[object String]"==(s=h.call(c))||"[object Number]"==s)&&(a[c]=1));}if(t)if("[object Number]"==(s=h.call(t))){if((t-=t%1)>0)for(i="",t>10&&(t=10);i.length<t;i+=" ");}else"[object String]"==s&&(i=t.length<=10?t:t.slice(0,10));return function f(e,n,t,r,i,o,a){var s,c,u,l,w,g,v,_,O,S,I,T,C,R,A,M;try{s=n[e]}catch(D){}if("object"==(void 0===s?"undefined":_typeof(s))&&s)if("[object Date]"!=(c=h.call(s))||b.call(s,"toJSON"))"function"==typeof s.toJSON&&("[object Number]"!=c&&"[object String]"!=c&&"[object Array]"!=c||b.call(s,"toJSON"))&&(s=s.toJSON(e));else if(s>-1/0&&s<1/0){if(k){for(w=y(s/864e5),u=y(w/365.2425)+1970-1;k(u+1,0)<=w;u++);for(l=y((w-k(u,0))/30.42);k(u,l+1)<=w;l++);w=1+w-k(u,l),v=y((g=(s%864e5+864e5)%864e5)/36e5)%24,_=y(g/6e4)%60,O=y(g/1e3)%60,S=g%1e3}else u=s.getUTCFullYear(),l=s.getUTCMonth(),w=s.getUTCDate(),v=s.getUTCHours(),_=s.getUTCMinutes(),O=s.getUTCSeconds(),S=s.getUTCMilliseconds();s=(u<=0||u>=1e4?(u<0?"-":"+")+E(6,u<0?-u:u):E(4,u))+"-"+E(2,l+1)+"-"+E(2,w)+"T"+E(2,v)+":"+E(2,_)+":"+E(2,O)+"."+E(3,S)+"Z"}else s=null;if(t&&(s=t.call(n,e,s)),null===s)return"null";if("[object Boolean]"==(c=h.call(s)))return""+s;if("[object Number]"==c)return s>-1/0&&s<1/0?""+s:"null";if("[object String]"==c)return x(""+s);if("object"==(void 0===s?"undefined":_typeof(s))){for(R=a.length;R--;)if(a[R]===s)throw d();if(a.push(s),I=[],A=o,o+=i,"[object Array]"==c){for(C=0,R=s.length;C<R;C++)T=f(C,s,t,r,i,o,a),I.push(T===m?"null":T);M=I.length?i?"[\n"+o+I.join(",\n"+o)+"\n"+A+"]":"["+I.join(",")+"]":"[]"}else p(r||s,function(e){var n=f(e,s,t,r,i,o,a);n!==m&&I.push(x(e)+":"+(i?" ":"")+n)}),M=I.length?i?"{\n"+o+I.join(",\n"+o)+"\n"+A+"}":"{"+I.join(",")+"}":"{}";return a.pop(),M}}("",((c={})[""]=e,c),o,a,i,"",[])}}if(!v("json-parse")){var I,T,C=i.fromCharCode,R={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},A=function(){throw I=T=null,u()},M=function(){for(var e,n,t,r,i,o=T,a=o.length;I<a;)switch(i=o.charCodeAt(I)){case 9:case 10:case 13:case 32:I++;break;case 123:case 125:case 91:case 93:case 58:case 44:return e=_?o.charAt(I):o[I],I++,e;case 34:for(e="@",I++;I<a;)if((i=o.charCodeAt(I))<32)A();else if(92==i)switch(i=o.charCodeAt(++I)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:e+=R[i],I++;break;case 117:for(n=++I,t=I+4;I<t;I++)(i=o.charCodeAt(I))>=48&&i<=57||i>=97&&i<=102||i>=65&&i<=70||A();e+=C("0x"+o.slice(n,I));break;default:A()}else{if(34==i)break;for(i=o.charCodeAt(I),n=I;i>=32&&92!=i&&34!=i;)i=o.charCodeAt(++I);e+=o.slice(n,I)}if(34==o.charCodeAt(I))return I++,e;A();default:if(n=I,45==i&&(r=!0,i=o.charCodeAt(++I)),i>=48&&i<=57){for(48==i&&((i=o.charCodeAt(I+1))>=48&&i<=57)&&A(),r=!1;I<a&&((i=o.charCodeAt(I))>=48&&i<=57);I++);if(46==o.charCodeAt(I)){for(t=++I;t<a&&((i=o.charCodeAt(t))>=48&&i<=57);t++);t==I&&A(),I=t}if(101==(i=o.charCodeAt(I))||69==i){for(43!=(i=o.charCodeAt(++I))&&45!=i||I++,t=I;t<a&&((i=o.charCodeAt(t))>=48&&i<=57);t++);t==I&&A(),I=t}return+o.slice(n,I)}if(r&&A(),"true"==o.slice(I,I+4))return I+=4,!0;if("false"==o.slice(I,I+5))return I+=5,!1;if("null"==o.slice(I,I+4))return I+=4,null;A()}return"$"},N=function(e,n,t){var r=j(e,n,t);r===m?delete e[n]:e[n]=r},j=function(e,n,t){var r,i=e[n];if("object"==(void 0===i?"undefined":_typeof(i))&&i)if("[object Array]"==h.call(i))for(r=i.length;r--;)N(i,r,t);else p(i,function(e){N(i,e,t)});return t.call(e,n,i)};n.parse=function(e,n){var t,r;return I=0,T=""+e,t=function i(e){var n,t;if("$"==e&&A(),"string"==typeof e){if("@"==(_?e.charAt(0):e[0]))return e.slice(1);if("["==e){for(n=[];"]"!=(e=M());t||(t=!0))t&&(","==e?"]"==(e=M())&&A():A()),","==e&&A(),n.push(i(e));return n}if("{"==e){for(n={};"}"!=(e=M());t||(t=!0))t&&(","==e?"}"==(e=M())&&A():A()),","!=e&&"string"==typeof e&&"@"==(_?e.charAt(0):e[0])&&":"==M()||A(),n[e.slice(1)]=i(M());return n}A()}return e}(M()),"$"!=M()&&A(),I=T=null,n&&"[object Function]"==h.call(n)?j(((r={})[""]=t,r),"",n):t}}}return n.runInContext=s,n}if(!a||a.global!==a&&a.window!==a&&a.self!==a||(o=a),i&&!t)s(o,i);else{var c=o.JSON,u=o.JSON3,d=!1,l=s(o,o.JSON3={noConflict:function(){return d||(d=!0,o.JSON=c,o.JSON3=u,c=u=null),l}});o.JSON={parse:l.parse,stringify:l.stringify}}t&&undefined(function(){return l})}).call(commonjsGlobal)});injectPollyfills(window),Tracker.addEvent=addEvent,Tracker.assign=assign,Tracker.isInternal=!0,Tracker.module=!0,Tracker.JSON=json3,Tracker.prototype.setSiteId=function(e){Tracker.isInternal||(this.data.siteid=e)},Tracker.prototype.setSpeId=function(e){this.data&&(this.data.speid=getSpeId(e))},function(){try{var e=navigator.userAgent;tracker=new Tracker(e)}catch(a){if(a instanceof HiidoJSError)throw a;window.console.dir(a);var n=new Image(1,1),t="";for(var r in a)t+=r+":"+a[r]+";";var i=encodeURIComponent,o=a.stack?i(a.stack):"";n.src=window.location.protocol+"//wbugs.hiido.com/c.gif?e="+i(t)+"|"+o+"|"+i(window.location.href)+"|"+i(e),n.onload=function(){}}}();var report=tracker.report,Metrics=tracker.Metrics,oldMetrics=tracker.oldMetrics,setSiteId=tracker.setSiteId.bind(tracker),setSpeId=tracker.setSpeId.bind(tracker);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LOGLEVEL_DEBUG = -1;
const LOGLEVEL_LOG = 0;
const LOGLEVEL_INFO = 1;
const LOGLEVEL_WARN = 2;
const LOGLEVEL_ERROR = 3;
const MAX_LOG_LENGTH = 1000;
let globalLevel = LOGLEVEL_LOG;
let bCanIUseWxLog = canIUseWxLog(); //wx的LogManager是否可用，存储一份避免频繁获取
function padMs(ms) {
    let len = ms.toString().length;
    let ret;
    switch (len) {
        case 1:
            ret = '00' + ms;
            break;
        case 2:
            ret = '0' + ms;
            break;
        default:
            ret = ms;
            break;
    }
    return ret;
}
function getPrefix() {
    let date = new Date();
    return 'hummer ' + date.toLocaleTimeString('en-US', { hour12: false }) + '.' + padMs(date.getMilliseconds()) + ':';
}
function canIUseWxLog() {
    if (typeof (window) == 'undefined') {
        const version = wx.getSystemInfoSync().SDKVersion;
        if (compareVersion(version, '2.1.0') >= 0) {
            wx.getLogManager().log("I can use wx log. SDKVersion=" + version);
            return true;
        }
    }
    return false;
}
function compareVersion(v1, v2) {
    v1 = v1.split('.');
    v2 = v2.split('.');
    const len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
        v1.push('0');
    }
    while (v2.length < len) {
        v2.push('0');
    }
    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i]);
        const num2 = parseInt(v2[i]);
        if (num1 > num2) {
            return 1;
        }
        else if (num1 < num2) {
            return -1;
        }
    }
    return 0;
}
let logger = {
    _data: [],
    _length: 0,
    _visible: false,
    debug: function (s) {
        if (globalLevel <= LOGLEVEL_DEBUG) {
            s = getPrefix() + s;
            logger.record(s, 'debug');
            console.debug(s);
            if (bCanIUseWxLog) {
                wx.getLogManager().debug(s);
            }
        }
    },
    log: function (s) {
        if (globalLevel <= LOGLEVEL_LOG) {
            s = getPrefix() + s;
            logger.record(s, 'log');
            console.log(s);
            if (bCanIUseWxLog) {
                wx.getLogManager().log(s);
            }
        }
    },
    info: function (s) {
        if (globalLevel <= LOGLEVEL_INFO) {
            s = getPrefix() + s;
            logger.record(s, 'info');
            console.info(s);
            if (bCanIUseWxLog) {
                wx.getLogManager().info(s);
            }
        }
    },
    warn: function (s) {
        if (globalLevel <= LOGLEVEL_WARN) {
            s = getPrefix() + s;
            logger.record(s, 'warn');
            console.warn(s);
            if (bCanIUseWxLog) {
                wx.getLogManager().warn(s);
            }
        }
    },
    error: function (s) {
        if (globalLevel <= LOGLEVEL_ERROR) {
            s = getPrefix() + s;
            logger.record(s, 'error');
            console.error(s);
            //微信写不了error日志，就用warn代替了
            if (bCanIUseWxLog) {
                wx.getLogManager().warn(s);
            }
        }
    },
    setLevel: function (newLevel = 0) {
        console.log(getPrefix() + 'set level from ' + globalLevel + ' to ' + newLevel);
        //print('set level from ' + globalLevel + ' to ' + newLevel);
        globalLevel = newLevel;
    },
    record: function (s, type) {
        if (logger._length === MAX_LOG_LENGTH + 100) {
            logger._data.splice(0, 100);
            logger._length = MAX_LOG_LENGTH;
        }
        logger._length++;
        logger._data.push(`${s} [${type}]`);
        if (logger._visible) {
            let logWindow = document.getElementById('__h5playerLogWin');
            logWindow.value += s + '\r\n';
            logWindow.scrollTop = 10000;
        }
    },
    getLog: function () {
        return logger._data;
    },
    setLogVisible: function (visible) {
        logger._visible = visible;
        let logWindow = document.getElementById('__h5playerLogWin');
        if (visible) {
            if (!logWindow) {
                logWindow = document.createElement('textarea');
                logWindow.id = '__h5playerLogWin';
                logWindow.style.display = 'block';
                logWindow.style.position = 'absolute';
                logWindow.style.top = '0';
                logWindow.style.width = '500px';
                logWindow.style.height = '300px';
                document.body.appendChild(logWindow);
            }
            let lines = '';
            for (let i = 0; i < logger._length; i++) {
                lines += logger._data[i] + '\r\n';
            }
            logWindow.value = lines;
            logWindow.scrollTop = 10000;
        }
        else {
            if (logWindow) {
                logWindow.style.display = 'none';
            }
        }
    }
};
//导出logger到页面
if (window) {
    window._h5playerLogger = logger;
}
//module.exports = logger;
exports.default = logger;


/***/ }),

/***/ "./src/utils/metricsUtil.ts":
/*!**********************************!*\
  !*** ./src/utils/metricsUtil.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MetricsUtil {
    static report(scode, svcName, functionName, protoType, timeSpent, code) {
        if (scode == 0) { //业务侧不设置scode的话sdk就不上报
            return;
        }
        //小程序环境禁用Metrics
        if (typeof (window) == 'undefined') {
            return;
        }
        //动态模块加载，如果没有动态模块加载逻辑，在小程序环境即使不会执行到Metrics.serviceReport也会报错
        //https://www.tslang.cn/docs/handbook/modules.html
        let MetricsModule = __webpack_require__(/*! ./hiido_internal.esm */ "./src/utils/hiido_internal.esm.js"); //[object Module]
        if (MetricsModule.Metrics) { //function
            MetricsModule.Metrics.setOptions({ isOversea: true }); //设置上报模式为海外上报, 将使用独立的海外上报域名
            MetricsModule.Metrics.serviceReport({
                scode: scode,
                ver: '1.0.0',
                uri: svcName + '|' + functionName + '|' + protoType,
                timeSpent: timeSpent,
                code: code
            });
        }
    }
}
exports.default = MetricsUtil;


/***/ }),

/***/ "./src/utils/mutex.ts":
/*!****************************!*\
  !*** ./src/utils/mutex.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Mutex {
    constructor() {
        this.lockers = new Map();
    }
    lock(key) {
        this.lockers.set(key, true);
    }
    unlock(key) {
        this.lockers.set(key, false);
        //console.log("unlock: key=", key);
    }
    wait(key) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.lockers.get(key)) {
                    resolve();
                }
                else {
                    //reject(new Error(`${key} has been locked`))
                    reject(`${key} has been locked`);
                }
            });
        });
    }
}
exports.default = Mutex;


/***/ }),

/***/ "./src/utils/queue.ts":
/*!****************************!*\
  !*** ./src/utils/queue.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor(n) {
        this.n = 100;
        this.list = [];
        this.n = n;
    }
    //向队列中添加数据
    enqueue(data) {
        if (data == null) {
            return false;
        }
        //如果传递了size参数就设置了队列的大小
        if (this.n != null && !isNaN(this.n)) {
            if (this.list.length >= this.n) {
                this.dequeue();
            }
        }
        this.list.unshift(data);
        return true;
    }
    //从队列中取出数据
    dequeue() {
        return this.list.pop();
    }
    //返回队列的大小
    size() {
        return this.list.length;
    }
    // 返回队列的内容
    quere() {
        return this.list;
    }
    // 查找指定的元素在数组中的位置
    indexOf(data) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] === data) {
                return i;
            }
        }
        return -1;
    }
    // 通过索引删除数组元素
    remove(index) {
        //let index = this.indexOf(data);
        if (index > -1) {
            this.list.splice(index, 1);
        }
    }
    // 删除队列中的element
    delete(data) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] == data) {
                this.list.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    // 删除队列中的element
    clear() {
        this.list = [];
    }
}
exports.default = Queue;


/***/ }),

/***/ "./src/utils/timeUtil.ts":
/*!*******************************!*\
  !*** ./src/utils/timeUtil.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let baseTime = 0;
let TimeUtil = {
    now: function () {
        if (baseTime === 0) {
            baseTime = Date.now() - 1;
        }
        let diff = Date.now() - baseTime;
        if (diff > 0xFFFFFFFF) {
            baseTime += 0xFFFFFFFF;
            return (Date.now() - baseTime);
        }
        else {
            return diff;
        }
    },
    utc: function () {
        return Math.round(Date.now() / 1000);
    }
};
//module.exports = TimeUtil;
exports.default = TimeUtil;


/***/ }),

/***/ "./src/utils/utf8.ts":
/*!***************************!*\
  !*** ./src/utils/utf8.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = __webpack_require__(/*! @protobufjs/utf8 */ "./node_modules/@protobufjs/utf8/index.js");
function encodeStringToUtf8Bytes(text) {
    let len = utf8_1.length(text);
    let buf = new Uint8Array(len);
    utf8_1.write(text, buf, 0);
    return buf;
}
exports.encodeStringToUtf8Bytes = encodeStringToUtf8Bytes;
function decodeUtf8BytesToString(buf) {
    return utf8_1.read(buf, 0, buf.length);
}
exports.decodeUtf8BytesToString = decodeUtf8BytesToString;


/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
const ProtoUInt64_1 = __webpack_require__(/*! ../protobase/ProtoUInt64 */ "./src/protobase/ProtoUInt64.ts");
const logger_1 = __webpack_require__(/*! ./logger */ "./src/utils/logger.ts");
const extend_1 = __webpack_require__(/*! ./extend */ "./src/utils/extend.ts");
/**
Utils
*/
class Utils {
    static inet_ntoa(ip) {
        let ipstr = '';
        let a1, a2, a3, a4;
        let buf = new Uint8Array(4);
        let view = new DataView(buf.buffer);
        view.setUint32(0, ip);
        a1 = view.getUint8(0);
        a2 = view.getUint8(1);
        a3 = view.getUint8(2);
        a4 = view.getUint8(3);
        ipstr = a4 + '.' + a3 + '.' + a2 + '.' + a1;
        return ipstr;
    }
    static isBiggerUint(src, dest) {
        if (src === dest) {
            return false;
        }
        else if (src > dest) {
            let val = src - dest;
            if (val < 0x7fffffff) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            let val = dest - src;
            if (val < 0x7fffffff) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    static isEqualOrBiggerUint(src, dest) {
        if (src === dest) {
            return true;
        }
        else if (src > dest) {
            let val = src - dest;
            if (val < 0x7fffffff) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            let val = dest - src;
            if (val < 0x7fffffff) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    static isBiggerUint8(src, dest) {
        if (src === dest) {
            return false;
        }
        else if (src > dest) {
            let val = src - dest;
            if (val < 0x7f) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            let val = dest - src;
            if (val < 0x7f) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    static getUintMax() {
        return 0xFFFFFFFF;
    }
    static isUintMax(val) {
        return (val === 0xFFFFFFFF);
    }
    static getIntMax() {
        return 0x7FFFFFFF;
    }
    static getIntMin() {
        return this.getIntMax() * -1;
    }
    static isUint64Max(val) {
        return (val.high === 0xFFFFFFFF && val.low === 0xFFFFFFFF);
    }
    static uint2ip(ip) {
        let a1, a2, a3, a4;
        a1 = ip & 0xff;
        a2 = (ip >> 8) & 0xff;
        a3 = (ip >> 16) & 0xff;
        a4 = (ip >> 24) & 0xff;
        return a1 + '.' + a2 + '.' + a3 + '.' + a4;
    }
    static ip2uint(ipStr) {
        let a = ipStr.split('.');
        let ip = (parseInt(a[3]) << 24) + (parseInt(a[2]) << 16) + (parseInt(a[1]) << 8) + parseInt(a[0]);
        return ip >>> 0;
    }
    static isNumber(input) {
        return input !== null && (typeof (input) === 'number' && !isNaN(input - 0) || (typeof input === 'object' && input.constructor === Number));
    }
    static isString(input) {
        //return Object.prototype.toString.call(input) === '[object String]';
        let type = Object.prototype.toString.call(input).match(/^\[object (.*)\]$/)[1].toLowerCase();
        return type == "string";
    }
    static isEmpty(obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 检测input类型是否为Map
     * @param input
     */
    static isMap(input) {
        let type = Object.prototype.toString.call(input).match(/^\[object (.*)\]$/)[1].toLowerCase();
        return type == "map";
    }
    static isObject(input) {
        let type = Object.prototype.toString.call(input).match(/^\[object (.*)\]$/)[1].toLowerCase();
        return type == "object";
    }
    /**
     * json object转Map
     * @param input
     */
    static toMap(input) {
        if (Utils.isMap(input)) {
            return input;
        }
        else if (Utils.isObject(input)) {
            let m = new Map();
            for (let k of Object.keys(input)) {
                m.set(k, input[k].toString());
            }
            return m;
        }
        else {
            return null;
        }
    }
    static bin2hex(s) {
        var i, l, o = '', n;
        s += '';
        for (i = 0, l = s.length; i < l; i++) {
            n = s.charCodeAt(i).toString(16);
            o += n.length < 2 ? '0' + n : n;
        }
        return o;
    }
    //生成uuid，有必要搞这么复杂的生成公式吗...
    //TODO 参考媒体sdk生成uuid的方法吧
    static getUUID(domain) {
        var crc = "";
        var hexDigits = "0123456789abcdef";
        try {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var txt = domain;
            ctx.fillStyle = '#f60';
            ctx.fillRect(0, 0, 8, 10);
            ctx.fillStyle = '#FF0000';
            ctx.fillText(txt, 4, 17);
            var b64 = canvas.toDataURL().replace('data:image/png;base64,', '');
            var bin = atob(b64);
            crc = Utils.bin2hex(bin.slice(-16, -12));
        }
        catch (e) {
            var tmp = [];
            for (let i = 0; i < 8; i++) {
                tmp[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            crc = tmp.join("");
            // console.log(" [svc_sdk] draw uuid canvas error. use random insted:", crc);
        }
        var s = [];
        for (let i = 0; i < 28; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[6] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[11] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[0] = s[5] = s[10] = s[15] = "-";
        var uuid = crc + s.join("");
        // console.log(" [svc_sdk] final uuid:", uuid);
        return uuid;
    }
    static getCookie(c_name, bMiniProgram = false) {
        if (!bMiniProgram) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    var c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    var c_value = decodeURI(document.cookie.substring(c_start, c_end));
                    // console.log(" [svc_sdk] getCookie key:", c_name, "value:", c_value);
                    return c_value;
                }
            }
        }
        else {
            return wx.getStorageSync(c_name.toString());
        }
        return "";
    }
    /**
     * 设置浏览器cookie
     * @param name
     * @param value
     * @param delayHours
     * @param path
     * @param domain
     * @param secure
     */
    static setCookie(name, value, delayHours, path, domain, secure) {
        if (!delayHours) {
            delayHours = 24;
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + delayHours * 60 * 60 * 1000);
        //toGMTString 不赞成使用此方法。请使用 toUTCString() 取而代之！！
        document.cookie = name + "=" + window.encodeURI(value) + ";expires=" + exp.toUTCString() + (domain ? ";domain=" + domain : "")
            + (path ? ";path=" + path : "") + (secure === true ? ";secure" : "");
    }
    /**
     * 设置wx cookie
     * @param name
     * @param value
     */
    static setWxCookie(name, value) {
        wx.setStorageSync(name, value);
        wx.setStorageSync('oscookieDate', Date.now());
    }
    /**
      * 在指定的号段生成uid
      * web号段[4283717296 ,4294967295]
      */
    static getUidInCertainInterval() {
        return parseInt('' + (Math.random() * (4294967295 - 4283717296 + 1) + 4283717296), 10);
    }
    /**
     * 小程序环境不允许共享
     * h5环境允许共享的情况下，本地cookie有匿名uid则用之；没有则生成，然后写入本地cookie；否则每次都生成新的，并且不写入本地cookie
     *
     */
    static getOrGenerateUid(domain, bShare) {
        if (!bShare) {
            return Utils.getUidInCertainInterval();
        }
        let uidFromCookie = Utils.getCookie('svc_anonymous_uid');
        if (!uidFromCookie) {
            let uid = Utils.getUidInCertainInterval();
            let secure = (document.location.protocol == "https:" ? true : false);
            Utils.setCookie('svc_anonymous_uid', uid.toString(), 168, "/", domain, secure);
            logger_1.default.warn('Utils.getOrGenerateUid save uid to cookie uid=' + uid);
            return uid;
        }
        logger_1.default.warn('Utils.getOrGenerateUid get uid from cookie uid=' + uidFromCookie);
        return parseInt(uidFromCookie);
    }
    static DelayPromise(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }
    /**
     * 把64bit数字转成ProtoUInt64类型，便于比较
     * @param num 数字
     */
    static number2ProtoUInt64(num) {
        if (num <= Utils.getUintMax()) {
            return (new ProtoUInt64_1.default(0, num));
        }
        let numL = Long.fromString(num.toString());
        return (new ProtoUInt64_1.default(numL.high, numL.low));
    }
    /**
     * 封装小程序 api，返回Promise
     * @param method
     * @param options
     */
    static wxPromise(method, options) {
        return new Promise(function (resolve, reject) {
            let _options = Object.assign({}, options, {
                success(res) {
                    resolve(res);
                    if (options && options.success) {
                        options.success(res);
                    }
                },
                fail(res) {
                    logger_1.default.error(method + " " + JSON.stringify(res));
                    reject(res);
                    if (options && options.fail) {
                        options.fail(res);
                    }
                }
            });
            wx[method](_options);
        });
    }
    /**
     * 发起网络GET请求 wx.request(OBJECT)
     * @param obj
     */
    static yFetch(obj) {
        let option = extend_1.default(true, {}, {
            method: 'GET'
        }, obj);
        return Utils.wxPromise('request', option);
    }
    /**
     * 由于底层内存是共享的，为了避免索引问题，这里拷贝一份payload，并返回新的字节数组的DataView
     * @param payload
     */
    static payload2DataView(payload) {
        let tempUint8Array = new Uint8Array(payload.byteLength);
        tempUint8Array.set(payload, 0);
        //操作临时分配的内存区域
        let view = new DataView(tempUint8Array.buffer);
        payload = null;
        return view;
    }
    /**
     * 输出map的内容
     * @param map
     */
    static stringfyMap(map) {
        let obj = Utils.map2Object(map);
        return JSON.stringify(obj);
    }
    /**
     * 为了兼容旧sdk的数据结构，新sdk提供一个功能，将map转为object
     * @param map
     */
    static map2Object(map) {
        let ret = {};
        for (let [k, v] of map) {
            if (Utils.isMap(v)) {
                ret[k] = Utils.map2Object(v);
            }
            else {
                ret[k] = v;
            }
        }
        return ret;
    }
}
exports.default = Utils;


/***/ }),

/***/ "./src/versionInfo.ts":
/*!****************************!*\
  !*** ./src/versionInfo.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.version = 1573899229;
//export const svn = 2326314;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=hummer-im.js.map