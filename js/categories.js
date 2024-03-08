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

mostrarCateg();

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

async function deleteCategory(code) {
  try {
    const res = await fetch(
      `http://localhost/routes/category.php?code=${code}`,
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
