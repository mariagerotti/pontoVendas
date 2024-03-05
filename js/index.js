const url = "http://localhost/routes/";
const form = document.getElementById("formIndex");
var cart = [];

const info = {
  input: {
    select: document.getElementById("productName"),
    amount: document.getElementById("amount"),
  },
  tax: document.getElementById("tax"),
  price: document.getElementById("price"),
};

function addToCart(product) {}

form.addEventListener("submit", async () => {});

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
  let selected = data.find((item) => product.name == item.name);

  info.price.value = selected.price;
  info.tax.value = selected.tax;
}
init();
