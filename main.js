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
    createProduct(product);
    clearFields();
    updateTable();
  }
};

const createRow = (product) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = ` 
  <td>${product.productName}</td>
  <td>${product.amount}</td>
  <td>${product.tax}</td>
  <td>${product.price}</td>
  <td><button class="secundary-button" data-action="edit">Edit</td>
  <td><button class="secundary-button" data-action="delete">Delete</td>
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

const editDelete = (e) => {
  if (e.target.type == "button") {
  }
};

updateTable();

//eventos

//crud
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

document
  .getElementById("buttonCreateProduct")
  .addEventListener("click", saveProduct);

document
  .querySelector("#tableIndex>tbody")
  .addEventListener("click", editDelete);
