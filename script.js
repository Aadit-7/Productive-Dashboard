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

    motivationQuoteContent.innerHTML = `" ${data.quote}"`;
    motivationAuthor.innerHTML = `- ${data.author}`;
  }

  fetchQuote();
}
motivationalQuote();

/* ===== Pomodoro Timmer ===== */
function pomodoroTimmer() {
  let totalTime = 25 * 60;
  let timmer = document.querySelector(".pomodoro-fullpage .container h2");

  function showTime() {
    let min = Math.floor(totalTime / 60);
    let sec = totalTime % 60;

    timmer.innerHTML = `${String(min).padStart("2", "0")}:${String(
      sec
    ).padStart("2", "0")}`;
  }
  let id = null;
  let session = true;
  let startBtn = document.querySelector(".pomodoro-fullpage .container .start");
  let pauseBtn = document.querySelector(".pomodoro-fullpage .container .pause");
  let resetBtn = document.querySelector(".pomodoro-fullpage .container .reset");
  let workSession = document.querySelector(".pomodoro-fullpage h3");

  function startTimer() {
    clearInterval(id);

    if (session) {
      id = setInterval(() => {
        if (totalTime) {
          totalTime--;
          showTime();
        } else {
          session = false;
          clearInterval(id);
          timmer.innerHTML = `05:00`;
          totalTime = 5 * 60;
          workSession.innerHTML = `take a small break`;
        }
      }, 1000);
    } else {
      id = setInterval(() => {
        if (totalTime) {
          totalTime--;
          showTime();
        } else {
          session = true;
          clearInterval(id);
          timmer.innerHTML = `25:00`;
          totalTime = 25 * 60;
          workSession.innerHTML = `do work`;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(id);
  }

  function resetTimmer() {
    clearInterval(id);

    if (session) {
      totalTime = 25 * 60;
    } else {
      totalTime = 5 * 60;
    }

    showTime();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimmer);
}
pomodoroTimmer();

/* ===== Daily Goals ===== */
function dailyGoals() {
  var currentTask = [];

  // 🔹 NEW localStorage key
  const STORAGE_KEY = "dailyGoalsTask";

  if (localStorage.getItem(STORAGE_KEY)) {
    currentTask = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } else {
    console.log("To Do List is empty");
  }

  function renderTask() {
    let allTasks = document.querySelector(".daily-goals-all-task");
    let sum = "";

    currentTask.forEach((elem, idx) => {
      sum += `<div class="daily-goals-task">
              <div class="daily-goals-text-content">
              <h5>${elem.title}<span class="${elem.imp}">imp</span>  <button id="${idx}">Done</button></h5>
              <div div class="daily-goals-text-description">
              <p>${elem.description}</p>
              </div>

            </div>

              </div>`;
    });

    allTasks.innerHTML = sum;

    // 🔹 store in NEW localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTask));

    document.querySelectorAll(".daily-goals-task button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".daily-goals-add-task form");
  let formInput = document.querySelector(
    ".daily-goals-add-task form #daily-goals-task-input"
  );
  let formTextarea = document.querySelector(
    ".daily-goals-add-task form textarea"
  );
  let formCheckbox = document.querySelector(
    ".daily-goals-add-task form #daily-goals-check"
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    currentTask.push({
      title: formInput.value,
      description: formTextarea.value,
      imp: formCheckbox.checked,
    });

    renderTask();

    formInput.value = "";
    formTextarea.value = "";
    formCheckbox.checked = false;
  });
}
dailyGoals();

/* ===== Landing Page head ===== */

function showDataOnLandingPage() {
  let key = "a7171fe85c07475fa4a132510252412";
  let city = "Solapur";

  async function fetchWeather() {
    let responce = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
    );

    let res = await responce.json();

    let temp = await res.current.temp_c;
    let humi = await res.current.humidity;
    let preci = await res.current.precip_in;
    let wi = await res.current.wind_kph;

    let weat = await res.current.condition.text;
    let st = await res.location.region;
    let dist = await res.location.name;
    let myDate = new Date();

    let date = myDate.toDateString();

    const clock = document.getElementById("time");

    function updateClock() {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      clock.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock(); // show immediately
    setInterval(updateClock, 1000); // update every second

    // console.log(weather, state,dist ,temp, humidity, precipitation, wind);

    document.querySelector(".header .header1 #temp").innerHTML = `${temp} °C`;
    document.querySelector(
      ".header .header1 #hum"
    ).innerHTML = `Humidity &nbsp; ${humi} %`;
    document.querySelector(
      ".header .header1 #preci"
    ).innerHTML = `Precipitation &nbsp; ${preci} %`;
    document.querySelector(
      ".header .header1 #wind"
    ).innerHTML = `Wind &nbsp; ${wi} km/h`;

    document.querySelector(".header .header1 #weather").innerHTML = `${weat}`;
    document.querySelector(".header .header2 #day").innerHTML = `${date} `;
    document.querySelector(".header .header2 #state").innerHTML = `(${st})`;
    document.querySelector(".header .header2 #dist").innerHTML = `${dist},`;
  }
  fetchWeather();
}
showDataOnLandingPage();

/* ===== Theme Changing ===== */

function changeTheme() {
  let themeBtn = document.querySelector("nav .changeBtn");
  let rootElem = document.documentElement;
  let flag = 0;
  themeBtn.addEventListener("click", () => {
    if (flag == 0) {
      rootElem.style.setProperty("--pri", "#d1dce3ff");
      rootElem.style.setProperty("--sec", "#14274E");
      rootElem.style.setProperty("--tri1", "#394867");
      rootElem.style.setProperty("--tri2", "#9BA4B4");
      flag = 1;
    } else if (flag == 1) {
      rootElem.style.setProperty("--pri", "#603f5eff");
      rootElem.style.setProperty("--sec", "#b02edbff");
      rootElem.style.setProperty("--tri1", "#ddd6e0");
      rootElem.style.setProperty("--tri2", "#D78FEE");
      flag = 2;
    } else if (flag == 2) {
      rootElem.style.setProperty("--pri", "#E8FFD7");
      rootElem.style.setProperty("--sec", "#3E5F44");
      rootElem.style.setProperty("--tri1", "#5E936C");
      rootElem.style.setProperty("--tri2", "#93DA97");
      flag = 3;
    } else if (flag == 3) {
      rootElem.style.setProperty("--pri", "#f8d79fff");
      rootElem.style.setProperty("--sec", "#9d4215ff");
      rootElem.style.setProperty("--tri1", "#e97339ff");
      rootElem.style.setProperty("--tri2", "#da9965ff");
      flag = 4;
    } else if (flag == 4) {
      rootElem.style.setProperty("--pri", "#f8f4e1");
      rootElem.style.setProperty("--sec", "#381c0a");
      rootElem.style.setProperty("--tri1", "#dfa827");
      rootElem.style.setProperty("--tri2", "#74512d");
      flag = 5;
    } else {
      flag = 0;
    }
  });
}
changeTheme();

function explore() {
  let explore = document.querySelector("nav .explore");
  explore.addEventListener("click", () => {
    console.log(explore);
  });
}
explore();
