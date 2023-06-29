function photographerInfos(data) {
    const { name, city, country, price, portrait, tagline, id } = data;
        // =========================================================================
    // Infos texte
    // =========================================================================
    const photographerName = document.querySelector(".photograph-infos h1")
    photographerName.textContent = name
    const photographerLocation = document.querySelector(".photograph-infos h2")
    photographerLocation.textContent = city +', '+ country
    const photographerTagline = document.querySelector(".photograph-infos p")
    photographerTagline.textContent = tagline
    // =========================================================================
    // Photo du photographe
    // =========================================================================
    const photographerPicture = document.querySelector(".photograph-picture")
    const photographerImage = `assets/photographers/`+portrait;
    photographerPicture.setAttribute('src', photographerImage )
}

export {photographerInfos}