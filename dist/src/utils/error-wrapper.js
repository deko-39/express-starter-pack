"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorWrapper = void 0;
const logger_1 = require("./logger");
const errorWrapper = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    }
    catch (error) {
        logger_1.logger.error('Handling request error!');
        logger_1.logger.error(error);
    }
};
exports.errorWrapper = errorWrapper;
