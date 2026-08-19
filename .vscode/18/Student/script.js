const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos() {

    todoList.innerHTML = "";

    todos.forEach((todo) => {

        const li = document.createElement("li");
        li.className = "todo-item";

        const span = document.createElement("span");
        span.className = "todo-text";

        span.textContent = todo.text;

        if (todo.completed) {
            span.classList.add("completed");
        }

        const buttons = document.createElement("div");
        buttons.className = "buttons";

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = "✓";

        completeBtn.addEventListener("click", function () {
            toggleTodo(todo.id);
        });

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function () {
            editTodo(todo.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            deleteTodo(todo.id);
        });

        buttons.appendChild(completeBtn);
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttons);

        todoList.appendChild(li);
    });
}

function addTodo() {

    const text = todoInput.value.trim();

    if (text === "") {
        alert("Please enter a todo!");
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);

    saveTodos();

    todoInput.value = "";

    displayTodos();
}

function editTodo(id) {

    const todo = todos.find(function (todo) {
        return todo.id === id;
    });

    const newText = prompt("Edit your todo:", todo.text);

    if (newText === null) {
        return;
    }

    if (newText.trim() === "") {
        alert("Todo cannot be empty!");
        return;
    }

    todo.text = newText.trim();

    saveTodos();

    displayTodos();
}

function deleteTodo(id) {

    const confirmDelete = confirm("Are you sure you want to delete this todo?");

    if (!confirmDelete) {
        return;
    }

    todos = todos.filter(function (todo) {
        return todo.id !== id;
    });

    saveTodos();

    displayTodos();
}

function toggleTodo(id) {

    const todo = todos.find(function (todo) {
        return todo.id === id;
    });

    todo.completed = !todo.completed;

    saveTodos();

    displayTodos();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTodo();
    }

});

displayTodos();