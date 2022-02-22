const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const authorName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const editPopup = document.querySelector('.popup-profile');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-image');

const closeButtons = document.querySelectorAll('.popup__close');
const profileForm = editPopup.querySelector('.profile-form');

const addImageForm = popupAdd.querySelector('.add-form');

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
}
const openPopup = (popup) => {
    popup.classList.add('popup_opened');

}
const openProfilePopup = () => {
    openPopup(editPopup);
    inputName.value = authorName.textContent;
    inputJob.value = description.textContent;
}

const handleProfileFormSubmit = (event) => {
    event.preventDefault();
    authorName.textContent = inputName.value;
    description.textContent = inputJob.value;

    closePopup(editPopup);
}

const handleImageFormSubmit = (event) => {
    event.preventDefault();
    elements.prepend(renderCards(inputPlace.value, inputPhoto.value));
    addImageForm.reset();
    closePopup(popupAdd);
}


const closePopupByClickOnOverlay = (event) => {
    if (event.target !== event.currentTarget) {
        return
    }
    else {
        closePopup(editPopup);
    }
}

addImageForm.addEventListener('submit', handleImageFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);
addButton.addEventListener('click', () => { openPopup(popupAdd); });
editButton.addEventListener('click', openProfilePopup);
editPopup.addEventListener('click', closePopupByClickOnOverlay);
closeButtons.forEach(elem => {
    elem.addEventListener('click',() => closePopup(elem.closest('.popup')));
});

