function displayInLightbox(el,element) {
    element.prepend(el)
}

// Factory
/**
 * Factory qui retourne l'element html suivant son type (image ou vidéo)
 * @param {HTMLElement} element de la page
 * @param {String} title titre du media
 * @param {string} src path du média
 * @returns {HTMLElement}
 */
function buildMediaByType(element,title,src) {
    let image
    switch (element.querySelector('.is_video')) {
        case null: // c'est une image
            image = document.createElement('input')
            image.setAttribute('type', 'image')
            image.setAttribute('src', src)
            image.setAttribute('alt',title.textContent)
            image.setAttribute('id','input_image')
            image.setAttribute('name','image')
            image.setAttribute('role','img')
            image.setAttribute('value',' ')
            image.setAttribute('aria-label',title.textContent)
            return image
    
        default: // c'est une video
            image = document.createElement('video')
            image.setAttribute('controls','')
            image.setAttribute('class','lightbox_video')
            image.setAttribute('role','img')
            image.setAttribute('aria-label',title.textContent+ ' vidéo')
            // eslint-disable-next-line no-case-declarations
            let source = document.createElement('source')
            source.setAttribute('type','video/mp4')
            src = src.replace('.jpg','.mp4')
            source.setAttribute('src', src)
            image.appendChild(source)
            // eslint-disable-next-line no-case-declarations
            let track = document.createElement('track')
            track.setAttribute('label','English')
            track.setAttribute('kind','subtitles')
            image.appendChild(track)
            return image
    }
}

/**
 * retourne l'élément à afficher dans le lightbox
 * @param {HTMLElement} element de la page
 * @returns {HTMLElement} de la lightbox
 */
function lightboxElementByElement(element) {
    let title = element.parentElement.querySelector('h2')
    let img = element.parentElement.querySelector('img')
    let src = img.getAttribute('src')

    // FORM
    let lightboxContent = document.createElement('form')
    lightboxContent.setAttribute('class','lightbox_content')
    lightboxContent.setAttribute('aria-label',title.textContent)

    let image = buildMediaByType(element,title,src)

    //image.setAttribute('aria-label',title.textContent)
    let label = document.createElement('label')
    label.setAttribute('for','input_title')
    label.setAttribute('id','label_title')
    label.textContent = title.textContent
    let h1 = document.createElement('input')
    h1.setAttribute('type','button')
    h1.setAttribute('role','text')
    h1.setAttribute('id','input_title')    
    h1.setAttribute('id','input_title')    
    h1.setAttribute('name','input_title')    
    h1.setAttribute('value','')
    lightboxContent.appendChild(image)

    lightboxContent.appendChild(h1)
    lightboxContent.appendChild(label)

    return lightboxContent
}

/**
 * Fonction qui retourne l'index de l'élément dans le tableau
 * @param {HTMLElement} lightboxEl élément de la lightbox
 * @param {Array} elementsArrayInitials tableaux des éléments possibles de la lightbox
 * @returns {Number} index de l'élément dans le tableau
 */
function lightboxElementIndex(lightboxEl,elementsArrayInitials) {
    let h1 = lightboxEl.querySelector('#label_title')
    for (let index = 0; index < elementsArrayInitials.length; index++) {
        let h1tab = elementsArrayInitials[index].querySelector('#label_title');
        if (h1tab.textContent == h1.textContent) {
            lightboxEl.remove()
            return index
        }
    }
}

/**
 * Fonction qui renvoi le tableau des éléments susceptibles de la lightbox
 * @returns {Array} tableau des éléments susceptibles de la lightbox  
 */
function lightboxButtonsInit() {
    // Lightbox table init
    let lightboxButtons = document.querySelectorAll('#lightbox_button')
    let elementsArrayInitials = [] //tableau des éléments de la lightbox

    lightboxButtons.forEach(element => {
        let lightboxElement = lightboxElementByElement(element)
        elementsArrayInitials.push(lightboxElement)
    });
    return elementsArrayInitials
}

/**
 * Fonction qui affiche le média sélectionné dans la lightbox
 * @param {HTMLElement} lightboxButton Bouton qui ouvre la lightbox
 * @param {HTMLElement} lightbox élément lightbox
 * @param {HTMLElement} lightboxClass lieu d'affichage de l'élément
 */
function openLightbox(lightboxButton,lightbox,lightboxClass) {
    let lightboxContentOld = document.querySelector('.lightbox_content')
    if (lightboxContentOld) {
        lightboxContentOld.remove()
    }
    let el = lightboxElementByElement(lightboxButton)
    displayInLightbox(el,lightboxClass)
    lightbox.removeAttribute('class')
}

/**
 * Fonction qui affiche l'élément précédent de la lightbox
 * @param {Array} elementsArrayInitials tableau des éléments de la lightbox
 * @param {HTMLElement} lightboxClass élément contenant la lightbox
 */
function previousElement(elementsArrayInitials,lightboxClass) {
    let lightboxEl = document.querySelector('.lightbox_content')
    let indexContent = lightboxElementIndex(lightboxEl,elementsArrayInitials)
    if (indexContent>0) {            
        displayInLightbox(elementsArrayInitials[indexContent-1],lightboxClass)
    } else {
        displayInLightbox(elementsArrayInitials[elementsArrayInitials.length-1],lightboxClass)
    }
}

/**
 * Fonction qui affiche l'élément suivant de la lightbox
 * @param {Array} elementsArrayInitials tableau des éléments de la lightbox
 * @param {HTMLElement} lightboxClass élément contenant la lightbox
 */
function nextElement(elementsArrayInitials,lightboxClass) {
    let lightboxEl = document.querySelector('.lightbox_content')
    let indexContent = lightboxElementIndex(lightboxEl,elementsArrayInitials)
    if (indexContent<(elementsArrayInitials.length-1)) {           
        displayInLightbox(elementsArrayInitials[indexContent+1],lightboxClass)
    } else {
        displayInLightbox(elementsArrayInitials[0],lightboxClass)
    }
}

/**
 * Fonction qui assigne le tabindex aux médias
 * @param {Array} tab éléments de le lightbox
 * @param {HTMLElement} el élément de la lightbox
 */
function tabindexLightbox(tab,el) {
    let firstIndex = 12 + lightboxElementIndex(el,tab) + 1
    let img = el.querySelector('img')
    let h1 = el.querySelector('h1')
    img.setAttribute('tabindex',firstIndex)
    h1.setAttribute('tabindex',firstIndex+1)
}

/**
 * Fonction qui inactive la form de la lightbox
 */
function inactiveLightboxForm() {
    let inputImage = document.querySelector('#input_image')
    if (inputImage) {
        inputImage.addEventListener('click',(e)=>{
            e.preventDefault()
        })
    }
}

export{
    displayInLightbox,
    lightboxButtonsInit,
    lightboxElementIndex,
    lightboxElementByElement,
    openLightbox,
    previousElement,
    nextElement,
    tabindexLightbox,
    inactiveLightboxForm
}