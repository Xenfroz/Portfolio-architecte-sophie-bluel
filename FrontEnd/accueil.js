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
    function affichageGalerie () {
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
            boutonId = travail.id
            boutonSuppression.addEventListener('click', function(e) {
                e.preventDefault()
                const token = window.localStorage.getItem("token");
                const reponse = fetch ("http://localhost:5678/api/works/"+boutonId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                })
                galerieElement.innerHTML = ""
            })
            const boutonAjout = document.getElementById("ajout-button");
            boutonAjout.addEventListener('click', function() {
                document.querySelector(".galerie-wrapper").style.display = "none"
                document.querySelector(".ajout-wrapper").style.display = "flex";
                document.querySelector(".return-button").style.display = "flex";

                const btnValider = document.getElementById('bouton-valider');

                btnValider.addEventListener('click', async function (e) {
                    e.preventDefault();
                    const token = window.localStorage.getItem("token");
                    const image = document.getElementById('img');
                    const titre = document.getElementById('titre');
                    const categorie = document.getElementById('categorie');
                    const formData = new FormData();
                    formData.append('image', img.files[0]);
                    formData.append('titre', titre.value);
                    formData.append('categorie', categorie.value);
                    console.log(formdata)
                    const reponse = await fetch ("http://localhost:5678/api/works", {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer '+token
                        },
                        body: formData
                    })
                })
            })
            const boutonReturn = document.querySelector(".return-button");
            boutonReturn.addEventListener('click', function(){
                document.querySelector(".galerie-wrapper").style.display = "flex"
                document.querySelector(".ajout-wrapper").style.display = "none";
                document.querySelector(".return-button").style.display = "none";
            })
        });
    };

    affichageGalerie();

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
    const btnLogout = document.querySelector(".login-logout");
    if (token=== null) {
        document.getElementById("edition").style.display = "none";
        document.getElementById("modifier1").style.display = "none";
        document.getElementById("modifier2").style.display = "none";
        document.getElementById("buttons").style.display = "flex";
        document.querySelector(".login-logout").innerText = 'login';
        btnLogout.addEventListener("click", function () {
            window.location.href = "login.html"
        })

    } else {
        document.getElementById("edition").style.display = "flex";
        document.getElementById("modifier1").style.display = "flex";
        document.getElementById("modifier2").style.display = "flex";
        document.getElementById("buttons").style.display = "none";
        document.querySelector(".login-logout").innerText = 'logout';
        btnLogout.addEventListener("click", function () {
            window.localStorage.clear();
            displayAdmin();
    })
    }
};

displayAdmin();

let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    document.querySelector(".galerie-wrapper").style.display = "flex";
    document.querySelector(".ajout-wrapper").style.display = "none";
    document.querySelector(".return-button").style.display = "none";
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').addEventListener('click', stopPropagation)
}

const closeModal = function(e) {
    if (modal === null) return
    e.preventDefault
    modal.style.display = "none"
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const boutonModal = document.querySelector(".js-modal");

boutonModal.addEventListener("click", openModal);
