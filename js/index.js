const urlOrderItem = 'http://localhost/routes/orderItem.php'
const urlOrder = 'http://localhost/routes/order.php'
const urlProduct = 'http://localhost/routes/product.php'


const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
const getCart = () => JSON.parse(localStorage.getItem("cart")) ?? [];

const contactForm = document.getElementById("formIndex");
const contactTable = document.getElementById("tbodyCart");

const createProduct = (product) => {
  const cart = getCart();
  cart.push(product);
  setCart(cart);
};

async function getProducts() {
  const response = await fetch(urlProduct);
  const data = await response.json();
  return data;
}

function postarProd() {
  const formData = new FormData(contactForm);
  fetch(urlOrderItem, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showAddedProd();
    });
}

function showAddedProd() {
  const formData = new FormData(contactForm);
  fetch(urlOrderItem)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>${data.name}</td>
      <td>${data.price}</td>
      <td>${data.amount}</td>
      <td>${data.amount * data.price}</td>
      <td><button class="secundary-button" onclick="deleteProduct('${data.code}')">Delete</td>
      `;
      document.querySelector("#tbodyCart").appendChild(newRow);
    });
  }
  
  const calculateTotalAndTax = () => {
    const cart = getCart();
    const total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
    const tax = cart.reduce((acc, item) => acc + item.category.taxCategories * item.amount, 0);
    return { total, tax };
  };

  const updateTotalAndTaxFields = () => {
    const { total, tax } = calculateTotalAndTax();
    document.getElementById("final-tax").value = `${tax.toFixed(2)}`;
    document.getElementById("total").value = `${(total + tax).toFixed(2)}`;
  };

  const selectElement = document.getElementById("productName");
  selectElement.innerHTML =  '<option value="#" disabled selected>Select a Product</option>';
  
  async function getProducts() {
    const response = await fetch("http://localhost/routes/products.php");
    console.log(response);
    const productsList = await response.json();
    productsList.forEach((category) => {
      selectElement.innerHTML += `<option value="${category.code}">${category.name}</option>`;
    });
    updateTotalAndTaxFields();
  }
  getProducts();

  // const optionsElement = [
  //   urlProduct().map(
  //     (option) => `<option value="${option.code}">${option.name}</option>`
  //   ),
  // ];

  

//como transformar getProducts em uma função async
//como transformar getLocalStorage em uma função async

  // document.querySelector("#productName").addEventListener("change", (e) => {
  //   const product = getLocalStorage().find(
  //     (product) => product.id == e.target.value
  //     );
  //     document.getElementById("amount").value = 1;
  //     document.getElementById("amount").max = product.amount;
  //     document.getElementById("price").value = product.price;
  //     document.getElementById("tax").value = product.category.taxCategories;
  //   });
    

  
  // const optionsElement = [
  //   urlProduct.map(
  //     (option) => `<option value="${option.code}">${option.name}</option>`
  //   ),
  // ];
  
  // const getLocalStorage = () =>
  //   JSON.parse(localStorage.getItem("db_product")) ?? [];
// const setLocalStorage = (dbProduct) =>
//   localStorage.setItem("db_product", JSON.stringify(dbProduct));

// const getCategories = () =>
//   JSON.parse(localStorage.getItem("db_categories")) ?? [];


// const getHistory = () => JSON.parse(localStorage.getItem("history")) ?? [];
// const setHistory = (history) =>
//   localStorage.setItem("history", JSON.stringify(history));

// const createRow = (product) => {
//   console.log(product);
//   const newRow = document.createElement("tr");

//   newRow.innerHTML = `
//   <td>${product.productName}</td>
//   <td>${product.price}</td>
//   <td>${product.amount}</td>
//   <td>${product.amount * product.price}</td>
//   <td><button class="secundary-button" onclick="deleteProduct('${
//     product.id
//   }')">Delete</td>
//   `;
//   document.querySelector("#tbodyCart").appendChild(newRow);
// };

// console.log(options);

// document.getElementById("productName").innerHTML = optionsElement.join("");
// document.querySelector("#productName").innerHTML = optionsElement;

// document
//   .getElementById("productName")
//   .insertAdjacentHTML(
//     "afterbegin",
//     '<option id="optionIndex" disabled selected>Select your Product</option>'
//   );

// const tableCartElement = document.querySelector("#tbodyCart");

// const clearTable = () => {
//   const rows = document.querySelectorAll("#tableIndex>tbody tr");
//   rows.forEach((row) => row.parentNode.removeChild(row));
// };

//  const updateTable = () => {
//   const cart = getCart();
//   clearTable();
//   cart.forEach(createRow);

//   updateTotalAndTaxFields();
// };

// const fillFields = (product) => {
//   document.getElementById("productName").value = product.productName;
//   document.getElementById("amount").value = product.amount;
//   document.getElementById("tax").value = product.tax;
//   document.getElementById("price").value = product.price;
//   document.getElementById("productName").dataset.index = product.index;
// };

// //crud

// const deleteProduct = (id) => {
//   const cart = getCart();
//   const newCart = cart.filter((item) => id != item.id);
//   setCart(newCart);

//   updateTable();
// };

// const updateProduct = (index, product) => {
//   const dbProduct = getLocalStorage();
//   dbProduct[index] = product;
//   setLocalStorage(dbProduct);
//   updateTotalAndTaxFields();
// };

// const isValidField = () => {
//   return document.getElementById("formIndex").reportValidity();
// };

// const handleClickAddToCart = () => {
//   if (isValidField()) {
//     const allProducts = getLocalStorage();

//     const productId = document
//       .getElementById("productName")
//       .value.replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;");
//     const productAmount = document
//       .getElementById("amount")
//       .value.replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;");

//     const product = allProducts.find((product) => product.id == productId);

//     const cart = getCart();
//     if (cart.some((item) => item.id == product.id)) {
//       cart.forEach((item) => {
//         if (item.id == product.id) {
//           item.amount = parseInt(item.amount) + parseInt(productAmount);
//         }
//       });
//       setCart(cart);
//       return;
//     }

//     const cartItem = {
//       ...product,
//       amount: productAmount,
//     };

//     console.log(cartItem);
//     createProduct(cartItem);
//     updateTable();
//   }
// };

// const calculateTotalAndTax = () => {
//   const cart = getCart();

//   const total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
//   const tax = cart.reduce(
//     (acc, item) => acc + item.category.taxCategories * item.amount,
//     0
//   );
//   return { total, tax };
// };

// const updateTotalAndTaxFields = () => {
//   const { total, tax } = calculateTotalAndTax();
//   document.getElementById("final-tax").value = `${tax.toFixed(2)}`;
//   document.getElementById("total").value = `${(total + tax).toFixed(2)}`;
// };
// //eventos

// document.querySelector("#productName").addEventListener("change", (e) => {
//   const product = getLocalStorage().find(
//     (product) => product.id == e.target.value
//     );
//     document.getElementById("amount").value = 1;
//     document.getElementById("amount").max = product.amount;
//     document.getElementById("price").value = product.price;
//     document.getElementById("tax").value = product.category.taxCategories;
//   });
  
//   const subtrctFromProduct = (cart) => {
//     const products = getLocalStorage();
    
//     cart.forEach((item) => {
//       const product = products.find((product) => product.id == item.id);
//       if (item.amount <= product.amount) {
//         alert("Compra finalizada com sucesso");
//         product.amount -= item.amount;
//         setLocalStorage(products);
//         updateHistory(cart);
//       } else {
//       alert("Quantidade insuficiente em estoque");
//     }
//   });
// };

// const updateHistory = (cart) => {
//   const history = getHistory();

//   const newHistory = {
//     id: new Date().getTime(),
//     cart,
//     date: new Date().toLocaleDateString,
//     total: document.getElementById("total").value,
//     tax: document.getElementById("final-tax").value,
//   };

//   history.push(newHistory);

//   setHistory(history);
//   console.log(newHistory);
// };

// document.querySelector("#finish-button").addEventListener("click", () => {
//   const cart = getCart();
//   subtrctFromProduct(cart);
//   setCart([]);
//   updateTable();
// });
// updateTable();
