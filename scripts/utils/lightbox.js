
// FIXME: Fonction d'affichage d'un élément du tableau avec les flèches

function displayInLightbox(el,element) {
    element.appendChild(el)
}

function lightboxElements(tab,index) {
    let title = tab[index].querySelector('h2')
    let img = tab[index].querySelector('img')
    let src = img.getAttribute('src')
    // TODO: Tester si c'est une vidéo
    let lightboxContent = document.createElement('div')
    lightboxContent.setAttribute('class','lightbox_content')
    let lightboxContentImg = document.createElement('div')
    lightboxContentImg.setAttribute('class','lightbox_content_img')
    let image
    if (tab[index].querySelector('.is_video')) {
        console.log("c'est une vidéo")
        image = document.createElement('video')
        image.setAttribute('controls','')
        image.setAttribute('width','90%')
        let source = document.createElement('source')
        source.setAttribute('type','video/mp4')
        src = src.replace('.jpg','.mp4')
        source.setAttribute('src', src)
        image.appendChild(source)
    } else {
        console.log("c'est pas une vidéo")
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
        console.log("c'est une vidéo")
        image = document.createElement('video')
        image.setAttribute('controls','')
        image.setAttribute('width','90%')
        let source = document.createElement('source')
        source.setAttribute('type','video/mp4')
        src = src.replace('.jpg','.mp4')
        source.setAttribute('src', src)
        image.appendChild(source)
    } else {
        console.log("c'est pas une vidéo")
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
        let indexContent = -1
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
        elementsArrayInitials.push(lightboxElements(tabData,tabData.indexOf(element.parentElement)))
    });
    return elementsArrayInitials
}

export{
    displayInLightbox,
    lightboxButtonsInit,
    lightboxElementIndex,
    lightboxElementByElement
}