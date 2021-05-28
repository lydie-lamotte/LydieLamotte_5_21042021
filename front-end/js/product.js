//////////////////////// PRODUIT////////////////////////////////////
// Récupère l'id
const queryString_url_id = window.location.search;
const id = queryString_url_id.slice(4); 

// Récupère le produit dans l'Api avec son id
fetch("http://localhost:3000/api/teddies/" + id)
    .then (response => response.json())
    .then (data => { 
        console.log(data)
        const elements = data;        
        const teddieCard = `
            <div class="product-image col-12 col-md-6 col-lg-6">
                <img src="${elements.imageUrl}" class="img-fluid border" alt="">
            </div>

            <div class="product-description col-12 col-md-6 col-lg-6">
                <h1 class="text-center">${elements.name}</h1>
                <p id="productDescription" class="p-2">${elements.description}</p>
                <p class="h4 px-2">${elements.price / 100}.00€</p>
                <p class="h5 text-success p-2">En stock: 10 produits disponibles</p>
                <form>
                    <label for="colorChoise" class="h5 px-4 row">Choisissez une couleur : </label>
                    <select  name ="colorChoise" id="colorChoise" class="my-2 mx-4 px-4">
                    </select>
            
                    <label for="quantityChoise" class="h5 px-4 row">Quantité : </label>
                    <select  name ="quantityChoise" id="quantityChoise" class="my-2 mx-4 px-4">
                    </select>
                </form>         
            </div>

            <button id="addCart" type="submit" class="btn btn-primary mx-auto my-3 w-50">Ajouter à mon panier</button>
        `
        // Sélectionne la balise du produit et on injecte le produit dans la page
        const elementCard = document.querySelector(".teddyCard")
        elementCard.innerHTML += teddieCard;
               
        //option color
        for (let i = 0 ; i < elements.colors.length; i++) {            
            
            colorOption =
            `
            <option value=${elements.colors[i]}>${elements.colors[i]}</option>
            `;            
            // Sélectionne la balise select option et on injecte la couleur dans la page
            const colorSelect = document.querySelector("#colorChoise");
            colorSelect.innerHTML += colorOption;            
        }

        //option quantité
        for (let j = 0; j < 10; j++) {            
            quantityOption = 
            `
            <option value=${j+1}>${j+1}</option>
            `;
            // Sélectionne la balise select quantité et on injecte la quantité dans la page
            const quantitySelect = document.querySelector("#quantityChoise");
            quantitySelect.innerHTML += quantityOption;
        }

/////////////////////////////////PANIER/////////////////////////////////////

        // Sélectionner le bouton pour ajouter les produits au panier
        const addCart = document.getElementById("addCart");

        // Utilisation du bouton addCart pour envoyer vers le panier
        addCart.addEventListener("click",(e) => {
            e.preventDefault()

            //sélectionne et ajoute l'id de l'option
            const idOption = document.getElementById("colorChoise");
            const idOptionSelected = idOption.value;

            //sélectionne et ajoute la quantité        
            const choiceQuantity = document.getElementById("quantityChoise");
            const choiceQuantitySelected = choiceQuantity.value;             
            
            //sélectionne et ajoute les détails du produit dans un objet
            let addProduct = {
                idProduct : id,
                titleProduct : elements.name,
                colorProduct : idOption.value,
                quantite: choiceQuantitySelected,
                priceProduct : elements.price,
                totalProduct : (elements.price * choiceQuantitySelected),
            }
                       
/////////////////////////////////// LOCAL STORAGE//////////////////////////////////////
           
            // Envoi des infos dans le storage en format json
            let addStorage = JSON.parse(localStorage.getItem("product"));
            ///fonction pourl'ajout au panier
            function addlocal(){
                addStorage.push(addProduct);
                localStorage.setItem("product", JSON.stringify(addStorage));
                alert("Produit ajouté au panier");            
            }
            if (addStorage === null) {
                addStorage = [];
                addlocal();           
            } else {
                addlocal();
            }        
        })            
    })
    .catch((error) => {
        console.log(error);
    }) 

