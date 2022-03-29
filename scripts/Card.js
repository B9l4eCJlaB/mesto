class Card {
    constructor(data, openImage, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._openImage = openImage;
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
        this._element = null;
    }

    _setEventListeners() {
        this._elementLikeButton.addEventListener('click', () => {
            this._toggleLikes();
        });
        this._elementTrashButton.addEventListener('click', () => {
            this._removeCard()
        });
        this._elementImage.addEventListener('click', () => {
            this._openImage(this._title, this._image);
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