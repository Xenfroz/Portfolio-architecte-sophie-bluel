document.body.onload = createWorks;

//Création des projets dans la galerie principale ainsi que les projets dans la modale grâce à l'API//

async function createWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const travaux = await reponse.json();

    //Création de la galerie principale//

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
        figure.setAttribute('id','figure'+travail.id);
    });

    //Creation de la galerie dans la modale//

    const galerieModale = document.querySelector(".galerie-modale");
    function affichageGalerie () {
        travaux.forEach(travail => {
            const galerieElement = document.createElement('figure');
            galerieModale.appendChild(galerieElement);
            const photo = document.createElement('img');
            photo.src = travail.imageUrl;
            galerieElement.appendChild(photo);
            const photoModifier = document.createElement('a');
            photoModifier.innerHTML = "éditer";
            galerieElement.appendChild(photoModifier);

            //Creation des boutons permettant de supprimer les travaux chargés depuis l'API//

            const boutonSuppression = document.createElement('a');
            boutonSuppression.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>';
            boutonSuppression.setAttribute('href','#');
            boutonSuppression.classList.add("bouton-suppression");
            boutonSuppression.setAttribute('id',travail.id);
            galerieElement.appendChild(boutonSuppression);
            const figure = document.getElementById('figure'+travail.id)
            boutonSuppression.addEventListener('click', function(e) {
                e.preventDefault()
                const token = window.localStorage.getItem("token");
                const reponseSuppression = fetch ("http://localhost:5678/api/works/"+boutonSuppression.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                })
                galerieElement.innerHTML = ""
                figure.innerHTML = ""

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

    //Boutons de filtres pour les 3 catégories ainsi que le bouton "tous"//

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

//Affichage des fonctionnalités d'administrateur en fonction de la présence du token//

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

//Bouton permettant d'afficher la page "ajout" de la modale//

const boutonAjout = document.getElementById("ajout-button");
boutonAjout.addEventListener('click', function() {
    document.querySelector(".galerie-wrapper").style.display = "none"
    document.querySelector(".ajout-wrapper").style.display = "flex";
    document.querySelector(".return-button").style.display = "flex";    
})

//Bouton permettant de revenir à la page initiale de la modale depuis la page ajout//

const boutonReturn = document.querySelector(".return-button");
boutonReturn.addEventListener('click', function(){
    document.querySelector(".galerie-wrapper").style.display = "flex"
    document.querySelector(".ajout-wrapper").style.display = "none";
    document.querySelector(".return-button").style.display = "none";
    resetModaleAjout();
})

//Affichage du bouton valider fonctionnel//

function affichageBoutonFonctionnel() {
    document.getElementById("bouton-valider-inactif").style.display = "none";
    document.getElementById("bouton-valider").style.display = "flex";
    
}

//Affichage du bouton valider non-fonctionnel//

function affichageBoutonInactif() {
    document.getElementById("bouton-valider-inactif").style.display = "flex";
    document.getElementById("bouton-valider").style.display = "none";
}


function resetModaleAjout() {
    const titreAReset = document.getElementById('titre');
    titre.value= "";
    closePreview();
    affichageBoutonInactif();
}

//Bouton permettant d'envoyer le projet à l'API//

const btnValider = document.getElementById('bouton-valider');
btnValider.addEventListener('click', async function (e) {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const image = document.getElementById('img-projet');
    const titre = document.getElementById('titre');
    const categorie = document.getElementById('categorie');
    const contenantErreur = document.querySelector(".erreur-container");
    if (image.value === '') { //Erreur si pas d'image//
        contenantErreur.innerHTML = "";
        const msgErreur = document.createElement('p');
        contenantErreur.appendChild(msgErreur);
        msgErreur.innerHTML = "Veuillez sélectionner un fichier";
    } if (titre.value === '') { //Erreur si pas de titre//
        contenantErreur.innerHTML = "";
        const msgErreur = document.createElement('p');
        contenantErreur.appendChild(msgErreur);
        msgErreur.innerHTML = "Veuillez donner un nom au projet";
    } else {
        const formData = new FormData();
        formData.append('image', image.files[0]);
        formData.append('title', titre.value);
        formData.append('category', categorie.value);
        const reponse2 = await fetch ("http://localhost:5678/api/works", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+token
            },
            body: formData
        })
        contenantErreur.innerHTML = "";
        resetModaleAjout();
        reponseJson = await reponse2.json()

        //Retour à la galerie de la modale//

        document.querySelector(".galerie-wrapper").style.display = "flex"
        document.querySelector(".ajout-wrapper").style.display = "none";
        document.querySelector(".return-button").style.display = "none";

        //Creation du projet dans la galerie principale localement (sans recharger la page)//

        const projetGalerie = document.querySelector(".gallery");
        const figure = document.createElement('figure');
        projetGalerie.appendChild(figure);
        const imageGalerie = document.createElement('img');
        imageGalerie.src = reponseJson.imageUrl;
        figure.appendChild(imageGalerie);
        const titreGalerie = document.createElement('figcaption');
        titreGalerie.innerText = reponseJson.title;
        figure.appendChild(titreGalerie);

        //Creation du projet dans la galerie de la modale localement (sans recharger la page)//

        const galerieModale = document.querySelector(".galerie-modale");
        const galerieElement = document.createElement('figure');
        galerieModale.appendChild(galerieElement);
        const imageNewProject = document.createElement('img');
        imageNewProject.src = reponseJson.imageUrl;
        galerieElement.appendChild(imageNewProject);
        const titreNewProject = document.createElement('figcaption');
        titreNewProject.innerText = 'éditer';
        galerieElement.appendChild(titreNewProject);

        //Creation du bouton de suppression du nouveau projet//

        const boutonSuppression = document.createElement('a');
        boutonSuppression.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>';
        boutonSuppression.setAttribute('href','#');
        boutonSuppression.classList.add("bouton-suppression");
        galerieElement.appendChild(boutonSuppression);
        boutonId = reponseJson.id;
        boutonSuppression.addEventListener('click', function(e) {
            e.preventDefault()
            const token = window.localStorage.getItem("token");
            const reponseSuppression = fetch ("http://localhost:5678/api/works/"+boutonId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                },
            })
            galerieElement.innerHTML = "";
            figure.innerHTML = "";
        })


    }
})

//Fonction preview//
const imgProjet = document.getElementById('img-projet')
imgProjet.onchange = evt => {
    const [file] = imgProjet.files
    const maxSize = 4 * 1024 * 1024
    const contenantErreur = document.querySelector(".erreur-container");
    if (file.size<=maxSize) { //Si fichier a la bonne taille le bouton devient fonctionnel//
        affichageBoutonFonctionnel();
        document.getElementById("preview").style.display = "flex"
        preview.src = URL.createObjectURL(file)
        document.querySelector(".fa-image").style.display = "none"
        document.querySelector(".custom-image").style.display = "none"
        document.querySelector(".photo-text").style.display = "none"
    } else { //Sinon message d'erreur
        contenantErreur.innerHTML = "";
        const msgErreur = document.createElement('p');
        contenantErreur.appendChild(msgErreur);
        msgErreur.innerHTML = "Image trop volumineuse";
    }
  }

let modal = null

//Fonction d'ouverture de la modale//

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

//Fonction de fermeture de la preview de l'image//

const closePreview = function(e) {
    document.getElementById("preview").style.display = "none"
    document.querySelector(".fa-image").style.display = "flex"
    document.querySelector(".custom-image").style.display = "flex"
    document.querySelector(".photo-text").style.display = "flex"
}

//Fonction de fermeture de la modale//

const closeModal = function(e) {
    if (modal === null) return
    e.preventDefault
    modal.style.display = "none"
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').removeEventListener('click', stopPropagation)
    resetModaleAjout();
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

const boutonModal = document.querySelector(".js-modal");

boutonModal.addEventListener("click", openModal);

const exitButton = document.querySelector(".exit-button")
exitButton.addEventListener("click", closeModal)
