const toDoInput = document.getElementsByClassName('todo-input')[0];
const toDoButtonSave = document.getElementsByClassName('todo-save')[0];
const toDoList = document.getElementsByClassName('todo-list')[0];

// const self = this;
document.addEventListener('DOMContentLoaded', function(event){
    
    // localStorage.clear();

    self.retriveToDos();
    self.assignDelete();
    self. assignCheck();
});

toDoInput.addEventListener('keyup', function (event) {
    if(event.keyCode === 13) {
        toDoButtonSave.click();
    }
});


toDoButtonSave.onclick = function() {
    const toDo = toDoInput.value;
    
    if(toDo.length > 0) {
        createToDoObject(toDo);

        toDoInput.value = '';
    }
}

function createToDoObject (toDoText) {
    const toDoItem =
    `
    <div class="todo-item">
        <div class="todo">
            <input class="checkToDo" type="checkbox"><span>${toDoText}</span>
        </div>
        <button class="delete-todo" style="visibility: hidden">Deletar</button>
    </div>
    `

    toDoList.innerHTML = toDoList.innerHTML + toDoItem;

    saveToDo(toDoItem);
    assignDelete();
    assignCheck();
}

function saveToDo(toDoItem) {
    let currentToDos = localStorage.getItem('toDos');

    if (currentToDos === null) {
        currentToDos = '';
    }

    currentToDos += toDoItem;

    localStorage.setItem('toDos', currentToDos);
}

function retriveToDos() {
    let allToDos = localStorage.getItem('toDos')

    if (allToDos === null) {
        allToDos = '';
    }

    console.log(allToDos);
    toDoList.innerHTML += allToDos; 
}


function assignDelete () {
    const deleteButtons = document.getElementsByClassName('delete-todo');

    for (let index = 0; index < deleteButtons.length; index++) {
        const button = deleteButtons[index];
        
        button.onclick = () => {
            const toDo = button.parentElement;

            toDo.parentNode.removeChild(toDo);

            self.deleteFromDatabase();
        }
    }
}

function assignCheck() {
    const checks = document.getElementsByClassName('checkToDo');

    for (let index = 0; index < checks.length; index++) {
        const checkBox = checks[index];
       

        checkBox.onclick = () => {
            const deleButton = checkBox.parentElement.parentElement.lastElementChild;
            
            console.log(checkBox.checked);
            if (checkBox.checked) {
                deleButton.style.visibility = "visible";
            } else {
                deleButton.style.visibility = "hidden";
            }
        }
    }
}

function deleteFromDatabase() {
    localStorage.setItem('toDos', toDoList.innerHTML);
}




