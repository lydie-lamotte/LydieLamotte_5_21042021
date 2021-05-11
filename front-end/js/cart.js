//Récupère les produits du local storage
let addStorage = JSON.parse(localStorage.getItem("product"));
console.log(addStorage)

const items = addStorage;

if(addStorage === null) {
    alert("votre panier est vide.")

} else{
    for (let i = 0; i < items.length; i++){

        const item = items[i];
        console.log(item)
        const name = document.getElementById("nameProduct");
        name.innerHTML = item.titleProduct;
        console.log(name.innerHTML)

    }
    

}
