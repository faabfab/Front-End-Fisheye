/**
 * Fonction qui récupère les données du fichiers photographers.json
 * @returns Tableaux des photographes
 * return a Promise fulfilled (tenue) : l'opération a réussi
 */
async function getPhotographers() {

    // adresse à récupérer
    let url = "./data/photographers.json"
    
    // affectation de la promise
    let response = await fetch(url);

    if (response.ok) { // if HTTP-status is 200-299
    // obtenir le corps de réponse (la méthode expliquée ci-dessous)
        // récupération des données au format JSON
        let json = await response.json()
        let photographers = json.photographers
        return({photographers : [...photographers]})
    } else { // Problème de récupération des données
        alert("HTTP-Error: " + response.status);
    }
}

async function getPhotographer(id) {
    const { photographers } = await getPhotographers();
    let photograph = ''
    photographers.forEach(photographer => {
        if (photographer.id == id) {
            photograph = photographer
        }
    });
    return photograph
}

function getPhotographerId (url) {
    const param = url.substring(url.lastIndexOf('?')+1)
    const searchParams = new URLSearchParams(param);
    return searchParams.get("id")
}


async function getMedias() {

    // adresse à récupérer
    let url = "./data/photographers.json"
    
    // affectation de la promise
    let response = await fetch(url);

    if (response.ok) { // if HTTP-status is 200-299
    // obtenir le corps de réponse (la méthode expliquée ci-dessous)
        // récupération des données au format JSON
        let json = await response.json()
        let medias = json.media
        return([...medias])
    } else { // Problème de récupération des données
        alert("HTTP-Error: " + response.status);
    }
}

async function getMediasByID(id) {
    const mediasByID = getMedias()
    return mediasByID
}

function likesIncrement(elem,limite) {
    let nbLike = Number(elem.textContent)
    if (nbLike<limite) {
        nbLike++
        elem.textContent = nbLike
        return true
    } else{return false}
}

function totalLikesIncrement(bool) {
    const totalLikes = document.querySelector('#photographer_likes')
    let nbTotalLikes = Number(totalLikes.textContent)
    if (bool === true) {
        nbTotalLikes++
    }
    totalLikes.textContent = nbTotalLikes
}

// HACK: Conversion en class filterManage en constructor
function filtersManage () {
    let state = this.getAttribute('data-state')
    const filterItem = document.querySelectorAll('#filter_item')
    switch (state) {
        case 'close':
            filterItem.forEach(filter => {
                filter.removeAttribute('class')
            });        
            this.innerHTML = '<i class="fa-solid fa-chevron-up">'
            this.setAttribute('data-state','open')
            break;
        case 'open' :
            filterItem.forEach(filter => {
                if (filter.getAttribute('data-select') == 'false') {
                    filter.setAttribute('class','invisible')
                }
            });
            this.innerHTML = '<i class="fa-solid fa-chevron-down">'
            this.setAttribute('data-state','close')
            break
        default:
            break;
    }
}

function filterSelect(listItems, item, arrowElement) {
    // TODO: Changer l'ordre de la liste
    let select // selected element
    let name = item.textContent
    const ulNode = document.getElementById('filters_list')
    // TODO: ... avec appendChild
    let list = ''
    listItems.forEach(itemElement => {

       if (itemElement.textContent != name) {      
  
            itemElement.setAttribute('data-select','false')
            itemElement.setAttribute('class','invisible')
            list = list + itemElement
        } else{
            itemElement.setAttribute('data-select','true')
            select = itemElement
            ulNode.removeChild(itemElement)
        }
    });

    ulNode.prepend(select)
    console.log(ulNode)

    arrowElement.innerHTML = '<i class="fa-solid fa-chevron-down">'
    arrowElement.setAttribute('data-state','close')
    console.log('selected: '+item.textContent)
}

export {
    filtersManage,
    getPhotographers,
    getPhotographer,
    getPhotographerId,
    getMedias,
    getMediasByID,likesIncrement,
    totalLikesIncrement,
    filterSelect
}