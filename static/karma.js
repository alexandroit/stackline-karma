(function() {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = function(cb, mod) {
    return function __require() {
      try {
        return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      } catch (e) {
        throw mod = 0, e;
      }
    };
  };

  // node_modules/extend/index.js
  var require_extend = __commonJS({
    "node_modules/extend/index.js": function(exports, module) {
      "use strict";
      var hasOwn = Object.prototype.hasOwnProperty;
      var toStr = Object.prototype.toString;
      var defineProperty = Object.defineProperty;
      var gOPD = Object.getOwnPropertyDescriptor;
      var isArray = function isArray2(arr) {
        if (typeof Array.isArray === "function") {
          return Array.isArray(arr);
        }
        return toStr.call(arr) === "[object Array]";
      };
      var isPlainObject = function isPlainObject2(obj) {
        if (!obj || toStr.call(obj) !== "[object Object]") {
          return false;
        }
        var hasOwnConstructor = hasOwn.call(obj, "constructor");
        var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
        if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
          return false;
        }
        var key;
        for (key in obj) {
        }
        return typeof key === "undefined" || hasOwn.call(obj, key);
      };
      var setProperty = function setProperty2(target, options) {
        if (defineProperty && options.name === "__proto__") {
          defineProperty(target, options.name, {
            enumerable: true,
            configurable: true,
            value: options.newValue,
            writable: true
          });
        } else {
          target[options.name] = options.newValue;
        }
      };
      var getProperty = function getProperty2(obj, name) {
        if (name === "__proto__") {
          if (!hasOwn.call(obj, name)) {
            return void 0;
          } else if (gOPD) {
            return gOPD(obj, name).value;
          }
        }
        return obj[name];
      };
      module.exports = function extend() {
        var options, name, src, copy, copyIsArray, clone;
        var target = arguments[0];
        var i = 1;
        var length = arguments.length;
        var deep = false;
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[1] || {};
          i = 2;
        }
        if (target == null || typeof target !== "object" && typeof target !== "function") {
          target = {};
        }
        for (; i < length; ++i) {
          options = arguments[i];
          if (options != null) {
            for (name in options) {
              src = getProperty(target, name);
              copy = getProperty(options, name);
              if (target !== copy) {
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                  if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && isArray(src) ? src : [];
                  } else {
                    clone = src && isPlainObject(src) ? src : {};
                  }
                  setProperty(target, { name: name, newValue: extend(deep, clone, copy) });
                } else if (typeof copy !== "undefined") {
                  setProperty(target, { name: name, newValue: copy });
                }
              }
            }
          }
        }
        return target;
      };
    }
  });

  // node_modules/punycode/punycode.js
  var require_punycode = __commonJS({
    "node_modules/punycode/punycode.js": function(exports, module) {
      /*! https://mths.be/punycode v1.4.1 by @mathias */
      (function(root) {
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = typeof module == "object" && module && !module.nodeType && module;
        var freeGlobal = typeof global == "object" && global;
        if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
          root = freeGlobal;
        }
        var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
          "overflow": "Overflow: input needs wider integers to process",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input"
        }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
        function error(type) {
          throw new RangeError(errors[type]);
        }
        function map(array, fn) {
          var length = array.length;
          var result = [];
          while (length--) {
            result[length] = fn(array[length]);
          }
          return result;
        }
        function mapDomain(string, fn) {
          var parts = string.split("@");
          var result = "";
          if (parts.length > 1) {
            result = parts[0] + "@";
            string = parts[1];
          }
          string = string.replace(regexSeparators, ".");
          var labels = string.split(".");
          var encoded = map(labels, fn).join(".");
          return result + encoded;
        }
        function ucs2decode(string) {
          var output = [], counter = 0, length = string.length, value, extra;
          while (counter < length) {
            value = string.charCodeAt(counter++);
            if (value >= 55296 && value <= 56319 && counter < length) {
              extra = string.charCodeAt(counter++);
              if ((extra & 64512) == 56320) {
                output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
              } else {
                output.push(value);
                counter--;
              }
            } else {
              output.push(value);
            }
          }
          return output;
        }
        function ucs2encode(array) {
          return map(array, function(value) {
            var output = "";
            if (value > 65535) {
              value -= 65536;
              output += stringFromCharCode(value >>> 10 & 1023 | 55296);
              value = 56320 | value & 1023;
            }
            output += stringFromCharCode(value);
            return output;
          }).join("");
        }
        function basicToDigit(codePoint) {
          if (codePoint - 48 < 10) {
            return codePoint - 22;
          }
          if (codePoint - 65 < 26) {
            return codePoint - 65;
          }
          if (codePoint - 97 < 26) {
            return codePoint - 97;
          }
          return base;
        }
        function digitToBasic(digit, flag) {
          return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
        }
        function adapt(delta, numPoints, firstTime) {
          var k = 0;
          delta = firstTime ? floor(delta / damp) : delta >> 1;
          delta += floor(delta / numPoints);
          for (; delta > baseMinusTMin * tMax >> 1; k += base) {
            delta = floor(delta / baseMinusTMin);
          }
          return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
        }
        function decode(input) {
          var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, baseMinusT;
          basic = input.lastIndexOf(delimiter);
          if (basic < 0) {
            basic = 0;
          }
          for (j = 0; j < basic; ++j) {
            if (input.charCodeAt(j) >= 128) {
              error("not-basic");
            }
            output.push(input.charCodeAt(j));
          }
          for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
            for (oldi = i, w = 1, k = base; ; k += base) {
              if (index >= inputLength) {
                error("invalid-input");
              }
              digit = basicToDigit(input.charCodeAt(index++));
              if (digit >= base || digit > floor((maxInt - i) / w)) {
                error("overflow");
              }
              i += digit * w;
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (digit < t) {
                break;
              }
              baseMinusT = base - t;
              if (w > floor(maxInt / baseMinusT)) {
                error("overflow");
              }
              w *= baseMinusT;
            }
            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi == 0);
            if (floor(i / out) > maxInt - n) {
              error("overflow");
            }
            n += floor(i / out);
            i %= out;
            output.splice(i++, 0, n);
          }
          return ucs2encode(output);
        }
        function encode(input) {
          var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
          input = ucs2decode(input);
          inputLength = input.length;
          n = initialN;
          delta = 0;
          bias = initialBias;
          for (j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue < 128) {
              output.push(stringFromCharCode(currentValue));
            }
          }
          handledCPCount = basicLength = output.length;
          if (basicLength) {
            output.push(delimiter);
          }
          while (handledCPCount < inputLength) {
            for (m = maxInt, j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
            handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
              error("overflow");
            }
            delta += (m - n) * handledCPCountPlusOne;
            n = m;
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < n && ++delta > maxInt) {
                error("overflow");
              }
              if (currentValue == n) {
                for (q = delta, k = base; ; k += base) {
                  t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  qMinusT = q - t;
                  baseMinusT = base - t;
                  output.push(
                    stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                  );
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
            ++delta;
            ++n;
          }
          return output.join("");
        }
        function toUnicode(input) {
          return mapDomain(input, function(string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
          });
        }
        function toASCII(input) {
          return mapDomain(input, function(string) {
            return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
          });
        }
        punycode = {
          /**
           * A string representing the current Punycode.js version number.
           * @memberOf punycode
           * @type String
           */
          "version": "1.4.1",
          /**
           * An object of methods to convert from JavaScript's internal character
           * representation (UCS-2) to Unicode code points, and back.
           * @see <https://mathiasbynens.be/notes/javascript-encoding>
           * @memberOf punycode
           * @type Object
           */
          "ucs2": {
            "decode": ucs2decode,
            "encode": ucs2encode
          },
          "decode": decode,
          "encode": encode,
          "toASCII": toASCII,
          "toUnicode": toUnicode
        };
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          define("punycode", function() {
            return punycode;
          });
        } else if (freeExports && freeModule) {
          if (module.exports == freeExports) {
            freeModule.exports = punycode;
          } else {
            for (key in punycode) {
              punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
            }
          }
        } else {
          root.punycode = punycode;
        }
      })(exports);
    }
  });

  // node_modules/es-errors/type.js
  var require_type = __commonJS({
    "node_modules/es-errors/type.js": function(exports, module) {
      "use strict";
      module.exports = TypeError;
    }
  });

  // node_modules/es-object-atoms/index.js
  var require_es_object_atoms = __commonJS({
    "node_modules/es-object-atoms/index.js": function(exports, module) {
      "use strict";
      module.exports = Object;
    }
  });

  // node_modules/es-errors/index.js
  var require_es_errors = __commonJS({
    "node_modules/es-errors/index.js": function(exports, module) {
      "use strict";
      module.exports = Error;
    }
  });

  // node_modules/es-errors/eval.js
  var require_eval = __commonJS({
    "node_modules/es-errors/eval.js": function(exports, module) {
      "use strict";
      module.exports = EvalError;
    }
  });

  // node_modules/es-errors/range.js
  var require_range = __commonJS({
    "node_modules/es-errors/range.js": function(exports, module) {
      "use strict";
      module.exports = RangeError;
    }
  });

  // node_modules/es-errors/ref.js
  var require_ref = __commonJS({
    "node_modules/es-errors/ref.js": function(exports, module) {
      "use strict";
      module.exports = ReferenceError;
    }
  });

  // node_modules/es-errors/syntax.js
  var require_syntax = __commonJS({
    "node_modules/es-errors/syntax.js": function(exports, module) {
      "use strict";
      module.exports = SyntaxError;
    }
  });

  // node_modules/es-errors/uri.js
  var require_uri = __commonJS({
    "node_modules/es-errors/uri.js": function(exports, module) {
      "use strict";
      module.exports = URIError;
    }
  });

  // node_modules/math-intrinsics/abs.js
  var require_abs = __commonJS({
    "node_modules/math-intrinsics/abs.js": function(exports, module) {
      "use strict";
      module.exports = Math.abs;
    }
  });

  // node_modules/math-intrinsics/floor.js
  var require_floor = __commonJS({
    "node_modules/math-intrinsics/floor.js": function(exports, module) {
      "use strict";
      module.exports = Math.floor;
    }
  });

  // node_modules/math-intrinsics/max.js
  var require_max = __commonJS({
    "node_modules/math-intrinsics/max.js": function(exports, module) {
      "use strict";
      module.exports = Math.max;
    }
  });

  // node_modules/math-intrinsics/min.js
  var require_min = __commonJS({
    "node_modules/math-intrinsics/min.js": function(exports, module) {
      "use strict";
      module.exports = Math.min;
    }
  });

  // node_modules/math-intrinsics/pow.js
  var require_pow = __commonJS({
    "node_modules/math-intrinsics/pow.js": function(exports, module) {
      "use strict";
      module.exports = Math.pow;
    }
  });

  // node_modules/math-intrinsics/round.js
  var require_round = __commonJS({
    "node_modules/math-intrinsics/round.js": function(exports, module) {
      "use strict";
      module.exports = Math.round;
    }
  });

  // node_modules/math-intrinsics/isNaN.js
  var require_isNaN = __commonJS({
    "node_modules/math-intrinsics/isNaN.js": function(exports, module) {
      "use strict";
      module.exports = Number.isNaN || function isNaN2(a) {
        return a !== a;
      };
    }
  });

  // node_modules/math-intrinsics/sign.js
  var require_sign = __commonJS({
    "node_modules/math-intrinsics/sign.js": function(exports, module) {
      "use strict";
      var $isNaN = require_isNaN();
      module.exports = function sign(number) {
        if ($isNaN(number) || number === 0) {
          return number;
        }
        return number < 0 ? -1 : 1;
      };
    }
  });

  // node_modules/gopd/gOPD.js
  var require_gOPD = __commonJS({
    "node_modules/gopd/gOPD.js": function(exports, module) {
      "use strict";
      module.exports = Object.getOwnPropertyDescriptor;
    }
  });

  // node_modules/gopd/index.js
  var require_gopd = __commonJS({
    "node_modules/gopd/index.js": function(exports, module) {
      "use strict";
      var $gOPD = require_gOPD();
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e) {
          $gOPD = null;
        }
      }
      module.exports = $gOPD;
    }
  });

  // node_modules/es-define-property/index.js
  var require_es_define_property = __commonJS({
    "node_modules/es-define-property/index.js": function(exports, module) {
      "use strict";
      var $defineProperty = Object.defineProperty || false;
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = false;
        }
      }
      module.exports = $defineProperty;
    }
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "node_modules/has-symbols/shams.js": function(exports, module) {
      "use strict";
      module.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = /* @__PURE__ */ Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (var _ in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = (
            /** @type {PropertyDescriptor} */
            Object.getOwnPropertyDescriptor(obj, sym)
          );
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "node_modules/has-symbols/index.js": function(exports, module) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof /* @__PURE__ */ Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // node_modules/get-proto/Reflect.getPrototypeOf.js
  var require_Reflect_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Reflect.getPrototypeOf.js": function(exports, module) {
      "use strict";
      module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
    }
  });

  // node_modules/get-proto/Object.getPrototypeOf.js
  var require_Object_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Object.getPrototypeOf.js": function(exports, module) {
      "use strict";
      var $Object = require_es_object_atoms();
      module.exports = $Object.getPrototypeOf || null;
    }
  });

  // node_modules/function-bind/implementation.js
  var require_implementation = __commonJS({
    "node_modules/function-bind/implementation.js": function(exports, module) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) {
          arr[i] = a[i];
        }
        for (var j = 0; j < b.length; j += 1) {
          arr[j + a.length] = b[j];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
          arr[j] = arrLike[i];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = "$" + i;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "node_modules/function-bind/index.js": function(exports, module) {
      "use strict";
      var implementation = require_implementation();
      module.exports = Function.prototype.bind || implementation;
    }
  });

  // node_modules/call-bind-apply-helpers/functionCall.js
  var require_functionCall = __commonJS({
    "node_modules/call-bind-apply-helpers/functionCall.js": function(exports, module) {
      "use strict";
      module.exports = Function.prototype.call;
    }
  });

  // node_modules/call-bind-apply-helpers/functionApply.js
  var require_functionApply = __commonJS({
    "node_modules/call-bind-apply-helpers/functionApply.js": function(exports, module) {
      "use strict";
      module.exports = Function.prototype.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/reflectApply.js
  var require_reflectApply = __commonJS({
    "node_modules/call-bind-apply-helpers/reflectApply.js": function(exports, module) {
      "use strict";
      module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/actualApply.js
  var require_actualApply = __commonJS({
    "node_modules/call-bind-apply-helpers/actualApply.js": function(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var $reflectApply = require_reflectApply();
      module.exports = $reflectApply || bind.call($call, $apply);
    }
  });

  // node_modules/call-bind-apply-helpers/index.js
  var require_call_bind_apply_helpers = __commonJS({
    "node_modules/call-bind-apply-helpers/index.js": function(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var $TypeError = require_type();
      var $call = require_functionCall();
      var $actualApply = require_actualApply();
      module.exports = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== "function") {
          throw new $TypeError("a function is required");
        }
        return $actualApply(bind, $call, args);
      };
    }
  });

  // node_modules/dunder-proto/get.js
  var require_get = __commonJS({
    "node_modules/dunder-proto/get.js": function(exports, module) {
      "use strict";
      var callBind = require_call_bind_apply_helpers();
      var gOPD = require_gopd();
      var hasProtoAccessor;
      try {
        hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
        [].__proto__ === Array.prototype;
      } catch (e) {
        if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
          throw e;
        }
      }
      var desc = !!hasProtoAccessor && gOPD && gOPD(
        Object.prototype,
        /** @type {keyof typeof Object.prototype} */
        "__proto__"
      );
      var $Object = Object;
      var $getPrototypeOf = $Object.getPrototypeOf;
      module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
        /** @type {import('./get')} */
        function getDunder(value) {
          return $getPrototypeOf(value == null ? value : $Object(value));
        }
      ) : false;
    }
  });

  // node_modules/get-proto/index.js
  var require_get_proto = __commonJS({
    "node_modules/get-proto/index.js": function(exports, module) {
      "use strict";
      var reflectGetProto = require_Reflect_getPrototypeOf();
      var originalGetProto = require_Object_getPrototypeOf();
      var getDunderProto = require_get();
      module.exports = reflectGetProto ? function getProto(O) {
        return reflectGetProto(O);
      } : originalGetProto ? function getProto(O) {
        if (!O || typeof O !== "object" && typeof O !== "function") {
          throw new TypeError("getProto: not an object");
        }
        return originalGetProto(O);
      } : getDunderProto ? function getProto(O) {
        return getDunderProto(O);
      } : null;
    }
  });

  // node_modules/hasown/index.js
  var require_hasown = __commonJS({
    "node_modules/hasown/index.js": function(exports, module) {
      "use strict";
      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind = require_function_bind();
      module.exports = bind.call(call, $hasOwn);
    }
  });

  // node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "node_modules/get-intrinsic/index.js": function(exports, module) {
      "use strict";
      var undefined2;
      var $Object = require_es_object_atoms();
      var $Error = require_es_errors();
      var $EvalError = require_eval();
      var $RangeError = require_range();
      var $ReferenceError = require_ref();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $URIError = require_uri();
      var abs = require_abs();
      var floor = require_floor();
      var max = require_max();
      var min = require_min();
      var pow = require_pow();
      var round = require_round();
      var sign = require_sign();
      var $Function = Function;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = require_gopd();
      var $defineProperty = require_es_define_property();
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? (function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      })() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var getProto = require_get_proto();
      var $ObjectGPO = require_Object_getPrototypeOf();
      var $ReflectGPO = require_Reflect_getPrototypeOf();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": $Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": $EvalError,
        "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": $Object,
        "%Object.getOwnPropertyDescriptor%": $gOPD,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": $RangeError,
        "%ReferenceError%": $ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": $URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
        "%Function.prototype.call%": $call,
        "%Function.prototype.apply%": $apply,
        "%Object.defineProperty%": $defineProperty,
        "%Object.getPrototypeOf%": $ObjectGPO,
        "%Math.abs%": abs,
        "%Math.floor%": floor,
        "%Math.max%": max,
        "%Math.min%": min,
        "%Math.pow%": pow,
        "%Math.round%": round,
        "%Math.sign%": sign,
        "%Reflect.getPrototypeOf%": $ReflectGPO
      };
      if (getProto) {
        try {
          null.error;
        } catch (e) {
          errorProto = getProto(getProto(e));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var errorProto;
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen && getProto) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        __proto__: null,
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind = require_function_bind();
      var hasOwn = require_hasown();
      var $concat = bind.call($call, Array.prototype.concat);
      var $spliceApply = bind.call($apply, Array.prototype.splice);
      var $replace = bind.call($call, String.prototype.replace);
      var $strSlice = bind.call($call, String.prototype.slice);
      var $exec = bind.call($call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias: alias,
            name: intrinsicName,
            value: value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void undefined2;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // node_modules/call-bound/index.js
  var require_call_bound = __commonJS({
    "node_modules/call-bound/index.js": function(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBindBasic = require_call_bind_apply_helpers();
      var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = (
          /** @type {(this: unknown, ...args: unknown[]) => unknown} */
          GetIntrinsic(name, !!allowMissing)
        );
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBindBasic(
            /** @type {const} */
            [intrinsic]
          );
        }
        return intrinsic;
      };
    }
  });

  // node_modules/has-tostringtag/shams.js
  var require_shams2 = __commonJS({
    "node_modules/has-tostringtag/shams.js": function(exports, module) {
      "use strict";
      var hasSymbols = require_shams();
      module.exports = function hasToStringTagShams() {
        return hasSymbols() && !!Symbol.toStringTag;
      };
    }
  });

  // node_modules/is-regex/index.js
  var require_is_regex = __commonJS({
    "node_modules/is-regex/index.js": function(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var hasToStringTag = require_shams2()();
      var hasOwn = require_hasown();
      var gOPD = require_gopd();
      var fn;
      if (hasToStringTag) {
        $exec = callBound("RegExp.prototype.exec");
        isRegexMarker = {};
        throwRegexMarker = function() {
          throw isRegexMarker;
        };
        badStringifier = {
          toString: throwRegexMarker,
          valueOf: throwRegexMarker
        };
        if (typeof Symbol.toPrimitive === "symbol") {
          badStringifier[Symbol.toPrimitive] = throwRegexMarker;
        }
        fn = function isRegex(value) {
          if (!value || typeof value !== "object") {
            return false;
          }
          var descriptor = (
            /** @type {NonNullable<typeof gOPD>} */
            gOPD(
              /** @type {{ lastIndex?: unknown }} */
              value,
              "lastIndex"
            )
          );
          var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, "value");
          if (!hasLastIndexDataProperty) {
            return false;
          }
          try {
            $exec(
              value,
              /** @type {string} */
              /** @type {unknown} */
              badStringifier
            );
          } catch (e) {
            return e === isRegexMarker;
          }
        };
      } else {
        $toString = callBound("Object.prototype.toString");
        regexClass = "[object RegExp]";
        fn = function isRegex(value) {
          if (!value || typeof value !== "object" && typeof value !== "function") {
            return false;
          }
          return $toString(value) === regexClass;
        };
      }
      var $exec;
      var isRegexMarker;
      var throwRegexMarker;
      var badStringifier;
      var $toString;
      var regexClass;
      module.exports = fn;
    }
  });

  // node_modules/safe-regex-test/index.js
  var require_safe_regex_test = __commonJS({
    "node_modules/safe-regex-test/index.js": function(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var isRegex = require_is_regex();
      var $exec = callBound("RegExp.prototype.exec");
      var $TypeError = require_type();
      module.exports = function regexTester(regex) {
        if (!isRegex(regex)) {
          throw new $TypeError("`regex` must be a RegExp");
        }
        return function test(s) {
          return $exec(regex, s) !== null;
        };
      };
    }
  });

  // node_modules/ent/reversed.json
  var require_reversed = __commonJS({
    "node_modules/ent/reversed.json": function(exports, module) {
      module.exports = {
        "9": "Tab;",
        "10": "NewLine;",
        "33": "excl;",
        "34": "quot;",
        "35": "num;",
        "36": "dollar;",
        "37": "percnt;",
        "38": "amp;",
        "39": "apos;",
        "40": "lpar;",
        "41": "rpar;",
        "42": "midast;",
        "43": "plus;",
        "44": "comma;",
        "46": "period;",
        "47": "sol;",
        "58": "colon;",
        "59": "semi;",
        "60": "lt;",
        "61": "equals;",
        "62": "gt;",
        "63": "quest;",
        "64": "commat;",
        "91": "lsqb;",
        "92": "bsol;",
        "93": "rsqb;",
        "94": "Hat;",
        "95": "UnderBar;",
        "96": "grave;",
        "123": "lcub;",
        "124": "VerticalLine;",
        "125": "rcub;",
        "160": "NonBreakingSpace;",
        "161": "iexcl;",
        "162": "cent;",
        "163": "pound;",
        "164": "curren;",
        "165": "yen;",
        "166": "brvbar;",
        "167": "sect;",
        "168": "uml;",
        "169": "copy;",
        "170": "ordf;",
        "171": "laquo;",
        "172": "not;",
        "173": "shy;",
        "174": "reg;",
        "175": "strns;",
        "176": "deg;",
        "177": "pm;",
        "178": "sup2;",
        "179": "sup3;",
        "180": "DiacriticalAcute;",
        "181": "micro;",
        "182": "para;",
        "183": "middot;",
        "184": "Cedilla;",
        "185": "sup1;",
        "186": "ordm;",
        "187": "raquo;",
        "188": "frac14;",
        "189": "half;",
        "190": "frac34;",
        "191": "iquest;",
        "192": "Agrave;",
        "193": "Aacute;",
        "194": "Acirc;",
        "195": "Atilde;",
        "196": "Auml;",
        "197": "Aring;",
        "198": "AElig;",
        "199": "Ccedil;",
        "200": "Egrave;",
        "201": "Eacute;",
        "202": "Ecirc;",
        "203": "Euml;",
        "204": "Igrave;",
        "205": "Iacute;",
        "206": "Icirc;",
        "207": "Iuml;",
        "208": "ETH;",
        "209": "Ntilde;",
        "210": "Ograve;",
        "211": "Oacute;",
        "212": "Ocirc;",
        "213": "Otilde;",
        "214": "Ouml;",
        "215": "times;",
        "216": "Oslash;",
        "217": "Ugrave;",
        "218": "Uacute;",
        "219": "Ucirc;",
        "220": "Uuml;",
        "221": "Yacute;",
        "222": "THORN;",
        "223": "szlig;",
        "224": "agrave;",
        "225": "aacute;",
        "226": "acirc;",
        "227": "atilde;",
        "228": "auml;",
        "229": "aring;",
        "230": "aelig;",
        "231": "ccedil;",
        "232": "egrave;",
        "233": "eacute;",
        "234": "ecirc;",
        "235": "euml;",
        "236": "igrave;",
        "237": "iacute;",
        "238": "icirc;",
        "239": "iuml;",
        "240": "eth;",
        "241": "ntilde;",
        "242": "ograve;",
        "243": "oacute;",
        "244": "ocirc;",
        "245": "otilde;",
        "246": "ouml;",
        "247": "divide;",
        "248": "oslash;",
        "249": "ugrave;",
        "250": "uacute;",
        "251": "ucirc;",
        "252": "uuml;",
        "253": "yacute;",
        "254": "thorn;",
        "255": "yuml;",
        "256": "Amacr;",
        "257": "amacr;",
        "258": "Abreve;",
        "259": "abreve;",
        "260": "Aogon;",
        "261": "aogon;",
        "262": "Cacute;",
        "263": "cacute;",
        "264": "Ccirc;",
        "265": "ccirc;",
        "266": "Cdot;",
        "267": "cdot;",
        "268": "Ccaron;",
        "269": "ccaron;",
        "270": "Dcaron;",
        "271": "dcaron;",
        "272": "Dstrok;",
        "273": "dstrok;",
        "274": "Emacr;",
        "275": "emacr;",
        "278": "Edot;",
        "279": "edot;",
        "280": "Eogon;",
        "281": "eogon;",
        "282": "Ecaron;",
        "283": "ecaron;",
        "284": "Gcirc;",
        "285": "gcirc;",
        "286": "Gbreve;",
        "287": "gbreve;",
        "288": "Gdot;",
        "289": "gdot;",
        "290": "Gcedil;",
        "292": "Hcirc;",
        "293": "hcirc;",
        "294": "Hstrok;",
        "295": "hstrok;",
        "296": "Itilde;",
        "297": "itilde;",
        "298": "Imacr;",
        "299": "imacr;",
        "302": "Iogon;",
        "303": "iogon;",
        "304": "Idot;",
        "305": "inodot;",
        "306": "IJlig;",
        "307": "ijlig;",
        "308": "Jcirc;",
        "309": "jcirc;",
        "310": "Kcedil;",
        "311": "kcedil;",
        "312": "kgreen;",
        "313": "Lacute;",
        "314": "lacute;",
        "315": "Lcedil;",
        "316": "lcedil;",
        "317": "Lcaron;",
        "318": "lcaron;",
        "319": "Lmidot;",
        "320": "lmidot;",
        "321": "Lstrok;",
        "322": "lstrok;",
        "323": "Nacute;",
        "324": "nacute;",
        "325": "Ncedil;",
        "326": "ncedil;",
        "327": "Ncaron;",
        "328": "ncaron;",
        "329": "napos;",
        "330": "ENG;",
        "331": "eng;",
        "332": "Omacr;",
        "333": "omacr;",
        "336": "Odblac;",
        "337": "odblac;",
        "338": "OElig;",
        "339": "oelig;",
        "340": "Racute;",
        "341": "racute;",
        "342": "Rcedil;",
        "343": "rcedil;",
        "344": "Rcaron;",
        "345": "rcaron;",
        "346": "Sacute;",
        "347": "sacute;",
        "348": "Scirc;",
        "349": "scirc;",
        "350": "Scedil;",
        "351": "scedil;",
        "352": "Scaron;",
        "353": "scaron;",
        "354": "Tcedil;",
        "355": "tcedil;",
        "356": "Tcaron;",
        "357": "tcaron;",
        "358": "Tstrok;",
        "359": "tstrok;",
        "360": "Utilde;",
        "361": "utilde;",
        "362": "Umacr;",
        "363": "umacr;",
        "364": "Ubreve;",
        "365": "ubreve;",
        "366": "Uring;",
        "367": "uring;",
        "368": "Udblac;",
        "369": "udblac;",
        "370": "Uogon;",
        "371": "uogon;",
        "372": "Wcirc;",
        "373": "wcirc;",
        "374": "Ycirc;",
        "375": "ycirc;",
        "376": "Yuml;",
        "377": "Zacute;",
        "378": "zacute;",
        "379": "Zdot;",
        "380": "zdot;",
        "381": "Zcaron;",
        "382": "zcaron;",
        "402": "fnof;",
        "437": "imped;",
        "501": "gacute;",
        "567": "jmath;",
        "710": "circ;",
        "711": "Hacek;",
        "728": "breve;",
        "729": "dot;",
        "730": "ring;",
        "731": "ogon;",
        "732": "tilde;",
        "733": "DiacriticalDoubleAcute;",
        "785": "DownBreve;",
        "913": "Alpha;",
        "914": "Beta;",
        "915": "Gamma;",
        "916": "Delta;",
        "917": "Epsilon;",
        "918": "Zeta;",
        "919": "Eta;",
        "920": "Theta;",
        "921": "Iota;",
        "922": "Kappa;",
        "923": "Lambda;",
        "924": "Mu;",
        "925": "Nu;",
        "926": "Xi;",
        "927": "Omicron;",
        "928": "Pi;",
        "929": "Rho;",
        "931": "Sigma;",
        "932": "Tau;",
        "933": "Upsilon;",
        "934": "Phi;",
        "935": "Chi;",
        "936": "Psi;",
        "937": "Omega;",
        "945": "alpha;",
        "946": "beta;",
        "947": "gamma;",
        "948": "delta;",
        "949": "epsilon;",
        "950": "zeta;",
        "951": "eta;",
        "952": "theta;",
        "953": "iota;",
        "954": "kappa;",
        "955": "lambda;",
        "956": "mu;",
        "957": "nu;",
        "958": "xi;",
        "959": "omicron;",
        "960": "pi;",
        "961": "rho;",
        "962": "varsigma;",
        "963": "sigma;",
        "964": "tau;",
        "965": "upsilon;",
        "966": "phi;",
        "967": "chi;",
        "968": "psi;",
        "969": "omega;",
        "977": "vartheta;",
        "978": "upsih;",
        "981": "varphi;",
        "982": "varpi;",
        "988": "Gammad;",
        "989": "gammad;",
        "1008": "varkappa;",
        "1009": "varrho;",
        "1013": "varepsilon;",
        "1014": "bepsi;",
        "1025": "IOcy;",
        "1026": "DJcy;",
        "1027": "GJcy;",
        "1028": "Jukcy;",
        "1029": "DScy;",
        "1030": "Iukcy;",
        "1031": "YIcy;",
        "1032": "Jsercy;",
        "1033": "LJcy;",
        "1034": "NJcy;",
        "1035": "TSHcy;",
        "1036": "KJcy;",
        "1038": "Ubrcy;",
        "1039": "DZcy;",
        "1040": "Acy;",
        "1041": "Bcy;",
        "1042": "Vcy;",
        "1043": "Gcy;",
        "1044": "Dcy;",
        "1045": "IEcy;",
        "1046": "ZHcy;",
        "1047": "Zcy;",
        "1048": "Icy;",
        "1049": "Jcy;",
        "1050": "Kcy;",
        "1051": "Lcy;",
        "1052": "Mcy;",
        "1053": "Ncy;",
        "1054": "Ocy;",
        "1055": "Pcy;",
        "1056": "Rcy;",
        "1057": "Scy;",
        "1058": "Tcy;",
        "1059": "Ucy;",
        "1060": "Fcy;",
        "1061": "KHcy;",
        "1062": "TScy;",
        "1063": "CHcy;",
        "1064": "SHcy;",
        "1065": "SHCHcy;",
        "1066": "HARDcy;",
        "1067": "Ycy;",
        "1068": "SOFTcy;",
        "1069": "Ecy;",
        "1070": "YUcy;",
        "1071": "YAcy;",
        "1072": "acy;",
        "1073": "bcy;",
        "1074": "vcy;",
        "1075": "gcy;",
        "1076": "dcy;",
        "1077": "iecy;",
        "1078": "zhcy;",
        "1079": "zcy;",
        "1080": "icy;",
        "1081": "jcy;",
        "1082": "kcy;",
        "1083": "lcy;",
        "1084": "mcy;",
        "1085": "ncy;",
        "1086": "ocy;",
        "1087": "pcy;",
        "1088": "rcy;",
        "1089": "scy;",
        "1090": "tcy;",
        "1091": "ucy;",
        "1092": "fcy;",
        "1093": "khcy;",
        "1094": "tscy;",
        "1095": "chcy;",
        "1096": "shcy;",
        "1097": "shchcy;",
        "1098": "hardcy;",
        "1099": "ycy;",
        "1100": "softcy;",
        "1101": "ecy;",
        "1102": "yucy;",
        "1103": "yacy;",
        "1105": "iocy;",
        "1106": "djcy;",
        "1107": "gjcy;",
        "1108": "jukcy;",
        "1109": "dscy;",
        "1110": "iukcy;",
        "1111": "yicy;",
        "1112": "jsercy;",
        "1113": "ljcy;",
        "1114": "njcy;",
        "1115": "tshcy;",
        "1116": "kjcy;",
        "1118": "ubrcy;",
        "1119": "dzcy;",
        "8194": "ensp;",
        "8195": "emsp;",
        "8196": "emsp13;",
        "8197": "emsp14;",
        "8199": "numsp;",
        "8200": "puncsp;",
        "8201": "ThinSpace;",
        "8202": "VeryThinSpace;",
        "8203": "ZeroWidthSpace;",
        "8204": "zwnj;",
        "8205": "zwj;",
        "8206": "lrm;",
        "8207": "rlm;",
        "8208": "hyphen;",
        "8211": "ndash;",
        "8212": "mdash;",
        "8213": "horbar;",
        "8214": "Vert;",
        "8216": "OpenCurlyQuote;",
        "8217": "rsquor;",
        "8218": "sbquo;",
        "8220": "OpenCurlyDoubleQuote;",
        "8221": "rdquor;",
        "8222": "ldquor;",
        "8224": "dagger;",
        "8225": "ddagger;",
        "8226": "bullet;",
        "8229": "nldr;",
        "8230": "mldr;",
        "8240": "permil;",
        "8241": "pertenk;",
        "8242": "prime;",
        "8243": "Prime;",
        "8244": "tprime;",
        "8245": "bprime;",
        "8249": "lsaquo;",
        "8250": "rsaquo;",
        "8254": "OverBar;",
        "8257": "caret;",
        "8259": "hybull;",
        "8260": "frasl;",
        "8271": "bsemi;",
        "8279": "qprime;",
        "8287": "MediumSpace;",
        "8288": "NoBreak;",
        "8289": "ApplyFunction;",
        "8290": "it;",
        "8291": "InvisibleComma;",
        "8364": "euro;",
        "8411": "TripleDot;",
        "8412": "DotDot;",
        "8450": "Copf;",
        "8453": "incare;",
        "8458": "gscr;",
        "8459": "Hscr;",
        "8460": "Poincareplane;",
        "8461": "quaternions;",
        "8462": "planckh;",
        "8463": "plankv;",
        "8464": "Iscr;",
        "8465": "imagpart;",
        "8466": "Lscr;",
        "8467": "ell;",
        "8469": "Nopf;",
        "8470": "numero;",
        "8471": "copysr;",
        "8472": "wp;",
        "8473": "primes;",
        "8474": "rationals;",
        "8475": "Rscr;",
        "8476": "Rfr;",
        "8477": "Ropf;",
        "8478": "rx;",
        "8482": "trade;",
        "8484": "Zopf;",
        "8487": "mho;",
        "8488": "Zfr;",
        "8489": "iiota;",
        "8492": "Bscr;",
        "8493": "Cfr;",
        "8495": "escr;",
        "8496": "expectation;",
        "8497": "Fscr;",
        "8499": "phmmat;",
        "8500": "oscr;",
        "8501": "aleph;",
        "8502": "beth;",
        "8503": "gimel;",
        "8504": "daleth;",
        "8517": "DD;",
        "8518": "DifferentialD;",
        "8519": "exponentiale;",
        "8520": "ImaginaryI;",
        "8531": "frac13;",
        "8532": "frac23;",
        "8533": "frac15;",
        "8534": "frac25;",
        "8535": "frac35;",
        "8536": "frac45;",
        "8537": "frac16;",
        "8538": "frac56;",
        "8539": "frac18;",
        "8540": "frac38;",
        "8541": "frac58;",
        "8542": "frac78;",
        "8592": "slarr;",
        "8593": "uparrow;",
        "8594": "srarr;",
        "8595": "ShortDownArrow;",
        "8596": "leftrightarrow;",
        "8597": "varr;",
        "8598": "UpperLeftArrow;",
        "8599": "UpperRightArrow;",
        "8600": "searrow;",
        "8601": "swarrow;",
        "8602": "nleftarrow;",
        "8603": "nrightarrow;",
        "8605": "rightsquigarrow;",
        "8606": "twoheadleftarrow;",
        "8607": "Uarr;",
        "8608": "twoheadrightarrow;",
        "8609": "Darr;",
        "8610": "leftarrowtail;",
        "8611": "rightarrowtail;",
        "8612": "mapstoleft;",
        "8613": "UpTeeArrow;",
        "8614": "RightTeeArrow;",
        "8615": "mapstodown;",
        "8617": "larrhk;",
        "8618": "rarrhk;",
        "8619": "looparrowleft;",
        "8620": "rarrlp;",
        "8621": "leftrightsquigarrow;",
        "8622": "nleftrightarrow;",
        "8624": "lsh;",
        "8625": "rsh;",
        "8626": "ldsh;",
        "8627": "rdsh;",
        "8629": "crarr;",
        "8630": "curvearrowleft;",
        "8631": "curvearrowright;",
        "8634": "olarr;",
        "8635": "orarr;",
        "8636": "lharu;",
        "8637": "lhard;",
        "8638": "upharpoonright;",
        "8639": "upharpoonleft;",
        "8640": "RightVector;",
        "8641": "rightharpoondown;",
        "8642": "RightDownVector;",
        "8643": "LeftDownVector;",
        "8644": "rlarr;",
        "8645": "UpArrowDownArrow;",
        "8646": "lrarr;",
        "8647": "llarr;",
        "8648": "uuarr;",
        "8649": "rrarr;",
        "8650": "downdownarrows;",
        "8651": "ReverseEquilibrium;",
        "8652": "rlhar;",
        "8653": "nLeftarrow;",
        "8654": "nLeftrightarrow;",
        "8655": "nRightarrow;",
        "8656": "Leftarrow;",
        "8657": "Uparrow;",
        "8658": "Rightarrow;",
        "8659": "Downarrow;",
        "8660": "Leftrightarrow;",
        "8661": "vArr;",
        "8662": "nwArr;",
        "8663": "neArr;",
        "8664": "seArr;",
        "8665": "swArr;",
        "8666": "Lleftarrow;",
        "8667": "Rrightarrow;",
        "8669": "zigrarr;",
        "8676": "LeftArrowBar;",
        "8677": "RightArrowBar;",
        "8693": "duarr;",
        "8701": "loarr;",
        "8702": "roarr;",
        "8703": "hoarr;",
        "8704": "forall;",
        "8705": "complement;",
        "8706": "PartialD;",
        "8707": "Exists;",
        "8708": "NotExists;",
        "8709": "varnothing;",
        "8711": "nabla;",
        "8712": "isinv;",
        "8713": "notinva;",
        "8715": "SuchThat;",
        "8716": "NotReverseElement;",
        "8719": "Product;",
        "8720": "Coproduct;",
        "8721": "sum;",
        "8722": "minus;",
        "8723": "mp;",
        "8724": "plusdo;",
        "8726": "ssetmn;",
        "8727": "lowast;",
        "8728": "SmallCircle;",
        "8730": "Sqrt;",
        "8733": "vprop;",
        "8734": "infin;",
        "8735": "angrt;",
        "8736": "angle;",
        "8737": "measuredangle;",
        "8738": "angsph;",
        "8739": "VerticalBar;",
        "8740": "nsmid;",
        "8741": "spar;",
        "8742": "nspar;",
        "8743": "wedge;",
        "8744": "vee;",
        "8745": "cap;",
        "8746": "cup;",
        "8747": "Integral;",
        "8748": "Int;",
        "8749": "tint;",
        "8750": "oint;",
        "8751": "DoubleContourIntegral;",
        "8752": "Cconint;",
        "8753": "cwint;",
        "8754": "cwconint;",
        "8755": "CounterClockwiseContourIntegral;",
        "8756": "therefore;",
        "8757": "because;",
        "8758": "ratio;",
        "8759": "Proportion;",
        "8760": "minusd;",
        "8762": "mDDot;",
        "8763": "homtht;",
        "8764": "Tilde;",
        "8765": "bsim;",
        "8766": "mstpos;",
        "8767": "acd;",
        "8768": "wreath;",
        "8769": "nsim;",
        "8770": "esim;",
        "8771": "TildeEqual;",
        "8772": "nsimeq;",
        "8773": "TildeFullEqual;",
        "8774": "simne;",
        "8775": "NotTildeFullEqual;",
        "8776": "TildeTilde;",
        "8777": "NotTildeTilde;",
        "8778": "approxeq;",
        "8779": "apid;",
        "8780": "bcong;",
        "8781": "CupCap;",
        "8782": "HumpDownHump;",
        "8783": "HumpEqual;",
        "8784": "esdot;",
        "8785": "eDot;",
        "8786": "fallingdotseq;",
        "8787": "risingdotseq;",
        "8788": "coloneq;",
        "8789": "eqcolon;",
        "8790": "eqcirc;",
        "8791": "cire;",
        "8793": "wedgeq;",
        "8794": "veeeq;",
        "8796": "trie;",
        "8799": "questeq;",
        "8800": "NotEqual;",
        "8801": "equiv;",
        "8802": "NotCongruent;",
        "8804": "leq;",
        "8805": "GreaterEqual;",
        "8806": "LessFullEqual;",
        "8807": "GreaterFullEqual;",
        "8808": "lneqq;",
        "8809": "gneqq;",
        "8810": "NestedLessLess;",
        "8811": "NestedGreaterGreater;",
        "8812": "twixt;",
        "8813": "NotCupCap;",
        "8814": "NotLess;",
        "8815": "NotGreater;",
        "8816": "NotLessEqual;",
        "8817": "NotGreaterEqual;",
        "8818": "lsim;",
        "8819": "gtrsim;",
        "8820": "NotLessTilde;",
        "8821": "NotGreaterTilde;",
        "8822": "lg;",
        "8823": "gtrless;",
        "8824": "ntlg;",
        "8825": "ntgl;",
        "8826": "Precedes;",
        "8827": "Succeeds;",
        "8828": "PrecedesSlantEqual;",
        "8829": "SucceedsSlantEqual;",
        "8830": "prsim;",
        "8831": "succsim;",
        "8832": "nprec;",
        "8833": "nsucc;",
        "8834": "subset;",
        "8835": "supset;",
        "8836": "nsub;",
        "8837": "nsup;",
        "8838": "SubsetEqual;",
        "8839": "supseteq;",
        "8840": "nsubseteq;",
        "8841": "nsupseteq;",
        "8842": "subsetneq;",
        "8843": "supsetneq;",
        "8845": "cupdot;",
        "8846": "uplus;",
        "8847": "SquareSubset;",
        "8848": "SquareSuperset;",
        "8849": "SquareSubsetEqual;",
        "8850": "SquareSupersetEqual;",
        "8851": "SquareIntersection;",
        "8852": "SquareUnion;",
        "8853": "oplus;",
        "8854": "ominus;",
        "8855": "otimes;",
        "8856": "osol;",
        "8857": "odot;",
        "8858": "ocir;",
        "8859": "oast;",
        "8861": "odash;",
        "8862": "plusb;",
        "8863": "minusb;",
        "8864": "timesb;",
        "8865": "sdotb;",
        "8866": "vdash;",
        "8867": "LeftTee;",
        "8868": "top;",
        "8869": "UpTee;",
        "8871": "models;",
        "8872": "vDash;",
        "8873": "Vdash;",
        "8874": "Vvdash;",
        "8875": "VDash;",
        "8876": "nvdash;",
        "8877": "nvDash;",
        "8878": "nVdash;",
        "8879": "nVDash;",
        "8880": "prurel;",
        "8882": "vltri;",
        "8883": "vrtri;",
        "8884": "trianglelefteq;",
        "8885": "trianglerighteq;",
        "8886": "origof;",
        "8887": "imof;",
        "8888": "mumap;",
        "8889": "hercon;",
        "8890": "intercal;",
        "8891": "veebar;",
        "8893": "barvee;",
        "8894": "angrtvb;",
        "8895": "lrtri;",
        "8896": "xwedge;",
        "8897": "xvee;",
        "8898": "xcap;",
        "8899": "xcup;",
        "8900": "diamond;",
        "8901": "sdot;",
        "8902": "Star;",
        "8903": "divonx;",
        "8904": "bowtie;",
        "8905": "ltimes;",
        "8906": "rtimes;",
        "8907": "lthree;",
        "8908": "rthree;",
        "8909": "bsime;",
        "8910": "cuvee;",
        "8911": "cuwed;",
        "8912": "Subset;",
        "8913": "Supset;",
        "8914": "Cap;",
        "8915": "Cup;",
        "8916": "pitchfork;",
        "8917": "epar;",
        "8918": "ltdot;",
        "8919": "gtrdot;",
        "8920": "Ll;",
        "8921": "ggg;",
        "8922": "LessEqualGreater;",
        "8923": "gtreqless;",
        "8926": "curlyeqprec;",
        "8927": "curlyeqsucc;",
        "8928": "nprcue;",
        "8929": "nsccue;",
        "8930": "nsqsube;",
        "8931": "nsqsupe;",
        "8934": "lnsim;",
        "8935": "gnsim;",
        "8936": "prnsim;",
        "8937": "succnsim;",
        "8938": "ntriangleleft;",
        "8939": "ntriangleright;",
        "8940": "ntrianglelefteq;",
        "8941": "ntrianglerighteq;",
        "8942": "vellip;",
        "8943": "ctdot;",
        "8944": "utdot;",
        "8945": "dtdot;",
        "8946": "disin;",
        "8947": "isinsv;",
        "8948": "isins;",
        "8949": "isindot;",
        "8950": "notinvc;",
        "8951": "notinvb;",
        "8953": "isinE;",
        "8954": "nisd;",
        "8955": "xnis;",
        "8956": "nis;",
        "8957": "notnivc;",
        "8958": "notnivb;",
        "8965": "barwedge;",
        "8966": "doublebarwedge;",
        "8968": "LeftCeiling;",
        "8969": "RightCeiling;",
        "8970": "lfloor;",
        "8971": "RightFloor;",
        "8972": "drcrop;",
        "8973": "dlcrop;",
        "8974": "urcrop;",
        "8975": "ulcrop;",
        "8976": "bnot;",
        "8978": "profline;",
        "8979": "profsurf;",
        "8981": "telrec;",
        "8982": "target;",
        "8988": "ulcorner;",
        "8989": "urcorner;",
        "8990": "llcorner;",
        "8991": "lrcorner;",
        "8994": "sfrown;",
        "8995": "ssmile;",
        "9005": "cylcty;",
        "9006": "profalar;",
        "9014": "topbot;",
        "9021": "ovbar;",
        "9023": "solbar;",
        "9084": "angzarr;",
        "9136": "lmoustache;",
        "9137": "rmoustache;",
        "9140": "tbrk;",
        "9141": "UnderBracket;",
        "9142": "bbrktbrk;",
        "9180": "OverParenthesis;",
        "9181": "UnderParenthesis;",
        "9182": "OverBrace;",
        "9183": "UnderBrace;",
        "9186": "trpezium;",
        "9191": "elinters;",
        "9251": "blank;",
        "9416": "oS;",
        "9472": "HorizontalLine;",
        "9474": "boxv;",
        "9484": "boxdr;",
        "9488": "boxdl;",
        "9492": "boxur;",
        "9496": "boxul;",
        "9500": "boxvr;",
        "9508": "boxvl;",
        "9516": "boxhd;",
        "9524": "boxhu;",
        "9532": "boxvh;",
        "9552": "boxH;",
        "9553": "boxV;",
        "9554": "boxdR;",
        "9555": "boxDr;",
        "9556": "boxDR;",
        "9557": "boxdL;",
        "9558": "boxDl;",
        "9559": "boxDL;",
        "9560": "boxuR;",
        "9561": "boxUr;",
        "9562": "boxUR;",
        "9563": "boxuL;",
        "9564": "boxUl;",
        "9565": "boxUL;",
        "9566": "boxvR;",
        "9567": "boxVr;",
        "9568": "boxVR;",
        "9569": "boxvL;",
        "9570": "boxVl;",
        "9571": "boxVL;",
        "9572": "boxHd;",
        "9573": "boxhD;",
        "9574": "boxHD;",
        "9575": "boxHu;",
        "9576": "boxhU;",
        "9577": "boxHU;",
        "9578": "boxvH;",
        "9579": "boxVh;",
        "9580": "boxVH;",
        "9600": "uhblk;",
        "9604": "lhblk;",
        "9608": "block;",
        "9617": "blk14;",
        "9618": "blk12;",
        "9619": "blk34;",
        "9633": "square;",
        "9642": "squf;",
        "9643": "EmptyVerySmallSquare;",
        "9645": "rect;",
        "9646": "marker;",
        "9649": "fltns;",
        "9651": "xutri;",
        "9652": "utrif;",
        "9653": "utri;",
        "9656": "rtrif;",
        "9657": "triangleright;",
        "9661": "xdtri;",
        "9662": "dtrif;",
        "9663": "triangledown;",
        "9666": "ltrif;",
        "9667": "triangleleft;",
        "9674": "lozenge;",
        "9675": "cir;",
        "9708": "tridot;",
        "9711": "xcirc;",
        "9720": "ultri;",
        "9721": "urtri;",
        "9722": "lltri;",
        "9723": "EmptySmallSquare;",
        "9724": "FilledSmallSquare;",
        "9733": "starf;",
        "9734": "star;",
        "9742": "phone;",
        "9792": "female;",
        "9794": "male;",
        "9824": "spadesuit;",
        "9827": "clubsuit;",
        "9829": "heartsuit;",
        "9830": "diams;",
        "9834": "sung;",
        "9837": "flat;",
        "9838": "natural;",
        "9839": "sharp;",
        "10003": "checkmark;",
        "10007": "cross;",
        "10016": "maltese;",
        "10038": "sext;",
        "10072": "VerticalSeparator;",
        "10098": "lbbrk;",
        "10099": "rbbrk;",
        "10184": "bsolhsub;",
        "10185": "suphsol;",
        "10214": "lobrk;",
        "10215": "robrk;",
        "10216": "LeftAngleBracket;",
        "10217": "RightAngleBracket;",
        "10218": "Lang;",
        "10219": "Rang;",
        "10220": "loang;",
        "10221": "roang;",
        "10229": "xlarr;",
        "10230": "xrarr;",
        "10231": "xharr;",
        "10232": "xlArr;",
        "10233": "xrArr;",
        "10234": "xhArr;",
        "10236": "xmap;",
        "10239": "dzigrarr;",
        "10498": "nvlArr;",
        "10499": "nvrArr;",
        "10500": "nvHarr;",
        "10501": "Map;",
        "10508": "lbarr;",
        "10509": "rbarr;",
        "10510": "lBarr;",
        "10511": "rBarr;",
        "10512": "RBarr;",
        "10513": "DDotrahd;",
        "10514": "UpArrowBar;",
        "10515": "DownArrowBar;",
        "10518": "Rarrtl;",
        "10521": "latail;",
        "10522": "ratail;",
        "10523": "lAtail;",
        "10524": "rAtail;",
        "10525": "larrfs;",
        "10526": "rarrfs;",
        "10527": "larrbfs;",
        "10528": "rarrbfs;",
        "10531": "nwarhk;",
        "10532": "nearhk;",
        "10533": "searhk;",
        "10534": "swarhk;",
        "10535": "nwnear;",
        "10536": "toea;",
        "10537": "tosa;",
        "10538": "swnwar;",
        "10547": "rarrc;",
        "10549": "cudarrr;",
        "10550": "ldca;",
        "10551": "rdca;",
        "10552": "cudarrl;",
        "10553": "larrpl;",
        "10556": "curarrm;",
        "10557": "cularrp;",
        "10565": "rarrpl;",
        "10568": "harrcir;",
        "10569": "Uarrocir;",
        "10570": "lurdshar;",
        "10571": "ldrushar;",
        "10574": "LeftRightVector;",
        "10575": "RightUpDownVector;",
        "10576": "DownLeftRightVector;",
        "10577": "LeftUpDownVector;",
        "10578": "LeftVectorBar;",
        "10579": "RightVectorBar;",
        "10580": "RightUpVectorBar;",
        "10581": "RightDownVectorBar;",
        "10582": "DownLeftVectorBar;",
        "10583": "DownRightVectorBar;",
        "10584": "LeftUpVectorBar;",
        "10585": "LeftDownVectorBar;",
        "10586": "LeftTeeVector;",
        "10587": "RightTeeVector;",
        "10588": "RightUpTeeVector;",
        "10589": "RightDownTeeVector;",
        "10590": "DownLeftTeeVector;",
        "10591": "DownRightTeeVector;",
        "10592": "LeftUpTeeVector;",
        "10593": "LeftDownTeeVector;",
        "10594": "lHar;",
        "10595": "uHar;",
        "10596": "rHar;",
        "10597": "dHar;",
        "10598": "luruhar;",
        "10599": "ldrdhar;",
        "10600": "ruluhar;",
        "10601": "rdldhar;",
        "10602": "lharul;",
        "10603": "llhard;",
        "10604": "rharul;",
        "10605": "lrhard;",
        "10606": "UpEquilibrium;",
        "10607": "ReverseUpEquilibrium;",
        "10608": "RoundImplies;",
        "10609": "erarr;",
        "10610": "simrarr;",
        "10611": "larrsim;",
        "10612": "rarrsim;",
        "10613": "rarrap;",
        "10614": "ltlarr;",
        "10616": "gtrarr;",
        "10617": "subrarr;",
        "10619": "suplarr;",
        "10620": "lfisht;",
        "10621": "rfisht;",
        "10622": "ufisht;",
        "10623": "dfisht;",
        "10629": "lopar;",
        "10630": "ropar;",
        "10635": "lbrke;",
        "10636": "rbrke;",
        "10637": "lbrkslu;",
        "10638": "rbrksld;",
        "10639": "lbrksld;",
        "10640": "rbrkslu;",
        "10641": "langd;",
        "10642": "rangd;",
        "10643": "lparlt;",
        "10644": "rpargt;",
        "10645": "gtlPar;",
        "10646": "ltrPar;",
        "10650": "vzigzag;",
        "10652": "vangrt;",
        "10653": "angrtvbd;",
        "10660": "ange;",
        "10661": "range;",
        "10662": "dwangle;",
        "10663": "uwangle;",
        "10664": "angmsdaa;",
        "10665": "angmsdab;",
        "10666": "angmsdac;",
        "10667": "angmsdad;",
        "10668": "angmsdae;",
        "10669": "angmsdaf;",
        "10670": "angmsdag;",
        "10671": "angmsdah;",
        "10672": "bemptyv;",
        "10673": "demptyv;",
        "10674": "cemptyv;",
        "10675": "raemptyv;",
        "10676": "laemptyv;",
        "10677": "ohbar;",
        "10678": "omid;",
        "10679": "opar;",
        "10681": "operp;",
        "10683": "olcross;",
        "10684": "odsold;",
        "10686": "olcir;",
        "10687": "ofcir;",
        "10688": "olt;",
        "10689": "ogt;",
        "10690": "cirscir;",
        "10691": "cirE;",
        "10692": "solb;",
        "10693": "bsolb;",
        "10697": "boxbox;",
        "10701": "trisb;",
        "10702": "rtriltri;",
        "10703": "LeftTriangleBar;",
        "10704": "RightTriangleBar;",
        "10716": "iinfin;",
        "10717": "infintie;",
        "10718": "nvinfin;",
        "10723": "eparsl;",
        "10724": "smeparsl;",
        "10725": "eqvparsl;",
        "10731": "lozf;",
        "10740": "RuleDelayed;",
        "10742": "dsol;",
        "10752": "xodot;",
        "10753": "xoplus;",
        "10754": "xotime;",
        "10756": "xuplus;",
        "10758": "xsqcup;",
        "10764": "qint;",
        "10765": "fpartint;",
        "10768": "cirfnint;",
        "10769": "awint;",
        "10770": "rppolint;",
        "10771": "scpolint;",
        "10772": "npolint;",
        "10773": "pointint;",
        "10774": "quatint;",
        "10775": "intlarhk;",
        "10786": "pluscir;",
        "10787": "plusacir;",
        "10788": "simplus;",
        "10789": "plusdu;",
        "10790": "plussim;",
        "10791": "plustwo;",
        "10793": "mcomma;",
        "10794": "minusdu;",
        "10797": "loplus;",
        "10798": "roplus;",
        "10799": "Cross;",
        "10800": "timesd;",
        "10801": "timesbar;",
        "10803": "smashp;",
        "10804": "lotimes;",
        "10805": "rotimes;",
        "10806": "otimesas;",
        "10807": "Otimes;",
        "10808": "odiv;",
        "10809": "triplus;",
        "10810": "triminus;",
        "10811": "tritime;",
        "10812": "iprod;",
        "10815": "amalg;",
        "10816": "capdot;",
        "10818": "ncup;",
        "10819": "ncap;",
        "10820": "capand;",
        "10821": "cupor;",
        "10822": "cupcap;",
        "10823": "capcup;",
        "10824": "cupbrcap;",
        "10825": "capbrcup;",
        "10826": "cupcup;",
        "10827": "capcap;",
        "10828": "ccups;",
        "10829": "ccaps;",
        "10832": "ccupssm;",
        "10835": "And;",
        "10836": "Or;",
        "10837": "andand;",
        "10838": "oror;",
        "10839": "orslope;",
        "10840": "andslope;",
        "10842": "andv;",
        "10843": "orv;",
        "10844": "andd;",
        "10845": "ord;",
        "10847": "wedbar;",
        "10854": "sdote;",
        "10858": "simdot;",
        "10861": "congdot;",
        "10862": "easter;",
        "10863": "apacir;",
        "10864": "apE;",
        "10865": "eplus;",
        "10866": "pluse;",
        "10867": "Esim;",
        "10868": "Colone;",
        "10869": "Equal;",
        "10871": "eDDot;",
        "10872": "equivDD;",
        "10873": "ltcir;",
        "10874": "gtcir;",
        "10875": "ltquest;",
        "10876": "gtquest;",
        "10877": "LessSlantEqual;",
        "10878": "GreaterSlantEqual;",
        "10879": "lesdot;",
        "10880": "gesdot;",
        "10881": "lesdoto;",
        "10882": "gesdoto;",
        "10883": "lesdotor;",
        "10884": "gesdotol;",
        "10885": "lessapprox;",
        "10886": "gtrapprox;",
        "10887": "lneq;",
        "10888": "gneq;",
        "10889": "lnapprox;",
        "10890": "gnapprox;",
        "10891": "lesseqqgtr;",
        "10892": "gtreqqless;",
        "10893": "lsime;",
        "10894": "gsime;",
        "10895": "lsimg;",
        "10896": "gsiml;",
        "10897": "lgE;",
        "10898": "glE;",
        "10899": "lesges;",
        "10900": "gesles;",
        "10901": "eqslantless;",
        "10902": "eqslantgtr;",
        "10903": "elsdot;",
        "10904": "egsdot;",
        "10905": "el;",
        "10906": "eg;",
        "10909": "siml;",
        "10910": "simg;",
        "10911": "simlE;",
        "10912": "simgE;",
        "10913": "LessLess;",
        "10914": "GreaterGreater;",
        "10916": "glj;",
        "10917": "gla;",
        "10918": "ltcc;",
        "10919": "gtcc;",
        "10920": "lescc;",
        "10921": "gescc;",
        "10922": "smt;",
        "10923": "lat;",
        "10924": "smte;",
        "10925": "late;",
        "10926": "bumpE;",
        "10927": "preceq;",
        "10928": "succeq;",
        "10931": "prE;",
        "10932": "scE;",
        "10933": "prnE;",
        "10934": "succneqq;",
        "10935": "precapprox;",
        "10936": "succapprox;",
        "10937": "prnap;",
        "10938": "succnapprox;",
        "10939": "Pr;",
        "10940": "Sc;",
        "10941": "subdot;",
        "10942": "supdot;",
        "10943": "subplus;",
        "10944": "supplus;",
        "10945": "submult;",
        "10946": "supmult;",
        "10947": "subedot;",
        "10948": "supedot;",
        "10949": "subseteqq;",
        "10950": "supseteqq;",
        "10951": "subsim;",
        "10952": "supsim;",
        "10955": "subsetneqq;",
        "10956": "supsetneqq;",
        "10959": "csub;",
        "10960": "csup;",
        "10961": "csube;",
        "10962": "csupe;",
        "10963": "subsup;",
        "10964": "supsub;",
        "10965": "subsub;",
        "10966": "supsup;",
        "10967": "suphsub;",
        "10968": "supdsub;",
        "10969": "forkv;",
        "10970": "topfork;",
        "10971": "mlcp;",
        "10980": "DoubleLeftTee;",
        "10982": "Vdashl;",
        "10983": "Barv;",
        "10984": "vBar;",
        "10985": "vBarv;",
        "10987": "Vbar;",
        "10988": "Not;",
        "10989": "bNot;",
        "10990": "rnmid;",
        "10991": "cirmid;",
        "10992": "midcir;",
        "10993": "topcir;",
        "10994": "nhpar;",
        "10995": "parsim;",
        "11005": "parsl;",
        "64256": "fflig;",
        "64257": "filig;",
        "64258": "fllig;",
        "64259": "ffilig;",
        "64260": "ffllig;"
      };
    }
  });

  // node_modules/ent/encode.js
  var require_encode = __commonJS({
    "node_modules/ent/encode.js": function(exports, module) {
      "use strict";
      var punycode = require_punycode();
      var $decode = punycode.ucs2.decode;
      var $encode = punycode.ucs2.encode;
      var $TypeError = require_type();
      var regexTest = require_safe_regex_test();
      var revEntities = require_reversed();
      var endsInSemicolon = regexTest(/;$/);
      var defaultSpecial = {
        '"': true,
        "'": true,
        "<": true,
        ">": true,
        "&": true
      };
      module.exports = function encode(str, opts) {
        if (typeof str !== "string") {
          throw new $TypeError("Expected a String");
        }
        var numeric = !opts || !opts.named;
        if (opts && typeof opts.numeric !== "undefined") {
          numeric = opts.numeric;
        }
        var special = opts && opts.special || defaultSpecial;
        var codePoints = $decode(str);
        var chars = [];
        for (var i = 0; i < codePoints.length; i++) {
          var cc = codePoints[i];
          var c = $encode([cc]);
          var e = revEntities[cc];
          if (e && (cc >= 127 || special[c]) && !numeric) {
            var hasSemi = endsInSemicolon(e);
            chars[chars.length] = "&" + (hasSemi ? e : e + ";");
          } else if (cc < 32 || cc >= 127 || special[c]) {
            chars[chars.length] = "&#" + cc + ";";
          } else {
            chars[chars.length] = c;
          }
        }
        return chars.join("");
      };
    }
  });

  // node_modules/custom-event/index.js
  var require_custom_event = __commonJS({
    "node_modules/custom-event/index.js": function(exports, module) {
      var NativeCustomEvent = global.CustomEvent;
      function useNative() {
        try {
          var p = new NativeCustomEvent("cat", { detail: { foo: "bar" } });
          return "cat" === p.type && "bar" === p.detail.foo;
        } catch (e) {
        }
        return false;
      }
      module.exports = useNative() ? NativeCustomEvent : (
        // IE >= 9
        "undefined" !== typeof document && "function" === typeof document.createEvent ? function CustomEvent(type, params) {
          var e = document.createEvent("CustomEvent");
          if (params) {
            e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
          } else {
            e.initCustomEvent(type, false, false, void 0);
          }
          return e;
        } : (
          // IE <= 8
          function CustomEvent(type, params) {
            var e = document.createEventObject();
            e.type = type;
            if (params) {
              e.bubbles = Boolean(params.bubbles);
              e.cancelable = Boolean(params.cancelable);
              e.detail = params.detail;
            } else {
              e.bubbles = false;
              e.cancelable = false;
              e.detail = void 0;
            }
            return e;
          }
        )
      );
    }
  });

  // node_modules/void-elements/index.js
  var require_void_elements = __commonJS({
    "node_modules/void-elements/index.js": function(exports, module) {
      module.exports = {
        "area": true,
        "base": true,
        "br": true,
        "col": true,
        "embed": true,
        "hr": true,
        "img": true,
        "input": true,
        "keygen": true,
        "link": true,
        "menuitem": true,
        "meta": true,
        "param": true,
        "source": true,
        "track": true,
        "wbr": true
      };
    }
  });

  // node_modules/dom-serialize/index.js
  var require_dom_serialize = __commonJS({
    "node_modules/dom-serialize/index.js": function(exports, module) {
      var extend = require_extend();
      var encode = require_encode();
      var CustomEvent = require_custom_event();
      var voidElements = require_void_elements();
      exports = module.exports = serialize;
      exports.serializeElement = serializeElement;
      exports.serializeAttribute = serializeAttribute;
      exports.serializeText = serializeText;
      exports.serializeComment = serializeComment;
      exports.serializeDocument = serializeDocument;
      exports.serializeDoctype = serializeDoctype;
      exports.serializeDocumentFragment = serializeDocumentFragment;
      exports.serializeNodeList = serializeNodeList;
      function serialize(node, context, fn, eventTarget) {
        if (!node) return "";
        if ("function" === typeof context) {
          fn = context;
          context = null;
        }
        if (!context) context = null;
        var rtn;
        var nodeType = node.nodeType;
        if (!nodeType && "number" === typeof node.length) {
          rtn = exports.serializeNodeList(node, context, fn);
        } else {
          if ("function" === typeof fn) {
            node.addEventListener("serialize", fn, false);
          }
          var e = new CustomEvent("serialize", {
            bubbles: true,
            cancelable: true,
            detail: {
              serialize: null,
              context: context
            }
          });
          e.serializeTarget = node;
          var target = eventTarget || node;
          var cancelled = !target.dispatchEvent(e);
          var s = e.detail.serialize;
          if (s != null) {
            if ("string" === typeof s) {
              rtn = s;
            } else if ("number" === typeof s.nodeType) {
              rtn = serialize(s, context, null, target);
            } else {
              rtn = String(s);
            }
          } else if (!cancelled) {
            switch (nodeType) {
              case 1:
                rtn = exports.serializeElement(node, context, eventTarget);
                break;
              case 2:
                rtn = exports.serializeAttribute(node);
                break;
              case 3:
                rtn = exports.serializeText(node);
                break;
              case 8:
                rtn = exports.serializeComment(node);
                break;
              case 9:
                rtn = exports.serializeDocument(node, context, eventTarget);
                break;
              case 10:
                rtn = exports.serializeDoctype(node);
                break;
              case 11:
                rtn = exports.serializeDocumentFragment(node, context, eventTarget);
                break;
            }
          }
          if ("function" === typeof fn) {
            node.removeEventListener("serialize", fn, false);
          }
        }
        return rtn || "";
      }
      function serializeAttribute(node, opts) {
        return node.name + '="' + encode(node.value, extend({
          named: true
        }, opts)) + '"';
      }
      function serializeElement(node, context, eventTarget) {
        var c, i, l;
        var name = node.nodeName.toLowerCase();
        var r = "<" + name;
        for (i = 0, c = node.attributes, l = c.length; i < l; i++) {
          r += " " + exports.serializeAttribute(c[i]);
        }
        r += ">";
        r += exports.serializeNodeList(node.childNodes, context, null, eventTarget);
        if (!voidElements[name]) {
          r += "</" + name + ">";
        }
        return r;
      }
      function serializeText(node, opts) {
        return encode(node.nodeValue, extend({
          named: true,
          special: { "<": true, ">": true, "&": true }
        }, opts));
      }
      function serializeComment(node) {
        return "<!--" + node.nodeValue + "-->";
      }
      function serializeDocument(node, context, eventTarget) {
        return exports.serializeNodeList(node.childNodes, context, null, eventTarget);
      }
      function serializeDoctype(node) {
        var r = "<!DOCTYPE " + node.name;
        if (node.publicId) {
          r += ' PUBLIC "' + node.publicId + '"';
        }
        if (!node.publicId && node.systemId) {
          r += " SYSTEM";
        }
        if (node.systemId) {
          r += ' "' + node.systemId + '"';
        }
        r += ">";
        return r;
      }
      function serializeDocumentFragment(node, context, eventTarget) {
        return exports.serializeNodeList(node.childNodes, context, null, eventTarget);
      }
      function serializeNodeList(list, context, fn, eventTarget) {
        var r = "";
        for (var i = 0, l = list.length; i < l; i++) {
          r += serialize(list[i], context, fn, eventTarget);
        }
        return r;
      }
    }
  });

  // common/util.js
  var require_util = __commonJS({
    "common/util.js": function(exports) {
      exports.instanceOf = function(value, constructorName) {
        return Object.prototype.toString.apply(value) === "[object " + constructorName + "]";
      };
      exports.elm = function(id) {
        return document.getElementById(id);
      };
      exports.generateId = function(prefix) {
        return prefix + Math.floor(Math.random() * 1e4);
      };
      exports.isUndefined = function(value) {
        return typeof value === "undefined";
      };
      exports.isDefined = function(value) {
        return !exports.isUndefined(value);
      };
      exports.parseQueryParams = function(locationSearch) {
        var params = {};
        var pairs = locationSearch.slice(1).split("&");
        var keyValue;
        for (var i = 0; i < pairs.length; i++) {
          keyValue = pairs[i].split("=");
          params[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
        }
        return params;
      };
    }
  });

  // common/stringify.js
  var require_stringify = __commonJS({
    "common/stringify.js": function(exports, module) {
      var serialize = null;
      try {
        serialize = require_dom_serialize();
      } catch (e) {
      }
      var instanceOf = require_util().instanceOf;
      function isNode(obj) {
        return (obj.tagName || obj.nodeName) && obj.nodeType;
      }
      function stringify(obj, depth) {
        if (depth === 0) {
          return "...";
        }
        if (obj === null) {
          return "null";
        }
        switch (typeof obj) {
          case "symbol":
            return obj.toString();
          case "string":
            return "'" + obj + "'";
          case "undefined":
            return "undefined";
          case "function":
            try {
              return obj.toString().replace(/\{[\s\S]*\}/, "{ ... }");
            } catch (err) {
              if (err instanceof TypeError) {
                return "function " + (obj.name || "") + "() { ... }";
              } else {
                throw err;
              }
            }
          case "boolean":
            return obj ? "true" : "false";
          case "object":
            var strs = [];
            if (instanceOf(obj, "Array")) {
              strs.push("[");
              for (var i = 0, ii = obj.length; i < ii; i++) {
                if (i) {
                  strs.push(", ");
                }
                strs.push(stringify(obj[i], depth - 1));
              }
              strs.push("]");
            } else if (instanceOf(obj, "Date")) {
              return obj.toString();
            } else if (instanceOf(obj, "Text")) {
              return obj.nodeValue;
            } else if (instanceOf(obj, "Comment")) {
              return "<!--" + obj.nodeValue + "-->";
            } else if (obj.outerHTML) {
              return obj.outerHTML;
            } else if (isNode(obj)) {
              if (serialize) {
                return serialize(obj);
              } else {
                return "Skipping stringify, no support for dom-serialize";
              }
            } else if (instanceOf(obj, "Error")) {
              return obj.toString() + "\n" + obj.stack;
            } else {
              var constructor = "Object";
              if (obj.constructor && typeof obj.constructor === "function") {
                constructor = obj.constructor.name;
              }
              strs.push(constructor);
              strs.push("{");
              var first = true;
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                  if (first) {
                    first = false;
                  } else {
                    strs.push(", ");
                  }
                  strs.push(key + ": " + stringify(obj[key], depth - 1));
                }
              }
              strs.push("}");
            }
            return strs.join("");
          default:
            return obj;
        }
      }
      module.exports = stringify;
    }
  });

  // client/constants.js
  var require_constants = __commonJS({
    "client/constants.js": function(exports, module) {
      module.exports = {
        VERSION: "%KARMA_VERSION%",
        KARMA_URL_ROOT: "%KARMA_URL_ROOT%",
        KARMA_PROXY_PATH: "%KARMA_PROXY_PATH%",
        BROWSER_SOCKET_TIMEOUT: "%BROWSER_SOCKET_TIMEOUT%",
        CONTEXT_URL: "context.html"
      };
    }
  });

  // client/karma.js
  var require_karma = __commonJS({
    "client/karma.js": function(exports, module) {
      var stringify = require_stringify();
      var constant = require_constants();
      var util2 = require_util();
      function Karma2(updater2, socket2, iframe, opener, navigator, location2, document2) {
        this.updater = updater2;
        var startEmitted = false;
        var self = this;
        var queryParams = util2.parseQueryParams(location2.search);
        var browserId = queryParams.id || util2.generateId("manual-");
        var displayName = queryParams.displayName;
        var returnUrl = queryParams["return_url"] || null;
        var resultsBufferLimit = 50;
        var resultsBuffer = [];
        var policy = {
          createURL: function(s) {
            return s;
          },
          createScriptURL: function(s) {
            return s;
          }
        };
        var trustedTypes = window.trustedTypes || window.TrustedTypes;
        if (trustedTypes) {
          policy = trustedTypes.createPolicy("karma", policy);
          if (!policy.createURL) {
            policy.createURL = function(s) {
              return s;
            };
          }
        }
        var socketReconnect = false;
        this.VERSION = constant.VERSION;
        this.config = {};
        this.socket = socket2;
        if (window.addEventListener) {
          window.addEventListener("message", function handleMessage(evt) {
            var origin = evt.origin || evt.originalEvent.origin;
            if (origin !== window.location.origin) {
              return;
            }
            var method = evt.data.__karmaMethod;
            if (method) {
              if (!self[method]) {
                self.error('Received `postMessage` for "' + method + "\" but the method doesn't exist");
                return;
              }
              self[method].apply(self, evt.data.__karmaArguments);
            }
          }, false);
        }
        var childWindow = null;
        function navigateContextTo(url) {
          if (self.config.useIframe === false) {
            if (self.config.runInParent === false) {
              if (childWindow !== null && childWindow.closed !== true) {
                childWindow.onbeforeunload = void 0;
                childWindow.close();
              }
              childWindow = opener(url);
              if (childWindow === null) {
                self.error("Opening a new tab/window failed, probably because pop-ups are blocked.");
              }
            } else if (url !== "about:blank") {
              var loadScript = function(idx) {
                if (idx < window.__karma__.scriptUrls.length) {
                  var parser = new DOMParser();
                  var string = window.__karma__.scriptUrls[idx].replace(/\\x3C/g, "<").replace(/\\x3E/g, ">");
                  var doc = parser.parseFromString(string, "text/html");
                  var ele = doc.head.firstChild || doc.body.firstChild;
                  if (ele.tagName && ele.tagName.toLowerCase() === "script") {
                    var tmp = ele;
                    ele = document2.createElement("script");
                    ele.src = policy.createScriptURL(tmp.src);
                    ele.crossOrigin = tmp.crossOrigin;
                  }
                  ele.onload = function() {
                    loadScript(idx + 1);
                  };
                  document2.body.appendChild(ele);
                } else {
                  window.__karma__.loaded();
                }
              };
              loadScript(0);
            }
          } else {
            iframe.contentWindow.onbeforeunload = void 0;
            iframe.src = policy.createURL(url);
          }
        }
        this.log = function(type, args) {
          var values = [];
          for (var i = 0; i < args.length; i++) {
            values.push(this.stringify(args[i], 3));
          }
          this.info({ log: values.join(", "), type: type });
        };
        this.stringify = stringify;
        function getLocation(url, lineno, colno) {
          var location3 = "";
          if (url !== void 0) {
            location3 += url;
          }
          if (lineno !== void 0) {
            location3 += ":" + lineno;
          }
          if (colno !== void 0) {
            location3 += ":" + colno;
          }
          return location3;
        }
        this.error = function(messageOrEvent, source, lineno, colno, error) {
          var message;
          if (typeof messageOrEvent === "string") {
            message = messageOrEvent;
            var location3 = getLocation(source, lineno, colno);
            if (location3 !== "") {
              message += "\nat " + location3;
            }
            if (error && error.stack) {
              message += "\n\n" + error.stack;
            }
          } else {
            message = { message: messageOrEvent, str: messageOrEvent.toString() };
          }
          socket2.emit("karma_error", message);
          self.updater.updateTestStatus("karma_error " + message);
          this.complete();
          return false;
        };
        this.result = function(originalResult) {
          var convertedResult = {};
          for (var propertyName in originalResult) {
            if (Object.prototype.hasOwnProperty.call(originalResult, propertyName)) {
              var propertyValue = originalResult[propertyName];
              if (Object.prototype.toString.call(propertyValue) === "[object Array]") {
                convertedResult[propertyName] = Array.prototype.slice.call(propertyValue);
              } else {
                convertedResult[propertyName] = propertyValue;
              }
            }
          }
          if (!startEmitted) {
            socket2.emit("start", { total: null });
            self.updater.updateTestStatus("start");
            startEmitted = true;
          }
          if (resultsBufferLimit === 1) {
            self.updater.updateTestStatus("result");
            return socket2.emit("result", convertedResult);
          }
          resultsBuffer.push(convertedResult);
          if (resultsBuffer.length === resultsBufferLimit) {
            socket2.emit("result", resultsBuffer);
            self.updater.updateTestStatus("result");
            resultsBuffer = [];
          }
        };
        this.complete = function(result) {
          if (resultsBuffer.length) {
            socket2.emit("result", resultsBuffer);
            resultsBuffer = [];
          }
          socket2.emit("complete", result || {});
          if (this.config.clearContext) {
            navigateContextTo("about:blank");
          } else {
            self.updater.updateTestStatus("complete");
          }
          if (returnUrl) {
            var isReturnUrlAllowed = false;
            for (var i = 0; i < this.config.allowedReturnUrlPatterns.length; i++) {
              var allowedReturnUrlPattern = new RegExp(this.config.allowedReturnUrlPatterns[i]);
              if (allowedReturnUrlPattern.test(returnUrl)) {
                isReturnUrlAllowed = true;
                break;
              }
            }
            if (!isReturnUrlAllowed) {
              throw new Error(
                "Security: Navigation to ".concat(
                  returnUrl,
                  " was blocked to prevent malicious exploits."
                )
              );
            }
            location2.href = returnUrl;
          }
        };
        this.info = function(info) {
          if (!startEmitted && util2.isDefined(info.total)) {
            socket2.emit("start", info);
            startEmitted = true;
          } else {
            socket2.emit("info", info);
          }
        };
        socket2.on("execute", function(cfg) {
          self.updater.updateTestStatus("execute");
          startEmitted = false;
          self.config = cfg;
          navigateContextTo(constant.CONTEXT_URL);
          if (self.config.clientDisplayNone) {
            [].forEach.call(document2.querySelectorAll("#banner, #browsers"), function(el) {
              el.style.display = "none";
            });
          }
          if (window.console && window.console.clear) {
            window.console.clear();
          }
        });
        socket2.on("stop", function() {
          this.complete();
        }.bind(this));
        socket2.on("connect", function() {
          socket2.io.engine.on("upgrade", function() {
            resultsBufferLimit = 1;
            if (resultsBuffer.length > 0) {
              socket2.emit("result", resultsBuffer);
              resultsBuffer = [];
            }
          });
          var info = {
            name: navigator.userAgent,
            id: browserId,
            isSocketReconnect: socketReconnect
          };
          if (displayName) {
            info.displayName = displayName;
          }
          socket2.emit("register", info);
          socketReconnect = true;
        });
      }
      module.exports = Karma2;
    }
  });

  // client/updater.js
  var require_updater = __commonJS({
    "client/updater.js": function(exports, module) {
      var VERSION = require_constants().VERSION;
      function StatusUpdater2(socket2, titleElement, bannerElement, browsersElement) {
        function updateBrowsersInfo(browsers) {
          if (!browsersElement) {
            return;
          }
          var status;
          while (browsersElement.firstChild) {
            browsersElement.removeChild(browsersElement.firstChild);
          }
          for (var i = 0; i < browsers.length; i++) {
            status = browsers[i].isConnected ? "idle" : "executing";
            var li = document.createElement("li");
            li.setAttribute("class", status);
            li.textContent = browsers[i].name + " is " + status;
            browsersElement.appendChild(li);
          }
        }
        var connectionText = "never-connected";
        var testText = "loading";
        var pingText = "";
        function updateBanner() {
          if (!titleElement || !bannerElement) {
            return;
          }
          titleElement.textContent = "Karma v " + VERSION + " - " + connectionText + "; test: " + testText + "; " + pingText;
          bannerElement.className = connectionText === "connected" ? "online" : "offline";
        }
        function updateConnectionStatus(connectionStatus) {
          connectionText = connectionStatus || connectionText;
          updateBanner();
        }
        function updateTestStatus(testStatus) {
          testText = testStatus || testText;
          updateBanner();
        }
        function updatePingStatus(pingStatus) {
          pingText = pingStatus || pingText;
          updateBanner();
        }
        socket2.on("connect", function() {
          updateConnectionStatus("connected");
        });
        socket2.on("disconnect", function() {
          updateConnectionStatus("disconnected");
        });
        socket2.on("reconnecting", function(sec) {
          updateConnectionStatus("reconnecting in " + sec + " seconds");
        });
        socket2.on("reconnect", function() {
          updateConnectionStatus("reconnected");
        });
        socket2.on("reconnect_failed", function() {
          updateConnectionStatus("reconnect_failed");
        });
        socket2.on("info", updateBrowsersInfo);
        socket2.on("disconnect", function() {
          updateBrowsersInfo([]);
        });
        socket2.on("ping", function() {
          updatePingStatus("ping...");
        });
        socket2.on("pong", function(latency) {
          updatePingStatus("ping " + latency + "ms");
        });
        return { updateTestStatus: updateTestStatus };
      }
      module.exports = StatusUpdater2;
    }
  });

  // client/main.js
  var Karma = require_karma();
  var StatusUpdater = require_updater();
  var util = require_util();
  var constants = require_constants();
  var KARMA_URL_ROOT = constants.KARMA_URL_ROOT;
  var KARMA_PROXY_PATH = constants.KARMA_PROXY_PATH;
  var BROWSER_SOCKET_TIMEOUT = constants.BROWSER_SOCKET_TIMEOUT;
  var socket = io(location.host, {
    reconnectionDelay: 500,
    reconnectionDelayMax: Infinity,
    timeout: BROWSER_SOCKET_TIMEOUT,
    path: KARMA_PROXY_PATH + KARMA_URL_ROOT.slice(1) + "socket.io",
    "sync disconnect on unload": true,
    useNativeTimers: true
  });
  var updater = new StatusUpdater(socket, util.elm("title"), util.elm("banner"), util.elm("browsers"));
  window.karma = new Karma(
    updater,
    socket,
    util.elm("context"),
    window.open,
    window.navigator,
    window.location,
    window.document
  );
})();
