"use strict";

const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const keys = document.querySelectorAll(".bottom span");

let operation = "";
let decimalAdded = false;

const operators = ["+", "-", "*", "/"];

function handleKeyPress(e) {
  const key = e.target.dataset.key;
  const lastChar = operation.slice(-1);

  if (key === "=") return;

  if (key === "." && decimalAdded) return;

  if (operators.includes(key)) decimalAdded = false;

  if (!operation && key === "-") {
    operation += key;
  } else if (!operation && operators.includes(key)) {
    return;
  } else if (operators.includes(lastChar) && operators.includes(key)) {
    operation = operation.slice(0, -1) + key;
  } else if (key) {
    if (key === ".") decimalAdded = true;
    operation += key;
  }

  input.textContent = operation;
}

function evaluate() {
  const key = event.target.dataset.key;
  const lastChar = operation.slice(-1);

  if (key === "=" && operators.includes(lastChar)) {
    operation = operation.slice(0, -1);
  }

  if (!operation) {
    result.textContent = "";
    return;
  }

  try {
    let final = operation.replace(/x/g, "*").replace(/÷/g, "/");
    const answer = +(eval(final)).toFixed(5);

    if (key === "=") {
      decimalAdded = false;
      operation = answer.toString();
      result.textContent = "";
    } else {
      result.textContent = answer;
    }
  } catch (e) {
    if (key === "=") {
      decimalAdded = false;
      input.innerHTML = `<span class="error">${operation}</span>`;
      result.innerHTML = `<span class="error">Bad Expression</span>`;
    }
    console.log(e);
  }
}

function clearInput() {
  if (event.ctrlKey) {
    operation = "";
    input.textContent = "";
    result.textContent = "";
  } else {
    operation = operation.slice(0, -1);
    input.textContent = operation;
  }
}

deleteBtn.addEventListener("click", clearInput);
keys.forEach(key => {
  key.addEventListener("click", handleKeyPress);
  key.addEventListener("click", evaluate);
});
