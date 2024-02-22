const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_product")) ?? [];
const setLocalStorage = (dbProduct) =>
  localStorage.setItem("db_product", JSON.stringify(dbProduct));

  const calculateTotalAndTax = () => {
    const dbProduct = getLocalStorage();
    let total = 0;
    let tax = 0;
    
    dbProduct.forEach((product) => {
      const totalPrice = product.amount * product.price;
      total += totalPrice;
      tax += totalPrice * (product.tax / 100);
    });
    return { total, tax };
  };
  
  const updateTotalAndTaxFields = () => {
    const { total, tax } = calculateTotalAndTax();
    document.getElementById("final-tax").value = `$${tax.toFixed(2)}`;
    document.getElementById("total").value = `$${(total + tax).toFixed(2)}`;
  };
  
  

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
      id: Math.random()
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
  <td><button class="secundary-button" onclick="deleteProduct(${product.id})">Delete</td>
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
        deleteProduct(product);
        updateTable();
      }
    }
  }
  window.location.reload();
};


updateTable();
updateTotalAndTaxFields();


const deleteProduct = (id) => {
  const dbProduct = getLocalStorage();
  const newDbProduct = dbProduct.filter((item) => id !== item.id) 
  setLocalStorage(newDbProduct);
  updateTotalAndTaxFields();
  window.location.reload()
};

const updateProduct = (index, product) => {
  const dbProduct = getLocalStorage();
  dbProduct[index] = product;
  setLocalStorage(dbProduct);
  updateTotalAndTaxFields();
};

//eventos
document
  .getElementById("buttonCreateProduct")
  .addEventListener("click", () => {
    saveProduct();
    updateTotalAndTaxFields();
  });

document
  .querySelector("#tableIndex>tbody")
  .addEventListener("click", editDelete);

  document.querySelector('#product').appendChild