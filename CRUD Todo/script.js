let todos = [];

function addTodo() {

    let input = document.getElementById("todoInput");
    let todo = input.value.trim();

    if (todo === "") {
        alert("Please enter a todo");
        return;
    }

    todos.push(todo);
    input.value = "";
    displayTodos();
}

function displayTodos() {
    let list = document.getElementById("todoList");
    list.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = todos[i];
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";

        editButton.onclick = function () {
            editTodo(i);
        };

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function () {
            deleteTodo(i);
        };

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        list.appendChild(li);
    }
}


function editTodo(index) {

    let newTodo = prompt("Enter new todo:", todos[index]);
    if (newTodo === null) {
        return;
    }
    newTodo = newTodo.trim();

    if (newTodo === "") {
        alert("Todo cannot be empty");
        return;
    }
    todos[index] = newTodo;
    displayTodos();
}
function deleteTodo(index) {
    todos.splice(index, 1);
    displayTodos();
}