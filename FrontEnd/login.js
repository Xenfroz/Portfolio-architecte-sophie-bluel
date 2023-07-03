function returnElement(element) {
    return document.getElementById(element);
}

const btnConnexion = returnElement('btn-connexion');

btnConnexion.addEventListener('click', async function (e) {
    e.preventDefault();
    const email = returnElement('email');
    const mdp = returnElement('mdp');
    const user = {
        email: email.value,
        password: mdp.value,
    };

    const reponse = await fetch ("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const connexionInfo = await reponse.json();
    if (connexionInfo.userId === 1) {
        window.location.href = "/Frontend/index.html"
    } else {
        const contenantErreur = document.querySelector("#erreur");
        contenantErreur.innerHTML = "";
        const msgErreur = document.createElement('p');
        contenantErreur.appendChild(msgErreur);
        msgErreur.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    }
});