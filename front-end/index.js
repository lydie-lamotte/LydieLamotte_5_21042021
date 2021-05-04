// variables


/* Api teddies*/

fetch('http://localhost:3000/api/teddies/')
    .then(Response => Response.json())
    .then(data => {
        console.log(data);

        const product = data;
        let i = product;  
              
        for (i = 0; i < product.lenght; i++){

            const productElmt = document.getElementById('cardProductTemplate'); /*choisi l'element à copier*/
            
            const product1 = productElmt.cloneNode(true); /*defini l'element a reproduire*/
            product1.classList.remove('d-none'); /*retire le display none*/
            product1.removeAttribute('id'); /* retire son id*/

            const title = document.getElementById('nameProduct');
            title.innerHTML = product.name[0];
            

            const img = document.getElementById('imageProduct');
            img.setAttribute("src", product.imageUrl);

            const description = document.getElementById('descriptionProduct');
            description.innerHTML = product.description[0];

            const price = document.getElementById('priceProduct');
            price.innerHTML = product.price[0];
            
            const link = document.getElementById('pageProduct');
            link.setAttribute("product.html","product.html?id=" + product._id);

            const section = document.getElementById('sectionProduct');
            section.appendChild(product1);


        }
    
    })
    .catch((error) => {
        console.log(error);
    }) 





