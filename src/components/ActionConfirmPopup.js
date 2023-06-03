import Popup from "./Popup";

export default class ActionConfirmPopup extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    set context(context) {
        this._context = context;
    }

    get context() {
        return this._context;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popupEl.querySelector('.popup__submit').addEventListener('click', e  => {
            e.preventDefault();
            this._submitHandler.bind(this._context)();
        });
    }
}