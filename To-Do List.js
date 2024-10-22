let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load tasks from localStorage

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskContent = taskInput.value.trim();

    if (taskContent === "") return; // Don't allow empty tasks

    const task = {
        id: Date.now(), // Use timestamp as a unique ID
        content: taskContent,
        completed: false // Initialize as not completed
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
    taskInput.value = ''; // Clear input field
    renderTasks(); // Re-render the task list
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.content;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id); // Remove task by ID
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
            renderTasks(); // Re-render tasks
        };

        taskItem.appendChild(checkbox);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

// Initial call to render tasks from localStorage
renderTasks();