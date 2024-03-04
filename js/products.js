const apiUrl = "http://localhost/routes/products.php";

const contactForm = document.getElementById("inputsProducts");
const contactTable = document.getElementById("tbodyProducts");

function postarCateg() {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    try {
      const res = await fetch(
        "http://localhost/routes/products.php",
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

async function mostrarProd() {
  const listaProd = document.getElementById("tbodyCategories");
  const response = await fetch(apiUrl);
  const productsList = await response.json();
  listaProd.innerHTML = "";

  productsList.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
      <td>${product.code}</td>
      <td>${product.name}</td>
      <td>${product.tax}</td>
      <td><button onclick="deleteCategory(${categories.code})">Delete</td>
      </tr>`;
    listaProd.appendChild(tr);
  });
}

mostrarProd();

async function showAddedProd() {
  const response = await fetch(apiUrl);
  const productsList = await response.json();
  productsList.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
      <td>${product.code}</td>
      <td>${product.name}</td>
      <td>${product.tax}</td>
      <td><button onclick="deleteCategory(${product.code})">Delete</td>
      </tr>`;
    listaProd.appendChild(tr);
  });
}

// const select = document.getElementById("categoryProducts");

// const getProducts = () => JSON.parse(localStorage.getItem("db_product")) ?? [];
// const setProducts = (dbProduct) =>
//   localStorage.setItem("db_product", JSON.stringify(dbProduct));

// const getCategories = () =>
//   JSON.parse(localStorage.getItem("db_categories")) ?? [];

// // const categorias = getCategories();

// const createRow = (product) => {
//   const newRow = document.createElement("tr");
//   newRow.innerHTML = `
//   <td>${product.id}</td>
//   <td>${product.productName}</td>
//   <td>${product.amount}</td>
//   <td>${product.price}</td>
//   <td>${product.category.nameCategories}</td>
//   <td><button onclick="deleteProduct('${product.id}')">Delete</td>
//   `;
//   document.querySelector("#tableProducts>tbody").appendChild(newRow);
//   console.log(product.category.nameCategories);
// };

// const isValidField = () => {
//   return document.getElementById("inputsProducts").reportValidity();
// };

// const handleClickAddProduct = () => {
//   if (isValidField()) {
//     const allCategories = getCategories();

//     const categoryId = document.getElementById("categoryProducts").value;

//     const category = allCategories.find(
//       (category) => category.id === categoryId
//     );

//     const product = {
//       id: Math.random().toString(36).substr(2, 9),
//       productName: document
//         .getElementById("nameProductsProd")
//         .value.replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;"),
//       amount: document
//         .getElementById("amountProducts")
//         .value.replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;"),
//       price: document
//         .getElementById("unitPriceProducts")
//         .value.replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;"),

//       category: category,
//     };

//     console.log(product);

//     const products = getProducts();
//     products.push(product);
//     setProducts(products);

//     clearFields();
//     updateTable();
//   }
// };

// const deleteProduct = (id) => {
//   let dbProduct = getProducts();
//   dbProduct = dbProduct.filter((product) => product.id !== id);
//   setProducts(dbProduct);
//   updateTable();
// };

// const clearFields = () => {
//   document.getElementById("nameProductsProd").value = "";
//   document.getElementById("amountProducts").value = "";
//   document.getElementById("categoryProducts").value = "";
//   document.getElementById("unitPriceProducts").value = "";
// };

// const renderProducts = () => {
//   const dbProduct = getProducts();
//   dbProduct.forEach(createRow);
// };

// const categorySelect = () => {
//   const dbCategories = JSON.parse(localStorage.getItem("db_categories")) ?? [];
//   const selectElement = document.getElementById("categoryProducts");

//   selectElement.innerHTML = "<option value='#'>select a Category</option>";

//   dbCategories.map((category) => {
//     selectElement.innerHTML += `<option value="${category.id}">${category.nameCategories}</option>`;
//   });
// };

// const updateTable = () => {
//   const tableBody = document.querySelector("#tableProducts>tbody");
//   tableBody.innerHTML = "";
//   renderProducts();
// };

// document.addEventListener("DOMContentLoaded", () => {
//   categorySelect();
//   renderProducts();
// });
