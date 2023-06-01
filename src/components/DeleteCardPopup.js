import Popup from "./Popup";

export default class DeleteCardPopup extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    set cardToDelete(card) {
        this._currentCard = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popupEl.querySelector('.popup__submit').addEventListener('click', e  => {
            this._submitHandler.bind(this._currentCard)();
            this.close();
        });
    }
}