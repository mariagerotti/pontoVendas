
const tempProduct ={
product: "potato",
price:"10",
amount: "1",
total: "10"
}

//eventos

//crud
const addProduct = (product) =>{
    const db_product = JSON.parse(localStorage.getItem("db_client"))
    db_product.push(product)
    localStorage.setItem("db_product", JSON.stringify(db_product))
}