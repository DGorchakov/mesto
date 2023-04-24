export default class Card {

    _element;
    _galleryImg;
    _likeBtn;
    _trashBtn;
    _handleCardClick;

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
        this._galleryImg.alt = this._name;
        this._galleryImg.src = this._link;
        this._setEventListeners();

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

        this._galleryImg.onerror = function() {
            this._galleryImg.src = './images/no-photo.jpg';
            this._link = './images/no-photo.jpg';
        }

        this._galleryImg.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })

        this._likeBtn.addEventListener('click', () => {
            this._likeBtn.classList.toggle('gallery__like_active');
        });

        this._trashBtn.addEventListener('click', () => {
            this._element.remove();
        });
    }
}