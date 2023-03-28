const POPUP_OPENED = 'popup_opened'
const editButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__about');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]

const profileState = {
  name: profileName.textContent, 
  about: profileAbout.textContent,
  render() {
    profileName.textContent = this.name;
    profileAbout.textContent = this.about;
  }
}

const editProfilePopup = createEditProfilePopup();
const addPlacePopup = createAddPlacePopup();
const imageViewPopup = createImageViewPopup();

let galleryItems = initialCards.map(createGalleryItem);
galleryItems.forEach(addGalleryItem);

editButton.addEventListener('click', () => openPopup(editProfilePopup, profileState));
addPlaceButton.addEventListener('click', () => openPopup(addPlacePopup));

function createEditProfilePopup() {
    const popup = document.querySelector('.profile-popup');
    const form = popup.querySelector('.popup__form');
    const nameInput = form.querySelector('.popup__input_type_name');
    const aboutInput = form.querySelector('.popup__input_type_about');

    popup.querySelector('.popup__close-btn').addEventListener('click', () => closePopup(popup));
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        profileState.name = nameInput.value;
        profileState.about = aboutInput.value;
        profileState.render();
        closePopup(popup);
    });

    const editProfilePopup = {
      content: popup,
      render(profileState) {
        nameInput.value = profileState.name;
        aboutInput.value = profileState.about;
      }
    }

    return editProfilePopup;
}

function createAddPlacePopup() {
    const popup = document.querySelector('.place-popup');
    const form = popup.querySelector('.popup__form');
    const nameInput = form.querySelector('.popup__input_type_name');
    const linkInput = form.querySelector('.popup__input_type_link');

    popup.querySelector('.popup__close-btn').addEventListener('click', () => closePopup(popup));
    form.addEventListener('submit', e => {
        e.preventDefault();
        let card = {
            name: nameInput.value,
            link: linkInput.value
        };
        addGalleryItem(createGalleryItem(card));
        e.target.reset();
        closePopup(popup);
    });

    const addPlacePopup = {
      content: popup
    }

    return addPlacePopup;
}

function createImageViewPopup() {
    const popup = document.querySelector('.image-popup');
    const image = popup.querySelector('.popup__img');
    const placeName = popup.querySelector('.popup__place-name');

    popup.querySelector('.popup__close-btn').addEventListener('click', () => closePopup(popup));

    const imageViewPopup = {
      content: popup,
      render(state) {
        image.src = state.link;
        image.alt = state.name;
        placeName.textContent = state.name;
      }
    }

    return imageViewPopup;
}

function createGalleryItem(card) {
    const cardTemplate = document.querySelector('#card-template').content;
    const galleryItem = cardTemplate.querySelector('.gallery__item').cloneNode(true);
    const galleryImg = galleryItem.querySelector('.gallery__img');
    const likeBtn = galleryItem.querySelector('.gallery__like');
    const trashBtn = galleryItem.querySelector('.gallery__trush-btn');
    const placeName = galleryItem.querySelector('.gallery__name');

    placeName.textContent = card.name;
    galleryImg.alt = card.name 

    if (!card.link) card.link = './images/no-photo.jpg';
    galleryImg.src = card.link 

    galleryImg.onerror = function() {
        galleryImg.src = './images/no-photo.jpg';
        card.link = './images/no-photo.jpg';
    }

    likeBtn.addEventListener('click', () => {
        likeBtn.style.backgroundImage = 'url(./images/like-active.svg)';
    });

    trashBtn.addEventListener('click', () => {
        galleryItem.remove();
    });

    galleryImg.addEventListener('click', () => {
        openPopup(imageViewPopup, card);
    });

    return galleryItem;
}

function addGalleryItem(galleryItem) {
  document.querySelector('.gallery__container').prepend(galleryItem);
}

function closePopup(popup) {
  popup.classList.toggle(POPUP_OPENED);
}

function openPopup(popup, state) {
  if (state) {
    popup.render(state);
  }
  popup.content.classList.toggle(POPUP_OPENED);
}
  
