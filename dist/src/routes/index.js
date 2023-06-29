"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const user_1 = tslib_1.__importDefault(require("./user"));
const router = express_1.default.Router();
router.use('/users', user_1.default);
exports.default = router;
