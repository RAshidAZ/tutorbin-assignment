const jwt = require('jsonwebtoken');


/**
 * It takes in a data object, a key, and a callback function. It then uses the jsonwebtoken library to
 * encrypt the data object using the key and the callback function
 * @param data - The data to be encrypted.
 * @param key - The secret key used to sign the token.
 * @param cb - The callback function that will be called when the encryption is complete.
 */
const encryptData = function (data, key, cb) {
    const signOptions = {
        issuer: "Authorization",
        subject: "iam@user.me",
        audience: "TUTORBIN",
        expiresIn: "365d", // 365 days validity
        algorithm: "HS256"
    };
    try {
        let encryptedData = jwt.sign(data, process.env.PASS_SALT_STATIC, signOptions);
        // console.log("encryptedData--------------------------------:", encryptedData)
        return cb(null, encryptedData);
    } catch (e) {
        console.log("-------error in encryption----", e)
        return cb(e);
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
const decryptData = function (encryptedData, key, cb) {
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
        return cb(null, decryptedData);
    } catch (e) {
        return cb(e);
    }
}
exports.decryptData = decryptData;


/**
 * It takes the plaintext password, the hash, and the salt, and then it uses the crypto library to hash
 * the plaintext password with the salt, and then it compares the result to the hash
 * @param plaintextInput - The password that the user entered
 * @param hash - The hash that was stored in the database
 * @param salt - The salt that was used to hash the password
 * @param cb - callback function
 * @returns A boolean value
 */
const comparePassword = function (plaintextInput, hash, salt, cb) {
    console.log(plaintextInput, hash, salt)
    const crypto = require('crypto');
    const userSalt = Buffer.from(salt, 'base64')
    const hashResult = crypto.pbkdf2Sync(plaintextInput, userSalt, 10000, 64, 'sha1').toString('base64')
    console.log("🚀 ~ file: security.js ~ line 76 ~ comparePassword ~ hashResult", hashResult)
    if (hashResult === hash) {
        return cb(null, true)
    } else {
        return cb(null, false)
    }
};
exports.comparePassword = comparePassword;