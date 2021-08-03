const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');


//SHOW MENU
if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}
//HIDDEN MENU
if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')
    })
}


//REMOVE MENU MOBILE
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction));


//SERVICES MODAL
const modalView = document.querySelectorAll('.services__modal');
const modalBtns = document.querySelectorAll('.services__button');
const modalClose = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
    modalView[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, e)=>{
    modalBtn.addEventListener('click',()=>{
        modal(e);
    })
})

modalClose.forEach((modalCloses)=>{
    modalCloses.addEventListener('click',()=>{
        modalView.forEach((modalViews)=>{
            modalViews.classList.remove('active-modal')
        })
    })
})


//CHANGE BACKGROUND HEADER
function scrollHeader (){
    const nav = document.getElementById('header');

    if(this.scrollY >= 80){
        nav.classList.add('scroll-header')
    }else{
        nav.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);


//SHOW SCROLLUUP
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    
    if(this.scrollY >= 560)scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);


//DARK MODE THEME
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// WE OBTAIN THE CURRENT THEME THAT THE INTERFACE HAS BY VALIDATING THE DARK THEME CLASS
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// WE VALIDATE IF THE USER PREVIOUSLY CHOSE A TOPIC 
if (selectedTheme) {

  // IF THE VALIDATION IS FULLFILLED WE ASK WHAT THE ISSUE WAS TO KNOW IF WE ACTIVATED OF DEACTIVATED THE DARK
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// ACTIVATE OR DEACTIVATE THE THEME MANUALLY WITH THE BUTTON
themeButton.addEventListener('click', () => {
    // ADD OR REMOVE ICON THEME
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    //WE SAVE THE THEME AND THE CURRENT ICON THAT THE USER CHOSE
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})



//CONTACT VALIDATION//
const email = document.querySelector('#email');
const nme = document.querySelector('#name');
const message = document.querySelector('#ms');
const form = document.querySelector('#form');
const send = document.querySelector('#send');


addEventListeners();
function addEventListeners(){
    email.addEventListener('blur', contactValidation);
    nme.addEventListener('blur', contactValidation);
    message.addEventListener('blur', contactValidation);

    //CONTACT SEND MESSAGE ENABLE OR DISABLE BUTTON
    form.addEventListener('input', () =>{
        if(nme.value.length > 0 && email.value.length > 0 && message.value.length > 0){
            send.removeAttribute('disabled');
            send.classList.remove('button_error');
        }else{
            send.setAttribute('disabled','disabled');
            send.classList.add('button_error');
        }
    })
}



function contactValidation(e){

    e.preventDefault();

   if(e.target.value.length > 0){

    const error = document.querySelector('p.error');
    //IF ERROR = NULL CORRECTION
    if(error){
        error.remove();
    }
     e.target.classList.remove('contact__error');
     e.target.classList.add('contact__success');
     
   }else{
       e.target.classList.add('contact__error')
       e.target.classList.remove('contact__success');

       showError('Space cannot be blank.');
    }

    //EMAIL WITH REGULAR EXPRESION VALIDATION
   if(e.target.type === 'email'){
       const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

       if(re.test(e.target.value)){
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('contact__error');
        e.target.classList.add('contact__success');
       }else{
            e.target.classList.add('contact__error');
            e.target.classList.remove('contact__success');

           showError('Email not valid.');
       }
   }
}

function showError(msg){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = msg;
    errorMessage.classList.add('error__message', 'error');

    const errors = document.querySelectorAll('.error');
    if (errors.length === 0){
        form.appendChild(errorMessage);
    }
}