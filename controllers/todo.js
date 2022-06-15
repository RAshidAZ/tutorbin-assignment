const Todo = require("../models/todo");

const { sendResponse } = require("../helpers/common")

const addTodo = function (data, response, cb){
    if(!cb){
        cb = response;
    }
    if (!data.title || !data.description) {
        return cb(sendResponse(400, null, "addTodo", null));
    }
    let insertTodo = data
    insertTodo.userId = data.req.user.id
    Todo.create(insertTodo, (err, result) => {
        if (err) {
            console.log('----Error in adding todo: ' + err)
            return cb(sendResponse(500, null, "addTodo", null));
        }
        console.log('------------------------------------------------------', result);
        return cb(null, sendResponse(200, "Todo added", "addTodo", null))
    })
}
exports.addTodo = addTodo;