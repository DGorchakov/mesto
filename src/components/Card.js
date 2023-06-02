const noPhotoImg = new URL('../images/no-photo.jpg', import.meta.url);

export default class Card {

    constructor(data, templateSelector, handleCardClick, handleLikeClick, handleTrashClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._owner = data.owner;
        this._id = data._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleTrashClick = handleTrashClick;
    }

    get id() {
        return this._id;
    }

    get isLiked() {
        return this._isLiked;
    }

    set isLiked(isLiked) {
        this._isLiked = isLiked;
    }

    set likeCount(count) {
        this._likeCount = count;
    }

    getCardElement(user) {
        if (this._element) return this._element;

        this._element = this._getTemplate();        
        this._element.querySelector('.gallery__name').textContent = this._name;
        this._isLiked = this._likes.findIndex((likedUser) => likedUser._id === user.id) >= 0;
        this._likeCount = this._likes.length;
        this._galleryImg = this._element.querySelector('.gallery__img');
        this._galleryImg.alt = this._name;
        this._galleryImg.src = this._link;
        this._galleryImg.onerror = () => this._galleryImg.src = noPhotoImg;
        this._setEventListeners();
        this._hideTrashButton(user);
        this.renderLikeState();

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
            this._handleTrashClick();
        });
    }

    renderLikeState() {
        this._element.querySelector('.gallery__count').textContent = this._likeCount;
        this._isLiked ? this._likeBtn.classList.add('gallery__like_active') : this._likeBtn.classList.remove('gallery__like_active');
    }

    removeCardElement() {
        this._element.remove();
    }

    _hideTrashButton(user) {
        if (!(this._owner._id === user.id)) this._trashBtn.hidden = true;
    }
}