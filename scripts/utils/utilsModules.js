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

export {getPhotographers, getPhotographer, getPhotographerId, getMedias, getMediasByID}