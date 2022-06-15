const Todo = require("../models/todo");

const { sendResponse } = require("../helpers/common")

const addTodo = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.title || !data.description) {
        return cb(sendResponse(400, null, "addTodo", null));
    }
    let insertTodo = data
    insertTodo.userId = data.authUser.id
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

const getTodo = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let findTodo = {
        userId: data.authUser.id,
        isDelete: false,
    }
    Todo.find(findTodo, (err, result) => {
        if (err) {
            return cb(sendResponse(500, null, "getTodo", null));
        }
        // console.log('-----ß-------------------------------------------------', result);
        return cb(null, sendResponse(200, "Todo found", "getTodo", result))
    })
}
exports.getTodo = getTodo;



const markTodoAsComplete = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.todoId) {
        return cb(sendResponse(400, "Provide todo id", "markTodoAsComplete", null));
    }
    let findTodo = {
        _id: data.todoId,
        isDelete: false,
    }
    let updateTodo = {
        isCompleted: true,
    }
    Todo.findOneAndUpdate(findTodo, updateTodo, (err, result) => {
        if (err) {
            return cb(sendResponse(500, null, "markTodoAsComplete", null));
        }
        // console.log('-----ß-------------------------------------------------', result);
        return cb(null, sendResponse(200, "Todo marked completed.", "markTodoAsComplete", null))
    })
}
exports.markTodoAsComplete = markTodoAsComplete;