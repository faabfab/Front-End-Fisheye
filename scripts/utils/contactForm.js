
const first = document.querySelector('#first')
const last = document.querySelector('#last')
const email = document.querySelector('#email')
const message = document.querySelector('#message')

function isName(name) {
    let nameRegex = /^[a-zA-Z-\s]+$/; // regex 
    if ((name.length > 2) && nameRegex.test(name)) {
      return true
    }
    return false
  }
  
function isFirst() {
    const firstData = document.getElementById('firstData');
    if (isName(first.value)) {
        firstData.setAttribute("data-error-visible", false)
        firstData.setAttribute("data-error", "")
        return true
    }
    firstData.setAttribute("data-error-visible", true)
    firstData.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
}

/**
 * is last a valid name
 * @returns boulean
*/
function isLast() {
    const lastData = document.getElementById('lastData');
    if (isName(last.value)) {
        lastData.setAttribute("data-error-visible", false)
        lastData.setAttribute("data-error", "")
        return true
    }
    lastData.setAttribute("data-error-visible", true)
    lastData.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
}

/**
 * Email error message
 * @returns boulean
*/
function isEmail() {
    const emailData = document.getElementById('emailData');
    if (validEmail(email.value)) {
        emailData.setAttribute("data-error-visible", false)
        emailData.setAttribute("data-error", "")
        return true
    }
    emailData.setAttribute("data-error-visible", true)
    emailData.setAttribute("data-error", "Veuillez entrer un email valide.")
}

/**
 * Validation du mail
 * Retourne vrai si le mail est bien formater faux sinon
 * @param {string} mail l'adresse mail
 * @returns boolean
 */
function validEmail(mail) {
  let mailRegex = /^[a-z0-9-\.]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  if (mail != "" && mailRegex.test(mail) == true) {
    return true;
  }
}

function isMessage() {
    const messageData = document.getElementById('messageData')
    if (message.value!='') {
        messageData.setAttribute("data-error-visible", false)
        messageData.setAttribute("data-error", "")
        return true
    } else{
        messageData.setAttribute("data-error-visible", true)
        messageData.setAttribute("data-error", "Veuillez entrer un message.")
        return false
    }
}

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