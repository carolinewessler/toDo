import { Tags } from "./tags.js";

const tags = new Tags;
document.body.append(...Object.values(tags));

tags.button.addEventListener('click', () => {
	if (tags.input.value == ''){
		alert('no tasks')
	} else {
		const task = document.createElement('p');
		const checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		task.innerText = tags.input.value;

		tags.tasks.appendChild(task);
		tags.tasks.appendChild(checkbox);

		tags.input.value = '';
	}
})
