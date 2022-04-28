import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleSubmit}) {
        super(popupSelector)
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll(".popup__input");
        this._handleSubmit = handleSubmit;
    }
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input =>
          this._inputValues[input.name] = input.value);

        return this._inputValues;
      }
    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (event) => {
          event.preventDefault();
          this._handleSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._popupForm.reset();
    }
}