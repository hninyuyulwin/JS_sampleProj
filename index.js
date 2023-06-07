let userTaskInp = document.querySelector(".task-input input");

let filters = document.querySelectorAll(".filter-div span");

let todosList = document.querySelector(".todos-list");

// Data from local storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

let editTaskId;
let isEditTask = false;

let clearBtn = document.querySelector(".clear-btn");

clearBtn.addEventListener("click",()=>{
  todos.splice(0,todos.length);
  localStorage.setItem("todo-list",JSON.stringify(todos));
  showTodos("all");
});

// filter task
filters.forEach(span => {
  span.addEventListener("click",()=>{
    document.querySelector("span.active").classList.remove("active");
    span.classList.add("active");
    showTodos(span.id);
  });
})

// update status local storage and ui
function statusUpdate(item){
  let task = item.parentElement.lastElementChild;
  if(item.checked){
    task.classList.add("active");
    todos[item.id].status = "complete";
  }else{
    task.classList.remove("active");
    todos[item.id].status = "pending";
  }
  localStorage.setItem("todo-list",JSON.stringify(todos));
}

// to show todo task from localstorage
function showTodos(filterStatus){
  var li = "";
  if (todos) {
    todos.forEach((tasks,id) => {
      let completeStatus = tasks.status == "complete" ? "active" : "";
      let completeCheck = tasks.status == "complete" ? "checked" : "";
      // console.log(tasks,id);
      if(filterStatus == tasks.status || filterStatus == "all"){
        li += `
          <li class="todo-items">
            <label for="${id}">
              <input type="checkbox" ${completeCheck} id="${id}" onclick="statusUpdate(this)">
              <p class="todo-txt ${completeStatus}">${tasks.task}</p>
            </label>
            <div> 
              <i class="fa-solid fa-pen-to-square edit-ic" onclick="updateTask(${id},'${tasks.task}')"></i>
              <i class="fa-solid fa-trash delete-ic" onclick="deleteTask(${id},'${tasks.status}')"></i>
            </div>
          </li>
        `;
      }
    });
  }
  todosList.innerHTML = li || `<p class="no-tasks">Empty Task</p>`;
}
showTodos("all");

function updateTask(id,oldTask){
  // console.log(id,oldTask);
  isEditTask = true;
  editTaskId = id;
  userTaskInp.value = oldTask;
}

// delete Task
function deleteTask(id,status){
  todos.splice(id,1);
  localStorage.setItem("todo-list",JSON.stringify(todos));
  showTodos(status);
}

userTaskInp.addEventListener("keyup",(e)=>{
  let userInput = userTaskInp.value.trim();
  if(e.key == "Enter" && userInput){
    if(isEditTask){
      todos[editTaskId].task = userInput;
      editTaskId = "";
      isEditTask = false;
    }else{
      if(!todos){
        todos = [];
      } 
      let userTasks = {task:userInput,status : "pending"};
      todos.push(userTasks);
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
    userTaskInp.value = "";   
    showTodos("all");
  }
});