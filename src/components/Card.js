const noPhotoImg = new URL('../images/no-photo.jpg', import.meta.url);

export default class Card {

    constructor(data, templateSelector, handleCardClick, handleLikeClick, deleteCardPopup) {
        this._name = data.name;
        this._link = data.link;
        this._likeCount = data.likes.length;
        this._id = data._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._deleteCardPopup = deleteCardPopup;
    }

    get state() {
        return {name: this._name, link: this._link};
    }

    get id() {
        return this._id;
    }

    get isLiked() {
        return this._isLiked;
    }

    getCardElement() {
        if (this._element) return this._element;

        this._element = this._getTemplate();        
        this._element.querySelector('.gallery__name').textContent = this._name;
        this.setLikeCount(this._likeCount);
        this._galleryImg = this._element.querySelector('.gallery__img');
        this._setEventListeners();
        this._galleryImg.onerror = () => this._galleryImg.src = noPhotoImg;
        this.toggleLikeState(this._isLiked);
        this._hideTrashButton();
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

        this._galleryImg.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })

        this._likeBtn.addEventListener('click', this._handleLikeClick.bind(this));

        this._trashBtn.addEventListener('click', () => {
            this._deleteCardPopup.open();
            this._deleteCardPopup.cardToDelete = this;
        });
    }

    toggleLikeState(setLike) {
        setLike ? this._likeBtn.classList.add('gallery__like_active') : this._likeBtn.classList.remove('gallery__like_active');
    }

    setLikeCount(count) {
        this._element.querySelector('.gallery__count').textContent = count;
    }

    removeCardElement() {
        this._element.remove();
    }

    setLikedByCurrentUser(boolean) {
        this._isLiked = boolean;
    }

    setCreatedByCurrentUser(boolean) {
        this._isCurrentUserCard = boolean;
    }

    _hideTrashButton() {
        if(!this._isCurrentUserCard) this._trashBtn.hidden = true;
    }
}