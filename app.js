//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event Listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions

function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    
    //TODO div

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to Local storage
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    //Append to List
    todoList.appendChild(todoDiv);
    //Clear TODO input value
    todoInput.value = '';
}

function deleteCheck(e){
    // console.log(e.target);
    const item = e.target;
    // console.log(item.parentElement);
    //Delete Todo
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        //For animation
        // todo.classList.add('fall');
        // todo.addEventListener('transitionend',function() {
        //     todo.remove();
        // });
        todo.remove();
    }

    //Check Mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
        }
    });
}

function saveLocalTodos(todo){
    //Check do i have already todos

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        localStorage.setItem('todos',todoInput.value);
    }
    // todos.push(todo);
    
    localStorage.setItem('todos',JSON.stringify(todo));
}