function photographerInfosSection(data) {
    const { name, city, country, price, portrait, tagline, id } = data;
    const image = `assets/photographers/${portrait}`;

    const infosSection = document.createElement('section')
    infosSection.setAttribute('id','header')
    infosSection.setAttribute('class','photograph-header')
    
    const infosText = document.createElement('div')
    infosText.setAttribute('class','photograph-infos')
    const h1 = document.createElement('h1')
    h1.textContent = name
    const h2 = document.createElement('h2')
    h2.textContent = city +', '+ country
    const p = document.createElement('p')
    p.textContent = tagline
    
    infosText.appendChild(h1)
    infosText.appendChild(h2)
    infosText.appendChild(p)

    const button = document.createElement('button')
    button.setAttribute('class','contact_button')
    button.textContent = 'Contactez-moi'

    const picture = document.createElement('picture')
    picture.setAttribute('class','imgLayer')
    const img = document.createElement('img')
    img.setAttribute('src',image)
    picture.appendChild(img)

    infosSection.appendChild(infosText)
    infosSection.appendChild(button)
    infosSection.appendChild(picture)

    return infosSection
}

// TODO: Fonction photographerMediasSection
// UNDONE: A quoi correspond l'encart rose avec le prix et comment il apparait ?
// TODO: Modale des médias

function mediasTemplate (data,id) {
    const {photographerId ,title, image, video, likes, date, price} = data
    let pict = ''
    //test si image ou vidéo
    if (image != undefined) { pict = `assets/images/${photographerId}/${image}` }
    if (video) {
        pict = video.substr(0,video.length-3)+'jpg'
        pict = `assets/images/${photographerId}/`+pict
    }
    
    function getMediasCardDOM() {
        const article = document.createElement('article')
        article.setAttribute('class', 'media')
        const a = document.createElement('a')
        a.setAttribute('href', '#')
        const picture = document.createElement('picture')
        const img = document.createElement('img')
        img.setAttribute('src', pict)
        picture.appendChild(img)
        const figcaption = document.createElement('figcaption')
        const h2= document.createElement('h2')
        h2.textContent = title
        const h3 = document.createElement('h3')
        const span = document.createElement('span') 
        span.textContent = likes+ ' '
        const i = document.createElement('i')
        i.setAttribute('class','fa-solid fa-heart')
        h3.appendChild(span)
        h3.appendChild(i)
        figcaption.appendChild(h2)
        figcaption.appendChild(h3)
        a.appendChild(picture)
        a.appendChild(figcaption)
        article.appendChild(a)
        //article.textContent = picture+' '+ title

        return article
    }
    return {photographerId, title, image, likes, date, price, getMediasCardDOM}
}

export {photographerInfosSection, mediasTemplate}