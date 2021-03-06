// Méthode fetch pour la récupération des données de l'API
fetch("http://localhost:3000/api/teddies/")
    .then(Response => Response.json())
    .then(data => {
        console.log(data);
        const products = data;        
      
        for (let i = 0; i < products.length; i++){            
            const product = products[i];
            //Structure HTML                     
            const productCard = `
            <div class="card col-12 col-lg-4 col-md-6 mt-4">
                <a  href="page/product.html?id=${product._id}" >
                    <img  src="${product.imageUrl}" class="card-image"  alt="page produit">
                    <div class="card-body">
                        <h2>${product.name}</h2>
                        <p class="card-text">${product.description}</p>
                        <p class="card-price h4">${product.price /100}.00€</p>
                    </div>
                </a>
            </div> `;
            // Insertion da la structure dans la section selectionné
            const sectionProducts = document.querySelector("#sectionProduct");
            sectionProducts.innerHTML += productCard;
            console.log(productCard)
        }    
    })
    .catch((error) => {
        console.log(error);
    }) 
  




