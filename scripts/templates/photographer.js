/**
 * Fonction qui crée la template d'affichage des infos dun photographe
 * @param {JSON} data les donnés d'un photographe
 * @returns Les données du photographe et l'element DOM qui affiche les données
 */
function photographerTemplate(data) {
    const { name, portrait, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    /**
     * Fonction qui affiche selon un format les données contenues dans data
     * @returns L'element DOM à afficher
     */
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p =document.createElement('p')
        p.textContent = tagline
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p)
        return (article);
    }
    return { name, picture, tagline, getUserCardDOM }
}
