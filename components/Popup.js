export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._buttonClose = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (event) => {
            if (event.target === event.currentTarget) {
              this.close()}
            });
            this._buttonClose.addEventListener('click', () => {
            this.close()});
    }
}