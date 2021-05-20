//Récupère les produits du local storage
let addStorage = JSON.parse(localStorage.getItem("product"));
console.log(addStorage)

const items = addStorage;

// Sélectionner la balise tableau 
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
        price.innerHTML = item.priceProduct/100 + "€";

        const totalPrice = document.getElementById("totalPriceProduct");
        totalPrice.innerHTML = item.totalProduct/100 + "€";

        // Supprimer un produit
        let deleted = document.querySelectorAll("buttonReset")
        
        for(let j = 0; j < deleted.length; j++) {
            deleted.addEventListener("click",(e) => {
                e.preventDefault;
                
               
            })
        }

        //Création du total de la commande 
        let arrayPrice = [];

        for (let k = 0; k < items.length; k++) {

            let priceP = items[k].totalProduct;
            arrayPrice.push(priceP);            
        }  
        const reducer = (accumulator, currentValue) => accumulator + currentValue;// utilisation methode reduce
        const total = arrayPrice.reduce(reducer,0);

        const totalCommand = document.getElementById("totalPrice");
        totalCommand.innerHTML = total/100 + "€";

        //choisi l'élément à copier
        const productElement = document.getElementById("tableTemplate");
        const productCart = productElement.cloneNode(true); //défini l'élément à reproduire
        productCart.classList.remove("d-none"); //retire le display none
        productCart.removeAttribute("id"); //retire son id
        //introduit le clone dans la section 
        section.appendChild(productCart); 
           
        // Ajoute le total a mon objet produit
        //addStorage.totalCommande = totalCommand;
        //console.log(addStorage)
    }
    
    
}
////////////////////////////////////Formulaire///////////////////////////////////////////

const addStorageForm = document.getElementById("submit");


// Sélectionne le bouton d'envoi du formulaire
addStorageForm.addEventListener("click",(e) => {
    e.preventDefault()

    const $lastName = document.getElementById("lastName");
    const $firstName = document.getElementById("firstName");
    const $address = document.getElementById("address");
    const $zipCode = document.getElementById("zipCode");
    const $city = document.getElementById("city");
    const $email = document.getElementById("mail");

    
    
    //sélectionne et ajoute les détails du formulaire dans un objet
    let contact = {        
        lastName: $lastName.value,
        firstName: $firstName.value,
        address: $address.value,
        city: $city.value,
        email: $email.value,        
    }

       
    // Validation des informations du formulaire et envoi dans le localstorage
    if ($lastName.value.length == null || $firstName.value.length == null || $address.value.length == null || $city.value.length == null || $email.value.length == null) { 
        alert('Veuillez remplir tous les champs!')       
        
    } else {           
        localStorage.setItem("form", JSON.stringify(contact)); //envoi le formulaire dans le storage
    }
   
    //objet à envoyer
    const command = {
        contact,
        addStorage
    }

    // Envoi le localStorage avec POST
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: JSON.stringify(command),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }, 
       })
       .then (Response => Response.json())
       .then((json) => {
           localStorage.removeItem("contact")
           localStorage.removeItem("addStorage")
       })

       .catch(() => {
        alert(error)
      })
});
        
   