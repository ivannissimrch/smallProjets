//store textInput element on userInput and set focus on userInput
const userInput = document.getElementById("user-input");
userInput.focus();
//add event lister to create todo button
const addToDo = document.getElementById("add-button");
addToDo.addEventListener("click", createToDoItem);
//should i add event listeners for remainding buttons here instead of inside function createToDoItem

// main buttons function  to add  todo item
function createToDoItem(event) {
  event.preventDefault();
  const userText = document.getElementById("user-input");

  //item container create and append
  const newToDoItem = document.createElement("div");
  newToDoItem.classList.add("item-container");
  const toDoList = document.getElementById("to-do-list");
  toDoList.appendChild(newToDoItem);

  //item label create and append
  const labelItem = document.createElement("input");
  labelItem.classList.add("item-task");
  labelItem.readOnly = true;
  newToDoItem.appendChild(labelItem);
  labelItem.value = userText.value;
  //reset user input after click
  userText.value = "";
  userText.focus();

  //item buttons container
  const btnsContainer = document.createElement("div");
  //wy did i put this class items-btn-container?
  btnsContainer.classList.add("items-btn-container");
  newToDoItem.appendChild(btnsContainer);

  //item buttons
  //delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("item-btn", "delete-btn");
  deleteButton.innerHTML = "del";
  btnsContainer.appendChild(deleteButton);

  //mark completed button
  const completeButton = document.createElement("button");
  completeButton.classList.add("item-btn", "mark-complete-btn");
  completeButton.innerHTML = "completed";
  btnsContainer.appendChild(completeButton);

  //edit button
  const editButton = document.createElement("button");
  editButton.classList.add("item-btn", "edit-btn");
  editButton.innerHTML = "edit";
  btnsContainer.appendChild(editButton);

  deleteContainer();
  markCompletFn();
  editToDo();
  hideCompleted();
  showAll();
}
//main buttons function hide all completed items
function hideCompleted() {
  const hideCompletedBtn = document.getElementById("hide-complete-button");
  hideCompletedBtn.addEventListener("click", (event) => {
    event.preventDefault();
    //getting all elements with class completed
    const completedElements = document.getElementsByClassName("completed");
    const toDoContainer = document.getElementsByClassName(
      "container-completed"
    );
    for (let i = 0; i < completedElements.length; i++) {
      //hide whole container not just label
      toDoContainer[i].classList.add("hide");
    }
  });
}

//main buttons function show all items completed and incompleted
function showAll() {
  const hideCompletedBtn = document.getElementById("non-complete-button");
  hideCompletedBtn.addEventListener("click", (event) => {
    event.preventDefault();
    //getting all elements with class completed
    const completedElements = document.getElementsByClassName("completed");
    const toDoContainer = document.getElementsByClassName(
      "container-completed"
    );
    for (let i = 0; i < completedElements.length; i++) {
      //hide whole container not just label
      toDoContainer[i].classList.remove("hide");
    }
  });
}

//function inside list item container to mark item completed
function markCompletFn() {
  const btn = document.getElementsByClassName("mark-complete-btn");
  const toDo = document.getElementsByClassName("item-task");
  const toDoCont = document.getElementsByClassName("item-container");
  for (let i = 0; i < btn.length; i++)
    btn[i].addEventListener("click", (event) => {
      event.preventDefault();
      toDo[i].classList.add("completed");
      toDoCont[i].classList.add("container-completed");
    });
}

//function inside list item container not really deleting but hidding
function deleteContainer() {
  const btn = document.getElementsByClassName("delete-btn");
  const container = document.getElementsByClassName("item-container");
  for (let i = 0; i < btn.length; i++)
    btn[i].addEventListener("click", (event) => {
      event.preventDefault();
      container[i].classList.add("delete");
    });
}

function editToDo() {
  const button = document.getElementsByClassName("edit-btn");
  const task = document.getElementsByClassName("item-task");
  for (let i = 0; i < button.length; i++)
    button[i].addEventListener("click", (event) => {
      event.preventDefault();
      task[i].readOnly = false;
      task[i].focus();
      //if user press enter key or 10 pass make label not editable
      task[i].addEventListener('keydown', (event) => {
        if(event.keyCode === 13)
        {
          task[i].readOnly = true;
        }
      })     
      setInterval(() => (task[i].readOnly = true), 10000);
    });
}
