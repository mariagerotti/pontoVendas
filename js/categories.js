const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_product")) ?? [];
const setLocalStorage = (dbProduct) =>
  localStorage.setItem("db_product", JSON.stringify(dbProduct));

const createCategory = (product) => {
  const dbProduct = getLocalStorage();
  dbProduct.push(product);
  setLocalStorage(dbProduct);
};
const isValidField = () => {
  return document.getElementById("inputsCategories").reportValidity();
};

const clearFields = () => {
  const fields = document.getElementById("nameCategories", "taxCategories");
  fields.foreEach((field) => (field.value = ""));
};
//interação com layout
const saveProduct = () => {
  if (isValidField()) {
    const product = {
      nameCategories: document.getElementById("nameCategories").value,
      taxCategories: document.getElementById("taxCategories").value,
    };
    createCategory(product);
  }
};

const createRow = (product) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = ` 
  <td>${product.nameCategories}</td>
  <td>${product.taxCategories}</td>
  <td><button onclick="deleteCategory()">Delete</td>
  `;
  document.getElementById("tableCategories").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableCategories>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbProduct = getLocalStorage();
  clearTable();
  dbProduct.forEach(createRow);
};

const fillFields = (product) => {
  document.getElementById("nameCategories").value = product.nameCategories;
  document.getElementById("taxCategories").value = product.taxCategories;
  document.getElementById("nameCategories").dataset.index = product.index;
};
//crud

const editDelete = (e) => {
  if (e.target.type == "button") {
    const [action, index] = e.target.id.split("-");
    if (action == "edit") {
      editCategory(index);
    } else {
      const product = getLocalStorage()[index];
      const response = confirm(
        `deseja realmente excluir o produto ${product.nameCategories}`
      );
      if (response) {
        deleteCategory(index);
        updateTable();
      }
    }
  }
  window.location.reload();
};

const deleteCategory = (index) => {
  const dbProduct = getLocalStorage();
  dbProduct.splice(index, 1);
  setLocalStorage(dbProduct);
  window.location.reload();
};

const updateCategory = (index, product) => {
  const dbProduct = getLocalStorage();
  dbProduct[index] = product;
  setLocalStorage(dbProduct);
};

updateTable();
