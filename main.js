var input = document.querySelector(".input-list");
const clearAll = document.getElementById("clear-all-btn");
var tasks;

(getValueFromLocalStorage("tasks") != null) ? tasks = getValueFromLocalStorage("tasks") : tasks = [];

renderTask();

function renderTask() {
  let content = "";
  
    tasks.forEach(function (a, index) {
      content += `<div id="${index}" class="to-do-list-content-item">
                        ${
                          a.isDone == true
                            ? `<input type="checkbox" id="check-${index}" class="item-check-box" >`
                            : `<input type="checkbox" id="check-${index}" class="item-check-box" checked>`
                        }
                        <label onclick="setState(${index})" for="check-${index}" title="${
        a.text
      }" class="content-text">${a.text}</label>
                        <i onclick="editTasks(${index})" class="ti-pencil"></i>
                        <i onclick="deleteTasks(${index})" class="ti-eraser"></i>
                    </div>`;
      a.id = index;
    });

    document.querySelector(".to-do-list-content-list").innerHTML = content;
}

input.onkeypress = function (e) {
  let inputObj = {};
  let edit = input.getAttribute("id");
  //catch the enterkey press event
  if (e.key === "Enter") {
    if (e.target.value === "") {
      alert("Please enter the task!");
      return;
    }

    if (edit == 0 || edit) {
      tasks[edit].text = input.value;
      renderTask();
      input.removeAttribute("id");
      input.value = "";
      updateToLocalStorage(tasks);
    } else {
      inputObj.text = e.target.value;
      inputObj.isDone = true;
      tasks.push(inputObj);
      renderTask();
      input.value = "";
      updateToLocalStorage(tasks);
    }
  }
};

function deleteTasks(id) {
  if (confirm("Are you sure want to delete this task?")) {
    tasks.splice(id, 1);
    renderTask();
    updateToLocalStorage(tasks);
  }
}

function setState(id) {
  //set value to the isDone key in an object by the checkbox state
  let state = document.getElementById(`check-${id}`).checked;
  tasks[id].isDone = state;
  updateToLocalStorage(tasks);
  console.log(state);
}

function editTasks(id) {
  if (tasks.length > 0) {
    input.value = tasks[id].text;
    input.focus();
    input.setAttribute("id", id);
  }
}

clearAll.addEventListener("click", function () {
  if (
    tasks.length > 0 &&
    confirm("Are you sure want to delete all of these tasks?")
  ) {
    tasks.splice(0, tasks.length);
    updateToLocalStorage(tasks);
    renderTask();
  } else if (tasks.length === 0) {
    alert("No task yet!!");
  } else {
    return;
  }
});

function updateToLocalStorage(value) {
  window.localStorage.setItem("tasks", JSON.stringify(value));
}

function getValueFromLocalStorage(value) {
  return JSON.parse(window.localStorage.getItem(value));
}
