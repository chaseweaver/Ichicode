#!/usr/bin/env node
"use strict";

require("./add-exception-handler");

var _loglevelColoredLevelPrefix = require("loglevel-colored-level-prefix");

var _loglevelColoredLevelPrefix2 = _interopRequireDefault(_loglevelColoredLevelPrefix);

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

var _formatFiles = require("./format-files");

var _formatFiles2 = _interopRequireDefault(_formatFiles);

var _argv = require("./argv");

var _argv2 = _interopRequireDefault(_argv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// want to do this first
var logger = (0, _loglevelColoredLevelPrefix2.default)({ prefix: "prettier-eslint-cli" });

// eslint-disable-next-line import/no-unassigned-import

var args = process.argv.slice(2);

logger.trace("Parsing args: ", args);
var argv = _parser2.default.parse(args);

argv = (0, _argv2.default)(argv);

(0, _formatFiles2.default)(argv);