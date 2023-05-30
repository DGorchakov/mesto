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
  editButton,
  addPlaceButton,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  popupWithImageSelector,
  editProfilePopupSelector,
  addPlacePopupSelector,
  galleryContainerSelector,
  deleteCardPopupSelector,
  updateAvatarPopupSelector
} from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '3818e028-4eb9-485e-bc4c-7c7f3305bc3d',
    'Content-Type': 'application/json'
  }
})

const notificationFactory = new NotificationFactory('#notification-template', document.querySelector('.notification__list'));

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
  updateAvatar: new PopupWithForm(updateAvatarPopupSelector, handleUpdatePopup),
  imageView : new PopupWithImage(popupWithImageSelector),
  editProfile : new PopupWithForm(editProfilePopupSelector, (e, inputValues) => {
    api.updateUserInfo(inputValues)
    .then(userData => user.setUserInfo(userData))
    .catch(showErrorNotification);
  })
}

const user = new UserInfo(profileNameSelector, profileAboutSelector, profileAvatarSelector, popups.updateAvatar);

const userInfoRequest = api.getUserInfo()
.then(userData => 
  {user.setUserInfo(userData);
   user.setAvatar(userData);
  })
.catch(showErrorNotification);

const initalCardRequest = api.getInitalCards()
.then(cards => renderGalleryList(cards))
.then(galleryList => {
  popups.addPlace = createAddPlacePopup(galleryList);
})
.catch(showErrorNotification);

Promise.all([initalCardRequest]).then(value => {
  Object.values(popups).forEach(popup => popup.setEventListeners());
  editButton.addEventListener('click', () => popups.editProfile.setInputValues(user.getUserInfo()).open());
  editButton.hidden = false;
  console.log(popups.addPlace);
  addPlaceButton.addEventListener('click', () => popups.addPlace.open());
  addPlaceButton.hidden = false; 
});

function handleCardClick(name, link) {
  popups.imageView.open(name, link);
}

function handleDeleteCard() {
  api.deleteCard(this.id)
  .then(res => {this.removeCardElement(); 
    showSuccessNotification("Карточка удалена");
  })
  .catch(showErrorNotification);
}

function handleLikeClick() {
  const request = this.isLiked ? api.removeLikeFromCard(this.id) : api.likeCard(this.id);
  
  request.then(cardData => {
      this.setLikeCount(cardData.likes.length);
      this.toggleLikeState(!this.isLiked);
      this.setLikedByCurrentUser(!this.isLiked);
    })
    .catch(showErrorNotification);
}

function createCard(data) {
  const card = new Card(data, '#card-template', handleCardClick, handleLikeClick, popups.deleteCard);
  card.setLikedByCurrentUser(data.likes.findIndex((likedUser) => likedUser._id === user.id) >= 0);
  card.setCreatedByCurrentUser(data.owner._id === user.id);
  return card.getCardElement();
}

function renderGalleryList(items) {
  const galleryList = new Section({
    items, 
    renderer: (card) => {
      galleryList.addItem(createCard(card));
    }
  }, galleryContainerSelector);
  galleryList.renderItems();
  
  return galleryList;
}

function createAddPlacePopup(galleryList) {
  return new PopupWithForm(addPlacePopupSelector, (e, data) => {
    api.checkIfImageExist(data.link)
    .then(res => api.addCard(data))
    .then(data => galleryList.addItem(createCard(data)))
    .catch(showErrorNotification);
    e.target.reset();
  })
}

function handleUpdatePopup(e, input) {
  api.checkIfImageExist(input.avatar)
  .then(res => api.updateUserAvatar(input))
  .then(res => user.setAvatar(input))
  .catch(showErrorNotification);
}
 
function showErrorNotification(errorMsg) {
  notificationFactory.showNotification('error', errorMsg);
}

function showSuccessNotification(successMsg) {
  notificationFactory.showNotification('success', successMsg);
}
  
