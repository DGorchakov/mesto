enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 

function enableValidation(formSelectors) {
    const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));
    formList.forEach(formEl => {
        formEl.addEventListener('submit', e => {
            e.preventDefault();
    });
        setEventListeners(formEl, formSelectors);
  });
}

function setEventListeners(form, formSelectors) {
    const inputList = Array.from(form.querySelectorAll(formSelectors.inputSelector));
    const submitButton = form.querySelector(formSelectors.submitButtonSelector);
    toggleButtonState(inputList, submitButton, formSelectors.inactiveButtonClass);
    inputList.forEach(inputEl => {
        inputEl.addEventListener('input', () => {
            checkInputValidity(form, inputEl, formSelectors);
            toggleButtonState(inputList, submitButton, formSelectors.inactiveButtonClass);
        });
    });
    form.addEventListener('submit', () => {
        toggleButtonState(inputList, submitButton, formSelectors.inactiveButtonClass);
    })
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) buttonElement.classList.add(inactiveButtonClass);
    else buttonElement.classList.remove(inactiveButtonClass);
}

function hasInvalidInput(inputList) {
    return inputList.some(e => !e.validity.valid);
}

function checkInputValidity(formElement, inputElement, formSelectors) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, formSelectors.errorClass, formSelectors.inputErrorClass);
    } else {
      hideInputError(formElement, inputElement, formSelectors.errorClass, formSelectors.inputErrorClass);
    }
};

function showInputError(formElement, inputElement, errorMessage, errorClass, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
function hideInputError(formElement, inputElement, errorClass, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
