const first = document.querySelector('#first')
const last = document.querySelector('#last')
const email = document.querySelector('#email')
const message = document.querySelector('#message')

/**
 * Fonction qui teste si name est un nom
 * @param {string} name mot à tester
 * @returns {boolean} résultat du test
 */
function isName(name) {
    let nameRegex = /^[a-zA-Z-\s]+$/; // regex 
    if ((name.length > 2) && nameRegex.test(name)) {
      return true
    }
    return false
  }
  
/**
 * Fonction qui retourne si first est un nom et affiche le message d'erreur
 * @returns {boolean}
 */
  function isFirst() {
    const firstData = document.getElementById('firstData');
    if (isName(first.value)) {
        firstData.setAttribute("data-error-visible", false)
        firstData.removeAttribute('tabindex')
        firstData.removeAttribute('aria-label')
        firstData.setAttribute("data-error", "")
        return true
    }
    firstData.setAttribute("data-error-visible", true)
    firstData.setAttribute("tabindex", "8")
    firstData.setAttribute("role", "text")
    firstData.setAttribute("aria-label", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
    firstData.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
    firstData.focus()
    return false
}

/**
 * Fonction qui retourne si last est un nom et affiche le message d'erreur
 * @returns {boolean}
 */
function isLast() {
    const lastData = document.getElementById('lastData');
    if (isName(last.value)) {
        lastData.setAttribute("data-error-visible", false)
        lastData.setAttribute("data-error", "")
        lastData.removeAttribute('tabindex')
        lastData.removeAttribute('aria-label')
        return true
    }
    lastData.setAttribute("data-error-visible", true)
    lastData.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
    lastData.setAttribute("tabindex", "11")
    lastData.setAttribute("role", "text")
    lastData.setAttribute("aria-label", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
    lastData.focus()
    return false
}

/**
 * Email error message
 * @returns {boolean}
*/
function isEmail() {
    const emailData = document.getElementById('emailData');
    if (validEmail(email.value)) {
        emailData.setAttribute("data-error-visible", false)
        emailData.setAttribute("data-error", "")
        emailData.removeAttribute('tabindex')
        emailData.removeAttribute('aria-label')
        return true
    }
    emailData.setAttribute("data-error-visible", true)
    emailData.setAttribute("data-error", "Veuillez entrer un email valide.")
    emailData.setAttribute("tabindex", "14")
    emailData.setAttribute("role", "text")
    emailData.setAttribute("aria-label", "Veuillez entrer un email valide.")
    emailData.focus()
    return false
}

/**
 * Validation du mail
 * Retourne vrai si le mail est bien formater faux sinon
 * @param {string} mail l'adresse mail
 * @returns {boolean}
 */
function validEmail(mail) {
  let mailRegex = /^[a-z0-9-.]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  if (mail != "" && mailRegex.test(mail) == true) {
    return true;
  }
}

/**
 * Retourne si le message est valide et affiche le message d'erreur
 * @returns {boolean}
 */
function isMessage() {
    const messageData = document.getElementById('messageData')
    if (message.value!='') {
        messageData.setAttribute("data-error-visible", false)
        messageData.setAttribute("data-error", "")
        messageData.removeAttribute('tabindex')
        messageData.removeAttribute('aria-label')
        return true
    } else{
        messageData.setAttribute("data-error-visible", true)
        messageData.setAttribute("data-error", "Veuillez entrer un message.")
        messageData.setAttribute("tabindex", "17")
        messageData.setAttribute("role", "text")
        messageData.setAttribute("aria-label", "Veuillez entrer un message.")
        messageData.focus()
        return false
    }
}

/**
 * Fonction qui valide le formulaire de contact
 * @returns {boolean}
 */
function submit() {
    if (
        isFirst()
        && isLast()
        && isEmail()
        && isMessage()
        ) {
            let messageTable = [
                ["Message de : ",first.value+' '+last.value],
                ["Email : ",email.value],
                ["Message : ",message.value]
            ]
            console.table(messageTable)
            return true
    } else{
        console.log('Message incomplet')
        return false
    }
}

export{
    submit,
    isFirst,
    isLast,
    isEmail,
    isMessage
} 