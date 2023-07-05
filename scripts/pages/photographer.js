// =============================================================================
// Ce baser sur index.js
// =============================================================================

//TODO: Faire displayData

import { displayModal, closeModal } from "../utils/contactForm.js"

import { getPhotographer, getPhotographerId, getMediasByID } from "../utils/utilsModules.js"
import { photographerInfosSection, mediasTemplate } from "../templates/photographerPage.js"

const main = document.querySelector('main')

async function displayDataInfos(parameter, element) {
    // Les infos
    element.appendChild(photographerInfosSection(parameter))
}



async function displayDataMedias(id, element) {
    // Les médias
    const medias = await getMediasByID(id)
    medias.forEach(media => {
        if (media.photographerId == id) {
            const mediaModel = mediasTemplate(media,id)
            const mediaCardDOM = mediaModel.getMediasCardDOM()
            element.appendChild(mediaCardDOM)
        }
    });
}

async function init() {
    const url = document.location.href
    const id = getPhotographerId(url)
    // Récupère les datas du photographe
    const photograph = await getPhotographer(id)
    // affichage les infos du photographe
    displayDataInfos(photograph,main);

    const mediasSection = document.createElement('section')
    mediasSection.setAttribute('id','medias')
    main.appendChild(mediasSection)
    const photographerMedias = document.getElementById('medias')
    const { medias } = await getMediasByID
    displayDataMedias(id,photographerMedias);



    // DOM Events
    const contactButton = document.querySelector('.contact_button')
    contactButton.addEventListener('click',displayModal)
    const closeButton = document.querySelector('.closeButton')
    closeButton.addEventListener('click',closeModal)
}

init();