const bodyEl = document.querySelector("body");
const startBtnEl = document.querySelector("button[data-start]");
const stopBtnEl = document.querySelector("button[data-stop]");

let colorRefresh = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startChangeColor = event => {
  colorRefresh = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
};

const stopChangeColor = event => {
  clearInterval(colorRefresh);
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
};

startBtnEl.addEventListener("click", startChangeColor);
stopBtnEl.addEventListener("click", stopChangeColor);
