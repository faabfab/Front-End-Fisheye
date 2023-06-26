    /**
     * Fonction qui récupère les données du fichiers photographers.json
     * @returns Tableaux des photographes
     * return a Promise fulfilled (tenue) : l'opération a réussi
     */
    async function getPhotographers() {

        // adresse à récupérer
        let url = "./data/photographers.json"
        
        // affectation de la promise
        let response = await fetch(url);

        if (response.ok) { // if HTTP-status is 200-299
        // obtenir le corps de réponse (la méthode expliquée ci-dessous)
            // récupération des données au format JSON
            let json = await response.json()
            let photographers = json.photographers
            return({photographers : [...photographers]})
        } else { // Problème de récupération des données
            alert("HTTP-Error: " + response.status);
        }
    }

    /**
     * Affiche les données contenues dans photographers dans un format contenu dans photographerTemplate
     * @param {JSON} photographers 
     */
    async function displayData(photographers) {
        // element où se fait l'affichage
        const photographersSection = document.querySelector(".photographer_section");
        /**
         * A chaque photographe on crée une template, on crée l'affichage
         * et on l'ajoute dans .photographer_section
         */        

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }


    /**
     * Fonction d'initialisation de le page index.html
     */
    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        // affichage des photographes
        displayData(photographers);
    }
    
    init();
    
