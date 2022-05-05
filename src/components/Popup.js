export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._buttonClose = this._popupElement.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    open(){
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (event) => {
            if (event.target === event.currentTarget) {
              this.close()}
            });
            this._buttonClose.addEventListener('click', () => {
            this.close()});
    }
}