const editButton = document.querySelector('.profile__edit-button');
const authorName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');

const closeButton = popup.querySelector('.popup__close');
const formElem = popup.querySelector('.popup__form');

const inputName = formElem.querySelector('.popup__input_name');
const inputJob = formElem.querySelector('.popup__input_description');


const closePopup = () => {
    popup.classList.remove('popup_opened');
}
const openPopup = () => {
    popup.classList.add('popup_opened');
    inputName.value = authorName.textContent;
    inputJob.value = description.textContent;
}

const handleProfileFormSubmit = (event) => {
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

formElem.addEventListener('submit', handleProfileFormSubmit);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popup.addEventListener('click', closePopupByClickOnOverlay);
