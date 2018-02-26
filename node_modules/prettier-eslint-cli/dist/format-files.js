"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var formatStdin = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(prettierESLintOptions) {
    var stdinValue, formatted;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getStdin2.default)();

          case 2:
            stdinValue = _context.sent.trim();
            _context.prev = 3;
            formatted = (0, _prettierEslint2.default)((0, _extends3.default)({ text: stdinValue }, prettierESLintOptions));

            process.stdout.write(formatted);
            return _context.abrupt("return", _promise2.default.resolve(formatted));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);

            logger.error("There was a problem trying to format the stdin text", `\n${(0, _indentString2.default)(_context.t0.stack, 4)}`);
            process.exitCode = 1;
            return _context.abrupt("return", _promise2.default.resolve(stdinValue));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 9]]);
  }));

  return function formatStdin(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _rxjs = require("rxjs");

var _prettierEslint = require("prettier-eslint");

var _prettierEslint2 = _interopRequireDefault(_prettierEslint);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _getStdin = require("get-stdin");

var _getStdin2 = _interopRequireDefault(_getStdin);

var _ignore = require("ignore");

var _ignore2 = _interopRequireDefault(_ignore);

var _findUp = require("find-up");

var _findUp2 = _interopRequireDefault(_findUp);

var _lodash = require("lodash.memoize");

var _lodash2 = _interopRequireDefault(_lodash);

var _indentString = require("indent-string");

var _indentString2 = _interopRequireDefault(_indentString);

var _loglevelColoredLevelPrefix = require("loglevel-colored-level-prefix");

var _loglevelColoredLevelPrefix2 = _interopRequireDefault(_loglevelColoredLevelPrefix);

var _configFile = require("eslint/lib/config/config-file");

var _configFile2 = _interopRequireDefault(_configFile);

var _linter = require("eslint/lib/linter");

var _linter2 = _interopRequireDefault(_linter);

var _config2 = require("eslint/lib/config");

var _config3 = _interopRequireDefault(_config2);

var _messages = require("./messages");

var messages = _interopRequireWildcard(_messages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-console:0 */
/* eslint complexity:[1, 7] */
var LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;
var rxGlob = _rxjs.Observable.bindNodeCallback(_glob2.default);
var rxReadFile = _rxjs.Observable.bindNodeCallback(_fs2.default.readFile);
var rxWriteFile = _rxjs.Observable.bindNodeCallback(_fs2.default.writeFile);
var findUpEslintignoreSyncMemoized = (0, _lodash2.default)(findUpEslintignoreSync, findUpMemoizeResolver);
var findUpPrettierignoreSyncMemoized = (0, _lodash2.default)(findUpPrettierignoreSync, findUpMemoizeResolver);

var getIsIgnoredMemoized = (0, _lodash2.default)(getIsIgnored);

var logger = (0, _loglevelColoredLevelPrefix2.default)({ prefix: "prettier-eslint-cli" });

exports.default = formatFilesFromArgv;


function formatFilesFromArgv(_ref) {
  var fileGlobs = _ref._,
      _$0 = _ref.$0,
      _help = _ref.help,
      _help_ = _ref.h,
      _version = _ref.version,
      _ref$logLevel = _ref.logLevel,
      logLevel = _ref$logLevel === undefined ? logger.getLevel() : _ref$logLevel,
      _logLevelAlias = _ref.l,
      _config = _ref.config,
      listDifferent = _ref.listDifferent,
      stdin = _ref.stdin,
      stdinFilepath = _ref.stdinFilepath,
      write = _ref.write,
      eslintPath = _ref.eslintPath,
      prettierPath = _ref.prettierPath,
      _ref$ignore = _ref.ignore,
      ignoreGlobs = _ref$ignore === undefined ? [] : _ref$ignore,
      _ref$eslintIgnore = _ref.eslintIgnore,
      applyEslintIgnore = _ref$eslintIgnore === undefined ? true : _ref$eslintIgnore,
      _ref$prettierIgnore = _ref.prettierIgnore,
      applyPrettierIgnore = _ref$prettierIgnore === undefined ? true : _ref$prettierIgnore,
      eslintConfigPath = _ref.eslintConfigPath,
      prettierLast = _ref.prettierLast,
      prettierOptions = (0, _objectWithoutProperties3.default)(_ref, ["_", "$0", "help", "h", "version", "logLevel", "l", "config", "listDifferent", "stdin", "stdinFilepath", "write", "eslintPath", "prettierPath", "ignore", "eslintIgnore", "prettierIgnore", "eslintConfigPath", "prettierLast"]);

  logger.setLevel(logLevel);
  var prettierESLintOptions = {
    logLevel,
    eslintPath,
    prettierPath,
    prettierLast,
    prettierOptions
  };

  if (eslintConfigPath) {
    var configContext = new _config3.default({}, new _linter2.default());
    prettierESLintOptions.eslintConfig = _configFile2.default.load(eslintConfigPath, configContext);
  }

  var cliOptions = { write, listDifferent };
  if (stdin) {
    return formatStdin((0, _extends3.default)({ filePath: stdinFilepath }, prettierESLintOptions));
  } else {
    return formatFilesFromGlobs({
      fileGlobs,
      ignoreGlobs: [].concat((0, _toConsumableArray3.default)(ignoreGlobs)), // make a copy to avoid manipulation
      cliOptions,
      prettierESLintOptions,
      applyEslintIgnore,
      applyPrettierIgnore
    });
  }
}

function formatFilesFromGlobs(_ref3) {
  var fileGlobs = _ref3.fileGlobs,
      ignoreGlobs = _ref3.ignoreGlobs,
      cliOptions = _ref3.cliOptions,
      prettierESLintOptions = _ref3.prettierESLintOptions,
      applyEslintIgnore = _ref3.applyEslintIgnore,
      applyPrettierIgnore = _ref3.applyPrettierIgnore;

  var concurrentGlobs = 3;
  var concurrentFormats = 10;
  return new _promise2.default(function (resolve) {
    var successes = [];
    var failures = [];
    var unchanged = [];
    _rxjs.Observable.from(fileGlobs).mergeMap(getFilesFromGlob.bind(null, ignoreGlobs, applyEslintIgnore, applyPrettierIgnore), null, concurrentGlobs).concatAll().distinct().mergeMap(filePathToFormatted, null, concurrentFormats).subscribe(onNext, onError, onComplete);

    function filePathToFormatted(filePath) {
      return formatFile(filePath, prettierESLintOptions, cliOptions);
    }

    function onNext(info) {
      if (info.error) {
        failures.push(info);
      } else if (info.unchanged) {
        unchanged.push(info);
      } else {
        successes.push(info);
      }
    }

    function onError(error) {
      logger.error("There was an unhandled error while formatting the files", `\n${(0, _indentString2.default)(error.stack, 4)}`);
      process.exitCode = 1;
      resolve({ error, successes, failures });
    }

    function onComplete() {
      var isNotSilent = logger.getLevel() !== logger.levels.SILENT;

      /* use console.error directly here because
       * - we don't want these messages prefixed
       * - we want them to go to stderr, not stdout
       */
      if (successes.length && isNotSilent) {
        console.error(messages.success({
          success: _chalk2.default.green("success"),
          count: successes.length,
          countString: _chalk2.default.bold(successes.length)
        }));
      }
      if (failures.length && isNotSilent) {
        process.exitCode = 1;
        console.error(messages.failure({
          failure: _chalk2.default.red("failure"),
          count: failures.length,
          countString: _chalk2.default.bold(failures.length)
        }));
      }
      if (unchanged.length && isNotSilent) {
        console.error(messages.unchanged({
          unchanged: _chalk2.default.gray("unchanged"),
          count: unchanged.length,
          countString: _chalk2.default.bold(unchanged.length)
        }));
      }
      resolve({ successes, failures });
    }
  });
}

function getFilesFromGlob(ignoreGlobs, applyEslintIgnore, applyPrettierIgnore, fileGlob) {
  var globOptions = { ignore: ignoreGlobs };
  if (!fileGlob.includes("node_modules")) {
    // basically, we're going to protect you from doing something
    // not smart unless you explicitly include it in your glob
    globOptions.ignore.push("**/node_modules/**");
  }
  return rxGlob(fileGlob, globOptions).map(function (filePaths) {
    return filePaths.filter(function (filePath) {
      if (applyEslintIgnore && isFilePathMatchedByEslintignore(filePath)) {
        return false;
      }

      if (applyPrettierIgnore && isFilePathMatchedByPrettierignore(filePath)) {
        return false;
      }

      return true;
    });
  });
}

function formatFile(filePath, prettierESLintOptions, cliOptions) {
  var fileInfo = { filePath };
  var format$ = rxReadFile(filePath, "utf8").map(function (text) {
    fileInfo.text = text;
    fileInfo.formatted = (0, _prettierEslint2.default)((0, _extends3.default)({ text, filePath }, prettierESLintOptions));
    fileInfo.unchanged = fileInfo.text === fileInfo.formatted;
    return fileInfo;
  });

  if (cliOptions.write) {
    format$ = format$.mergeMap(function (info) {
      if (info.unchanged) {
        return _rxjs.Observable.of(info);
      } else {
        return rxWriteFile(filePath, info.formatted).map(function () {
          return info;
        });
      }
    });
  } else if (cliOptions.listDifferent) {
    format$ = format$.map(function (info) {
      if (!info.unchanged) {
        process.exitCode = 1;
        console.log(info.filePath);
      }
      return info;
    });
  } else {
    format$ = format$.map(function (info) {
      process.stdout.write(info.formatted);
      return info;
    });
  }

  return format$.catch(function (error) {
    logger.error(`There was an error formatting "${fileInfo.filePath}":`, `\n${(0, _indentString2.default)(error.stack, 4)}`);
    return _rxjs.Observable.of((0, _assign2.default)(fileInfo, { error }));
  });
}

function getNearestEslintignorePath(filePath) {
  var _path$parse = _path2.default.parse(filePath),
      dir = _path$parse.dir;

  return findUpEslintignoreSyncMemoized(".eslintignore", dir);
}

function isFilePathMatchedByEslintignore(filePath) {
  var eslintignorePath = getNearestEslintignorePath(filePath);
  if (!eslintignorePath) {
    return false;
  }

  var eslintignoreDir = _path2.default.parse(eslintignorePath).dir;
  var filePathRelativeToEslintignoreDir = _path2.default.relative(eslintignoreDir, filePath);
  var isIgnored = getIsIgnoredMemoized(eslintignorePath);
  return isIgnored(filePathRelativeToEslintignoreDir);
}

function getNearestPrettierignorePath(filePath) {
  var _path$parse2 = _path2.default.parse(filePath),
      dir = _path$parse2.dir;

  return findUpPrettierignoreSyncMemoized(".prettierignore", dir);
}

function isFilePathMatchedByPrettierignore(filePath) {
  var prettierignorePath = getNearestPrettierignorePath(filePath);
  if (!prettierignorePath) {
    return false;
  }

  var prettierignoreDir = _path2.default.parse(prettierignorePath).dir;
  var filePathRelativeToPrettierignoreDir = _path2.default.relative(prettierignoreDir, filePath);
  var isIgnored = getIsIgnoredMemoized(prettierignorePath);
  return isIgnored(filePathRelativeToPrettierignoreDir);
}

function findUpMemoizeResolver() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.join("::");
}

function findUpEslintignoreSync(filename, cwd) {
  return _findUp2.default.sync(".eslintignore", { cwd });
}

function findUpPrettierignoreSync(filename, cwd) {
  return _findUp2.default.sync(".prettierignore", { cwd });
}

function getIsIgnored(filename) {
  var ignoreLines = _fs2.default.readFileSync(filename, "utf8").split(LINE_SEPERATOR_REGEX).filter(function (line) {
    return Boolean(line.trim());
  });
  var instance = (0, _ignore2.default)();
  instance.add(ignoreLines);
  return instance.ignores.bind(instance);
}