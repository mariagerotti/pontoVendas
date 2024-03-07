const readOrderItem = async () => {
  const response = await fetch("http://localhost/routes/orderItem.php");
  const data = await response.json();
  console.log;
  return data;
};

const createRow = (orderItem) => {
  const tableBody = document.getElementById("tbodyHistory")
  const newRow = document.createElement("tr");
  newRow.innerHTML += `
        <td>${orderItem.code}</td>
        <td>${orderItem.product_code}</td>
        <td>${orderItem.amount}</td>
        <td>$${orderItem.price}</td>
        <td>$${orderItem.tax} </td>
    `;
  tableBody.appendChild(newRow);
};

const updateTable = async () => {
  const orderItem = await readOrderItem();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("code"));
  console.log(orderItem);

  orderItem.forEach((element) => {
    if (element.order_code == urlParams.get("code")) {
      createRow(element);
      return;
    }
  });
};

updateTable();

// const getHistory = () => JSON.parse(localStorage.getItem("history")) ?? [];
// const setHistory = (history) =>
//   localStorage.setItem("history", JSON.stringify(history));

// const itemId = new URLSearchParams(window.location.search).get("item");

// const history = getHistory();

// const item = history.find((item) => item.id == itemId);

// console.log(item);

// document.querySelector("#tax").innerHTML = `Tax you paid: -R$ ${item.tax}`;

// document.querySelector(
//   "#total"
// ).innerHTML = `Total of your purchase R$ ${item.total}`;

// const tbody = document.querySelector("#tbodyHistory");

// item.cart.forEach((item) => {
//   const newRow = document.createElement("tr");
//   newRow.innerHTML = `
//     <td>${item.id}</td>
//     <td>${item.date}</td>
//     <td>${item.productName}</td>
//     <td>${item.amount}</td>
//     <td>${item.price}</td>
//   `;
//   tbody.appendChild(newRow);
// });

// const renderItem = () => {};
