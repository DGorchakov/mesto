import '../pages/index.css';
import Card from './Card.js'
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import Section from './Section.js';
import UserInfo from './UserInfo';
import {
  initialCards,
  validatorConfig,
  editButton,
  addPlaceButton,
  profileNameSelector,
  profileAboutSelector,
  popupWithImageSelector,
  editProfilePopupSelector,
  addPlacePopupSelector,
  galleryContainerSelector
} from '../utils/constants.js'


const formValidators = {};

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute('name');
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };
  
enableValidation(validatorConfig);

const user = new UserInfo(profileNameSelector, profileAboutSelector);

const galleryList = new Section({
  items: initialCards, 
  renderer: (card) => {
    const cardEl = new Card(card, '#card-template', handleCardClick).getCardElement();
    galleryList.addItem(cardEl);
  }
}, galleryContainerSelector);

galleryList.renderItems();

const popups = {
  imageView : new PopupWithImage(popupWithImageSelector),
  addPlace : new PopupWithForm(addPlacePopupSelector,  (e, inputValues) => {
    const card = new Card(inputValues, '#card-template', handleCardClick).getCardElement();
    galleryList.addItem(card);
    e.target.reset();
  }),
  editProfile : new PopupWithForm(editProfilePopupSelector, (e, inputValues) => {
    user.setUserInfo(inputValues);
  })
}

Object.values(popups).forEach(popup => popup.setEventListeners());

addPlaceButton.addEventListener('click', () => popups.addPlace.open());
editButton.addEventListener('click', () => popups.editProfile.open(user.getUserInfo()));

function handleCardClick(name, link) {
  popups.imageView.open(name, link);
}



