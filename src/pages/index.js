import '../pages/index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';
import NotificationFactory from '../components/NotificationFactory';
import {
  validatorConfig,
  profileSelectors,
  editButton,
  addPlaceButton,
  popupWithImageSelector,
  editProfilePopupSelector,
  addPlacePopupSelector,
  galleryContainerSelector,
  deleteCardPopupSelector,
  updateAvatarPopupSelector,
  defaultErrorMsg
} from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '3818e028-4eb9-485e-bc4c-7c7f3305bc3d',
    'Content-Type': 'application/json'
  }
})

const cards = {};

const notificationFactory = new NotificationFactory('#notification-template', document.querySelector('.notification-list'));

const galleryList = new Section((card) => galleryList.addItem(createCard(card)), galleryContainerSelector);

const user = new UserInfo(profileSelectors, handleAvatarClick);
user.setEventListeners();

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector)).filter(form => form.getAttribute('name')!== 'delete-card')

    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute('name');
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };
  
enableValidation(validatorConfig);

const popups = {
  deleteCard : new PopupWithForm(deleteCardPopupSelector, handleDeleteCardSubmit),
  updateAvatar: new PopupWithForm(updateAvatarPopupSelector, handleUpdateAvatar),
  addPlace: new PopupWithForm(addPlacePopupSelector, handleAddCard),
  editProfile : new PopupWithForm(editProfilePopupSelector, handleUpdateUserData),
  imageView : new PopupWithImage(popupWithImageSelector)
}

Object.values(popups).forEach(popup => popup.setEventListeners());

Promise.all([                
  api.getUserInfo(), 
  api.getInitialCards() 
])
.then(([userData, cards])=>{
  user.setUserInfo(userData);
  user.setAvatar(userData);
  editButton.hidden = false;

  galleryList.renderItems(cards);
})
.catch(() => showErrorNotification(defaultErrorMsg));

editButton.addEventListener('click', () => popups.editProfile.setInputValues(user.getUserInfo()).open());
addPlaceButton.addEventListener('click', () => popups.addPlace.open());

function handleUpdateUserData(e, inputValues) {
  popups.editProfile.setLoadingSubmit(true);
  api.updateUserInfo(inputValues)
    .then(userData => {
      user.setUserInfo(userData);
      this.close();
    })
    .catch(res => handleFormErrors(res, this))
    .finally(() => popups.editProfile.setLoadingSubmit(false))
}

function handleCardClick(name, link) {
  popups.imageView.open(name, link);
}

function handleCardTrashClick() {
  popups.deleteCard.setInputValues({cardId: this.id});
  popups.deleteCard.open();
}

function handleDeleteCardSubmit(e, {cardId}) {
  api.deleteCard(cardId)
  .then(res => {
    cards[cardId].removeCardElement();
    showSuccessNotification(res.message);
    popups.deleteCard.close();
    return res;
  })
  .catch(res => res.json().then(errJSON => showErrorNotification(errJSON.message)));
}

function handleLikeClick() {
  const request = this.isLiked ? api.removeLikeFromCard(this.id) : api.likeCard(this.id);
  
  request.then(cardData => {
      this.likeCount = cardData.likes.length;
      this.isLiked = !this.isLiked;
      this.renderLikeState();
    })
    .catch(() => showErrorNotification(defaultErrorMsg));
}

function createCard(data) {
  const card = new Card(data, '#card-template', handleCardClick, handleLikeClick, handleCardTrashClick);
  cards[card.id] = card;
  return card.getCardElement(user);
}

function handleAddCard(e, data){
  popups.addPlace.setLoadingSubmit(true);
  api.addCard(data)
    .then(data => {
      galleryList.addItem(createCard(data));
      popups.addPlace.close();
      e.target.reset();
    })
    .catch(res => handleFormErrors(res, this))
    .finally(() => popups.addPlace.setLoadingSubmit(false))
}

function handleAvatarClick() {
  popups.updateAvatar.open();
}

function handleUpdateAvatar(e, input) {
  popups.updateAvatar.setLoadingSubmit(true);
  api.updateUserAvatar(input)
  .then(res => {
    user.setAvatar(input);
    popups.updateAvatar.close();
  })
  .catch(res => handleFormErrors(res, this))
  .finally(() => popups.updateAvatar.setLoadingSubmit(false))
}
 
function showErrorNotification(errorMsg) {
  notificationFactory.showNotification('error', errorMsg);
}

function showSuccessNotification(msg) {
  notificationFactory.showNotification('success', msg);
}

function handleFormErrors(response, popup) {
  const form = popup.formEl;
  const formName = popup.formEl.getAttribute('name');
 
  response.json()
  .then(body => {
    for (let fieldName in body.errors) {
     form[fieldName].setCustomValidity(body.errors[fieldName].message);
    }
  })
  .then(() => formValidators[formName].refreshValidation())
  .catch(() => showErrorNotification(defaultErrorMsg))
}