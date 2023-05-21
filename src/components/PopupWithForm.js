import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._formEl = this.popupEl.querySelector('.popup__form');
    }

    setEventListeners(){
        super.setEventListeners();
        this._formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmitForm(e, this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._formEl.reset();
    }

    _getInputValues() {
        const inputValues = {};

        Array.from(this._formEl.elements).forEach(el => {
            if (el.tagName === "INPUT") inputValues[el.name] = el.value;
        });

        return inputValues;
    }

    setInputValues(data) {
        Array.from(this._formEl.elements).forEach(el => {
            if (el.tagName === "INPUT") el.value = data[el.name];
        });

        return this;
    }
}