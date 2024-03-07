//apagar produto adicionado ao carrinho
//adjust price and total in table
//descontar do estoque
//verificacao se compra mais que tem no estoque

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
  finalTax: document.getElementById("final-tax"),
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
  info.finalTax.value = "";
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableIndex>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

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

// const subtractFromProduct = async (cart) => {
//   try {
//     const products = await fetch("http://localhost/routes/products.php").then(async (res) => {
//       return await res.json();
//     });

//     cart.forEach(async (item) => {
//       const product = products.find((product) => product.code == item.code);
//       if (item.bougth <= product.amount) {
//         alert("Compra finalizada com sucesso");
//         product.amount -= item.bougth;
//         await fetch(`http://localhost/routes/products.php?code=${product.code}`, {
//           method: "PUT",
//           body: JSON.stringify(product),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         updateHistory(cart);
//       } else {
//         alert("Quantidade insuficiente em estoque");
//       }
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
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
        if (item.bougth <= product.amount) {
          product.amount -= item.bougth;
          console.log(item.bougth);
          await fetch(
            `http://localhost/routes/products.php?code=${product.code}`,
            {
              method: "PUT",
              body: JSON.stringify(product),
            }
          );
        } else {
          alert("Quantidade insuficiente em estoque");
          return; // Exit the function if there is not enough product in stock
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
    <td><button onclick="deleteProduct('${product.code}')">Delete</td>
    </tr>`;
    contactTable.appendChild(tr);
    updateTotalAndTaxFields();
    subtractFromProduct(cart);
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

  addToCart(selected);
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

  let order = await fetch("http://localhost/routes/order.php", {
    method: "POST",
    body: new FormData(form),
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
