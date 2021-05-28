// récupère le id du local storage
let orderId = localStorage.getItem("order_Id");

// récupère le total de la commande
let total = localStorage.getItem("total");

// Affichage de la confirmation
const validation = document.querySelector("#validation");
const confirmPage = ` 
<h2>Récapitulatif de la commande </h2>
<p class="py-2 text-center">Numéro de commande : <span><strong> ${orderId}</strong></span></p>
<p>Montant de la commande :<span><strong> ${total/100}.00€</strong></span></p>
<a href="../index.html" class="btn btn-primary my-2">Retour à l'accueil</a>
`;
validation.innerHTML = confirmPage;
// Efface le localStorage
localStorage.clear();
   