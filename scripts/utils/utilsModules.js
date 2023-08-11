import { mediasDatasReturn } from "./filtersModules.js";


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

/**
 * Fonction qui retourne les informations du photographe id
 * @param {number} id identifiant du photographe
 * @returns {JSON}
 */
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

/**
 * Retourne l'id du photographe
 * @param {url} url adresse du JSON des photographes
 * @returns {number}
 */
function getPhotographerId (url) {
    const param = url.substring(url.lastIndexOf('?')+1)
    const searchParams = new URLSearchParams(param);
    return searchParams.get("id")
}

/**
 * Fonction qui retourne le tableau des médias du JSON
 * @returns {Array} Les médias d'un photographe sous forme de tableau
 */
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

/**
 * Fonction qui retourne les médias du photographe id
 * @param {number} id id du photographe
 * @returns {Array}
 */
async function getMediasByID(id) {
    const mediasByID = getMedias()
    return mediasByID
}

/**
 * Fonction qui incrémente les likes revoie si la limite est atteinte
 * @param {HTMLElement} elem media
 * @param {number} limite nombre de likes autorisé
 * @returns {boolean}
 */
function likesIncrement(elem,limite) {
    let nbLike = Number(elem.textContent)
    if (nbLike<limite) {
        nbLike++
        elem.textContent = nbLike
        return true
    } else{return false}
}

/**
 * Fonction qui incrémente le total des likes
 * @param {boolean} bool si la limite des likes est atteinte
 */
function totalLikesIncrement(bool) {
    const totalLikes = document.querySelector('#photographer_likes')
    let nbTotalLikes = Number(totalLikes.textContent)
    if (bool === true) {
        nbTotalLikes++
    }
    totalLikes.textContent = nbTotalLikes
}

/**
 * Fonction qui gère l'affichage des filtres
 * @param {HTMLElement} filtersExpand élément qui ouvre le choix des filtres
 * @param {Array} filtersItems tableau des filtres
 */
function filtersManage (filtersExpand,filtersItems) {
    let state = filtersExpand.getAttribute('data-state')
    //const filterItem = document.querySelectorAll('#filter_item')
    switch (state) {
        case 'close':
            filtersItems.forEach(filter => {
                filter.removeAttribute('class')
            });        
            filtersExpand.innerHTML = '<i class="fa-solid fa-chevron-up">'
            filtersExpand.setAttribute('data-state','open')
            break;
        case 'open' :
            filtersItems.forEach(filter => {
                if (filter.getAttribute('data-select') == 'false') {
                    filter.setAttribute('class','invisible')
                } else{
                    filter.setAttribute('class','no_border')
                }
            });
            filtersExpand.innerHTML = '<i class="fa-solid fa-chevron-down">'
            filtersExpand.setAttribute('data-state','close')
            break
        default:
            break;
    }
}

/**
 * Fonction qui affiche les médias selon le filtre sélectionné et gère la listbox
 * @param {Array} listItems liste des filtres
 * @param {HTMLElement} item filtre choisi
 * @param {HTMLElement} arrowElement listbox element
 */
function filterSelect(listItems, item, arrowElement) {
    let select // selected element
    let name = item.textContent
    let tab = []
    const ulNode = document.getElementById('filters_list')
    listItems.forEach(itemElement => {
       if (itemElement.textContent != name) {      
            itemElement.setAttribute('data-select','false')
            itemElement.removeAttribute('class','no_border')
            itemElement.setAttribute('class','invisible')
        } else{
            itemElement.setAttribute('data-select','true')
            itemElement.setAttribute('class','no_border')
            select = itemElement
            ulNode.removeChild(itemElement)
        }
    });

    ulNode.prepend(select)

    tab = mediasDatasReturn(name)
    tab.forEach(article => {
        // Affichage
        const medias = document.querySelector('#medias')
        medias.appendChild(article.element)
    });

    arrowElement.innerHTML = '<i class="fa-solid fa-chevron-down">'
    arrowElement.setAttribute('data-state','close')
}

/**
 * Fonction qui assigne un tabindex au médias
 */
function mediasTabindex() {
    let i = 12
    let articles = document.querySelectorAll('article')
    articles.forEach(article => {
        article.querySelector('picture').setAttribute('tabindex',i)
        i=i+1
        article.querySelector('h2').setAttribute('tabindex',i)
        i=i+1
        article.querySelector('span').setAttribute('tabindex',i)
        i=i+1
        article.querySelector('button').setAttribute('tabindex',i)
        i=i+1
    });
}

export {
    filtersManage,
    getPhotographers,
    getPhotographer,
    getPhotographerId,
    getMedias,
    getMediasByID,likesIncrement,
    totalLikesIncrement,
    filterSelect,
    mediasTabindex
}