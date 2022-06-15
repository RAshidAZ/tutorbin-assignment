const express = require('express');
const router = express.Router();


//  Middleware
const authenticator = require('../middlewares/authenticator')

/* Controllers */
const todo = require('../controllers/todo');

/* POST user logins. */
router.post('/v1/add', authenticator, function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    todo.addTodo(data, function (err, response) {
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