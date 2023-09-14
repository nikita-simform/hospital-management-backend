const express = require("express");
const { signup,signIn,logout } = require("./login.controller");
const { validateSignUpRequest, validateLoginRequest } = require("./login.validations");

const loginRouter = express.Router();

loginRouter.post('/signup',validateSignUpRequest(),signup);
loginRouter.post('/login',validateLoginRequest(),signIn);
loginRouter.get('/logout',logout);

module.exports = loginRouter;
