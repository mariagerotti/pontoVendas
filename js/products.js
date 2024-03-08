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
