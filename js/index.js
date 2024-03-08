//adjust price and total in table
//clean total and price after finish buy
const url = "http://localhost/routes/";
const form = document.getElementById("formIndex");
const finalteste = document.getElementById("finalteste");
const finish = document.getElementById("finish-button");
var cart = [];

const info = {
  input: {
    select: document.getElementById("productName"),
    amount: document.getElementById("amount"),
  },
  tax: document.getElementById("tax"),
  finalTax: document.getElementById("final-tax"),
  price: document.getElementById("price"),
  total: document.getElementById("total"),
};

const updateTableAfterDelete = (code) => {
  const contactTable = document.getElementById("tbodyCart");
  const index = cart.findIndex((product) => product.code === code);
  if (index !== -1) {
    cart.splice(index, 1);
    contactTable.innerHTML = "";
    cart.forEach((product) => {
      const tr = document.createElement("tr");
      tr.innerHTML += `<tr>
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${product.bougth}</td>
        <td>${product.bougth * product.price}</td>
        <td>${product.category_code}</td>
        <td>${product.bougth * product.price + parseFloat(product.tax)}</td>
        <td><button onclick="deleteProduct(${product.code})">Delete</td>
      </tr>`;
      contactTable.appendChild(tr);
    });
    updateTotalAndTaxFields();
  }
};

const selectElement = document.getElementById("productName");
selectElement.innerHTML =
  '<option value="#" disabled selected>Select a Product</option>';

const clearFields = () => {
  info.input.select.value = "";
  info.input.amount.value = "";
  info.price.value = "";
  info.tax.value = "";
  info.finalTax.value = "";
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableIndex>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

async function deleteProduct(code) {
  try {
    const res = await fetch(
      `http://localhost/routes/orderItem.php?code=${code}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      updateTableAfterDelete(code);
    });
  } catch (error) {
    console.log(error.message);
  }
}

function addToCart(product) {
  let quantidade = info.input.amount.value;
  let existe = cart.find((item) => item.code == product.code);

  if (existe) {
    existe.bougth = parseInt(quantidade) + parseInt(existe.bougth);
  } else {
    let comprar = { ...product, bougth: quantidade };
    cart.push(comprar);
  }

  async function subtractFromProduct(cart) {
    try {
      const products = await fetch("http://localhost/routes/products.php").then(
        async (res) => {
          return await res.json();
        }
      );

      for (const item of cart) {
        const product = products.find((product) => product.code == item.code);
        console.log(item.bougth);

        if (item.bougth <= product.amount) {
          product.amount -= item.bougth;
          await fetch(
            `http://localhost/routes/products.php?code=${product.code}`,
            {
              method: "PUT",
              body: JSON.stringify(product),
            }
          );
        } else {
          alert("Quantidade insuficiente em estoque");
          return;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
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
    <td>${product.bougth * product.price + parseFloat(product.tax)}</td>
    <td><button onclick="deleteProduct(${product.code})">Delete</td>
    </tr>`;
    contactTable.appendChild(tr);
    updateTotalAndTaxFields();
    subtractFromProduct([product]);
  });
}

async function changeInfo(productCode) {
  let products = await fetch(url + "products.php").then(async (res) => {
    return await res.json();
  });
  if (productCode != "#" && products.length > 0) {
    let selected = products.find((item) => item.code == productCode);
    console.log(selected);

    info.price.value = selected.price;
    info.tax.value = selected.tax;
  }
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
  console.log(product);
  if (selected.amount <= info.input.amount.value) {
    alert("Quantidade insuficiente em estoque");
    return;
  } else {
    addToCart(selected);
  }
});

info.input.select.addEventListener("change", async () => {
  let product = info.input.select.value;
  changeInfo(product);
});

const calculateTotalAndTax = () => {
  const total = cart.reduce((acc, item) => acc + item.price * item.bougth, 0);
  const tax = cart.reduce((acc, item) => acc + item.tax * item.bougth, 0);
  return { total, tax };
};

const updateTotalAndTaxFields = () => {
  const { total, tax } = calculateTotalAndTax();
  document.getElementById("final-tax").value = `${tax.toFixed(2)}`;
  document.getElementById("total").value = `${(total + tax).toFixed(2)}`;
};

finish.addEventListener("click", async () => {
  // debugger;
  if (cart.length < 1) {
    alert("Por favor compre alguma coisa");
    return;
  }
  let data = new FormData();
  let tax = cart.reduce((acc, item) => acc + item.tax * item.bougth, 0);
  let total =
    cart.reduce((acc, item) => acc + item.price * item.bougth, 0) + tax;
  data.append("total", total);
  data.append("tax", tax);

  let order = await fetch("http://localhost/routes/order.php", {
    method: "POST",
    body: data,
  });

  let { code } = await order.json();
  console.log(code);

  cart.forEach(async (item) => {
    let form = new FormData();
    form.append("order_code", parseInt(code));
    form.append("product_code", item.code);
    form.append("amount", item.bougth);
    form.append("price", item.price * parseInt(item.bougth));
    form.append("tax", item.tax * item.bougth);
    clearTable();

    await fetch("http://localhost/routes/orderItem.php", {
      method: "post",
      body: form,
    });
  });
});

const cancelBuy = () => {
  const response = confirm(
    "As alterações não serão salvas. Deseja realmente cancelar o carrinho?"
  );
  if (response);
  cart = [];
  clearTable();
};

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

document.getElementById("cancel").addEventListener("click", cancelBuy);
