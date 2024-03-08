const readOrderItem = async () => {
  const response = await fetch("http://localhost/routes/orderItem.php");
  const data = await response.json();
  console.log;
  return data;
};

const createRow = (orderItem) => {
  const tableBody = document.getElementById("tbodyHistory");
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
