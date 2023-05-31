export default class FormValidator {

    constructor(formSelectors, formElement) {
        this._formSelectors = formSelectors;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
        this._submitButton = formElement.querySelector(formSelectors.submitButtonSelector);
        this._inactiveButtonClass = formSelectors.inactiveButtonClass;
    }

    enableValidation() {
        this._formElement.addEventListener('submit', e => {
            e.preventDefault();
        });
        this._setEventListeners();
    };

    refreshValidation() {
        this._inputList.forEach(inputEl => this._checkInputValidity(inputEl));
        this._toggleButtonState();
        this._inputList.forEach(inputEl => inputEl.setCustomValidity(''));
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach(inputEl => {

            inputEl.addEventListener('input', () => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState();
            });

        });
        this._formElement.addEventListener('reset', () => {
            this._disableSubmitButton(true);
        });
    }
    
    _toggleButtonState() {
        this._hasInvalidInput() ? this._disableSubmitButton(true) 
                                : this._disableSubmitButton(false);
    }
    
    _hasInvalidInput() {
        return this._inputList.some(e => !e.validity.valid);
    }
    
    _checkInputValidity(inputElement) {
        console.log(inputElement.validity.valid)
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
    }
    
    _showInputError(inputElement, errorMessage) {
        const errorClass= this._formSelectors.errorClass;
        const inputErrorClass= this._formSelectors.inputErrorClass;
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
      }
      
    _hideInputError(inputElement) {
        const errorClass= this._formSelectors.errorClass;
        const inputErrorClass= this._formSelectors.inputErrorClass;
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
      }
    
      _disableSubmitButton(setDisabled) {
        this._submitButton.disabled = setDisabled;
        setDisabled ? this._submitButton.classList.add(this._inactiveButtonClass) 
                    : this._submitButton.classList.remove(this._inactiveButtonClass);
      }
}