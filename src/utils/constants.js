export const validatorConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

export const profileSelectors = {
  userNameSelector: '.profile__title',
  userAboutSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar'
}

 export const editButton = document.querySelector('.profile__edit-button');
 export const addPlaceButton = document.querySelector('.profile__add-button');
 export const popupWithImageSelector = '.image-popup';
 export const editProfilePopupSelector = '.profile-popup';
 export const addPlacePopupSelector = '.place-popup';
 export const deleteCardPopupSelector = '.delete-card-popup';
 export const updateAvatarPopupSelector = '.avatar-popup';
 export const galleryContainerSelector = '.gallery__container';

 export const defaultErrorMsg = 'Что-то пошло не так. Попробуйте позднее.'