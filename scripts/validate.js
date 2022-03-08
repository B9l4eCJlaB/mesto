const configElements = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


const showInputsError = (formElement, inputElement, errorMessage, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
}

const hideInputsError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(selectors.errorClass);
}

const checkInputValidity = (formElement, inputElement, selectors) => {
    if (!inputElement.validity.valid) {
        showInputsError(formElement, inputElement, inputElement.validationMessage, selectors);
    }
    else {
        hideInputsError(formElement, inputElement, selectors);
    }
}

const resetValidationForm = (formElement, selectors) => {
    const inputList = formElement.querySelectorAll(selectors.inputSelector);
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    inputList.forEach(inputElement => {
        hideInputsError(formElement, inputElement, selectors);
    });
        buttonElement.classList.add(selectors.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, selectors) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(selectors.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }
    else {
        buttonElement.classList.remove(selectors.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

const setEventListeners = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectors);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, selectors);
            toggleButtonState(inputList, buttonElement, selectors);
        });
    });
}

const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            resetValidationForm(formElement, selectors);
        });
        setEventListeners(formElement, selectors);
    });
}


enableValidation(configElements);