// =============================================================================
// Ce baser sur index.js
// =============================================================================


import { getPhotographer, getPhotographerId, getMediasByID, likesIncrement, totalLikesIncrement, filtersManage, filterSelect } from "../utils/utilsModules.js"
import { photographerInfosSection, mediasTemplate } from "../templates/photographerPage.js"
import { lightboxElements, displayInLightbox, indexLightboxElement } from "../utils/lightbox.js"

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
    filtersItems.forEach(filterItem => {
        filterItem.addEventListener('click',(e)=>{
            e.preventDefault()
            filterSelect(filtersItems,filterItem,filtersExpand)
        })
    });

    // Lightbox events

    const articlesMedias = document.querySelectorAll('article')
    const tabData = Object.values(articlesMedias) //conversion object en tab
    //console.log(tabData)

    const lightbox = document.querySelector('#lightbox')
    const lightboxClass = document.querySelector('.lightbox')
    const lightboxButtons = document.querySelectorAll('#lightbox_button')
    const elementsArray = [] //tableau des éléments de la lightbox
    lightboxButtons.forEach(element => {
        elementsArray.push(lightboxElements(tabData,tabData.indexOf(element.parentElement)))
    });

    const closeLightboxButton = document.querySelector('.lightbox_content_close_button')
    lightboxButtons.forEach(lightboxButton => {
        lightboxButton.addEventListener('click', ()=>{
            lightbox.showModal()
            displayInLightbox(elementsArray[tabData.indexOf(lightboxButton.parentElement)],lightboxClass)
        })
    });
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
        let indexContent = indexLightboxElement(elementsArray)
        if (indexContent>0) {            
            displayInLightbox(elementsArray[indexContent-1],lightboxClass)
        } else {
            displayInLightbox(elementsArray[elementsArray.length-1],lightboxClass)
        }
    })
    
    nextBtn.addEventListener('click',()=>{
        // TODO: Bon principe. Faire test si en fin de tableau
        let indexContent = indexLightboxElement(elementsArray)
        if (indexContent<(elementsArray.length-1)) {            
            displayInLightbox(elementsArray[indexContent+1],lightboxClass)
        } else {
            displayInLightbox(elementsArray[0],lightboxClass)
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
}

init()
