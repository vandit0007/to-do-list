function addTask() {
  let input = document.getElementById('taskInput');
  let task = input.value.trim();
  if (task !== '') {
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    li.textContent = task;
    ul.appendChild(li);
    input.value = '';
  }
}
