import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this.bigImage = this._popupElement.querySelector('.popup-image__photo');
        this.bigImageTitle = this._popupElement.querySelector('.popup-image__title');
    }
    open({name, link}) {
        this.bigImage.src = link;
        this.bigImage.alt = name;
        this.bigImageTitle.textContent = name;
        super.open();
    }
}