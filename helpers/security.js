const jwt = require('jsonwebtoken');


/**
 * It takes in a data object, a key, and a callback function. It then uses the jsonwebtoken library to
 * encrypt the data object using the key and the callback function
 * @param data - The data to be encrypted.
 * @param key - The secret key used to sign the token.
 * @param cb - The callback function that will be called when the encryption is complete.
 */
const encryptData = function(data, key, cb) {
    try {
        const signOptions = {
            issuer: "Authorization",
            subject: "iam@user.me",
            audience: "TUTORBIN",
            expiresIn: "365d", // 365 days validity
            algorithm: "HS256"
        };
        if (data.mobiApp) {
            signOptions.expiresIn = "365d"
        }
        let encryptedData = jwt.sign(data, process.env.PASS_SALT_STATIC, signOptions);
        // console.log("encryptedData", encryptedData)

        cb(null, encryptedData);
    } catch (e) {
        cb(e);
    }

}
exports.encryptData = encryptData;


/**
 * It takes in an encrypted string, a key, and a callback function. It then tries to decrypt the
 * encrypted string using the key and the callback function. If it succeeds, it returns the decrypted
 * string. If it fails, it returns an error
 * @param encryptedData - The encrypted data that you want to decrypt.
 * @param key - The key used to encrypt the data.
 * @param cb - callback function
 */
const decryptData = function(encryptedData, key, cb) {
    try {
        const verifyOptions = {
            issuer: "Authorization",
            subject: "iam@user.me",
            audience: "TUTORBIN",
            expiresIn: "365d", // 365 days validity
            algorithm: "HS256"
        };
        let decryptedData = jwt.verify(encryptedData, process.env.PASS_SALT_STATIC, verifyOptions);
        // console.log("decryptedData", decryptedData)
        cb(null, decryptedData);
    } catch (e) {
        cb(e);
    }
}
exports.decryptData = decryptData;