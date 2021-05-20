//////////////////////// PRODUIT////////////////////////////////////

// Récupère l'id

const queryString_url_id = window.location.search;
const id = queryString_url_id.slice(4);
console.log(id)


// Sélectionner la balise select option
const colorSelect = document.getElementById("colorChoise");

//Sélectionne la balise select quantité
const QuantitySelect = document.getElementById("quantityChoise")

// Récupère le produit dans l'Api avec son id
fetch("http://localhost:3000/api/teddies/" + id)
    .then (response => response.json())
    .then (data => { 
        console.log(data)

        const elements = data;
        const colors = elements.colors;
        

        // Création de la carte produit
        const image = document.getElementById("productImage");
        image.setAttribute ("src", elements.imageUrl);

        const title = document.getElementById("productName");
        title.innerHTML = elements.name;

        const description = document.getElementById("productDescription");
        description.innerHTML = elements.description;

        const price = document.getElementById("productPrice");
        price.innerHTML = elements.price / 100 + "€";

        
        //option color
        for (let i = 0 ; i < colors.length; i++) {            
            const color = colors[i];

            // creation d'une balise option couleur
            const colorOption = document.createElement("option");
            colorOption.setAttribute("value",color);
            colorOption.innerHTML = color;

            //ajout de l'option dans le select des couleurs
            colorSelect.appendChild(colorOption);
        }
        //option quantité
        for (let j = 0; j < 10; j++) {
            let choice  = j +1 ;
            

            const quantityOption = document.createElement("option");
            quantityOption.setAttribute("value",choice);
            quantityOption.innerHTML = choice;
            
            QuantitySelect.appendChild(quantityOption);
           
        }
            /////////////////////////PANIER/////////////////////////////////////

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

                       
            ////////////////////// LOCAL STORAGE//////////////////////////////////////
           
            // Envoi des infos dans le storage en format json
            let addStorage = JSON.parse(localStorage.getItem("product"));
            
            if(addStorage === null) {
                addStorage = []; //création d'un tableau
                addStorage.push(addProduct); // Envoi du détail des produits dans le tableau
                localStorage.setItem("product", JSON.stringify(addStorage)); // converti le format en JSON
            } else{
                addStorage.push(addProduct);
                localStorage.setItem("product", JSON.stringify(addStorage)); 
            }
    
            })

            // Message de validation du produit dans le panier
            document.getElementById("addCart").addEventListener("click",function(){
                alert("Produit ajouté au panier");
            });

            
    })

    .catch((error) => {
        console.log(error);
    }) 

