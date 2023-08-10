function displayInLightbox(el,element) {
    element.prepend(el)
}

// TODO: Tester les aria et role pour l'accessibilité
function lightboxElementByElement(element) {
    let title = element.parentElement.querySelector('h2')
    let img = element.parentElement.querySelector('img')
    let src = img.getAttribute('src')

    // FORM
    let lightboxContent = document.createElement('form')
    lightboxContent.setAttribute('class','lightbox_content')
    lightboxContent.setAttribute('aria-label',title.textContent)

    let image

    if (element.querySelector('.is_video')) {
        image = document.createElement('video')
        image.setAttribute('controls','')
        image.setAttribute('class','lightbox_video')
        //image.setAttribute('width','100%')
        //image.setAttribute('height','85%')
        let source = document.createElement('source')
        source.setAttribute('type','video/mp4')
        src = src.replace('.jpg','.mp4')
        source.setAttribute('src', src)
        image.appendChild(source)
        let track = document.createElement('track')
        track.setAttribute('label','English')
        track.setAttribute('kind','subtitles')
        image.appendChild(track)
    } else {
        image = document.createElement('input')
        image.setAttribute('type', 'image')
        image.setAttribute('src', src)
        image.setAttribute('alt',title.textContent)
        image.setAttribute('id','input_image')
        image.setAttribute('name','image')
        image.setAttribute('role','img')
        image.setAttribute('value',' ')
    }
    image.setAttribute('aria-label',title.textContent)
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

function openLightbox(lightboxButton,lightbox,lightboxClass,elementsArrayInitials) {
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

function tabindexLightbox(tab,el) {

    let firstIndex = 12 + lightboxElementIndex(el,tab) + 1
    let img = el.querySelector('img')
    let h1 = el.querySelector('h1')
    console.log(img)
    img.setAttribute('tabindex',firstIndex)
    h1.setAttribute('tabindex',firstIndex+1)
}

function inactiveLightboxForm() {
    let inputImage = document.querySelector('#input_image')
    if (inputImage) {
        inputImage.addEventListener('click',(e)=>{
            e.preventDefault()
        })
    }
    //inputImage.focus()
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