const express = require('express');
const router = express.Router();


//  Middleware
const authenticator = require('../middlewares/authenticator')

/* Controllers */
const todo = require('../controllers/todo');

/* Add todo. */
router.post('/v1/add', authenticator, function (req, res, next) {
    let data = req.body;
    data.authUser = req.authUser;
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


/* Ged todo. */
router.get('/v1/all', authenticator, function (req, res, next) {
    let data = req.body;
    data.authUser = req.authUser;
    todo.getTodo(data, function (err, response) {
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


/* Mark todo as completed. */
router.patch('/v1/complete', authenticator, function (req, res, next) {
    let data = req.body;
    data.authUser = req.authUser;
    data.complete = true;
    todo.updateTodo(data, function (err, response) {
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


/* Delete todo. */
router.patch('/v1/delete', authenticator, function (req, res, next) {
    let data = req.body;
    data.authUser = req.authUser;
    data.delete = true;
    todo.updateTodo(data, function (err, response) {
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