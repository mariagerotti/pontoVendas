const readOrder = async () => {
  const response = await fetch("http://localhost/routes/order.php");
  const data = await response.json();
  return data;
};

const createRow = (order) => {
  const tableBody = document.getElementById("tbodyHistory");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
          <td>${order.code}</td>
          <td>$${order.tax}</td>
          <td>$${order.total}</td>
          <td>
          <button>
          <a href="view-details.html?code=${order.code}" class="secundary-button">View details
          </button>
          </td>
      `;
  tableBody.appendChild(newRow);
  console.log(order.total);
};

const updateTable = async () => {
  const order = await readOrder();
  order.forEach((order, index) => {
    createRow(order, index);
  });
};

updateTable();
