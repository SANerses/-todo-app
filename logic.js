import { Todo } from "./modules.js";
import {
    setInitialTodos,
    getInitialTodos,
} from "./storage.js";

let todoList = getInitialTodos();
let subscriptions = [];

function addTodoItem(item) {
    todoList = [...todoList, item];
}

function removeTodoItem(index) {
    todoList = [
        ...todoList.slice(0, index),
        ...todoList.slice(index + 1),
    ];
}

function updateTodoItem(index, updatedItem) {
    if (index < 0 || index >= todoList.length) {
        console.error("Invalid index:", index);
        return;
    }

    todoList = todoList.map((item, i) =>
        i === index ? { ...item, ...updatedItem } : item
    );
}

function updateStorage() {
    setInitialTodos(todoList);
}

export function addTodo(text) {
    addTodoItem(new Todo(text));
    triggerChange();
}

export function removeTodos(index) {
    removeTodoItem(index);
    triggerChange();
}

export function setTodoIsComplatade(index, isCompleted) {
    updateTodoItem(index, { ...todoList[index], isCompleted });
    triggerChange();
}

export function setTodoIsImportand(index, isImportand) {
    if (todoList[index].isCompleted) {
        return;
    }

    updateTodoItem(index, { ...todoList[index], isImportand });
    triggerChange();
}

export function getTodos() {
    return todoList;
}

function triggerChange() {
    subscriptions.forEach(cb => cb(todoList));
    updateStorage();
}

export function addChangeListener(cb) {
    subscriptions = [...subscriptions, cb];

    return () => {
        subscriptions = subscriptions.filter(item => item !== cb);
    }
}
