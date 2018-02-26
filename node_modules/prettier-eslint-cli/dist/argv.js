"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalize(options) {
  return (0, _entries2.default)(options).reduce(function (optionsAccumulator, _ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return key.includes("-") ? optionsAccumulator : (0, _extends3.default)({}, optionsAccumulator, { [key]: value });
  }, {});
}

exports.default = normalize;