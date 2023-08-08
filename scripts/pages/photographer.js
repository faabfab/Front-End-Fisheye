// =============================================================================
// Ce baser sur index.js
// =============================================================================


import { getPhotographer, getPhotographerId, getMediasByID, likesIncrement, totalLikesIncrement, filtersManage, filterSelect, mediasTabindex } from "../utils/utilsModules.js"
import { photographerInfosSection, mediasTemplate } from "../templates/photographerPage.js"
import { displayInLightbox, lightboxButtonsInit, lightboxElementIndex, nextElement, openLightbox, previousElement, tabindexLightbox } from "../utils/lightbox.js"
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

    // Lightbox table init
    let articlesMedias = document.querySelectorAll('article')
    let tabData = Object.values(articlesMedias) //conversion object en tab

    const lightbox = document.querySelector('#lightbox')
    const lightboxClass = document.querySelector('.lightbox')
    //
    let elementsArrayInitials = []
    elementsArrayInitials = lightboxButtonsInit(tabData,lightboxClass)
    //

    // Filters
    const filtersExpand = document.querySelector('.list_arrow')
    const filterList = document.querySelector('#filters_list')
    const filtersItems = document.querySelectorAll('#filter_item')
    //filtersExpand.addEventListener('click', filtersManage)
    filtersExpand.addEventListener('click', (e)=>{
        e.preventDefault()
        filtersManage(filtersExpand,filtersItems)
    })
    
    // Accessibilité
    filtersExpand.addEventListener('keyup',(e)=>{
        e.preventDefault()
        //console.log(e.key)
        if (e.key==='Tab') {
            filtersManage (filtersExpand,filtersItems)
        }
    })
    
    filtersItems.forEach(filterItem => {
        filterItem.addEventListener('click',(e)=>{
            e.preventDefault()
            //remove old element
            let lightboxContentOld = document.querySelector('.lightbox_content')
            if (lightboxContentOld) {
                lightboxContentOld.remove()
            }
            filterSelect(filtersItems,filterItem,filtersExpand)
            // Tabindex
            mediasTabindex()
            // on change le tableau de la lightbox
            let articlesMedias = document.querySelectorAll('article')
            let tabData = Object.values(articlesMedias) //conversion object en tab
            elementsArrayInitials = []
            elementsArrayInitials = lightboxButtonsInit(tabData,lightboxClass)
        })
        // Accessibilité
        // FIXME: Si liste ouverte alors navigation avec Tab et Enter
        // TODO: Faire une seule fonction
        filterItem.addEventListener('keyup',(e)=>{
            e.preventDefault()
            if (e.key=='Enter') {
                //remove old element
                let lightboxContentOld = document.querySelector('.lightbox_content')
                if (lightboxContentOld) {
                    lightboxContentOld.remove()
                }
                filterSelect(filtersItems,filterItem,filtersExpand)
                // Tabindex
                mediasTabindex()
                // on change le tableau de la lightbox
                let articlesMedias = document.querySelectorAll('article')
                let tabData = Object.values(articlesMedias) //conversion object en tab
                elementsArrayInitials = []
                elementsArrayInitials = lightboxButtonsInit(tabData,lightboxClass)
            }
        })
    });

    // Lightbox events

    const closeLightboxButton = document.querySelector('.lightbox_content_close_button')
    closeLightboxButton.addEventListener('click', ()=>{
        let lightboxContentOld = document.querySelector('.lightbox_content')
        lightboxContentOld.remove()
        lightbox.setAttribute('class','invisible')
    })
    
    
    const previousBtn = document.querySelector('.left')
    const nextBtn = document.querySelector('.right')
    // TODO: Enlever le comportement de la FORM
    const inputImage = document.querySelector('.lightbox_content')


    const lightboxButtons = document.querySelectorAll('#lightbox_button')
    lightboxButtons.forEach(lightboxButton => {
        lightboxButton.addEventListener('click', ()=>{
            openLightbox(lightboxButton,lightbox,lightboxClass,elementsArrayInitials)
            // TODO: Tabindex lightbox
            let object = document.querySelector('object')
            //object.focus()
            //tabindexLightbox(elementsArrayInitials,lightboxButton)
        })

        // Accessibilité
        lightboxButton.addEventListener('keyup',(e)=>{
            if (e.key == 'Enter') {
                openLightbox(lightboxButton,lightbox,lightboxClass)
                lightbox.focus()
                //let object = document.querySelector('object')
                //object.focus()

            }
        })

    });


    previousBtn.addEventListener('click',(e)=>{
        previousElement(elementsArrayInitials,lightboxClass)
        //object.focus()
    })

    nextBtn.addEventListener('click',()=>{
        nextElement(elementsArrayInitials,lightboxClass)
    })


    document.addEventListener('keyup',(e)=>{
        // on lightbox
        if (lightbox.getAttribute('class')!='invisible') {
    
            // TODO: Simulation de tabindex avec focus()
            
            if (e.key=='ArrowLeft') { //Previous
                previousBtn.focus()
                previousElement(elementsArrayInitials,lightboxClass)
                //let object = document.querySelector('object')
                //object.focus()
            }
            if (e.key=='ArrowRight') { //Next
                nextBtn.focus()
                nextElement(elementsArrayInitials,lightboxClass)
                //let object = document.querySelector('object')
                //object.focus()
            }
            if (e.key=='Escape') {
                closeLightboxButton.focus()
                let lightboxContentOld = document.querySelector('.lightbox_content')
                lightboxContentOld.remove()
                lightbox.setAttribute('class','invisible')
            }
        }

    })
 
    // Tabindex
    mediasTabindex()

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
    
    // Accessibilité
    document.addEventListener('keyup',(e)=>{
        if (contactModal.getAttributeNames('open')[1]=='open') {
            if (e.key=='Escape') {
                contactModal.close()
            }
        }
        if (contactConfirmModal.getAttributeNames('open')[1]=='open') {
            if (e.key=='Escape') {
                contactConfirmModal.close()
            }
        }
    })

    // Form events
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
