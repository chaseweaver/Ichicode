"use strict";

var _uncaughtExceptionHandler = require("./uncaught-exception-handler");

var _uncaughtExceptionHandler2 = _interopRequireDefault(_uncaughtExceptionHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on("uncaughtException", _uncaughtExceptionHandler2.default); /* istanbul ignore-next */