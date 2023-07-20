function itemPosition(tabItems,item) {
    let i = 0
    tabItems.forEach(e => {
        console.log(e != item)
        if (e != item) {
            i++
        } else{
            return i
        }  
        // TODO: Tant que l'élément sélctionné est différent de lélément on le met dans tabBefore

    });
}


function openLightbox(element) {
    console.log(element)
    // TODO: Faire un tableau qui démarre de l'élément sélectionné et l'afficher
    const articlesMedias = document.querySelectorAll('article')
    let tabBefore = []
    let tab = Object.values(articlesMedias)
    console.log(tab.indexOf(element)) // position de l'élément
    
}

export{
    openLightbox
}