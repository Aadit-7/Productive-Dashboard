/* ===== Custom Mouse (But not used) ===== */
function customMouse() {
  let mouse = document.querySelector("main");

  mouse.addEventListener("mousemove", (e) => {
    mouse.style.setProperty("--x", e.clientX + "px");
    mouse.style.setProperty("--y", e.clientY + "px");
    console.log(e);
  });
}

/* ===== Card Feature Open/Close ===== */
function openCloseCardFeature() {
  let allElems = document.querySelectorAll(".elem");
  let allFullElem = document.querySelectorAll(".fullElems");
  let allFullElemBack = document.querySelectorAll(".back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      // console.log(elem);
      // console.log(allFullElem);

      allFullElem[elem.id].style.display = "block";
    });
  });

  allFullElemBack.forEach((back) => {
    //   console.log(back.id);
    back.addEventListener("click", () => {
      allFullElem[back.id].style.display = "none";
    });
  });
}
openCloseCardFeature();

/* ===== To Do list  ===== */
function toDoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("To Do List is empty");
  }
  function renderTask() {
    let allTasks = document.querySelector(".all-task");
    let sum = "";
    // console.log(allTasks);

    currentTask.forEach((elem, idx) => {
      // console.log(elem);
      sum += `<div class="task">
            <div class="text-content">
            <h5>${elem.title}<span class="${elem.imp}">*</span></h5>
            <button id="${idx}">Mark as done</button>
            </div>
              <div class="text-description">
              <p>${elem.description}</p>
              </div>

              </div>
              `;
    });

    // console.log(sum);
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

  let form = document.querySelector(".add-task form");
  let formInput = document.querySelector(".add-task form #task-input");
  let formTextarea = document.querySelector(".add-task form textarea");
  let formCheckbox = document.querySelector(".add-task form #check");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // console.log(formInput.value);
    // console.log(formTextarea.value);
    // console.log(formCheckbox.checked);

    currentTask.push({
      title: formInput.value,
      description: formTextarea.value,
      imp: formCheckbox.checked,
    });
    // console.log(currentTask);
    renderTask();

    formInput.value = "";
    formTextarea.value = "";
    formCheckbox.checked = false;
  });
}
toDoList();

/* ===== Daily planner  ===== */
function dailyPlanner() {
  let dayPlannerData = JSON.parse(localStorage.getItem("dayPlannerData")) || {};

  let hour = document.querySelector(".daily-planner");
  let hourSum = "";

  let dailyHours = Array.from({ length: 18 }, (elem, idx) => {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });

  dailyHours.forEach((elem, idx) => {
    let savedData = dayPlannerData[idx] || "";
    // console.log(dayPlannerData[idx]);

    hourSum += `<div class="daily-planner-hour">
            <p>${elem}</p>
            <input id=${idx} type="text"  value="${savedData}" placeholder="---" />
          </div>`;
  });
  hour.innerHTML = hourSum;

  let dialyPlannerInput = document.querySelectorAll(".daily-planner input");

  dialyPlannerInput.forEach((elem) => {
    elem.addEventListener("input", () => {
      // console.log(elem.id);
      console.log(dayPlannerData);
      dayPlannerData[elem.id] = elem.value;

      localStorage.setItem("dayPlannerData", JSON.stringify(dayPlannerData));
    });
  });
}
dailyPlanner();

/* ===== Motivational Quote ===== */
function motivationalQuote() {
  function getDate() {
  let day = document.querySelector(".motivational-fullpage .top p");
  let myDate = new Date();

  day.innerHTML = myDate.toDateString();
  // console.log(myDate.toDateString());
}
getDate();

  var motivationQuoteContent = document.querySelector(".bottom h2");
  var motivationAuthor = document.querySelector(".bottom p");

  async function fetchQuote() {
    // let response = await fetch("https://dummyjson.com/quotes/random");
    let response = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random"
    );
    let data = await response.json();

    motivationQuoteContent.innerHTML = `" ${data.quote} "`;
    motivationAuthor.innerHTML = `- ${data.author}`;
  }

  fetchQuote();
}
motivationalQuote();

