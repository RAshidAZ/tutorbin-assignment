const { decryptData } = require("../helpers/security");
module.exports = function(req, res, next){
    let token;
    let authorized = false;
    try {
        if(req.headers['x-access-token'] || req.headers['authorization']){
            token = req.headers['x-access-token'] || req.headers['authorization'];
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            // console.log('token: ' + token);
            decryptData(token, "", (err, data)=>{
                // console.log('decrypt data: ' + err, data);
                if (err) {
                    // console.log("Decryption Error: " + err);
                    return res.status(403).send({
                        success: false,
                        message: 'Unable to encrypt token!'
                    });
                }
                console.log('Token encrypted successfully');
                req.authUser = {};
                req.authUser.id = data.id;
                req.authUser.email = data.email;
                req.authUser.role = data.role;
                req.authUser.name = data.name;
                authorized = true;
                return next();
            });
        }
        if(!authorized){
            return res.status(401).send({
                success: false,
                message: 'Not Authorized'
            });
        }
    } catch (error) {
        // console.log("error", error);
    }
}