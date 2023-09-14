const httpResponse = (res, statusCode, message, data) => {

    return res.status(statusCode).json({
        data,
        message
    })
}

const httpErrorResponse = (res, error) => {
    if (error.code) {
        return httpResponse(res, error.code, error.message)
    }
    else {
        return httpResponse(res, 500, "Internal Server Error");
    }
}

module.exports = {
    httpResponse,
    httpErrorResponse
}