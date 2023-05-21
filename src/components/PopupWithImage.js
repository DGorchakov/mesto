import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageEl = this.popupEl.querySelector('.popup__img');
        this._nameEl = this.popupEl.querySelector('.popup__place-name');
    }

    open(name, link) {
        this._imageEl.src = link;
        this._imageEl.alt = name;
        this._nameEl.textContent = name;
        super.open();
    }
}