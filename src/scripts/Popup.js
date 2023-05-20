export default class Popup {
    constructor(popupSelector) {
        this._popupEl = document.querySelector(popupSelector);
    }

    get popupEl() {
        return this._popupEl;
    }

    setEventListeners() {
        this._popupEl.addEventListener('click', e => {
          if (e.target === e.currentTarget) this.close();
        });
      
        this._popupEl.querySelector('.popup__close-btn').addEventListener('click', () => this.close());
    }
      
    close() {
        this._popupEl.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose); 
    }
      
    open() {
        this._popupEl.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
      
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
          this.close();
        }
    }
}