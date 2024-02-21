const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_product")) ?? [];
const setLocalStorage = (dbProduct) =>
  localStorage.setItem("db_product", JSON.stringify(dbProduct));

const createProduct = (product) => {
  const dbProduct = getLocalStorage();
  dbProduct.push(product);
  setLocalStorage(dbProduct);
};
const isValidField = () => {
  return document.getElementById("inputsProducts").reportValidity();
};

const clearFields = () => {
  const fields = document.getElementById(
    "nameProductsProd",
    "amountProducts",
    "unitPriceProducts",
    "categoryProducts"
  );
  fields.foreEach((field) => (field.value = ""));
};
//interação com layout
const saveProduct = () => {
  if (isValidField()) {
    const product = {
      nameProductsProd: document.getElementById("nameProductsProd").value,
      amountProducts: document.getElementById("amountProducts").value,
      unitPriceProducts: document.getElementById("unitPriceProducts").value,
      categoryProducts: document.getElementById("categoryProducts").value,
    };
    createProduct(product);
  }
};

const createRow = (product) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = ` 
  <td>${product.nameProductsProd}</td>
  <td>${product.amountProducts}</td>
  <td>${product.unitPriceProducts}</td>
  <td>${product.categoryProducts}</td>
  <td><button onclick="deleteProduct()">Delete</td>
  `;
  document.querySelector("#tableProducts>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableProducts>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbProduct = getLocalStorage();
  clearTable();
  dbProduct.forEach(createRow);
};

const fillFields = (product) => {
  document.getElementById("nameProductsProd").value = product.nameProductsProd;
  document.getElementById("amountProducts").value = product.amountProducts;
  document.getElementById("unitPriceProducts").value =
    product.unitPriceProducts;
  document.getElementById("categoryProducts").value = product.categoryProducts;
  document.getElementById("nameProductsProd").dataset.index = product.index;
};
//crud

const editDelete = (e) => {
  if (e.target.type == "button") {
    const [action, index] = e.target.id.split("-");
    if (action == "edit") {
      editProduct(index);
    } else {
      const product = getLocalStorage()[index];
      const response = confirm(
        `deseja realmente excluir o produto ${product.nameProductsProd}`
      );
      if (response) {
        deleteProduct(index);
        updateTable();
      }
    }
  }
  window.location.reload();
};

const deleteProduct = (index) => {
  const dbProduct = getLocalStorage();
  dbProduct.splice(index, 1);
  setLocalStorage(dbProduct);
  window.location.reload();
};

const updateProduct = (index, product) => {
  const dbProduct = getLocalStorage();
  dbProduct[index] = product;
  setLocalStorage(dbProduct);
};

updateTable();
