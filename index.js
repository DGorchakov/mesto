const editButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const galleryContainer = document.querySelector('.gallery__container');
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

const editProfilePopup = createEditProfilePopup();
const addPlacePopup = createAddPlacePopup();
initialCards.forEach(addGalleryItem);

editButton.addEventListener('click', () => openPopup(editProfilePopup));
addPlaceButton.addEventListener('click', () => openPopup(addPlacePopup));


function createEditProfilePopup() {
    const popup = document.querySelector('.profile-popup');
    const form = popup.querySelector('.popup__form');
    const nameInput = form.querySelector('.popup__input_type_name');
    const aboutInput = form.querySelector('.popup__input_type_about');

    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;

    popup.querySelector('.popup__close-btn').addEventListener('click', () => closePopup(popup));
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        profileName.textContent = nameInput.value;
        profileAbout.textContent = aboutInput.value;
        closePopup(popup);
    });

    return popup;
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
        addGalleryItem(card, false);
        nameInput.value = '';
        linkInput.value = '';
        closePopup(popup);
    });

    return popup;
}

function createImageViewPopup(card) {
    const popup = document.querySelector('.image-popup');
    const image = popup.querySelector('.popup__img');
    const placeName = popup.querySelector('.popup__place-name');

    image.src = card.link;
    placeName.textContent = card.name;

    popup.querySelector('.popup__close-btn').addEventListener('click', () => closePopup(popup));

    return popup;
}

function addGalleryItem(card, endPlacement=true) {
    const cardTemplate = document.querySelector('#card-template').content;
    const galleryItem = cardTemplate.querySelector('.gallery__item').cloneNode(true);
    const galleryImg = galleryItem.querySelector('.gallery__img');
    const likeBtn = galleryItem.querySelector('.gallery__like');
    const trashBtn = galleryItem.querySelector('.gallery__trush-btn');
    const placeName = galleryItem.querySelector('.gallery__name');

    placeName.textContent = card.name;
    galleryImg.alt = card.name 

    card.link ? galleryImg.src = card.link : galleryImg.src = './images/no-photo.jpg';

    galleryImg.onerror = function() {
        galleryImg.src = './images/no-photo.jpg';
    }

    likeBtn.addEventListener('click', () => {
        likeBtn.style.backgroundImage = 'url(./images/like-active.svg)';
    });

    trashBtn.addEventListener('click', () => {
        galleryItem.remove();
    });

    galleryImg.addEventListener('click', () => {
        const imageViewPopup = createImageViewPopup(card);
        openPopup(imageViewPopup);
    })

    endPlacement ? galleryContainer.append(galleryItem) : galleryContainer.prepend(galleryItem);
}

function closePopup(popup) {
    popup.style.opacity = '0';
    setTimeout(()=> popup.style.height = '0', 700);
}

function openPopup(popup) {
    popup.style.opacity = '1';
    popup.style.height = '100%';
}
