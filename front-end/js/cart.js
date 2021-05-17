//Récupère les produits du local storage
let addStorage = JSON.parse(localStorage.getItem("product"));
console.log(addStorage)

const items = addStorage;

const section = document.getElementById("sectionTable");


if(addStorage === null) {
    alert("votre panier est vide.")
} else{
    for (let i = 0; i < items.length; i++){

        const item = items[i];
        console.log(item)
        const name = document.getElementById("nameProduct");
        name.innerHTML = item.titleProduct + " - " +  item.colorProduct;

        const quantityItem = document.getElementById("quantityProduct");
        quantityItem.innerHTML = item.quantite;
        

        const price = document.getElementById("priceProduct");
        price.innerHTML = item.priceProduct;

        const totalPrice = document.getElementById("totalPriceProduct")
        totalPrice.innerHTML = item.totalProduct;

        const productElement = document.getElementById("tableTemplate"); /*choisi l'élément à copier*/
        const productCart = productElement.cloneNode(true); /*défini l'élément à reproduire*/
        productCart.classList.remove("d-none"); /*retire le display none*/
        productCart.removeAttribute("id"); /* retire son id*/

        section.appendChild(productCart); //introduit le clone dans la section 
           
       
    }
   
    
}
