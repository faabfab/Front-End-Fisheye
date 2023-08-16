/**
 * Fonction qui crée la template d'affichage des infos dun photographe
 * @param {JSON} data les donnés d'un photographe
 * @returns Les données du photographe et l'element DOM qui affiche les données
 */
function photographerTemplate(data) {
    const { name, city, country, price, portrait, tagline, id } = data;
    const picture = `assets/photographers/${portrait}`;
    /**
     * Fonction qui affiche selon un format les données contenues dans data
     * @returns L'element DOM à afficher
     */
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement('a')
        a.setAttribute('href','photographer.html?id='+id)
        a.setAttribute('aria-label', name)
        //a.setAttribute('tabindex','3')
        const pict = document.createElement('picture')
        pict.setAttribute('class', 'imgLayer')
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3')
        h3.textContent = city+', '+country;
        const p =document.createElement('p')
        //p.setAttribute('tabindex','4')
        p.textContent = tagline
        const p2 =document.createElement('p')
        p2.setAttribute('class','price')
        p2.textContent = price+'€/jour'
        article.appendChild(a);
        a.appendChild(pict);
        pict.appendChild(img);
        a.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p)
        article.appendChild(p2)
        return (article);
    }
    return { name, city, country, price, portrait, tagline, id, getUserCardDOM }
}

export {photographerTemplate}