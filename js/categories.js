const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_categories")) ?? [];

const setLocalStorage = (dbCategories) =>
  localStorage.setItem("db_categories", JSON.stringify(dbCategories));

const createCategory = (categories) => {
  const dbCategory = getLocalStorage();
  dbCategory.push(categories);
  setLocalStorage(dbCategory);
  //code akki
  //const data = new formdata(form)
};

//const form = document.getElementById('//id do form')

const isValidField = () => {
  return document.getElementById("inputsCategories").reportValidity();
};

const clearFields = () => {
  const fields = document.getElementById("nameCategories", "taxCategories");
  fields.foreEach((field) => (field.value = ""));
};
//interação com layout
const saveCategory = () => {
  if (isValidField()) {
    const categories = {
      id: Math.random().toString(36).substr(2, 6),
      nameCategories: document.getElementById("nameCategories").value.replace(/</g,
      "&lt;"
      ).replace(/>/g,
      "&gt;"
      ),
      taxCategories: document.getElementById("taxCategories").value.replace(/</g,
      "&lt;"
      ).replace(/>/g,
      "&gt;"
      ),
    };
    createCategory(categories);
  }
};

const createRow = (categories) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <td>${categories.id}</td>
  <td>${categories.nameCategories}</td>
  <td>${categories.taxCategories}</td>
  <td><button onclick="deleteCategory(${categories.id})">Delete</td>
  `;
  document.getElementById("tableCategories").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableCategories>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbCategory = getLocalStorage();
  clearTable();
  dbCategory.forEach(createRow);
};

const fillFields = (categories) => {
  document.getElementById("nameCategories").value = categories.nameCategories;
  document.getElementById("taxCategories").value = categories.taxCategories;
  document.getElementById("nameCategories").dataset.index = categories.index;
};

const deleteCategory = (id) => {
  const dbCategory = getLocalStorage();
  const newDbCategory = dbCategory.filter((item) => id !== item.id);
  setLocalStorage(newDbCategory);
  window.location.reload();
};

const updateCategory = (index, categories) => {
  const dbCategory = getLocalStorage();
  dbCategory[index] = categories;
  setLocalStorage(dbCategory);
};

updateTable();