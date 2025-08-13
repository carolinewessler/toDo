const API_URL = 'https://todo-dnh7.onrender.com'; // URL do seu backend no Render

const tags = {
  input: document.querySelector('.input'),
  button: document.querySelector('.button'),
  todo: document.querySelector('.todo'),
  inprocess: document.querySelector('.inprocess'),
  done: document.querySelector('.done')
};

let draggedTask = null;

// ------------------ Funções de Drag & Drop ------------------
function addDragEvents(element) {
  element.addEventListener('dragstart', (e) => {
    draggedTask = element;
    e.dataTransfer.effectAllowed = 'move';
  });

  element.addEventListener('dragend', () => {
    draggedTask = null;
  });
}

function enableDropZone(zone) {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  });

  zone.addEventListener('drop', async () => {
    if (draggedTask) {
      zone.appendChild(draggedTask);

      // Atualiza status no backend
      const id = draggedTask.dataset.id;
      let newStatus = 'todo';
      if (zone === tags.inprocess) newStatus = 'inprocess';
      else if (zone === tags.done) newStatus = 'done';

      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      zone.classList.remove('highlight');
    }
  });

  zone.addEventListener('dragenter', () => { zone.classList.add('highlight') });
  zone.addEventListener('dragleave', () => { zone.classList.remove('highlight') });
}

enableDropZone(tags.todo);
enableDropZone(tags.inprocess);
enableDropZone(tags.done);

// ------------------ Funções do Frontend ------------------
async function loadTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  const tasks = await response.json();

  tasks.forEach(t => {
    const taskLine = document.createElement('div');
    const task = document.createElement('p');
    taskLine.classList.add('taskline');
    taskLine.setAttribute('draggable', 'true');
    taskLine.dataset.id = t._id;

    task.innerText = t.titulo;

    if (t.status === 'todo') tags.todo.appendChild(taskLine);
    else if (t.status === 'inprocess') tags.inprocess.appendChild(taskLine);
    else tags.done.appendChild(taskLine);

    taskLine.appendChild(task);
    addDragEvents(taskLine);
  });
}

async function saveTask(titulo) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, status: 'todo' })
  });
  return await response.json();
}

async function button() {
  if (tags.input.value === '') return alert('no tasks');

  const newTask = await saveTask(tags.input.value);

  const taskLine = document.createElement('div');
  const task = document.createElement('p');
  taskLine.classList.add('taskline');
  taskLine.setAttribute('draggable', 'true');
  taskLine.dataset.id = newTask._id;

  task.innerText = newTask.titulo;
  taskLine.appendChild(task);
  tags.todo.appendChild(taskLine);
  tags.input.value = '';

  addDragEvents(taskLine);
}

// ------------------ Eventos de Botão e Enter ------------------
tags.button.addEventListener('click', () => { button() });
tags.input.addEventListener('keydown', (e) => { if (e.key === 'Enter') button() });

// ------------------ Carrega tarefas ao iniciar ------------------
loadTasks();
