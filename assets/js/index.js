'use strict';

const ulElement = document.querySelector("ul[class='tasksContainer']");
const addButton = document.querySelector('input[type="button"]');
document.querySelector('input[placeholder="Please input your task"]').setCustomValidity("Input your task");

addButton.onclick = submit;
function submit() {
    //ulElement.appendChild(createTaskElement(document.querySelector('input[placeholder="Please input your task"]').value));
    createTaskElement(document.querySelector('input[placeholder="Please input your task"]').value);
}

function createTaskElement(task) {
    if( task === "" ) {
        //document.querySelector('input[placeholder="Please input your task"]').setAttribute("type","submit").click();
        //document.querySelector('input[placeholder="Please input your task"]').checkValidity();
        alert('Enter your task');
        return null;
    }
    const taskLiElement = document.createElement('li');
    const nTasks = document.getElementsByTagName("li").length;
    taskLiElement.appendChild(createInputCheckBox());
    taskLiElement.appendChild(createLabelTaskContent(nTasks));
    taskLiElement.appendChild(createRemoveElem());
    ulElement.appendChild(taskLiElement);
}

function createInputCheckBox(nTasks) {
        const inputEl = document.createElement('input');
        inputEl.setAttribute("type", "checkbox");
        inputEl.setAttribute("id", nTasks);
        return inputEl;
}

function createLabelTaskContent(nTasks) {
    const labelElem = document.createElement('label');
    labelElem.setAttribute('for', nTasks);
    labelElem.classList.add("taskContent");
    labelElem.appendChild(createTaskContent(nTasks));

    return labelElem;

}

function createTaskContent(nTasks) {
    const taskContentElem = document.createElement('div');
    taskContentElem.classList.add('task');
    taskContentElem.innerText = `#${nTasks} ${document.querySelector('input[placeholder="Please input your task"]').value}`;
    return taskContentElem;
}
function createRemoveElem() {
    const removElem = document.createElement("img");
    removElem.classList.add("removeTaskIMG");
    removElem.setAttribute("src", "./assets/icons/trash-can.png");
    removElem.addEventListener("click", removeTask);
    return removElem;
}

function removeTask() {
    this.parentElement.remove();
    renumberTasks();
}

function renumberTasks() {
    const tasks = document.getElementsByTagName('li');
    for( let i = 0 ; i < tasks.length; i++ )
    {
        tasks[i].querySelector('input[type="checkbox"]').setAttribute('id', i.toString());
        const label = tasks[i].querySelector('label[class="taskContent"]');
        label.setAttribute("for", i.toString());
        const task = label.querySelector("div[class='task']");
        task.innerText = `#${i} ${task.innerText.substring(task.innerText.indexOf(" ")+1)}`;
    }
}