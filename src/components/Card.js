class Card {
    constructor({data, handleCardClick, handleLikeClick, handleDeleteClick}, cardSelector, api, userID) {
        this._title = data.name;
        this._image = data.link;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._hadleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
        this._cardSelector = cardSelector;

        this._api = api;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userID
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement
    }

    _removeCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._elementLikeButton.addEventListener('click', () => {
            this._hadleLikeClick();
        });
        this._elementTrashButton.addEventListener('click', () => {
            this._handleDeleteClick();
        });
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        })
    }

    generateCard() {
        this._element = this._getTemplate();

        this._elementImage = this._element.querySelector('.element__image');
        this._elementTitle = this._element.querySelector('.element__name');
        this._elementLikeButton = this._element.querySelector('.element__like');
        this._elementTrashButton = this._element.querySelector('.element__trash');
        this._elementLikesCount = this._element.querySelector('.element__count');

        this._setEventListeners();
        

        this._elementImage.src = this._image;
        this._elementImage.alt = this._title;
        this._elementTitle.textContent = this._title;
        this._elementLikesCount.textContent = this._likes.length;
        if(!(this._ownerId === this._userId)) this._elementTrashButton.style.display = 'none';

          if(this._likes.find(obj => this._userId === obj._id)) {
            this._elementLikeButton.classList.add('element__like_active')
          }

        return this._element;
    }
    handleLikeCard() {
        if(!this._elementLikeButton.classList.contains('element__like_active')) {
            this._api.like(this._id)
                .then(data => {
                    this._elementLikeButton.classList.add('element__like_active');
                    this._elementLikesCount.textContent = data.likes.length;
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            this._api.dislike(this._id)
                .then(data => {
                    this._elementLikeButton.classList.remove('element__like_active');
                    this._elementLikesCount.textContent = data.likes.length;
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

}

export { Card };