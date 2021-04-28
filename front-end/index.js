/* Api teddies*/

fetch('http://localhost:3000/api/teddies')
    .then(Response => Response.json())
    .then(data => console.log(data))

