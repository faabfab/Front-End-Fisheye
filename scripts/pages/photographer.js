// =============================================================================
// Ce baser sur index.js
// =============================================================================


import { getPhotographer, getPhotographerId, getMediasByID, likesIncrement, totalLikesIncrement, filtersManage, filterSelect } from "../utils/utilsModules.js"
import { photographerInfosSection, mediasTemplate } from "../templates/photographerPage.js"
import { lightboxElements, displayInLightbox, indexLightboxElement } from "../utils/lightbox.js"
import { submit, isFirst, isLast, isEmail, isMessage } from "../utils/contactForm.js"

const main = document.querySelector('main')
const photographerInfos = document.querySelector('#photographer_infos')

async function displayDataInfos(parameter, element) {
    // Les infos
    element.appendChild(photographerInfosSection(parameter))
}


async function displayDataMedias(id, element) {
    // Les médias
    const medias = await getMediasByID(id)

    let sommeLikes = 0
    let nbLikes = 0
    medias.forEach(media => {
        if (media.photographerId == id) {
            sommeLikes = sommeLikes + media.likes
            const mediaModel = mediasTemplate(media,id)
            nbLikes = mediasTemplate(media,id).likes
            const mediaCardDOM = mediaModel.getMediasCardDOM()
            element.appendChild(mediaCardDOM)

        }
    });

    // Gestion des likes
    const buttonsLikes = document.querySelectorAll('.like_button')
    buttonsLikes.forEach(element => {
        const likesSpan = element.parentNode.querySelector('.likes_number')
        let nbLikeLimit = Number(likesSpan.textContent)+1
        element.addEventListener('click',function (e) {
            totalLikesIncrement(likesIncrement(likesSpan,nbLikeLimit))
        })
    });
    const photographerLikes = document.getElementById('photographer_likes')
    photographerLikes.textContent = sommeLikes

    // Filters
    const filtersExpand = document.querySelector('.list_arrow')
    filtersExpand.addEventListener('click', filtersManage)
    
    const filtersItems = document.querySelectorAll('#filter_item')
    const elementsArrayFilters = [] //tableau des éléments de la lightbox
    filtersItems.forEach(filterItem => {
        filterItem.addEventListener('click',(e)=>{
            e.preventDefault()
            filterSelect(filtersItems,filterItem,filtersExpand)
            // TODO: Faire tableau de la lightbox ici
            // TODO: Renvoyer le tableau le transmettre au listener des flèches
            // BUG: ::backdrop dans element quand la dialog est ouverte
            let lightboxButtons = document.querySelectorAll('#lightbox_button')
            lightboxButtons.forEach(element => {
                elementsArrayFilters.push(lightboxElements(tabData,tabData.indexOf(element.parentElement)))
                console.log(lightboxElements(tabData,tabData.indexOf(element.parentElement)))
            });            
            //console.log(elementsArrayFilters)
        })
    });

    // Lightbox events

    const articlesMedias = document.querySelectorAll('article')
    const tabData = Object.values(articlesMedias) //conversion object en tab
    //console.log(tabData)

    const lightbox = document.querySelector('#lightbox')
    const lightboxClass = document.querySelector('.lightbox')
    let lightboxButtons = document.querySelectorAll('#lightbox_button')
    // TODO: Faire le tableau juste avant l'ouverture de la modale
    let elementsArrayInitials = [] //tableau des éléments de la lightbox
    lightboxButtons.forEach(element => {
        elementsArrayInitials.push(lightboxElements(tabData,tabData.indexOf(element.parentElement)))
    });

    lightboxButtons.forEach(lightboxButton => {
        //elementsArray.push(lightboxElements(tabData,tabData.indexOf(lightboxButton.parentElement)))
        lightboxButton.addEventListener('click', ()=>{
            displayInLightbox(elementsArrayInitials[tabData.indexOf(lightboxButton.parentElement)],lightboxClass)
            lightbox.showModal()
        })
    });

    const closeLightboxButton = document.querySelector('.lightbox_content_close_button')
    closeLightboxButton.addEventListener('click', ()=>{
        // Efface l'élément avant de fermer
        lightbox.close()
        let lightboxContentOld = document.querySelector('.lightbox_content')
        lightboxContentOld.remove()
    })
    // FIXME: Dialog lightbox prb

    // FIXME: Arrows events    
    const previousBtn = document.querySelector('.left')
    const nextBtn = document.querySelector('.right')

    previousBtn.addEventListener('click',()=>{
        //console.log(elementsArrayInitials.length)
        //console.log(elementsArrayFilters.length)
        
        /*if (elementsArrayFilters.length==0) {
            console.log(indexLightboxElement(elementsArrayInitials))
            let indexContent = indexLightboxElement(elementsArrayInitials)
            console.log(indexContent)
            console.log(elementsArrayInitials)
            if (indexContent>0) {            
                displayInLightbox(elementsArrayInitials[indexContent-1],lightboxClass)
            } else {
                displayInLightbox(elementsArrayInitials[elementsArrayInitials.length-1],lightboxClass)
            }
        } else{
            let indexContent = indexLightboxElement(elementsArrayFilters)
            console.log(indexContent)
            //console.log(elementsArrayFilters)
            elementsArrayFilters.forEach(element => {
                let test = Object.keys(element)
                console.log(getComputedStyle(element,'::backdrop'))
            });
            if (indexContent>0) {            
                displayInLightbox(elementsArrayFilters[indexContent-1],lightboxClass)
            } else {
                displayInLightbox(elementsArrayFilters[elementsArrayFilters.length-1],lightboxClass)
            }

        }*/
        let indexContent = indexLightboxElement(elementsArrayInitials)
        elementsArrayFilters.forEach(element => {
            
            console.log(element)
        });
        if (indexContent>0) {            
            displayInLightbox(elementsArrayInitials[indexContent-1],lightboxClass)
        } else {
            displayInLightbox(elementsArrayInitials[elementsArrayInitials.length-1],lightboxClass)
        }
    })

    nextBtn.addEventListener('click',()=>{
        // FIXME: Bon principe. Faire test si en fin de tableau

        let indexContent = indexLightboxElement(elementsArrayInitials)
        if (indexContent<(elementsArrayInitials.length-1)) {            
            displayInLightbox(elementsArrayInitials[indexContent+1],lightboxClass)
        } else {
            displayInLightbox(elementsArrayInitials[0],lightboxClass)
        }
    })

}


async function init() {
    const url = document.location.href
    const id = getPhotographerId(url)
    // Récupère les datas du photographe
    const photograph = await getPhotographer(id)
    // affichage les infos du photographe
    displayDataInfos(photograph,photographerInfos);
    const mediasSection = document.createElement('section')
    mediasSection.setAttribute('id','medias')
    main.appendChild(mediasSection)
    const photographerMedias = document.getElementById('medias')
    const { PhotographMedias } = getMediasByID(photograph)
    displayDataMedias(id,photographerMedias);
    
    // Contact modal
    const contactModal = document.querySelector('#contact_modal')

    const contactButton = document.querySelector('.contact_button')
    contactButton.addEventListener('click', ()=>{
        contactModal.showModal()
    })
    const closeButton = document.querySelector('.closeButton')
    closeButton.addEventListener('click' , ()=>{
        contactModal.close()
    })

    const contactConfirmModal = document.querySelector('#contact_modal_confirm')
    const submitButton = document.querySelector('#submit_button')
    submitButton.addEventListener('click',()=>{
        if (submit()) {            
            contactModal.close()
            contactConfirmModal.showModal()
        } else{ console.log('Message invalide') }
    })
    const closeConfirmButton = document.querySelector('#close_confirm_button')
    closeConfirmButton.addEventListener('click',()=>{
        contactConfirmModal.close()
    })

    // FORM EVENTS
    const first = document.getElementById('first');
    first.addEventListener('focusout', function (e) {
        e.preventDefault()
        isFirst()
    });

    const last = document.getElementById('last');
    last.addEventListener('focusout', function (e) {
        e.preventDefault()
        isLast()
    });

    const email = document.getElementById('email');
    email.addEventListener('focusout', function (e) {
        e.preventDefault()
        isEmail()
    });

    const message = document.getElementById('message')
    message.addEventListener('focusout',(e)=>{
        e.preventDefault()
        isMessage()
    })
}

init()
