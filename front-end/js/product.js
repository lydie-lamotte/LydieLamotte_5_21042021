// PRODUIT

// Récupère l'id

const queryString_url_id = window.location.search;
const id = queryString_url_id.slice(4);
console.log(id)

// Appel la balise select
const colorSelect = document.getElementById("colorChoise");

// Récupère le produit dans l'Api avec son id
fetch("http://localhost:3000/api/teddies/" + id)
    .then (response => response.json())
    .then (data => { 
        console.log(data)

        const elements = data;
        const colors = elements.colors
        
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
            console.log(color)

            // creation d'une balise option couleur
            const colorOption = document.createElement("option");
            colorOption.setAttribute("value",color);
            colorOption.innerHTML = color;

            //ajout de l'option dans le select des couleurs
            colorSelect.appendChild(colorOption);
        }
        
    })

    .catch((error) => {
        console.log(error);
    }) 

// PANIER

document.getElementById("addCart").addEventListener("click",function(){
    alert("Produit ajouté au panier");
});



