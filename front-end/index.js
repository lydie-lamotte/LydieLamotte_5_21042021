// Api teddies

fetch("http://localhost:3000/api/teddies/")
    .then(Response => Response.json())
    .then(data => {
        console.log(data);

        const products = data; 
        
        const section = document.getElementById("sectionProduct");        
        
              
        for (let i = 0; i < products.length; i++){
            
            const product = products[i];
            
            const productElmt = document.getElementById("cardProductTemplate"); /*choisi l'element à copier*/
           
            const product1 = productElmt.cloneNode(true); /*defini l'element a reproduire*/
            product1.classList.remove("d-none"); /*retire le display none*/
            product1.removeAttribute("id"); /* retire son id*/
           
            const title = document.getElementById("nameProduct");
            title.innerHTML = product.name;
         

            const img = document.getElementById("imageProduct");
            img.setAttribute ("src", product.imageUrl);

            const description = document.getElementById("descriptionProduct");
            description.innerHTML = product.description;

            const price = document.getElementById("priceProduct");
            price.innerHTML = product.price / 100 + ".00€";
            
            const link = document.getElementById("pageProduct");
            link.setAttribute("href", "product.html?id=" + product._id);    
            
            section.appendChild(product1);
            
        }
    
    })
    .catch((error) => {
        console.log(error);
    }) 





