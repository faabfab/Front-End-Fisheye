// =============================================================================
// Ce baser sur index.js
// =============================================================================

// TODO: Faire displayData

import { displayModal, closeModal } from "../utils/contactForm.js"
const contactButton = document.querySelector('.contact_button')
contactButton.addEventListener('click',displayModal)
const closeButton = document.querySelector('.closeButton')
closeButton.addEventListener('click',closeModal)

import { getPhotographer, getPhotographerId } from "../utils/utilsModules.js"
import { photographerInfos } from "../templates/photographerPage.js"

async function displayData(parameter) {
    // Les infos
    photographerInfos(parameter)
    // Les médias



}

async function init() {
    const url = document.location.href
    const id = getPhotographerId(url)
    // Récupère les datas du photographe
    // FIXME: Fallait mettre "await" attendre la promise fonction "async" => "await"
    const photograph = await getPhotographer(id)
    // affichage les infos du photographe
    displayData(photograph);
}

init();