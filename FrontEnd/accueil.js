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

    const galeriePhoto = document.querySelector(".galerie-photo");
    travaux.forEach(travail => {
        const galerieElement = document.createElement('figure');
        galeriePhoto.appendChild(galerieElement);
        const photo = document.createElement('img');
        photo.src = travail.imageUrl;
        galerieElement.appendChild(photo);
        const photoModifier = document.createElement('a');
        photoModifier.innerHTML = "éditer";
        galerieElement.appendChild(photoModifier);
        const boutonSuppression = document.createElement('a');
        boutonSuppression.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>';
        boutonSuppression.setAttribute('href','#');
        boutonSuppression.classList.add("bouton-suppression");
        galerieElement.appendChild(boutonSuppression);
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

function displayAdmin() {
    const token = window.localStorage.getItem("token");
    if (token) {
        document.getElementById("edition").style.display = "flex";
        document.getElementById("modifier").style.display = "flex";
        document.getElementById("buttons").style.display = "none";
        document.querySelector(".login-logout").innerText = 'logout';
        const btnLogout = document.querySelector(".login-logout");

        btnLogout.addEventListener("click", function () {
            document.getElementById("edition").style.display = "none";
            document.getElementById("modifier").style.display = "none";
            document.getElementById("buttons").style.display = "flex";
            document.querySelector(".login-logout").innerText = 'login';
            window.localStorage.clear;
            window.location.href = "index.html";
        })
    }
}

displayAdmin();

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
}

const boutonModal = document.querySelector(".js-modal");

boutonModal.addEventListener("click", openModal);
