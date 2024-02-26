const getHistory = () => JSON.parse(localStorage.getItem("history")) ?? [];
const setHistory = (history) =>
  localStorage.setItem("history", JSON.stringify(history));

const itemId = new URLSearchParams(window.location.search).get("item");

const history = getHistory();

const item = history.find((item) => item.id == itemId);

console.log(item);

document.querySelector("#tax").innerHTML = `Tax you paid: -R$ ${item.tax}`;

document.querySelector(
  "#total"
).innerHTML = `Total of your purchase R$ ${item.total}`;

const tbody = document.querySelector("#tbodyHistory");

item.cart.forEach((item) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${item.id}</td>
    <td>${item.date}</td>
    <td>${item.productName}</td>
    <td>${item.amount}</td>
    <td>${item.price}</td>
  `;
  tbody.appendChild(newRow);
});

const renderItem = () => {};
