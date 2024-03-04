const apiUrl = "http://localhost/routes/category.php";

const contactForm = document.getElementById("inputsCategories");
const contactTable = document.getElementById("tbodyCategories");

function postarCateg() {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    try {
      const res = await fetch(
        "http://localhost/routes/category.php",
        {
          method: "POST",
          body: data,
        },
        window.location.reload()
      );
    } catch (error) {
      console.log(error.message);
    }
  });
}

async function mostrarCateg() {
  const listaCat = document.getElementById("tbodyCategories");
  const response = await fetch(apiUrl);
  const categoriesList = await response.json();
  listaCat.innerHTML = "";

  categoriesList.forEach((categories) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
      <td>${categories.code}</td>
      <td>${categories.name}</td>
      <td>${categories.tax}</td>
      <td><button onclick="deleteCategory(${categories.code})">Delete</td>
      </tr>`;
    listaCat.appendChild(tr);
  });
}

mostrarCateg()

async function showAddedCat() {
  const response = await fetch(apiUrl);
  const categoriesList = await response.json();
  categoriesList.forEach((categories) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
      <td>${categories.code}</td>
      <td>${categories.name}</td>
      <td>${categories.tax}</td>
      <td><button onclick="deleteCategory(${categories.code})">Delete</td>
      </tr>`;
    listaCat.appendChild(tr);
  });
  console.log(showAddedCat);
}

// const getLocalStorage = () =>
// JSON.parse(localStorage.getItem("db_categories")) ?? [];

// const setLocalStorage = (dbCategories) =>
// localStorage.setItem("db_categories", JSON.stringify(dbCategories));

// const createCategory = (categories) => {
//   const dbCategory = getLocalStorage();
//   dbCategory.push(categories);
//   setLocalStorage(dbCategory);
//   //code akki
//   //const data = new formdata(form)
// };

// const isValidField = () => {
//   return document.getElementById("inputsCategories").reportValidity();
// };

// const clearFields = () => {
//   const fields = document.getElementById("nameCategories", "taxCategories");
//   fields.foreEach((field) => (field.value = ""));
// };
// //interação com layout
// const saveCategory = () => {
//   if (isValidField()) {
//     const categories = {
//       id: Math.random().toString(36).substr(2, 6),
//       nameCategories: document.getElementById("nameCategories").value.replace(/</g,
//       "&lt;"
//       ).replace(/>/g,
//       "&gt;"
//       ),
//       taxCategories: document.getElementById("taxCategories").value.replace(/</g,
//       "&lt;"
//       ).replace(/>/g,
//       "&gt;"
//       ),
//     };
//     createCategory(categories);
//   }
// };

// const createRow = (categories) => {
//   document.getElementById("tableCategories").appendChild(newRow);
// };

// const clearTable = () => {
//   const rows = document.querySelectorAll("#tableCategories>tbody tr");
//   rows.forEach((row) => row.parentNode.removeChild(row));
// };

// const updateTable = () => {
//   const dbCategory = getLocalStorage();
//   clearTable();
//   dbCategory.forEach(createRow);
// };

// const fillFields = (categories) => {
//   document.getElementById("nameCategories").value = categories.nameCategories;
//   document.getElementById("taxCategories").value = categories.taxCategories;
//   document.getElementById("nameCategories").dataset.index = categories.index;
// };

// const deleteCategory = (id) => {
//   const dbCategory = getLocalStorage();
//   const newDbCategory = dbCategory.filter((item) => id !== item.id);
//   setLocalStorage(newDbCategory);
//   window.location.reload();
// };

// const updateCategory = (index, categories) => {
//   const dbCategory = getLocalStorage();
//   dbCategory[index] = categories;
//   setLocalStorage(dbCategory);
// };

// updateTable();
