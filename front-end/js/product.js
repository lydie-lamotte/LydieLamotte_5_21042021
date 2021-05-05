// Recuperer l'id
function getId() {
   const pageId = window.location.search;
   const id = pageId.replace("?id=","");
   return id;
   
}

fetch ("http://localhost:3000/api/teddies/" + id)
    .then (response => response.json())
    .then (data => console.log (data))

    .catch((error) => {
        console.log(error);
    }) 
