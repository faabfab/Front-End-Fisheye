// FIXME: Faire comme la liste déroulante faire des tableaux de cartes et les réinsérer


function mediasDatasReturn(filterName) {
    const mediasCards = document.querySelectorAll('article')
    // FIXME: Faire un tableau d'objet les valeurs à tester associés à un article 
    let tab = []
    mediasCards.forEach(mediaCard => {
        switch (filterName) {
            case 'Popularité':
                let mediaLike = mediaCard.querySelector('.likes_number')
                let dataElement = new Object()
                dataElement.likes = mediaLike.textContent
                dataElement.element = mediaCard
                tab.push(dataElement)
                //console.log(mediaLike.textContent)
                
                //console.log(mediaCard)
                break;
            case 'Date':
                let mediaFigCaption = mediaCard.querySelector('figcaption')
                let mediaDate = mediaFigCaption.getAttribute('data-date')
                let dataDateElement = new Object()
                dataDateElement.date = mediaDate
                dataDateElement.element = mediaCard
                //console.log(mediaDate)
                tab.push(dataDateElement)
                //console.log(mediaCard)
                break
            case 'Titre':
                let mediaTitle = mediaCard.querySelector('h2')
                //console.log(mediaTitle.textContent)
                let dataTitleElement = new Object()
                dataTitleElement.title = mediaTitle.textContent
                dataTitleElement.element = mediaCard
                tab.push(dataTitleElement)
                //console.log(mediaCard)
                break
            default:
                break;
        }
    });
    //console.log(tab)

    // FIXME: Mettre le tableau dans l'ordre suivant les cas

    switch (filterName) {
        case 'Popularité':
            tab.sort(function(a,b){
                return a.likes - b.likes
            })
            tab = tab.reverse()

            break;
        case 'Date':
            tab.sort(function(a,b){
                if (a.date < b.date)
                    return -1;
                if (a.date > b.date)
                    return 1;
                // a doit être égal à b
                return 0;
            })
            tab = tab.reverse()
            break;
        case 'Titre':
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
        
        break;
    
        default:
            break;
    }
    return tab
}


export {
    mediasDatasReturn
}