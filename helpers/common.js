

/**
 * It takes in a status code, a message, an action, and data, and returns a response object
 * @param status - The status code of the response.
 * @param message - The message you want to send to the user.
 * @param action - The action that was performed.
 * @param data - The data that you want to send back to the client.
 * @returns A function that returns an object.
 */
const sendResponse = function (status, message, action, data) {
    let response = {};
    let statusArr = process.env.STATUS.split(",");
    statusArr = statusArr.map((status) => +status);

    switch (status) {
        case statusArr[0]: // status = 200
            response = {
                action: action,
                status: status,
                message: message,
                data: data,
                error: false,
            };
            break;
        case statusArr[1]: // status = 500
            response = {
                action: action,
                status: status,
                message: message ? message : "Something went wrong",
                data: data,
                error: true,
            };
            break;
        case statusArr[2]: // status = 400
            response = {
                action: action,
                status: status,
                message: message ? message : "Missing params",
                data: data,
                error: true,
            };
            break;
        default:
            response = {
                action: action,
                status: status,
                message: message,
                data: data,
                error: true,
            };
    }
    return response;
};
exports.sendResponse = sendResponse;