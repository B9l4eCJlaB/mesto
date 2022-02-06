const editButton = document.querySelector('.profile__edit-button');
const authorName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');

const closeButton = popup.querySelector('.popup__close');
const formElem = popup.querySelector('.popup__form');

const inputName = formElem.querySelector('.popup__input-name');
const inputJob = formElem.querySelector('.popup__input-description');


const closePopup = () => {
    popup.classList.remove('popup_opened');
    inputJob.value = ''
    inputName.value = '';
}
const openPopup = () => {
    popup.classList.add('popup_opened');
}

const formSubmitHandler = (event) => {
    event.preventDefault();

    authorName.textContent = inputName.value;
    description.textContent = inputJob.value;

    closePopup();
}

const closePopupByClickOnOverlay = (event) => {
    if (event.target !== event.currentTarget) {
        return
    }
    else {
        closePopup();
    }
}

formElem.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popup.addEventListener('click', closePopupByClickOnOverlay);
