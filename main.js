const tags = {
	p: document.querySelector('.p'),
	input: document.querySelector('.input'),
	button: document.querySelector('.button'),
	tasks: document.querySelector('.tasks'),
	todo: document.querySelector('.todo'),
	inprocess: document.querySelector('.inprocess'),
	done: document.querySelector('.done')
}

tags.button.addEventListener('click', () => { button() });

tags.input.addEventListener('keydown', (e) => { if (e.key === 'Enter') button() });

let draggedTask = null;

function button() {
	if (tags.input.value == '') {
		alert('no tasks');
	} else {
		const taskLine = document.createElement('div');
		const task = document.createElement('p');

		taskLine.classList.add('taskline');
		taskLine.setAttribute('draggable', 'true');

		task.innerText = tags.input.value;
		taskLine.appendChild(task);
		tags.todo.appendChild(taskLine);
		tags.input.value = '';

		addDragEvents(taskLine);
	}
}

function addDragEvents(element) {
	element.addEventListener('dragstart', (e) => {
		draggedTask = element;
		e.dataTransfer.effectAllowed = 'move';
	});

	element.addEventListener('dragend', () => { draggedTask = null });
}

function enableDropZone(zone) {
	zone.addEventListener('dragover', (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	});

	zone.addEventListener('drop', () => { 
		if (draggedTask) zone.appendChild(draggedTask);
		zone.classList.remove('highlight'); 
	});	

	zone.addEventListener('dragenter', () => { zone.classList.add('highlight') });
	zone.addEventListener('dragleave', () => { zone.classList.remove('highlight') });
}

enableDropZone(tags.todo);
enableDropZone(tags.inprocess);
enableDropZone(tags.done);
