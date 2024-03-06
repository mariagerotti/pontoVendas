//apagar produto adicionado ao carrinho
//send to history
//view history order

const url = "http://localhost/routes/";
const form = document.getElementById("formIndex");
const finish = document.getElementById("finish-button");
var cart = [];

const info = {
  input: {
    select: document.getElementById("productName"),
    amount: document.getElementById("amount"),
  },
  tax: document.getElementById("tax"),
  price: document.getElementById("price"),
};

const selectElement = document.getElementById("productName");
selectElement.innerHTML =
  '<option value="#" disabled selected>Select a Product</option>';

const clearFields = () => {
  info.input.select.value = "";
  info.input.amount.value = "";
  info.price.value = "";
  info.tax.value = "";
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableIndex>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

function addToCart(product) {
  let quantidade = info.input.amount.value;
  let existe = cart.find((item) => item.code == product.code);

  if (existe) {
    existe.bougth = parseInt(quantidade) + parseInt(existe.bougth);
  } else {
    let comprar = { ...product, bougth: quantidade };
    cart.push(comprar);
  }

  clearFields();
  clearTable();

  const contactTable = document.getElementById("tbodyCart");

  cart.forEach((product) => {
    const tr = document.createElement("tr");

    tr.innerHTML += `<tr>
    <td>${product.code}</td>
    <td>${product.name}</td>
    <td>${product.bougth}</td>
    <td>${product.bougth * product.price}</td>
    <td>${product.category_code}</td>
    <td>${(product.bougth * product.price) + parseFloat(product.tax)}</td>
    <td><button onclick="deleteProduct('${product.code}')">Delete</td>
    </tr>`;
    contactTable.appendChild(tr);
  });
}

async function changeInfo(productCode) {
  let products = await fetch(url + "products.php").then(async (res) => {
    return await res.json();
  });

  let selected = products.find((item) => item.code == productCode);
  console.log(selected);

  info.price.value = selected.price;
  info.tax.value = selected.tax;

 
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let products = fetch(url + "products.php").then(async (res) => {
    return await res.json();
  });

  let data = await products;
  let product = info.input.select.value;

  let selected = await data.find((item) => item.code == product);

  addToCart(selected);
});

info.input.select.addEventListener("change", async () => {
  let product = info.input.select.value;
  changeInfo(product);
});

// const calculateTotalAndTax = () => {
//   const total = cart.reduce((acc, item) => acc + item.price * item.bougth, 0);
//   const tax = cart.reduce((acc, item) => acc + item.tax * item.bougth, 0);
//   return { total, tax };
// };

// const updateTotalAndTaxFields = () => {
//   const { total, tax } = calculateTotalAndTax();
//   document.getElementById("final-tax").value = `${tax.toFixed(2)}`;
//   document.getElementById("total").value = `${(total + tax).toFixed(2)}`;
//   console.log(total, tax);
// };

finish.addEventListener("click", async () => {
  if (cart.length < 1) {
    alert("Por favor compre alguma coisa");
    return;
  }

  let order = fetch("http://localhost/routes/order.php", {
    method: "post",
    body: form,
  }).then(async (res) => {
    return await res.text();
  });

  let data = JSON.parse(await order);
  console.log(data);

  cart.forEach(async (item) => {
    let form = new FormData();
    form.append("order_code", data[0]);
    form.append("product_code", item.code);
    form.append("amount", item.bougth);
    form.append("price", item.price * parseInt(item.bougth));
    form.append("tax", item.tax * item.bougth);
    let request = fetch("http://localhost/routes/orderItem.php", {
      method: "post",
      body: form,
    }).then(async (res) => {
      return await res.text();
    });

    console.log(await request);
  });
});

async function init() {
  //pegar todos os produtos
  let products = fetch(url + "products.php").then(async (res) => {
    return await res.json();
  });

  let data = await products;
  console.log(data);

  data.forEach((element) => {
    document.getElementById(
      "productName"
    ).innerHTML += `<option value=${element.code}>${element.name}</option>`;
  });

  // preencher infos primeiro produto
  let product = info.input.select.value;
  changeInfo(product);
}
init();
