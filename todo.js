const form = document.querySelector('#todo-list');
const myTodoList = document.querySelector('.results');

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = savedTodos[i].task;
  newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newTodo.isCompleted) {
    newTodo.style.textDecoration = "line-through";
  }
  myTodoList.appendChild(newTodo);
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let newTodo = document.createElement("li");
  let todoInput = document.querySelector(".newtodo").value;
  newTodo.innerText = todoInput;
  newTodo.isCompleted = false;
  form.reset();
  myTodoList.appendChild(newTodo);

  // save to localStorage
  savedTodos.push({ task: newTodo.innerText, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});

myTodoList.addEventListener("click", function(event) {
  let clickedTask = event.target;

  if (!clickedTask.isCompleted) {
    clickedTask.style.textDecoration = "line-through";
    clickedTask.isCompleted = true;
  } else {
    clickedTask.style.textDecoration = "none";
    clickedTask.isCompleted = false;
  }

  for (let i = 0; i < savedTodos.length; i++) {
    if (savedTodos[i].task === clickedTask.innerText) {
      savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
      localStorage.setItem("todos", JSON.stringify(savedTodos));
    }
  }
});