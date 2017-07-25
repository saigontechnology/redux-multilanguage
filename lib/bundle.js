module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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

var LanguageLoader = function () {
    function LanguageLoader() {
        _classCallCheck(this, LanguageLoader);

        this.languages = [];
    }

    _createClass(LanguageLoader, [{
        key: 'load',
        value: function load(_ref) {
            var languages = _ref.languages;

            this.languages = languages;
        }
    }, {
        key: 'getLanguage',
        value: function getLanguage(languageCode) {
            if (this.languages.hasOwnProperty(languageCode)) {
                return this.languages[languageCode];
            } else {
                console.error('Current loaded languages:', this.languages);
                throw '[LanguageLoader]: No language for language code \'' + languageCode + '\'';
            }
        }
    }]);

    return LanguageLoader;
}();

var languageLoader = new LanguageLoader();
exports.default = languageLoader;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeLanguage = changeLanguage;
var CHANGE_LANGUAGE = exports.CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
function changeLanguage(languageCode) {
    return {
        type: CHANGE_LANGUAGE,
        languageCode: languageCode
    };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.languageLoader = exports.multilanguageReducer = exports.changeLanguage = exports.createMultilanguageReducer = exports.multilanguage = undefined;

var _multilanguage = __webpack_require__(3);

var _multilanguage2 = _interopRequireDefault(_multilanguage);

var _actions = __webpack_require__(1);

var _multilanguage3 = __webpack_require__(6);

var _multilanguage4 = _interopRequireDefault(_multilanguage3);

var _languageLoader = __webpack_require__(0);

var _languageLoader2 = _interopRequireDefault(_languageLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.multilanguage = _multilanguage2.default;
exports.createMultilanguageReducer = _multilanguage3.createMultilanguageReducer;
exports.changeLanguage = _actions.changeLanguage;
exports.multilanguageReducer = _multilanguage4.default;
exports.languageLoader = _languageLoader2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = multilanguage;

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _languageLoader = __webpack_require__(0);

var _languageLoader2 = _interopRequireDefault(_languageLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  A higer-order component for multilanguage. See usage instruction in ../index.js
 */
function multilanguage(key) {
    return function (WrappedComponent) {
        var MultipleLanguage = function MultipleLanguage(props) {
            return _react2.default.createElement(WrappedComponent, props);
        };

        return (0, _reactRedux.connect)(function (state) {
            var currentLanguageCode = state.multilanguage.currentLanguageCode;
            var language = _languageLoader2.default.getLanguage(currentLanguageCode) || {};
            var strings = language[key] || {};
            return {
                currentLanguageCode: currentLanguageCode,
                strings: strings
            };
        })(MultipleLanguage);
    };
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createMultilanguageReducer = createMultilanguageReducer;

var _actions = __webpack_require__(1);

var initialState = {
    currentLanguageCode: 'en'
};

function multilanguage() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actions.CHANGE_LANGUAGE:
            return _extends({}, state, {
                currentLanguageCode: action.languageCode
            });
        default:
            return state;
    }
}
exports.default = multilanguage;
function createMultilanguageReducer(initialState) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        return multilanguage(state, action);
    };
}

/***/ })
/******/ ]);