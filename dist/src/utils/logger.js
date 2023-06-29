"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const tslib_1 = require("tslib");
const cli_color_1 = tslib_1.__importDefault(require("cli-color"));
class Logger {
    errorColor = cli_color_1.default.red.bold;
    warnColor = cli_color_1.default.yellow;
    noticeColor = cli_color_1.default.blue;
    infoColor = cli_color_1.default.green;
    log(message) {
        console.log(this.infoColor(message));
    }
    error(message) {
        console.log(this.errorColor(message));
    }
    warn(message) {
        console.log(this.warnColor(message));
    }
    notice(message) {
        console.log(this.noticeColor(message));
    }
}
const logger = new Logger();
exports.logger = logger;
