const express = require('express');
const router = express.Router();


/* Controllers */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
const auth = require('../controllers/auth');


/* POST user logins. */
router.post('/v1/user/login', function(req, res, next) {
    let data = req.body;
    // data.req = req.data;
console.log(data);
    auth.userLogin(data, function(err, response) {
        let status = 0;
        if (err) {
            console.log(err);
            status = err.status;
            return res.status(status).send(err);
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

module.exports = router;