// 푸터의 연도를 현재 연도로 표시
document.getElementById("year").textContent = new Date().getFullYear();

// 장바구니
const STORAGE_KEY = "favorites-cart";
const listEl = document.getElementById("cart-list");
const countEl = document.getElementById("cart-count");
const emptyEl = document.getElementById("cart-empty");
const clearBtn = document.getElementById("clear-btn");
const addButtons = document.querySelectorAll(".add-btn");

let cart = load();

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // 저장 불가 환경에서는 무시
  }
}

function render() {
  listEl.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${item.icon} ${item.name}`;
    const remove = document.createElement("button");
    remove.textContent = "삭제";
    remove.addEventListener("click", () => removeItem(item.name));
    li.append(label, remove);
    listEl.appendChild(li);
  });

  countEl.textContent = cart.length;
  emptyEl.hidden = cart.length > 0;
  clearBtn.hidden = cart.length === 0;

  addButtons.forEach((btn) => {
    const added = cart.some((item) => item.name === btn.dataset.name);
    btn.classList.toggle("added", added);
    btn.textContent = added ? "담김 ✓" : "담기";
  });
}

function addItem(name, icon) {
  if (cart.some((item) => item.name === name)) return;
  cart.push({ name, icon });
  save();
  render();
}

function removeItem(name) {
  cart = cart.filter((item) => item.name !== name);
  save();
  render();
}

addButtons.forEach((btn) => {
  btn.addEventListener("click", () => addItem(btn.dataset.name, btn.dataset.icon));
});

clearBtn.addEventListener("click", () => {
  cart = [];
  save();
  render();
});

render();
