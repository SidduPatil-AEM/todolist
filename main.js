var itemInput=document.getElementById('todoitem');
var list = document.getElementById('todo-items');
var msgContainer=document.getElementById('alertMessage');
var todoObjects = new Array();

var addToDo = function(event) {
    event.preventDefault();
    var todo = {
        text: itemInput.value,
        status:'incomplete',
        id : generateId()
    }
    
    todoObjects.push(todo);

    localStorage.setItem('todoList',JSON.stringify(todoObjects));

    var itemAction = "<a href='#'><span class='glyphicon glyphicon-remove'></span></a>";
    var item=document.createElement('li');
    var todoText = '<p>'+todo.text+'</p>';
    var listLength = list.children.length;


    item.id = 'todo_id_'+(listLength+1);
    item.classList.add("list-group-item");
    item.setAttribute('data-id-count',item.id);
    item.setAttribute('data-id',todo.id);
    item.innerHTML = todoText + itemAction;
    list.appendChild(item);
    
    msgContainer.innerText=`Total Count ${todoObjects.length}`;

}

var loadToDoFromStorage = function(){
    if(localStorage.getItem('todoList') != null){
        todoObjects=JSON.parse(localStorage.getItem('todoList'));
        loadToDom(todoObjects);
    }else{
        msgContainer.innerText='Todo List is empty';
    }
}

var loadToDom = function(todoObjects){

    for (let index = 0; index < todoObjects.length; index++) {
        var item=document.createElement('li');
        var listLength = list.children.length;
        var itemAction = "<a href='#' class='removeItem'><span class='glyphicon glyphicon-remove'></span></a>";
        var todoText = '<p>'+todoObjects[index].text+'</p>';
        item.innerHTML=todoText + itemAction;
        item.id = 'todo_id_'+(listLength+1);
        item.classList.add("list-group-item");
        item.setAttribute('data-status',todoObjects[index].id);
        item.setAttribute('data-id-count',item.id);
        item.setAttribute('data-id',todoObjects[index].id);
        list.appendChild(item);
    }

    var msgContainer=document.getElementById('alertMessage');
    msgContainer.innerText=`Total Count ${todoObjects.length} `;
      
}

var generateId = function() {
    var charSet = 'abcdefijklmnopqrstuvwxyz0123456789';
    var charSetStize = charSet.length;
    var charCount = 8;
    var id = '';
    for (let i = 0; i < charCount; i++) {
        var randPos=Math.floor(Math.random()*charSetStize);
        id += charSet[randPos];
    }
    return id;
}

var removeTodos = function(){
    localStorage.removeItem('todoList');
    msgContainer.innerText=`Todo list empty!!`;
    list.innerHTML = '';
}

var removeItem = function(event){
    console.log(event);
}

document.getElementById('btn-submit').addEventListener('click', addToDo ,false); 

document.getElementById('removeTodos').addEventListener('click', removeTodos ,false); 

var removeTodosContainer=document.getElementById('.removeTodos');

if( removeTodosContainer != null ){
    removeTodosContainer.addEventListener('click', removeTodos ,false); 
}

var removeItems = function(event){
    var anchor=event.target.closest('a');

    var toDo=event.target.closest('li');
    var toDoId=toDo.getAttribute('data-id');

    //1.remove li from dom
    list.removeChild(toDo);

    //2.remove the todo Object with matching id from todoObjects

    for (let index = 0; index < todoObjects.length; index++) {

        if(toDoId == todoObjects[index].id){
            todoObjects.splice(index,1);
        }
        
    }
    // set todoObjects in local storage
    localStorage.setItem('todoList',JSON.stringify(todoObjects));

    //loadToDom(todoObjects);
}

list.addEventListener('click', removeItems ,false);


window.onload = function(){
    this.loadToDoFromStorage(); 
}
