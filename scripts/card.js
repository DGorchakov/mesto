export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    get state() {
        return {name: this._name, link: this._link};
    }

    getCardElement() {
        if (this._element) return this._element;

        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.gallery__name').textContent = this._name;

        const galleryImg = this._element.querySelector('.gallery__img');
        galleryImg.alt = this._name;
        galleryImg.src = this._link;
        
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
        const galleryImg = this._element.querySelector('.gallery__img');
        const likeBtn = this._element.querySelector('.gallery__like');
        const trashBtn = this._element.querySelector('.gallery__trush-btn');

        galleryImg.onerror = function() {
            galleryImg.src = './images/no-photo.jpg';
            this._link = './images/no-photo.jpg';
        }

        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('gallery__like_active');
        });

        trashBtn.addEventListener('click', () => {
            this._element.remove();
        });
    }
}