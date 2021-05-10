// PRODUIT

// Récupère l'id

const queryString_url_id = window.location.search;
const id = queryString_url_id.slice(4);
console.log(id)


// Sélectionner la balise select
const colorSelect = document.getElementById("colorChoise");

// Récupère le produit dans l'Api avec son id
fetch("http://localhost:3000/api/teddies/" + id)
    .then (response => response.json())
    .then (data => { 
        console.log(data)

        const elements = data;
        const colors = elements.colors

        // Création de la carte produit
        const image = document.getElementById("productImage");
        image.setAttribute ("src", elements.imageUrl);

        const title = document.getElementById("productName");
        title.innerHTML = elements.name;

        const description = document.getElementById("productDescription");
        description.innerHTML = elements.description;

        const price = document.getElementById("productPrice");
        price.innerHTML = elements.price / 100 + ".00€";

        for (let i = 0 ; i < colors.length; i++) {
            
            const color = colors[i];

            // creation d'une balise option couleur
            const colorOption = document.createElement("option");
            colorOption.setAttribute("value",color);
            colorOption.innerHTML = color;

            //ajout de l'option dans le select des couleurs
            colorSelect.appendChild(colorOption);
        }
            // PANIER

            //sélectionner l'id de l'option
            const idOption = document.getElementById("colorChoise");


            // Sélectionner le bouton pour ajouter les produits au panier
            const addCart = document.getElementById("addCart");
            console.log(addCart)

            // Utilisation du bouton addCart pour envoyer vers le panier
            addCart.addEventListener("click",(e) => {
                e.preventDefault()

            //sélectionne et ajoute l'id de l'option
            const idOption = document.getElementById("colorChoise");
            const idOptionSelected = idOption.value;
    
            //sélectionne et ajoute les détails du produit
            let addProduct = {
                idProduct : id,
                titleProduct : elements.name,
                colorProduct : idOption.value,
                quantite: 1,
                priceProduct : elements.price/100 +",00€",

            }
            console.log(addProduct)
    

            })

            // Message de validation du produit dans le panier
            document.getElementById("addCart").addEventListener("click",function(){
                alert("Produit ajouté au panier");
            });
    })

    .catch((error) => {
        console.log(error);
    }) 

