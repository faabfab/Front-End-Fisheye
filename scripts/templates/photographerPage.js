function photographerInfosSection(data) {
    const { name, city, country, price, portrait, tagline, id } = data;
    const image = `assets/photographers/${portrait}`;

    const divPrice = document.getElementById('photographer_prices')
    divPrice.textContent = price

    const infosSection = document.createElement('section')
    infosSection.setAttribute('id','header')
    infosSection.setAttribute('class','photograph-header')
    
    const infosText = document.createElement('div')
    infosText.setAttribute('class','photograph-infos')
    const h1 = document.createElement('h1')
    h1.setAttribute('tabindex','2')
    h1.textContent = name
    const div = document.createElement('div')
    div.setAttribute('tabindex','3')
    const h2 = document.createElement('h2')
    h2.textContent = city +', '+ country
    const p = document.createElement('p')
    p.textContent = tagline
    
    div.appendChild(h2)
    div.appendChild(p)
    infosText.appendChild(h1)
    infosText.appendChild(div)

    const button = document.createElement('button')
    button.setAttribute('class','contact_button')
    button.setAttribute('tabindex','4')
    button.setAttribute('aria-label','Contactez moi')
    button.textContent = 'Contactez-moi'

    const picture = document.createElement('picture')
    picture.setAttribute('class','imgLayer')
    picture.setAttribute('tabindex','5')
    picture.setAttribute('aria-label',name)
    const img = document.createElement('img')
    img.setAttribute('src',image)
    picture.appendChild(img)

    infosSection.appendChild(infosText)
    infosSection.appendChild(button)
    infosSection.appendChild(picture)

    const formName = document.getElementById('photograph_name')
    formName.textContent = name

    return infosSection
}



function mediasTemplate (data,phId) {
    const {photographerId ,title, image, video, likes, date, price, id} = data
    let pict = ''
    //test si image ou vidéo
    if (image) { pict = `assets/images/${photographerId}/${image}` }
    if (video) {
        pict = video.substr(0,video.length-3)+'jpg'
        pict = `assets/images/${photographerId}/`+pict
    }
    
    
    function getMediasCardDOM() {
        
        const article = document.createElement('article')
        article.setAttribute('class', 'media')
        const picture = document.createElement('picture')
        picture.setAttribute('id','lightbox_button')
        picture.setAttribute('role','button')
        picture.setAttribute('aria-label',title)
        const img = document.createElement('img')
        img.setAttribute('src', pict)
        img.setAttribute('alt',title)
        picture.appendChild(img)
        if (video) {
            const video = document.createElement('div')
            video.setAttribute('class','is_video')
            video.innerHTML = '<i class="fa-solid fa-video"></i>'
            picture.appendChild(video)
        }
        const figcaption = document.createElement('figcaption')
        figcaption.setAttribute('data-date',date)
        const h2= document.createElement('h2')
        h2.textContent = title
        const h3 = document.createElement('h3')
        const span = document.createElement('span')
        span.setAttribute('class','likes_number')
        span.textContent = likes
        h3.appendChild(span)
        const i = document.createElement('i')
        i.setAttribute('class','fa-solid fa-heart')
        const btLike = document.createElement('button')
        btLike.setAttribute('aria-label','bouton like')
        btLike.appendChild(i)
        btLike.setAttribute('class','like_button')
        h3.appendChild(btLike)
        figcaption.appendChild(h2)
        figcaption.appendChild(h3)
        article.appendChild(picture)
        article.appendChild(figcaption)

        return article
    }

    

    return {photographerId, title, image, likes, date, price, getMediasCardDOM}
}

export {photographerInfosSection, mediasTemplate}