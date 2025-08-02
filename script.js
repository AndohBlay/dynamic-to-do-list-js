document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage on page load
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Save all current tasks to Local Storage
  function saveTasks() {
    const tasks = [];
    const items = taskList.querySelectorAll("li");
    items.forEach(li => {
      const text = li.firstChild.textContent.trim();
      tasks.push(text);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Updated addTask function with optional saving
  function addTask(taskText = taskInput.value.trim(), save = true) {
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.setAttribute("aria-label", "Remove task");

    removeBtn.onclick = function () {
      taskList.removeChild(li);
      saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = "";

    if (save) {
      saveTasks();
    }
  }

  addButton.addEventListener("click", () => {
    addTask();
  });

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  loadTasks();
});
