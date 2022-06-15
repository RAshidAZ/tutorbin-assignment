const async = require('async');
const { sendResponse }  = require("../helpers/common")
const { comparePassword, encryptData } = require("../helpers/security")

const Users = require("../models/user")

const userLogin = function (data, response, cb){
    if(!cb){
        cb = response;
    }
    if (!data.email || !data.password) {
        return cb(sendResponse(400, null, "userLogin", null));
    }

    let waterfallFunction = [];

    waterfallFunction.push(async.apply(getUserData, data));
    waterfallFunction.push(async.apply(verifyPassword, data));
    waterfallFunction.push(async.apply(encryptUserData, data));
    async.waterfall(waterfallFunction, cb);
}
exports.userLogin = userLogin

/**
 * It takes in a data object, a response object, and a callback function. If the callback function is
 * not passed in, it sets the callback function to the response object.
 * Use to verify the user information.
 * @param data - The data object that is passed to the function.
 * @param response - The response object from the route
 * @param cb - callback function
 */
const getUserData = function (data, response, cb){
    if(!cb){
        cb = response;
    }

    let findUser = {
        email: data.email
    }

    Users.findOne(findUser, (err, user)=>{
        if (err) {
            console.log('----Error in fetching user: ' + err)
            return cb(sendResponse(500, null, "getUserData", null));
        }
        if(!user){
            return cb(sendResponse(400, "User not found", "getUserData", null));
        }
        if(user.isBlocked){
            return cb(sendResponse(400, "User is blocked", "getUserData", null))
        }
        data.userDetails = user;
        data.hash = user.password;
        data.salt = user.salt;
        return cb(null, sendResponse(200, "User found", "getUserData", null))
    })

}

/**
 * This function takes in a password, a hash, and a salt, and returns a callback with an error if the
 * password is incorrect, or a callback with a success message if the password is correct
 * @param data - This is the data object that contains the password, hash, and salt.
 * @param response - This is the response object from the express server.
 * @param cb - callback function
 */
const verifyPassword = function (data, response, cb){
    if(!cb){
        cb = response;
    }
    comparePassword(data.password, data.hash, data.salt, (err, isMatch)=>{
        if(err){
            return cb(sendResponse(500, null, "verifyPassword", null));
        }
        console.log("verifyPassword", isMatch, err)
        if(!isMatch){
            return cb(sendResponse(400, "Password is incorrect", "verifyPassword", null));
        }
        return cb(null, sendResponse(200, "Password is correct", "verifyPassword", null));
    });
}


const encryptUserData = function (data, response, cb){
    if(!cb){
        cb = response;
    }
    let payload = {
        email: data.userDetails.email,
        name: data.userDetails.name,
        role: data.userDetails.role,
        id: data.userDetails._id,
    }
    encryptData(payload, data.salt, (err, encryptedData)=>{
        if(err){
            return cb(sendResponse(500, null, "encryptUserData", null));
        }
        let sendRes = {
            token: encryptedData,
            user: payload
        }
        return cb(null, sendResponse(200, "User logged in successfully!", "encryptUserData", sendRes));
    })
}