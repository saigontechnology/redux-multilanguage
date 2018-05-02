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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeLanguage = changeLanguage;
exports.loadLanguages = loadLanguages;
var CHANGE_LANGUAGE = exports.CHANGE_LANGUAGE = "redux-multilanguage/CHANGE_LANGUAGE";
function changeLanguage(languageCode) {
  return {
    type: CHANGE_LANGUAGE,
    languageCode: languageCode
  };
}

var LOAD_LANGUAGES = exports.LOAD_LANGUAGES = "redux-multilanguage/LOAD_LANGUAGES";
function loadLanguages(_ref) {
  var languages = _ref.languages;

  return {
    type: LOAD_LANGUAGES,
    languages: languages
  };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multilanguageReducer = exports.loadLanguages = exports.changeLanguage = exports.createMultilanguageReducer = exports.multilanguage = undefined;

var _multilanguage = __webpack_require__(2);

var _multilanguage2 = _interopRequireDefault(_multilanguage);

var _actions = __webpack_require__(0);

var _multilanguage3 = __webpack_require__(5);

var _multilanguage4 = _interopRequireDefault(_multilanguage3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.multilanguage = _multilanguage2.default;
exports.createMultilanguageReducer = _multilanguage3.createMultilanguageReducer;
exports.changeLanguage = _actions.changeLanguage;
exports.loadLanguages = _actions.loadLanguages;
exports.multilanguageReducer = _multilanguage4.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = multilanguage;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  A higer-order component for multilanguage. See usage instruction in ../index.js
 */
function multilanguage(WrappedComponent) {
  return (0, _reactRedux.connect)(function (state) {
    var currentLanguageCode = state.multilanguage.currentLanguageCode;
    var strings = state.multilanguage.languages[currentLanguageCode];
    return {
      currentLanguageCode: currentLanguageCode,
      strings: strings
    };
  })(WrappedComponent);
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createMultilanguageReducer = createMultilanguageReducer;

var _actions = __webpack_require__(0);

var initialState = {
  currentLanguageCode: "en",
  languages: {
    en: {}
  }
};

function multilanguage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actions.LOAD_LANGUAGES:
      return _extends({}, state, {
        languages: _extends({}, state.languages, action.languages)
      });
    case _actions.CHANGE_LANGUAGE:
      return _extends({}, state, {
        currentLanguageCode: action.languageCode
      });
    default:
      return state;
  }
}
exports.default = multilanguage;
function createMultilanguageReducer(_initialState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _extends({}, initialState, _initialState);
    var action = arguments[1];

    return multilanguage(state, action);
  };
}

/***/ })
/******/ ]);