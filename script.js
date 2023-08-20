const tasksUl = document.getElementById("tasks");
const add = document.getElementById("add");
const taskinput = document.getElementById("task-input");

let tasksObj = JSON.parse(localStorage.getItem("Tasks"));
if (tasksObj === null) {
  tasksObj = { tasks: [] };
}

let tasks = tasksObj.tasks;

const updateLocalstorage = (tasks) => {
  tasksObj.tasks = tasks;
  localStorage.setItem("Tasks", JSON.stringify(tasksObj));
};

const addItem = (task, i) => {
  let isChecked = task.isCompleted ? "checked" : "unchecked";
  let li = document.createElement("li");

  let spanischecked = document.createElement("span");
  spanischecked.classList.add("radio");
  spanischecked.classList.add(isChecked);
  li.appendChild(spanischecked);

  let spantext = document.createElement("span");
  spantext.classList.add("tasktext");
  spantext.innerHTML = task.Title;
  li.appendChild(spantext);

  if (task.isCompleted) {
    spantext.classList.add("text-checked");
  }

  let imgremove = document.createElement("img");
  imgremove.classList.add("remove");
  imgremove.src = "cross.png";
  imgremove.classList.add = "remove";
  li.appendChild(imgremove);

  spanischecked.addEventListener("click", (e) => {
    tasks[i].isCompleted = !tasks[i].isCompleted;
    e.target.classList.toggle("checked");
    e.target.classList.toggle("unchecked");
    spantext.classList.toggle("text-checked");
    updateLocalstorage(tasks);
  });

  imgremove.addEventListener("click", (e) => {
    li.remove();
    tasks.splice(i, 1);
    updateLocalstorage(tasks);
  });

  tasksUl.appendChild(li);
};

const addTask = () => {
  if (taskinput.value === "") {
    alert("Empty task can not be added");
  } else {
    let task = { Title: taskinput.value, isCompleted: false };
    let i = tasks.push(task);
    updateLocalstorage(tasks);
    addItem(task, i - 1);
    taskinput.value = "";
  }
};
for (let i = 0; i < tasks.length; i++) {
  addItem(tasks[i], i);
}

taskinput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

add.addEventListener("click", (e) => {
  addTask();
});
