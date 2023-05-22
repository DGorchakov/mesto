const noPhotoImg = new URL('../images/no-photo.jpg', import.meta.url);

export default class Card {

    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    get state() {
        return {name: this._name, link: this._link};
    }

    getCardElement() {
        if (this._element) return this._element;

        this._element = this._getTemplate();        
        this._element.querySelector('.gallery__name').textContent = this._name;
        this._galleryImg = this._element.querySelector('.gallery__img');
        this._setEventListeners();
        this._galleryImg.alt = this._name;
        this._galleryImg.src = this._link;

        return this._element;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.gallery__item')
          .cloneNode(true);
    
        return cardElement;
      }

    _setEventListeners() {
        this._likeBtn = this._element.querySelector('.gallery__like');
        this._trashBtn = this._element.querySelector('.gallery__trush-btn');

        this._galleryImg.onerror = () => {
            this._galleryImg.src = noPhotoImg;
            this._link = noPhotoImg;
        }

        this._galleryImg.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })

        this._likeBtn.addEventListener('click', () => {
            this._toggleLikeState();
        });

        this._trashBtn.addEventListener('click', () => {
            this._removeCardElement();
        });
    }

    _toggleLikeState() {
        this._likeBtn.classList.toggle('gallery__like_active');
    }

    _removeCardElement() {
        this._element.remove();
    }
}