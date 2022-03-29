import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator, configElements } from "./FormValidator.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const authorName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

const popupEdit = document.querySelector('.popup-profile');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-image');

const buttonsClose = document.querySelectorAll('.popup__close');
const profileForm = popupEdit.querySelector('.profile-form');

const imageFormAdd = popupAdd.querySelector('.add-form');

const fullImage = document.querySelector('.popup-image__photo');
const imageTitle = document.querySelector('.popup-image__title');

const inputName = profileForm.querySelector('.popup__input_name');
const inputJob = profileForm.querySelector('.popup__input_description');
const inputPlace = document.querySelector('.popup__input_place');
const inputPhoto = document.querySelector('.popup__input_href');

const elements = document.querySelector('.elements');

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByKeyEscape);
    popup.removeEventListener('click', closePopupByClickOnOverlay);
}
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByKeyEscape);
    popup.addEventListener('click', closePopupByClickOnOverlay);
}

const closePopupByClickOnOverlay = (event) => {
  if (event.target !== event.currentTarget) {
      return
  }
  else {
      closePopup(event.target);
  }
}

const closePopupByKeyEscape = (evt) => {
if (evt.key === 'Escape') {
  closePopup(document.querySelector('.popup_opened'));
  }
}

const openProfilePopup = () => {
    inputName.value = authorName.textContent;
    inputJob.value = description.textContent;

    openPopup(popupEdit);
}

const openImageCard = (name, link) => {
  fullImage.src = link;
  fullImage.alt = name;
  imageTitle.textContent = name;
  openPopup(popupImage);
}

const handleProfileFormSubmit = (event) => {
    event.preventDefault();
    authorName.textContent = inputName.value;
    description.textContent = inputJob.value;

    closePopup(popupEdit);
}

const handleImageFormSubmit = (event) => {
    event.preventDefault();
    const card = {}
    card.name = inputPlace.value;
    card.link = inputPhoto.value;
    renderCard(card, elements);
    closePopup(popupAdd);

    imageFormAdd.reset();
}

const createCard = (data) => {
  const card = new Card(data, openImageCard, '.template-elements');
  return card.generateCard();
}

const renderCard = (data, list) => {
  const card = createCard(data);
  list.prepend(card); 
}

initialCards.forEach(item => {
  renderCard(item, elements);
});

const imageFormValidation = new FormValidator(configElements, imageFormAdd);
imageFormValidation.enableValidation();
const profileFormValidation = new FormValidator(configElements, profileForm);
profileFormValidation.enableValidation();

imageFormAdd.addEventListener('submit', handleImageFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);
buttonAdd.addEventListener('click', () => { 
  openPopup(popupAdd);
  imageFormValidation.resetValidationForm();
});
buttonEdit.addEventListener('click', () => {
  openProfilePopup();
  profileFormValidation.resetValidationForm();
});
buttonsClose.forEach(elem => {
    elem.addEventListener('click',() => closePopup(elem.closest('.popup')));
});