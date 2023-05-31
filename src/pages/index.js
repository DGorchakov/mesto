import '../pages/index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import DeleteCardPopup from '../components/DeleteCardPopup';
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

const notificationFactory = new NotificationFactory('#notification-template', document.querySelector('.notification__list'));

const galleryList = new Section((card) => galleryList.addItem(createCard(card)), galleryContainerSelector);

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

const popups = {
  deleteCard : new DeleteCardPopup(deleteCardPopupSelector, handleDeleteCard),
  updateAvatar: new PopupWithForm(updateAvatarPopupSelector, handleUpdateAvatar),
  addPlace: new PopupWithForm(addPlacePopupSelector, handleAddCard),
  editProfile : new PopupWithForm(editProfilePopupSelector, handleUpdateUserData),
  imageView : new PopupWithImage(popupWithImageSelector)
}

Object.values(popups).forEach(popup => popup.setEventListeners());

editButton.addEventListener('click', () => popups.editProfile.setInputValues(user.getUserInfo()).open());
addPlaceButton.addEventListener('click', () => popups.addPlace.open());

api.getInitalCards()
.then(cards => galleryList.renderItems(cards))
.catch(() => showErrorNotification(defaultErrorMsg));

const user = new UserInfo(profileSelectors, handleInitUser, popups.updateAvatar);
user.initUser();

function handleInitUser() {
  api.getUserInfo()
  .then(userData => {
    this.setUserInfo(userData);
    this.setAvatar(userData);
    editButton.hidden = false;
  })
  .catch(() => showErrorNotification(defaultErrorMsg));
}

function handleUpdateUserData(e, inputValues) {
  this.setLoadingSubmit(true);
  api.updateUserInfo(inputValues)
    .then(userData => {
      user.setUserInfo(userData);
      this.close();
    })
    .catch(res => handleFormErrors(res, this))
    .finally(() => this.setLoadingSubmit(false))
}

function handleCardClick(name, link) {
  popups.imageView.open(name, link);
}

function handleDeleteCard() {
  api.deleteCard(this.id)
  .then(res => {
    this.removeCardElement(); 
    showSuccessNotification("Карточка удалена");
  })
  .catch(res => res.json().then(errBody => showErrorNotification(errBody.message)));
}

function handleLikeClick() {
  const request = this.isLiked ? api.removeLikeFromCard(this.id) : api.likeCard(this.id);
  
  request.then(cardData => {
      this.setLikeCount(cardData.likes.length);
      this.toggleLikeState(!this.isLiked);
      this.setLikedByCurrentUser(!this.isLiked);
    })
    .catch(() => showErrorNotification(defaultErrorMsg));
}

function createCard(data) {
  const card = new Card(data, '#card-template', handleCardClick, handleLikeClick, popups.deleteCard);
  card.setLikedByCurrentUser(data.likes.findIndex((likedUser) => likedUser._id === user.id) >= 0);
  card.setCreatedByCurrentUser(data.owner._id === user.id);
  return card.getCardElement();
}

function handleAddCard(e, data){
  this.setLoadingSubmit(true);
  api.addCard(data)
    .then(data => {
      galleryList.addItem(createCard(data));
      this.close();
      e.target.reset();
    })
    .catch(res => handleFormErrors(res, this))
    .finally(() => this.setLoadingSubmit(false))
}

function handleUpdateAvatar(e, input) {
  this.setLoadingSubmit(true);
  api.updateUserAvatar(input)
  .then(res => {
    user.setAvatar(input);
    this.close();
  })
  .catch(res => handleFormErrors(res, this))
  .finally(() => this.setLoadingSubmit(false))
}
 
function showErrorNotification(errorMsg) {
  notificationFactory.showNotification('error', errorMsg);
}

function showSuccessNotification(successMsg) {
  notificationFactory.showNotification('success', successMsg);
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