let form = document.getElementById("form");
let input = document.getElementById("input");
let set_time = document.getElementById("set_time");
let msg = document.getElementById("msg");
let postsDisplay = document.getElementById("posts");
let playAlarm = document.getElementById("myAudio");
//--------------------------------------

let user_Time = [];

let objstr = localStorage.getItem("time");
if (objstr != null) {
  user_Time = JSON.parse(objstr); //---change string to int and store in user_time
}
displayInfo();

// current running times--======================
setInterval(showTime, 1000);
function showTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  am_pm = "AM";
  if (hour > 12) {
    hour -= 12;
    am_pm = "PM";
  }
  if (hour == 0) {
    am_pm = "AM";
  }
  let currentTime = hour + ":" + min + ":" + sec + " " + am_pm;
  document.getElementById("exat-time").innerHTML = currentTime;
  //play alarm
  user_Time.forEach(myFun);
  function myFun(item) {
    if (item.times == currentTime) {
      playAlarm.play();
    }
  }
}
showTime();

//form validation--------------------

set_time.addEventListener("click", function () {
  if (
    setH.value === "Hrs" ||
    setM.value === "Min" ||
    setS.value === "Sec" ||
    setZ.value === "Zone"
  ) {
    msg.innerHTML = "Choose a time";
  } else {
    msg.innerHTML = "";
    var added_time =
      setH.value + ":" + setM.value + ":" + setS.value + " " + setZ.value;
    console.log(added_time);
    user_Time.unshift({ times: added_time });
    setH.value = "Hrs";
    setM.value = "Min";
    setS.value = "Sec";
    setZ.value = "Zone";
    saveInfo(user_Time);
    displayInfo();
  }
});

// save alll alarms----------------------
function saveInfo(user_Time) {
  let str = JSON.stringify(user_Time); //---Change in to String
  localStorage.setItem("time", str);
}

// display all --------------------------

function displayInfo() {
  showTime();
  let statement = "";
  user_Time.forEach((item, i) => {
    statement += `<div class="d-flex justify-content-around border-top border-2">
    <p class="fa-2x m-1">${i + 1}</p>
    <p class="fa-2x m-1">${item.times}</p>
    <span class="options fa-2x">
      <i class="fas fa-trash-alt m-1" onclick='DeleteInfo(${i})'></i>
    </span>
  </div>`;
  });
  postsDisplay.innerHTML = statement;
}
// delete one by one ====================================
function DeleteInfo(id) {
  user_Time.splice(id, 1);
  saveInfo(user_Time);
  displayInfo();
}

// Stop Alarm
let stopAlaram = document.querySelector("#stop_alaram");
stopAlaram.addEventListener("click", () => {
  playAlarm.pause();
});

// hours set time
let hours = document.querySelector(".hours");
let hr = "<option disabled selected>Hrs</option>",
  i;
for (i = 1; i <= 12; i++) {
  hr = hr + "<option>" + i + "</option>";
}

document.querySelector(".hours").innerHTML = hr;

// minutes set time
let minutes = document.querySelector(".minutes");
let mnt = "<option disabled selected>Min</option>",
  j;
for (j = 0; j <= 59; j++) {
  mnt = mnt + "<option>" + j + "</option>";
}

document.querySelector(".minutes").innerHTML = mnt;

//seconds set time

let seconds = document.querySelector(".seconds");
let Scnd = "<option disabled selected>Sec</option>",
  k;
for (k = 0; k <= 59; k++) {
  Scnd = Scnd + "<option>" + k + "</option>";
}
document.querySelector(".seconds").innerHTML = Scnd;