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

function photographerMediasSection (id, data) {
    const {title, images, likes, date, price} = data
    console.log(data)
    const mediasSection = document.createElement('section')
    mediasSection.setAttribute('id','medias')
    mediasSection.textContent = id + data

    return mediasSection
}


export {photographerInfosSection, photographerMediasSection}