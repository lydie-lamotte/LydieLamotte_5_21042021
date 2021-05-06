// Récuperer l'id

const queryString_url_id = window.location.search;
const id = queryString_url_id.slice(4);
console.log(id)

// Récuperer le produit dans l'Api avec son id

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

        for (let i = 0 ; i < colors.length; i = i + 1) {
            
            const color = colors[i];
            console.log(color)
            const colorSelect = document.querySelector("option");
            colorSelect.setAttribute("value",color)
            colorSelect.innerHTML = color;
            
            
        }
        
    })

    .catch((error) => {
        console.log(error);
    }) 
