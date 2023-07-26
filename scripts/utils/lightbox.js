
// FIXME: Fonction d'affichage d'un élément du tableau avec les flèches

function displayInLightbox(el,element) {
    element.appendChild(el)
}

function lightboxElements(tab,index) {
    let title = tab[index].querySelector('h2')
    let img = tab[index].querySelector('img')
    let src = img.getAttribute('src')
    
    let lightboxContent = document.createElement('div')
    lightboxContent.setAttribute('class','lightbox_content')
    let lightboxContentImg = document.createElement('div')
    lightboxContentImg.setAttribute('class','lightbox_content_img')
    let image = document.createElement('img')
    image.setAttribute('src', src)
    let h1 = document.createElement('h1')
    h1.textContent = title.textContent
    lightboxContentImg.appendChild(image)
    lightboxContent.appendChild(lightboxContentImg)
    lightboxContent.appendChild(h1)

    return lightboxContent
    
}

function indexLightboxElement(tab) {
    let lightboxElement = document.querySelector('.lightbox_content')
    //console.log(lightboxElement)
    let indexContent = tab.indexOf(lightboxElement)
    lightboxElement.remove()
    //console.log(indexContent)
    return indexContent
}

export{
    lightboxElements,
    displayInLightbox,
    indexLightboxElement
}