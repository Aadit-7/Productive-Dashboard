/* ======================
   Mouse Effect
   ====================== */
function customMouse() {
  let mouse = document.querySelector("main");

  mouse.addEventListener("mousemove", (e) => {
    mouse.style.setProperty("--x", e.clientX + "px");
    mouse.style.setProperty("--y", e.clientY + "px");
    console.log(e);
  });
}

/* ======================
   Card Open / Close Feature
   ====================== */
function openCloseCardFeature() {
  let allElems = document.querySelectorAll(".elem");
  let allFullElem = document.querySelectorAll(".fullElems");
  let allFullElemBack = document.querySelectorAll(".back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      allFullElem[elem.id].style.display = "block";
    });
  });

  allFullElemBack.forEach((back) => {
    back.addEventListener("click", () => {
      allFullElem[back.id].style.display = "none";
    });
  });
}

openCloseCardFeature();

/* ======================
   Task Data (Local Storage)
   ====================== */
var currentTask = [];

if (localStorage.getItem("currentTask")) {
  currentTask = JSON.parse(localStorage.getItem("currentTask"));
} else {
  console.log("To Do List is empty");
}

/* ======================
   Render Tasks
   ====================== */
function renderTask() {
  let allTasks = document.querySelector(".all-task");
  let sum = "";

  currentTask.forEach((elem, idx) => {
    sum += `<div class="task">
              <h5>${elem.title}<span class="${elem.imp}">*</span></h5>
              <button id="${idx}">Mark as done</button>
            </div>`;
  });

  allTasks.innerHTML = sum;
  localStorage.setItem("currentTask", JSON.stringify(currentTask));

  document.querySelectorAll(".task button").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentTask.splice(btn.id, 1);
      renderTask();
    });
  });
}

renderTask();

/* ======================
   Form Elements
   ====================== */
let form = document.querySelector(".add-task form");
let formInput = document.querySelector(".add-task form #task-input");
let formTextarea = document.querySelector(".add-task form textarea");
let formCheckbox = document.querySelector(".add-task form #check");

/* ======================
   Form Submit Event
   ====================== */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  currentTask.push({
    title: formInput.value,
    description: formTextarea.value,
    imp: formCheckbox.checked,
  });

  formInput.value = "";
  formTextarea.value = "";
  formCheckbox.checked = false;
});
