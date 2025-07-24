function createElementWithClass(tag, id) {
    const element = document.createElement(tag);
    element.classList.add(id);

    return element;
}

export function Tags () {
    const tags = {
	title: createElementWithClass('p', 'title'),
	input: createElementWithClass('input', 'input'),
	button: createElementWithClass('button', 'button'),
	tasks: createElementWithClass('div', 'tasks')
    }

    tags.title.innerText = 'to do list';
    return tags;
}