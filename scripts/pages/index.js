    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }

    // console.log(getPhotographers())
    // return a Promise fulfilled (tenue) : l'opération a réussi

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
    
