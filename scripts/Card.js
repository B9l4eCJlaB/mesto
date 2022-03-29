import { openImageCard } from "./index.js";
class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement
    }
    _toggleLikes() {
        this._elementLikeButton.classList.toggle('element__like_active');
    }

    _removeCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._elementLikeButton.addEventListener('click', () => {
            this._toggleLikes();
        });
        this._elementTrashButton.addEventListener('click', () => {
            this._removeCard()
        });
        this._elementImage.addEventListener('click', () => {
            openImageCard(this._title, this._image);
        })
    }

    generateCard() {
        this._element = this._getTemplate();

        this._elementImage = this._element.querySelector('.element__image');
        this._elementTitle = this._element.querySelector('.element__name');
        this._elementLikeButton = this._element.querySelector('.element__like');
        this._elementTrashButton = this._element.querySelector('.element__trash');

        this._setEventListeners();


        this._elementImage.src = this._image;
        this._elementImage.alt = this._title;
        this._elementTitle.textContent = this._title;
        
        return this._element;
    }

}

export { Card };