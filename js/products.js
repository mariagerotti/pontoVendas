const select = document.getElementById("categoryProducts");

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_product")) ?? [];

const setLocalStorage = (dbProduct) =>
  localStorage.setItem("db_product", JSON.stringify(dbProduct));

const getCategories = () =>
  JSON.parse(localStorage.getItem("db_categories")) ?? [];

// const categorias = getCategories();

const createRow = (product) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = ` 
  <td>${product.id}</td>
  <td>${product.nameProductsProd}</td>
  <td>${product.amountProducts}</td>
  <td>${product.unitPriceProducts}</td>
  <td>${product.categoryProducts}</td>
  <td><button onclick="deleteProduct(${product.id})">Delete</td>
  `;
  document.querySelector("#tableProducts>tbody").appendChild(newRow);
};

const handleClickAddProduct = () => {
  const product = {
    id: Math.random(),
    nameProductsProd: document.getElementById("nameProductsProd").value,
    amountProducts: document.getElementById("amountProducts").value,
    unitPriceProducts: document.getElementById("unitPriceProducts").value,
    categoryProducts: document.getElementById("categoryProducts").value,
  };
  const dbProduct = getLocalStorage();
  dbProduct.push(product);
  setLocalStorage(dbProduct);

  clearFields();
  updateTable();
};

const deleteProduct = (id) => {
  let dbProduct = getLocalStorage();
  dbProduct = dbProduct.filter((product) => product.id !== id);
  setLocalStorage(dbProduct);
  updateTable();
};

const clearFields = () => {
  document.getElementById("nameProductProd").value = "";
  document.getElementById("amountProducts").value = "";
  document.getElementById("categoryProducts").value = "";
  document.getElementById("unitPriceProducts").value = "";
};

// for (const i of categorias) {
//   // const option = document.createElement("option");
//   option.textContent = i;
//   option.value = i;
//   select.appendChild(option);
// }

const renderProducts = () => {
  const dbProduct = getLocalStorage();
  dbProduct.forEach(createRow);
};

const categorySelect = () => {
  const dbCategories = JSON.parse(localStorage.getItem("db_categories")) ?? [];
  const selectElement = document.getElementById("categoryProducts");

  selectElement.innerHTML = "<option value='#'>select a Category</option>";

  dbCategories.forEach((category) => {
    selectElement.innerHTML += `<option value="${category.nameCategories}">${category.nameCategories}</option>`;
  });
};

const updateTable = () => {
  const tableBody = document.querySelector("#tableProducts>tbody");
  tableBody.innerHTML = "";
  renderProducts();
};

document.addEventListener("DOMContentLoaded", () => {
  categorySelect();
  renderProducts();
});

// const createProduct = (product) => {
//   const dbProduct = getLocalStorage();
//   dbProduct.push(product);
//   setLocalStorage(dbProduct);
// };
// const isValidField = () => {
//   return document.getElementById("inputsProducts").reportValidity();
// };

// // //interação com layout
// // const saveProduct = () => {
// //   if (isValidField()) {
//     const product = {
//       id: Math.random(),
//       nameProductsProd: document.getElementById("nameProductsProd").value,
//       amountProducts: document.getElementById("amountProducts").value,
//       unitPriceProducts: document.getElementById("unitPriceProducts").value,
//       categoryProducts: document.getElementById("categoryProducts").value,
//     };
//     createProduct(product);
//   }
// };

// const clearTable = () => {
//   const rows = document.querySelectorAll("#tableProducts>tbody tr");
//   rows.forEach((row) => row.parentNode.removeChild(row));
// };

// const fillFields = (product) => {
//   document.getElementById("nameProductsProd").value = product.nameProductsProd;
//   document.getElementById("amountProducts").value = product.amountProducts;
//   document.getElementById("unitPriceProducts").value =
//     product.unitPriceProducts;
//   document.getElementById("categoryProducts").value = product.categoryProducts;
//   document.getElementById("nameProductsProd").dataset.index = product.index;
// };
// //crud

// const editDelete = (e) => {
//   if (e.target.type == "button") {
//     const [action, index] = e.target.id.split("-");
//     if (action == "edit") {
//       editProduct(index);
//     } else {
//       const product = getLocalStorage()[index];
//       const response = confirm(
//         `deseja realmente excluir o produto ${product.nameProductsProd}`
//       );
//       if (response) {
//         deleteProduct(index);
//         updateTable();
//       }
//     }
//   }
//   window.location.reload();
// };

// const updateProduct = (index, product) => {
//   const dbProduct = getLocalStorage();
//   dbProduct[index] = product;
//   setLocalStorage(dbProduct);
// };

// updateTable();
