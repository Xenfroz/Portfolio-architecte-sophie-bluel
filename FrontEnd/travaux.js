document.body.onload = createWorks;

async function createWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const travaux = await reponse.json();

    const projetGalerie = document.querySelector(".gallery");
    travaux.forEach(travail => {
        const figure = document.createElement('figure');
        projetGalerie.appendChild(figure);
        const image = document.createElement('img');
        image.src = travail.imageUrl;
        figure.appendChild(image);
        const titre = document.createElement('figcaption');
        titre.innerText = travail.title;
        figure.appendChild(titre);
    });

    function affichageTravaux (projets) {
        projets.forEach(travail => {
            const figure = document.createElement('figure');
            projetGalerie.appendChild(figure);
            const image = document.createElement('img');
            image.src = travail.imageUrl;
            figure.appendChild(image);
            const titre = document.createElement('figcaption');
            titre.innerText = travail.title;
            figure.appendChild(titre);
        });
    }

    const boutonTous = document.querySelector(".btn-tous");

    boutonTous.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = '';
        affichageTravaux(travaux);
    });

    const boutonObjet = document.querySelector(".btn-objet");

    boutonObjet.addEventListener("click", function () {
        const travauxObjets = travaux.filter(function (travail) {
            return travail.categoryId === 1;
        });
        document.querySelector(".gallery").innerHTML = '';
        affichageTravaux(travauxObjets);
    });
    
    const boutonAppartement = document.querySelector(".btn-appartement");

    boutonAppartement.addEventListener("click", function () {
        const travauxAppartement = travaux.filter(function (travail) {
            return travail.categoryId === 2;
        });
        document.querySelector(".gallery").innerHTML = '';
        affichageTravaux(travauxAppartement);
    });

    const boutonHotelRestaurant = document.querySelector(".btn-hotel-restaurant");

    boutonHotelRestaurant.addEventListener("click", function () {
        const travauxHotelRestaurant = travaux.filter(function (travail) {
            return travail.categoryId === 3;
        });
        document.querySelector(".gallery").innerHTML = '';
        affichageTravaux(travauxHotelRestaurant);
    });

}