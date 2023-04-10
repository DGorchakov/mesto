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

const galleryItems = initialCards.map(createGalleryItem);
galleryItems.forEach(addGalleryItem);

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach(setDefaultPopupListeners);

editButton.addEventListener('click', () => openPopup(editProfilePopup.render(profileState)));
addPlaceButton.addEventListener('click', () => openPopup(addPlacePopup.render()));

function createEditProfilePopup() {
    const popup = document.querySelector('.profile-popup');
    const form = popup.querySelector('.popup__form');
    const nameInput = form.querySelector('.popup__input_type_name');
    const aboutInput = form.querySelector('.popup__input_type_about');

    form.addEventListener('submit', e => {
        e.preventDefault();
        profileState.name = nameInput.value;
        profileState.about = aboutInput.value;
        profileState.render();
        closePopup(popup);
    });

    const editProfilePopup = {
      render(profileState) {
        nameInput.value = profileState.name;
        aboutInput.value = profileState.about;
        return popup;
      }
    }

    return editProfilePopup;
}

function createAddPlacePopup() {
    const popup = document.querySelector('.place-popup');
    const form = popup.querySelector('.popup__form');
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
        closePopup(popup);
    });

    const addPlacePopup = {
      render(state) {
        return popup;
      }
    }

    return addPlacePopup;
}

function createImageViewPopup() {
    const popup = document.querySelector('.image-popup');
    const image = popup.querySelector('.popup__img');
    const placeName = popup.querySelector('.popup__place-name');

    const imageViewPopup = {
      render(state) {
        if (!state) return popup;
        image.src = state.link;
        image.alt = state.name;
        placeName.textContent = state.name;
        return popup;
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
    const LIKE_ACTIVE = 'gallery__like_active';

    placeName.textContent = card.name;
    galleryImg.alt = card.name;

    if (!card.link) card.link = './images/no-photo.jpg';
    galleryImg.src = card.link; 

    galleryImg.onerror = function() {
        galleryImg.src = './images/no-photo.jpg';
        card.link = './images/no-photo.jpg';
    }

    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle(LIKE_ACTIVE);
    });

    trashBtn.addEventListener('click', () => {
        galleryItem.remove();
    });

    galleryImg.addEventListener('click', () => {
        openPopup(imageViewPopup.render(card));
    });

    return galleryItem;
}

function setDefaultPopupListeners(popup) {
  popup.addEventListener('click', e => {
    if (e.target === e.currentTarget) closePopup(popup);
  });

  document.addEventListener('keydown', e => {
    console.log(e.key);
    if (e.key === "Esc" || e.key === "Escape") closePopup(popup);
  });

  popup.querySelector('.popup__close-btn').addEventListener('click', () => closePopup(popup));
}

function addGalleryItem(galleryItem) {
  galleryContainer.prepend(galleryItem);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
