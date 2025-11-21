const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center bg-blue-50 rounded-md px-4 py-3 shadow";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.className = "mr-4 w-5 h-5 accent-blue-600 cursor-pointer";

    checkbox.addEventListener("change", () => {
      if (!checkbox.checked) {
        deleteTask(index);
      }
    });

    const span = document.createElement("span");
    span.textContent = task;
    span.className = "select-none text-blue-900";

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
  });
}

function fetchTasks() {
  fetch("http://localhost:8080/tasks")
    .then(res => res.json())
    .then(data => renderTasks(data))
    .catch(err => console.error("Failed to fetch tasks:", err));
}

function addTask() {
  const task = taskInput.value.trim();
  if (!task) return;

  fetch("http://localhost:8080/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  })
    .then(res => {
      if (res.ok) {
        taskInput.value = "";
        fetchTasks();
      } else {
        console.error("Failed to add task");
      }
    })
    .catch(err => console.error(err));
}

function deleteTask(index) {
  fetch(`http://localhost:8080/tasks/${index}`, { method: "DELETE" })
    .then(res => {
      if (res.ok) {
        fetchTasks();
      } else {
        console.error("Failed to delete task");
      }
    })
    .catch(err => console.error(err));
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});

fetchTasks();
