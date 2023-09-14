const { isExistingUser, doSignup } = require("../../models/user/user.model");
const { validationResult } = require("express-validator");
const { httpResponse, httpErrorResponse } = require("../../utils/httpResponse");
const { createToken } = require("../../utils/accessToken");

async function signup(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return httpResponse(res, 400, { error: errors.array()[0].msg });
    }
    const user = req.body;

    const isUserExists = await isExistingUser(user.email);
    if (isUserExists) {
      return httpResponse(res, 400, { error: "User already exists" });
    }

    const newUser = await doSignup(user);
    return httpResponse(res, 201, 'User created successfully', { newUser });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

async function signIn(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }

    const { email, password } = req.body;

    const existingUser = await isExistingUser(email);

    if (!existingUser) {
      return httpResponse(res, 400, { error: "Email was not found" });
    }

    if (!existingUser.authenticate(password)) {
      return httpResponse(res, 400, { error: "Incorrect password" });
    }

    const token = createToken({ _id: existingUser._id });
    res.cookie("token", token, { expire: new Date() + 1 });

    return httpResponse(res, 200, 'Login Successful', {   
        token,
        user: {
          id: existingUser._id,
          name: existingUser.firstName + " " + existingUser.lastName,
          email: existingUser.email,
        } 
    });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

function logout(req, res) {
  res.clearCookie("token");
  return httpResponse(res, 200, 'User logged out successfully');
}



module.exports = {
  signup,
  signIn,
  logout
};
