const POPUP_OPEN = 'popup_open';
let editButton = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-btn')
let name = document.querySelector('.profile__title');
let about = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let editForm = popup.querySelector('.edit-profile');
let formNameInput = editForm.querySelector('.edit-profile__text-input_name');
let formAboutInput = editForm.querySelector('.edit-profile__text-input_about');

editButton.addEventListener('click', ()=> {
    formNameInput.value = name.innerHTML;
    formAboutInput.value = about.innerHTML;
    popup.classList.add(POPUP_OPEN);
});

closePopupBtn.addEventListener('click', closePopup);

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    name.textContent = formNameInput.value;
    about.innerHTML = formAboutInput.value;
    closePopup();
});

function closePopup() {
    popup.classList.remove(POPUP_OPEN);
}


