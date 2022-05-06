import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._popupButton = this._popupElement.querySelector('.popup__submit-button');
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })
    }
    setHandleSubmit(action) {
        this._handleSubmit = action;
    }
    renderWhileLoading(isLoading) {
        if(isLoading) {
            this._popupButton.textContent = 'Удаление...'
        }
        else {
            this._popupButton.textContent = 'Да'
        }
    }
}