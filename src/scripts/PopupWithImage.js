import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopup = document.querySelector(popupSelector);
        this._imageEl = this._imagePopup.querySelector('.popup__img');
        this._nameEl = this._imagePopup.querySelector('.popup__place-name');
    }

    open(name, link) {
        this._imageEl.src = link;
        this._imageEl.alt = name;
        this._nameEl.textContent = name;
        super.open();
    }
}