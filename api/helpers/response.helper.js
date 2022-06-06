const { v4: uuidv4 } = require('uuid');

exports.successResponse = function (res, msg) {
    var data = {
        headers: {
            status: true,
            status_code: 200,
            status_message: msg,
            request_id: uuidv4()
        },
        body: ""
    };
    return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
    var resData = {
        headers: {
            status: true,
            status_code: 200,
            status_message: msg,
            request_id: uuidv4()
        },
        body: data
    };
    return res.status(200).json(resData);
};

exports.successResponseWithArrayData = function (res, data) {
    return res.status(200).json(data);
};

exports.ErrorResponse = function (res, msg) {
    var data = {
        headers: {
            status: false,
            status_code: 500,
            status_message: msg,
            request_id: uuidv4()
        },
        body: null
    };
    return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
    var data = {
        headers: {
            status: false,
            status_code: 404,
            status_message: msg,
            request_id: uuidv4()
        },
        body: null
    };
    return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
    var resData = {
        headers: {
            status: false,
            status_code: 400,
            status_message: msg,
            request_id: uuidv4()
        },
        body: data
    };
    return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
    var data = {
        headers: {
            status: false,
            status_code: 401,
            status_message: msg,
            request_id: uuidv4()
        },
        body: null
    };
    return res.status(401).json(data);
};

exports.handleExceptionResponse = async (res, exception) => {
    let status_code = 500
    console.error(JSON.stringify(exception))
    let status_message = "Failed Something Went wrong. Please try again"
    if (exception.name === 'SequelizeUniqueConstraintError') {
        status_code = 403
        let rawError = exception.errors[0].message
        status_message = rawError.split(".")[1]
    } else if (exception.name === 'SequelizeConnectionError') {
        status_code = 500
        status_message = "Failed, Unable to create connection to the database"
    } else if (exception.name === 'SequelizeAccessDeniedError') {
        status_code = 403
        status_message = "Failed, access denied when connecting to the database."
    }
    var data = {
        headers: {
            status: false,
            status_code: status_code,
            status_message: status_message,
            request_id: uuidv4(),
        },
        body: null
    }
    return res.status(status_code).json(data);
}