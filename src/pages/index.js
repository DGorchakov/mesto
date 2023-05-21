import '../pages/index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo';
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
    galleryList.addItem(createCard(card));
  }
}, galleryContainerSelector);

galleryList.renderItems();

const popups = {
  imageView : new PopupWithImage(popupWithImageSelector),
  addPlace : new PopupWithForm(addPlacePopupSelector,  (e, data) => {
    galleryList.addItem(createCard(data));
    e.target.reset();
  }),
  editProfile : new PopupWithForm(editProfilePopupSelector, (e, inputValues) => {
    user.setUserInfo(inputValues);
  })
}

Object.values(popups).forEach(popup => popup.setEventListeners());

addPlaceButton.addEventListener('click', () => popups.addPlace.open());
editButton.addEventListener('click', () => popups.editProfile.setInputValues(user.getUserInfo()).open());

function handleCardClick(name, link) {
  popups.imageView.open(name, link);
}

function createCard(data) {
  return new Card(data, '#card-template', handleCardClick).getCardElement();
}



