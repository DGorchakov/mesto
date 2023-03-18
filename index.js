const POPUP_OPEN = 'popup_opened';
let editButton = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-btn')
let name = document.querySelector('.profile__title');
let about = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let editForm = popup.querySelector('.popup__form');
let formNameInput = editForm.querySelector('.popup__input_type_name');
let formAboutInput = editForm.querySelector('.popup__input_type_about');

editButton.addEventListener('click', ()=> {
    formNameInput.value = name.textContent;
    formAboutInput.value = about.textContent;
    popup.classList.add(POPUP_OPEN);
});

closePopupBtn.addEventListener('click', closePopup);

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    name.textContent = formNameInput.value;
    about.textContent = formAboutInput.value;
    closePopup();
});

function closePopup() {
    popup.classList.remove(POPUP_OPEN);
}


