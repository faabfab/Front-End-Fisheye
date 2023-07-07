// =============================================================================
// Ce baser sur index.js
// =============================================================================


import { displayModal, closeModal } from "../utils/contactForm.js"

import { getPhotographer, getPhotographerId, getMediasByID, likesIncrement, totalLikesIncrement } from "../utils/utilsModules.js"
import { photographerInfosSection, mediasTemplate } from "../templates/photographerPage.js"

const main = document.querySelector('main')

async function displayDataInfos(parameter, element) {
    // Les infos
    element.appendChild(photographerInfosSection(parameter))
}



async function displayDataMedias(id, element) {
    // Les médias
    const medias = await getMediasByID(id)
    // FIXME: Afficher la somme des likes

    let sommeLikes = 0
    let nbLikes = 0
    medias.forEach(media => {
        if (media.photographerId == id) {
            sommeLikes = sommeLikes + media.likes
            const mediaModel = mediasTemplate(media,id)
            nbLikes = mediasTemplate(media,id).likes
            const mediaCardDOM = mediaModel.getMediasCardDOM()
            element.appendChild(mediaCardDOM)
            //console.log(nbLikes)
        }
    });
    const photographerLikes = document.getElementById('photographer_likes')
    photographerLikes.textContent = sommeLikes
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

// FIXME: Traitement de l'incrémentation
window.onload = function () {
    // DOM
    const buttonsElements = document.querySelectorAll('.like_button')
    buttonsElements.forEach(element => {
        const likesSpan = element.parentNode.querySelector('.likes_number')
        let nbLikeLimit = Number(likesSpan.textContent)+1
        element.addEventListener('click',function (e) {
            e.preventDefault()
            totalLikesIncrement(likesIncrement(likesSpan,nbLikeLimit))
        })
    });
  }