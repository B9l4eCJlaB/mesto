class FormValidator {
    constructor(configElements, form) {
        this._configElements = configElements;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._configElements.inputSelector));
        this._button = this._form.querySelector(this._configElements.submitButtonSelector);

    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._configElements.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._configElements.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._configElements.inputErrorClass);
        errorElement.classList.remove(this._configElements.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        !inputElement.validity.valid ?
            this._showInputError(inputElement, inputElement.validationMessage) :
            this._hideInputError(inputElement);
    }

    resetValidationForm() {
        this.toggleButtonState();

        this._inputs.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
    }

    _hasInvalidInput() {
        return this._inputs.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }

    toggleButtonState() {
        if(this._hasInvalidInput()) {
            this._button.classList.add(this._configElements.inactiveButtonClass);
            this._button.setAttribute('disabled', true);
        }
        else {
            this._button.classList.remove(this._configElements.inactiveButtonClass);
            this._button.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        this.toggleButtonState();

        this._inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }

}

export { FormValidator }