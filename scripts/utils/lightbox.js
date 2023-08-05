

function displayInLightbox(el,element) {
    element.appendChild(el)
}

function lightboxElementByElement(element) {
    let title = element.parentElement.querySelector('h2')
    let img = element.parentElement.querySelector('img')
    let src = img.getAttribute('src')
    let lightboxContent = document.createElement('div')
    lightboxContent.setAttribute('class','lightbox_content')
    let lightboxContentImg = document.createElement('div')
    lightboxContentImg.setAttribute('class','lightbox_content_img')
    let image
    if (element.querySelector('.is_video')) {
        //console.log("c'est une vidéo")
        image = document.createElement('video')
        image.setAttribute('controls','')
        image.setAttribute('width','90%')
        let source = document.createElement('source')
        source.setAttribute('type','video/mp4')
        src = src.replace('.jpg','.mp4')
        source.setAttribute('src', src)
        image.appendChild(source)
    } else {
        //console.log("c'est pas une vidéo")
        image = document.createElement('img')
        image.setAttribute('src', src)
    }
    let h1 = document.createElement('h1')
    h1.textContent = title.textContent
    lightboxContentImg.appendChild(image)
    lightboxContent.appendChild(lightboxContentImg)
    lightboxContent.appendChild(h1)

    return lightboxContent
}

function lightboxElementIndex(lightboxEl,elementsArrayInitials) {
    let h1 = lightboxEl.querySelector('h1')
    for (let index = 0; index < elementsArrayInitials.length; index++) {
        let h1tab = elementsArrayInitials[index].querySelector('h1');
        if (h1tab.textContent== h1.textContent) {
            lightboxEl.remove()
            return index
        }
    }
}

function lightboxButtonsInit() {
        // Lightbox table init
    let articlesMedias = document.querySelectorAll('article')
    let tabData = Object.values(articlesMedias) //conversion object en tab
    let lightboxButtons = document.querySelectorAll('#lightbox_button')
    let elementsArrayInitials = [] //tableau des éléments de la lightbox

    lightboxButtons.forEach(element => {
        let lightboxElement = lightboxElementByElement(element)
        elementsArrayInitials.push(lightboxElement)
    });
    return elementsArrayInitials
}

function openLightbox(lightboxButton,lightbox,lightboxClass) {
    let lightboxContentOld = document.querySelector('.lightbox_content')
    if (lightboxContentOld) {
        lightboxContentOld.remove()
    }
    let el = lightboxElementByElement(lightboxButton)
    displayInLightbox(el,lightboxClass)
    lightbox.removeAttribute('class')
}

function previousElement(elementsArrayInitials,lightboxClass) {
    let lightboxEl = document.querySelector('.lightbox_content')
    let indexContent = lightboxElementIndex(lightboxEl,elementsArrayInitials)
    if (indexContent>0) {            
        displayInLightbox(elementsArrayInitials[indexContent-1],lightboxClass)
    } else {
        displayInLightbox(elementsArrayInitials[elementsArrayInitials.length-1],lightboxClass)
    }
}

function nextElement(elementsArrayInitials,lightboxClass) {
    let lightboxEl = document.querySelector('.lightbox_content')
    let indexContent = lightboxElementIndex(lightboxEl,elementsArrayInitials)
    if (indexContent<(elementsArrayInitials.length-1)) {           
        displayInLightbox(elementsArrayInitials[indexContent+1],lightboxClass)
    } else {
        displayInLightbox(elementsArrayInitials[0],lightboxClass)
    }
}

export{
    displayInLightbox,
    lightboxButtonsInit,
    lightboxElementIndex,
    lightboxElementByElement,
    openLightbox,
    previousElement,
    nextElement
}