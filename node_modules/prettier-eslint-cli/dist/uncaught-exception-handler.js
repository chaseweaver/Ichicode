"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonTags = require("common-tags");

var _loglevelColoredLevelPrefix = require("loglevel-colored-level-prefix");

var _loglevelColoredLevelPrefix2 = _interopRequireDefault(_loglevelColoredLevelPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _loglevelColoredLevelPrefix2.default)({ prefix: "prettier-eslint-cli" });

exports.default = onUncaughtException;


function onUncaughtException(err) {
  var level = logger.getLevel();
  var isTrace = level === 0;
  var traceResolution = _commonTags.oneLine`
    Run the script again with the LOG_LEVEL
    environment variable set to "trace"
  `;
  var resolutionSteps = [`${isTrace ? "✅ " : "1."} ${traceResolution}`, _commonTags.oneLine`
      2. Search existing issues on GitHub:
      ${_commonTags.oneLineTrim`
        https://github.com/prettier/prettier-eslint-cli/issues
        ?utf8=%E2%9C%93&q=${encodeURIComponent(err.message)}
      `}
    `, _commonTags.oneLine`
      3. Make a minimal reproduction in a totally separate repository.
      You can fork this one:
      https://github.com/kentcdodds/prettier-eslint-cli-repro
    `, _commonTags.oneLine`
      4. Post an issue with a link to your reproduction to the issues
      on GitHub: https://github.com/prettier/prettier-eslint-cli/issues/new
    `].join("\n  ");
  logger.error(_commonTags.oneLine`
      There has been an unknown error when running the prettier-eslint CLI.
      If it's unclear to you what went wrong, then try this:
    `, `\n  ${resolutionSteps}`);
  throw err;
}