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
const elementsTemplate = document.querySelector('.template-elements').content;


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const toggleLikes = event => {
    event.target.classList.toggle('element__like_active');
}
const removeCard = card => {
    card.target.closest('.element').remove();
}

const openImageCard = (name, link) => {
    fullImage.src = link;
    fullImage.alt = name;
    imageTitle.textContent = name;
    openPopup(popupImage);
}

const renderCards = (name, link) => {
    const templateItem = elementsTemplate.cloneNode(true);
    const image = templateItem.querySelector('.element__image');
    const title = templateItem.querySelector('.element__name');
    const likeButton = templateItem.querySelector('.element__like');
    const trashButton = templateItem.querySelector('.element__trash');
    image.src = link;
    image.alt = name;
    title.textContent = name;
    likeButton.addEventListener('click', toggleLikes);
    trashButton.addEventListener('click', removeCard);
    image.addEventListener('click', () => {openImageCard(name, link)});
    return templateItem;
}

initialCards.forEach( elem => elements.append(renderCards(elem.name, elem.link)));

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

const checkingWhenOpeningPopup = (input) => {
  const buttonElement = document.querySelector('.popup__submit-button');
  if (!input.validity.valid) {
    buttonElement.classList.add('popup__submit-button_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__submit-button_disabled');
    buttonElement.removeAttribute('disabled');
  }
}

const openProfilePopup = () => {
    inputName.value = authorName.textContent;
    inputJob.value = description.textContent;

    checkingWhenOpeningPopup(inputName);
    openPopup(popupEdit);
}

const handleProfileFormSubmit = (event) => {
    event.preventDefault();
    authorName.textContent = inputName.value;
    description.textContent = inputJob.value;

    closePopup(popupEdit);
}

const handleImageFormSubmit = (event) => {
    event.preventDefault();
    elements.prepend(renderCards(inputPlace.value, inputPhoto.value));
    closePopup(popupAdd);

    imageFormAdd.reset();
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

imageFormAdd.addEventListener('submit', handleImageFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);
buttonAdd.addEventListener('click', () => { openPopup(popupAdd); });
buttonEdit.addEventListener('click', openProfilePopup);
buttonsClose.forEach(elem => {
    elem.addEventListener('click',() => closePopup(elem.closest('.popup')));
});
