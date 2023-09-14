const jwt = require("jsonwebtoken");
const { httpResponse } = require("./httpResponse");


function createToken(data) {
    return jwt.sign(data, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRY_TIME });
}

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader != undefined) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        return httpResponse(res, 401, 'Unauthorized user');

    }
}

function verifyToken(req, res, next) {
    try {
        const decoded = jwt.verify(req.token, process.env.SECRET);
        next();
    } catch (error) {
        return httpResponse(res, 401, 'Invalid Token');
    }
}

module.exports = {
    createToken,
    ensureToken,
    verifyToken,
}