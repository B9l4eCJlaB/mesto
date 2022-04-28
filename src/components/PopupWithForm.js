import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleSubmit}) {
        super(popupSelector)
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll(".popup__input");
        this._handleSubmit = handleSubmit;
    }
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(input =>
          inputValues[input.name] = input.value);

        return inputValues;
      }
    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', () => {
          this._handleSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._popupForm.reset();
    }
}