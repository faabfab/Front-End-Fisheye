/**
 * fonction qui retourne le tableau des médias ranger selon la popularité croissante
 * @param {HTMLElement} mediaCards conteneur des médias
 * @returns {Array}
 */
function popularityFilter(mediaCards) {
    let tab = []
    mediaCards.forEach(mediaCard => {
        let mediaLike = mediaCard.querySelector('.likes_number')
        let dataElement = new Object()
        dataElement.likes = mediaLike.textContent
        dataElement.element = mediaCard
        tab.push(dataElement)
        });
    tab.sort(function(a,b){
        return a.likes - b.likes
    })
    tab = tab.reverse()
    return tab
}

/**
 * fonction qui retourne le tableau des médias ranger selon la date décroissante
 * @param {HTMLElement} mediaCards conteneur des médias
 * @returns {Array}
 */
function dateFilter(mediaCards) {
    let tab = []
    mediaCards.forEach(mediaCard => {
        let mediaFigCaption = mediaCard.querySelector('figcaption')
        let mediaDate = mediaFigCaption.getAttribute('data-date')
        let dataDateElement = new Object()
        dataDateElement.date = mediaDate
        dataDateElement.element = mediaCard
        tab.push(dataDateElement)
    });
    tab.sort(function(a,b){
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    })
    tab = tab.reverse()
    return tab
    
}

/**
 * fonction qui retourne le tableau des médias ranger selon l'ordre alphabétique des titres
 * @param {HTMLElement} mediaCards conteneur des médias
 * @returns {Array}
 */
function titleFilter(mediaCards) {
    let tab = []
    mediaCards.forEach(mediaCard => {
        let mediaTitle = mediaCard.querySelector('h2')
        let dataTitleElement = new Object()
        dataTitleElement.title = mediaTitle.textContent
        dataTitleElement.element = mediaCard
        tab.push(dataTitleElement)
    });
    tab.sort(function (a,b) {
        // Si  est inférieur à 0, on trie a avec un indice inférieur à b (a sera classé avant b)
        // Si renvoie 0, on laisse a et b inchangés l'un par rapport à l'autre, mais triés par rapport à tous les autres éléments
        // Si est supérieur à 0, on trie b avec un indice inférieur à a
        if (a.title < b.title)
            return -1;
        if (a.title > b.title)
            return 1;
        // a doit être égal à b
        return 0;
    })
    return tab
}

/**
 * Fonction qui retourne un tableau d'éléments selon le filtre sélectionné
 * @param {string} filterName nom du filtre
 * @returns {Array}
 */
function mediasDatasReturn(filterName) {
    const mediasCards = document.querySelectorAll('article')

    switch (filterName) {
        case 'Popularité':
            return popularityFilter(mediasCards)
        case 'Date':
            return dateFilter(mediasCards)
        case 'Titre':
            return titleFilter(mediasCards)
        default:
            break;
    }
}

export {
    mediasDatasReturn
}