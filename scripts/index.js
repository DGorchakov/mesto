import Card from './card.js'

const editButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__about');
const galleryContainer = document.querySelector('.gallery__container');

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

const galleryItems = initialCards.map(card => new Card(card, '#card-template'));
galleryItems.forEach(card => {
    addGalleryItem(card.getCardElement());
    setOpenPopupListener(card);
  });

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach(setDefaultPopupListeners);

editButton.addEventListener('click', () => openPopup(editProfilePopup.render(profileState)));
addPlaceButton.addEventListener('click', () => openPopup(addPlacePopup.render()));

function createEditProfilePopup() {
    const profilePopup = document.querySelector('.profile-popup');
    const form = profilePopup.querySelector('.popup__form');
    const nameInput = form.querySelector('.popup__input_type_name');
    const aboutInput = form.querySelector('.popup__input_type_about');

    form.addEventListener('submit', e => {
        e.preventDefault();
        profileState.name = nameInput.value;
        profileState.about = aboutInput.value;
        profileState.render();
        closePopup(profilePopup);
    });

    const editProfilePopup = {
      render(profileState) {
        nameInput.value = profileState.name;
        aboutInput.value = profileState.about;
        return profilePopup;
      }
    }

    return editProfilePopup;
}

function createAddPlacePopup() {
    const placePopup = document.querySelector('.place-popup');
    const form = placePopup.querySelector('.popup__form');
    const nameInput = form.querySelector('.popup__input_type_name');
    const linkInput = form.querySelector('.popup__input_type_link');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const card = {
            name: nameInput.value,
            link: linkInput.value
        };
        addGalleryItem(createGalleryItem(card));
        e.target.reset();
        closePopup(placePopup);
    });

    const addPlacePopup = {
      render(state) {
        return placePopup;
      }
    }

    return addPlacePopup;
}

function createImageViewPopup() {
    const imagePopup = document.querySelector('.image-popup');
    const image = imagePopup.querySelector('.popup__img');
    const placeName = imagePopup.querySelector('.popup__place-name');

    const imageViewPopup = {
      render(state) {
        if (!state) return imagePopup;
        image.src = state.link;
        image.alt = state.name;
        placeName.textContent = state.name;
        return imagePopup;
      }
    }

    return imageViewPopup;
}

function addGalleryItem(galleryItem) {
  galleryContainer.prepend(galleryItem);
}

function setOpenPopupListener(card) {
  card.getCardElement().querySelector('.gallery__img').addEventListener('click', () => {
      openPopup(imageViewPopup.render(card.state));
  });
}

function setDefaultPopupListeners(popup) {
  popup.addEventListener('click', e => {
    if (e.target === e.currentTarget) closePopup(popup);
  });

  popup.querySelector('.popup__close-btn').addEventListener('click', () => closePopup(popup));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc); 
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

