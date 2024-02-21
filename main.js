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
    console.log("cadastrando produto");
  }
};

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