"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const constant_1 = require("../../utils/constant");
const error_wrapper_1 = require("../../utils/error-wrapper");
const router = express_1.default.Router();
const getUser = (_, res, __) => {
    res.status(constant_1.HttpStatus.OK).send('Get user');
};
const getUserById = (_, res, __) => {
    res.status(constant_1.HttpStatus.OK).send('Get user by id');
};
const createUser = (_, res, __) => {
    res.status(constant_1.HttpStatus.CREATED).send('Create user');
};
const updateUserById = (_, res, __) => {
    res.status(constant_1.HttpStatus.ACCEPTED).send('Update user by id');
};
const deleteUserById = (_, res, __) => {
    res.sendStatus(constant_1.HttpStatus.NO_CONTENT);
};
router.get('', (0, error_wrapper_1.errorWrapper)(getUser));
router.get(':id', (0, error_wrapper_1.errorWrapper)(getUserById));
router.post('', (0, error_wrapper_1.errorWrapper)(createUser));
router.patch(':id', (0, error_wrapper_1.errorWrapper)(updateUserById));
router.delete(':id', (0, error_wrapper_1.errorWrapper)(deleteUserById));
exports.default = router;
