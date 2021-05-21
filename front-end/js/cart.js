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
       
        const tableProduct = ` 
        <tr scope ="row">
        <td>${item.titleProduct} - ${item.colorProduct}</td>
        <td>${item.quantite}</td>
        <td>${item.priceProduct/100}.00€</td>
        </td>
        <td>
            <button type="reset" id="buttonReset" class="btn btn-outline-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td> 
        <td>${item.totalProduct/100}.00€</td>
        </tr>`
        section.innerHTML += tableProduct;

        //Supprimer un produit
        /*let deleted = document.getElementById("buttonReset")      
       
        deleted.addEventListener("click",(e) => {
            e.preventDefault;
            deleted.splice(index,1);               
               
            })*/
        

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
        firstName: $firstName.value,      
        lastName: $lastName.value,
        address: $address.value,
        city: $city.value,
        email: $email.value,        
    }

       
    // Validation des informations du formulaire et envoi dans le localstorage
    if ($lastName.value.length < 1 || $firstName.value.length < 1 || $address.value.length < 1 || $city.value.length < 1 || $email.value.length < 1) { 
        alert('Veuillez remplir tous les champs!')       
        
    } else {           
        localStorage.setItem("form", JSON.stringify(contact)); //envoi le formulaire dans le storage
        // créer un array avec les id des produits du localstorage
    let products = [];
    for (let l = 0; l < items.length; l++) {

        let idProducts = items[l].idProduct;
        products.push(idProducts); 
        localStorage.setItem("products", JSON.stringify(products));
                 
    }  

    //objet à envoyer
    const command = {
        contact,
        products,
    }

    // Envoi le localStorage avec POST
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: JSON.stringify(command),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }, 
       })
       .then (Response => Response.json())
       .then(json => {console.log(json)
        
        })

       .catch(() => {
        alert(error)
    })
    }  
   
});
        
   