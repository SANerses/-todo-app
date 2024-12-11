import {
  addTodo,
  getTodos,
  removeTodos,
  setTodoIsComplatade,
  setTodoIsImportand,
  addChangeListener,
} from "./logic.js";

const DOM_STATE = {
  newTextInput: '',
  addButton: '',
  todoListElement: '',
}

export function init() {
  DOM_STATE.newTextInput = document.getElementById('newText');
  DOM_STATE.addButton = document.getElementById('addbtn');
  DOM_STATE.todoListElement = document.getElementById('todo-list');
}

export function setupListeners() {
  DOM_STATE.newTextInput.addEventListener('keypress', event => {
    if (event.key === "Enter") {
      handleAddNewTodo();
    }
  });

  DOM_STATE.addButton.addEventListener('click', handleAddNewTodo);
  DOM_STATE.newTextInput.addEventListener('input', handleInputChange);

  addChangeListener(render);
}


export function render(listItems = getTodos()) {
  DOM_STATE.todoListElement.innerHTML = '';

  listItems.forEach((toDo, i) => {
    DOM_STATE.todoListElement.append(createTodoElement(toDo, i));
  });
}

function handleAddNewTodo() {
  const newVal = DOM_STATE.newTextInput.value;
  const listItems = getTodos();

  if (newVal.trim() && !listItems.some(({ text }) => text === newVal)) {
    addTodo(newVal);
    DOM_STATE.newTextInput.classList.remove('error');
    DOM_STATE.newTextInput.value = '';
  } else {
    DOM_STATE.newTextInput.classList.add('error');
  }
}

function handleInputChange(event) {
  const listItems = getTodos();

  if (listItems.some(({ text }) => text === (event.target.value))) {
    DOM_STATE.newTextInput.classList.add('error');
  } else {
    DOM_STATE.newTextInput.classList.remove('error');
  }
}

function createTodoElement(toDo, i) {
  const element = document.createElement('li');
  element.classList.add('listItem');
  element.innerHTML = toDo.text;

  const divBlock = document.createElement('div');
  divBlock.classList.add('show');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('iconContainer', 'deleteBtn');
  deleteButton.innerHTML = '<div class = "deleteButton trash-solid icon"></div>'

  const importantButton = document.createElement('button');
  importantButton.classList.add('iconContainer', 'importantBtn');
  importantButton.innerHTML = '<div class="importantButton paperclip icon"></div>'

  divBlock.appendChild(deleteButton);
  divBlock.appendChild(importantButton);
  element.appendChild(divBlock);

  if (toDo.isCompleted) {
    element.classList.add('fixedItem');
  }

  if (toDo.isImportand) {
    element.classList.add('important');
  }

  element.addEventListener('click', function (event) {
    event.stopPropagation();
    setTodoIsComplatade(i, !toDo.isCompleted);
  });

  deleteButton.addEventListener('click', function (event) {
    event.stopPropagation();
    element.remove();
    removeTodos(i);
  });

  importantButton.addEventListener('click', function (event) {
    event.stopPropagation();
    setTodoIsImportand(i, !toDo.isImportand);

  });

  return element;
}
