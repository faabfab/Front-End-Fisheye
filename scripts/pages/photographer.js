//Mettre le code JavaScript lié à la page photographer.html
import { displayModal, closeModal } from "../utils/contactForm.js"
const contactButton = document.querySelector('.contact_button')
contactButton.addEventListener('click',displayModal)
const closeButton = document.querySelector('.closeButton')
closeButton.addEventListener('click',closeModal)