import { photographerTemplate } from "../templates/photographer.js";

import { getPhotographers } from "../utils/utilsModules.js";

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

