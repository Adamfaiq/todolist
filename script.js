// Phase 1
// SELECT ELEMENTS
const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const clearBtn = document.querySelector("#clearBtn");
const taskCount = document.querySelector("#taskCount");

// ARRAY to store todos
let todos = [];

// Phase 2
// FUNCTION: Add new task
function addTask() {
  // Get input value
  const taskText = todoInput.value.trim();

  // CHECK: Empty input?
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // CREATE task object
  const task = {
    id: Date.now(), // Unique ID
    text: taskText,
    completed: false,
  };

  // ADD to array
  todos.push(task);

  // CLEAR input
  todoInput.value = "";

  // UPDATE display
  renderTasks();
}

// EVENT: Click add button
addBtn.addEventListener("click", addTask);

// EVENT: Press Enter key
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Phase 3
// FUNCTION: Display all tasks
function renderTasks() {
  // CLEAR list first
  todoList.innerHTML = "";

  // CHECK: Empty list?
  if (todos.length === 0) {
    todoList.innerHTML =
      '<li class="empty-state">No tasks yet. Add one above! 👆</li>';
    updateTaskCount();
    return;
  }

  // LOOP through todos
  todos.forEach(function (task) {
    // CREATE list item
    const li = document.createElement("li");
    li.className = "todo-item";

    // If completed, add class
    if (task.completed) {
      li.classList.add("completed");
    }

    // BUILD HTML structure
    li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span class="todo-text">${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

    // ADD to list
    todoList.appendChild(li);

    // EVENT: Toggle complete
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", function () {
      toggleComplete(task.id);
    });

    // EVENT: Delete task
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });
  });

  // UPDATE count
  updateTaskCount();
}

// Phase 4
// FUNCTION: Toggle task complete/incomplete
function toggleComplete(id) {
  // FIND task in array
  const task = todos.find(function (t) {
    return t.id === id;
  });

  // TOGGLE completed status
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Phase 5
// FUNCTION: Delete task
function deleteTask(id) {
  // FILTER out task with matching ID
  todos = todos.filter(function (task) {
    return task.id !== id;
  });

  // RE-RENDER
  renderTasks();
}

// Phase 6
// FUNCTION: Clear all tasks
function clearAll() {
  if (todos.length === 0) {
    return;
  }

  // CONFIRM before clearing
  if (confirm("Delete all tasks?")) {
    todos = [];
    renderTasks();
  }
}

// EVENT: Clear all button
clearBtn.addEventListener("click", clearAll);

// FUNCTION: Update task count
function updateTaskCount() {
  const count = todos.length;
  taskCount.textContent = `${count} task${count !== 1 ? "s" : ""}`;
}
