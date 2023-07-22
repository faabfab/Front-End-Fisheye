
// FIXME: Fonction d'affichage d'un élément du tableau avec les flèches
function displayLightboxElement(tab,index) {
    let lightbox = document.querySelector('#lightbox')
    let lightboxContentOld = document.querySelector('.lightbox_content')

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
    lightbox.appendChild(lightboxContent)

}

function openLightbox(element) {

    // FIXME: Faire un tableau qui démarre de l'élément sélectionné
    const articlesMedias = document.querySelectorAll('article')
    let tab = Object.values(articlesMedias) //conversion object en tab
    let elementIndex = tab.indexOf(element)

    displayLightboxElement(tab,elementIndex)
}

export{
    openLightbox
}