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
  return document.getElementById("addProduct").reportValidity();
};

const clearFields = () => {
  const fields = document.getElementById(
    "productName",
    "amount",
    "tax",
    "price"
  );
  fields.foreEach((field) => (field.value = ""));
};
//interação com layout
const saveProduct = () => {
  if (isValidField()) {
    const product = {
      productName: document.getElementById("productName").value,
      amount: document.getElementById("amount").value,
      tax: document.getElementById("tax").value,
      price: document.getElementById("price").value,
    };
    const index = document.getElementById("productName").dataset.index;
    if (index == "new") {
      createProduct(product);
      clearFields();
    } else {
      updateProduct(index, product);
      updateTable();
    }
  }
};

const createRow = (product) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = ` 
  <td>${product.productName}</td>
  <td>${product.amount}</td>
  <td>${product.tax}</td>
  <td>${product.price}</td>
  <td><button class="secundary-button" onclick="editDelete()">Edit</td>
  <td><button class="secundary-button" onclick="deleteProduct()">Delete</td>
  `;
  document.querySelector("#tableIndex>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableIndex>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbProduct = getLocalStorage();
  clearTable();
  dbProduct.forEach(createRow);
};

const fillFields = (product) => {
  document.getElementById("productName").value = product.productName;
  document.getElementById("amount").value = product.amount;
  document.getElementById("tax").value = product.tax;
  document.getElementById("price").value = product.price;
  document.getElementById("productName").dataset.index = product.index;
};
//crud

const editProduct = (index) => {
  const product = getLocalStorage()[index];
  product.index = index;
  fillFields(product);
};

const editDelete = (e) => {
  if (e.target.type == "button") {
    const [action, index] = e.target.id.split("-");
    if (action == "edit") {
      editProduct(index);
    } else {
      const product = getLocalStorage()[index];
      const response = confirm(
        `deseja realmente excluir o produto ${product.productName}`
      );
      if (response) {
        deleteProduct(index);
        updateTable();
      }
    }
  }
  window.location.reload();
};

updateTable();

const deleteProduct = (index) => {
  const dbProduct = getLocalStorage();
  dbProduct.splice(index, 1);
  setLocalStorage(dbProduct);
};

const updateProduct = (index, product) => {
  const dbProduct = getLocalStorage();
  dbProduct[index] = product;
  setLocalStorage(dbProduct);
};

//eventos
document
  .getElementById("buttonCreateProduct")
  .addEventListener("click", saveProduct);

document
  .querySelector("#tableIndex>tbody")
  .addEventListener("click", editDelete);
