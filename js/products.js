const apiUrl = "http://localhost/routes/products.php";

const contactForm = document.getElementById("inputsProducts");
const contactTable = document.getElementById("tbodyProducts");

function postProducts() {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    console.log(contactForm);
    
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: data,
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  });
}

const selectElement = document.getElementById("categoryProducts");
selectElement.innerHTML = "<option disabled>select a Category</option>";

async function getCategories() {
  const response = await fetch("http://localhost/routes/category.php");
  console.log(response);
  const categoriesList = await response.json();
  categoriesList.forEach((category) => {
    selectElement.innerHTML += `<option value="${category.code}">${category.name}</option>`;
  });
}
getCategories();

async function mostrarProd() {
  const listaProd = document.getElementById("tbodyProducts");
  const response = await fetch(apiUrl);
  const productsList = await response.json();
  
  listaProd.innerHTML = "";
  
  productsList.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
    <td>${product.code}</td>
    <td>${product.name}</td>
    <td>${product.amount}</td>
    <td>${product.price}</td>
    <td>${product.category_code}</td>
    <td><button onclick="deleteProduct('${product.code}')">Delete</td>
    </tr>`;
    listaProd.appendChild(tr);
    console.log(mostrarProd);
  });
}
mostrarProd();

async function deleteProduct(code) {
  try {
    const res = await fetch(
      `http://localhost/routes/products.php?code=${code}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      window.location.reload();
    });
  } catch (error) {
    console.log(error.message);
  }
}
// dbProd.map((category) => {
  //   selectElement.innerHTML += `<option value="${category.id}">${category.nameCategories}</option>`;
  // });

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

// const updateTable = () => {
//   const tableBody = document.querySelector("#tableProducts>tbody");
//   tableBody.innerHTML = "";
//   renderProducts();
// };

// document.addEventListener("DOMContentLoaded", () => {
//   categorySelect();
//   renderProducts();
// });

// const contactForm = document.getElementById("inputsProducts");
// const contactTable = document.getElementById("tbodyProducts");

//separado - pode ser usado
// const response = await fetch("http://localhost/routes/categories.php");
// const categoriesList = await response.json();
// categoriesList.forEach((category) => {
//   selectElement.innerHTML += `<option value="${category.id}">${category.nameCategories}</option>`;
// });
