const getLocalStorage = () => JSON.parse(localStorage.getItem('db_product')) ?? [];

const setLocalStorage = (dbProduct) => localStorage.setItem('db_product', JSON.stringify(dbProduct));

const getCategories = () => JSON.parse(localStorage.getItem('db_categories')) ?? [];

const setCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
const getCart = () => JSON.parse(localStorage.getItem('cart')) ?? [];

const getHistory = () => JSON.parse(localStorage.getItem('history')) ?? [];
const setHistory = (history) => localStorage.setItem('history', JSON.stringify(history));

const createRow = (product) => {
  console.log(product);
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
  <td>${product.productName}</td>
  <td>${product.price}</td>
  <td>${product.amount}</td>
  <td>${product.amount * product.price}</td>
  <td><button class="secundary-button" onclick="deleteProduct('${product.id}')">Delete</td>
  `;
  document.querySelector('#tbodyCart').appendChild(newRow);
};

const createProduct = (product) => {
  const cart = getCart();
  cart.push(product);
  setCart(cart);
};

const options = getLocalStorage();
console.log(options);

const selectElement = document.getElementById('productName');

const optionsElement = [
  '<option value="#" disabled selected>Select a Product</option>',
  options.map((option) => `<option value="${option.id}">${option.productName}</option>`)
];

document.getElementById('productName').innerHTML = optionsElement.join('');

document
  .getElementById('productName')
  .insertAdjacentHTML('afterbegin', '<option id="optionIndex" disabled selected>Select your Product</option>');


document.querySelector('#productName').innerHTML = optionsElement;
const tableCartElement = document.querySelector('#tbodyCart');

const clearTable = () => {
  const rows = document.querySelectorAll('#tableIndex>tbody tr');
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const cart = getCart();
  clearTable();
  cart.forEach(createRow);

  updateTotalAndTaxFields();
};

const fillFields = (product) => {
  document.getElementById('productName').value = product.productName;
  document.getElementById('amount').value = product.amount;
  document.getElementById('tax').value = product.tax;
  document.getElementById('price').value = product.price;
  document.getElementById('productName').dataset.index = product.index;
};
//crud


const deleteProduct = (id) => {
  const cart = getCart();
  const newCart = cart.filter((item) => id != item.id);
  setCart(newCart);

  updateTable();
};

const updateProduct = (index, product) => {
  const dbProduct = getLocalStorage();
  dbProduct[index] = product;
  setLocalStorage(dbProduct);
  updateTotalAndTaxFields();
};


const handleClickAddToCart = () => {
  const allProducts = getLocalStorage();

  const productId = document.getElementById('productName').value;
  const productAmount = document.getElementById('amount').value;

  const product = allProducts.find((product) => product.id == productId);

  const cartItem = {
    ...product,
    amount: productAmount
  };

  console.log(cartItem);

  createProduct(cartItem);
  updateTable();
};

const calculateTotalAndTax = () => {
  const cart = getCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
  const tax = cart.reduce((acc, item) => acc + item.category.taxCategories * item.amount, 0);
  return { total, tax };
};

const updateTotalAndTaxFields = () => {
  const { total, tax } = calculateTotalAndTax();
  document.getElementById('final-tax').value = `${tax.toFixed(2)}`;
  document.getElementById('total').value = `${(total + tax).toFixed(2)}`;
};
//eventos

document.querySelector('#productName').addEventListener('change', (e) => {
  const product = getLocalStorage().find((product) => product.id == e.target.value);

  document.getElementById('price').value = product.price;
  document.getElementById('tax').value = product.category.taxCategories;
});



const subtrctFromProduct = (cart) => {
  const products = getLocalStorage();

  cart.forEach((item) => {
    const product = products.find((product) => product.id == item.id);
    product.amount -= item.amount;
  });

  setLocalStorage(products);
}


const updateHistory = (cart) => {
  const history = getHistory();

  const newHistory = {
    id: new Date().getTime(),
    cart,
    date: new Date().toLocaleDateString,
    total: document.getElementById('total').value,
    tax: document.getElementById('final-tax').value
  };

  history.push(newHistory);

  setHistory(history);
  console.log(newHistory);
};

document.querySelector('#finish-button').addEventListener('click', () => {
  const cart = getCart();
  subtrctFromProduct(cart);
  updateHistory(cart);
  setCart([]);
  updateTable();

  alert('Compra finalizada com sucesso');
});
updateTable();