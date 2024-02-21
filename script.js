const pbtm = document.querySelector("#pbtm");
const timerInMin = document.querySelector("#timerInMin");
const timerInSec = document.querySelector("#timerInSec");
let score = document.querySelector("#score");
let img = document.querySelector(".img");
const animation = document.querySelectorAll(".animation");
const display = document.querySelectorAll(".display");
const fish = document.querySelector(".fisher");
let second = document.querySelector("#timerInSec");
let minute = document.querySelector("#timerInMin");
let addClass = "(0)";
let newScore = 0;

score.textContent = newScore;
// ==-----------------------Color Generator------------------------------==//
function getRandomColor() {
  let red = Math.floor(Math.random() * 555);
  let green = Math.floor(Math.random() * 555);
  let blue = Math.floor(Math.random() * 555);
  let color = "rgb(" + red + "," + green + "," + blue;
  return color;
}

// -----------------------Blur Effect----------------------------//
const addBlur=()=>{
  document.querySelector('#main').style.filter= "blur(5px)"
}
addBlur()
const removeBlur = ()=>{
  document.querySelector('#main').style.filter= "none"
}


// -----------------------Color Generator-----------------------------//
let randomColor = getRandomColor();

let randomNumber = () => {
  document.getElementById("randomNumber").innerText = Math.floor(
    Math.random() * 9
  );
};
const addsize = () => {
  img.classList.add("big");
  setTimeout(() => {
    img.classList.remove("big");
  }, 300);
};
// --------------------Main Game Logic---------------------------------//

img.addEventListener("click", () => {
  addsize();
  randomNumber();
});
let addElement = () => {
  let div = document.createElement("div");
  pbtm.appendChild(div).classList.add("box");
};

for (let i = 0; i <= 25; i++) {
  addElement();
  document.getElementsByClassName("box")[
    i
  ].style.backgroundColor = `${randomColor}${i})`;
}
let gameRun = () => {
  document.querySelectorAll(".box").forEach((elem, index) => {
    elem.innerHTML = Math.floor(Math.random() * 9);
    elem.addEventListener("click", (e) => {
      if (
        elem.innerHTML === document.getElementById("randomNumber").innerText
      ) {
        fish.style.top = `${e.clientY - 52}px`;
        fish.style.left = `${e.clientX - 120}px`;
        elem.classList.add("big");
        setTimeout(randomNumber, 0);
        elem.style.transition = 0.5 + "s";
        setTimeout(() => {
          elem.classList.remove("big");
          elem.style.transform = "scale" + addClass;
        }, 100);
        setTimeout(() => elem.remove(), 100);
        let reaminFood = document.getElementsByClassName("box").length - 1;
        newScore += 100;

        console.log(reaminFood);
        document.querySelector(".food span").innerText = reaminFood;
        score.textContent = newScore;
      }
    });
  });
};
document.querySelector(".food span").innerText =
  document.getElementsByClassName("box").length;
// ---------------Quit or Resume game---------------------//

document.querySelector("#quit").addEventListener("click", () => {
  document.body.style.display = "none";
});

document.querySelector("#close").addEventListener("click", () => {
  document.querySelector("#sound").style.display = "none";
  document.querySelector("#main").style.opacity = "1";
});
// ------------------------Show Half Time-----------------------//
const showHalfTime = () => {
  document.querySelector("#halfTime").style.display = "flex";
  document.querySelector("#halfTime").style.top = "10vh";
  document.querySelector("#halfTime").style.transition = "1.5s";
  setTimeout(() => {
    document.querySelector("#halfTime").style.display = "none";
  }, 2000);
};

// ---------------------------Result Function--------------------//
const loser = () => {
  if (document.getElementsByClassName("box").length > 0) {
    document.getElementById("timeOver").style.display = "flex";
  }
};
const winer = () => {
  if (document.getElementsByClassName("box").length == 0) {
    document.getElementById("winer").style.display = "flex";
  }
};
// ----------------------------------Timer -----------------//
let timer;
let timeLeft = 120;
let isRunning = false;

const formatTime = (second) => {
  const minutes = Math.floor(second / 60);
  const remainingSeconds = second % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

const startTime = () => {
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
  }, 1000);
};

const startTimer = () => {
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    document.querySelector(".timer").textContent = formatTime(timeLeft);
    if (timeLeft === 60) {
      showHalfTime();
    }

    if (timeLeft === 0) {
      clearInterval(timer);
      addBlur()
      isRunning = false;
      loser();
    }
    if (document.getElementsByClassName("box").length == 0) {
      addBlur()
      winer();
      clearInterval(timer);
      isRunning = false;
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timer);
  isRunning = false;
};

// ------------------------Start Game Here---------------------//
document.querySelector("#start").addEventListener("click", () => {
  removeBlur()
  document.querySelector("#card2").style.display = "none";
  gameRun();
  startTimer();
});
document.querySelector("#resume").addEventListener("click", () => {
  document.querySelector("#card").style.display = "none";
  removeBlur()
  gameRun();
  startTimer();
});
// -----------------------pause Game------------------------------------------------//

document.querySelector("#pause").addEventListener("click", () => {
  addBlur()
  document.getElementById("card").classList.add("card");
  document.getElementById("card").classList.remove("none");
  document.querySelector("#card").style.display = "flex";
  if (isRunning) {
    stopTimer();
  } else {
    startTime();
  }
});

 