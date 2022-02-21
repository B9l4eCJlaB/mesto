const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const authorName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const editPopup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-image');

const closeButton = document.querySelectorAll('.popup__close');
const formElem = editPopup.querySelector('.popup__form');

const addImageForm = popupAdd.querySelector('.popup__form');

const fullImage = document.querySelector('.popup-image__photo');
const imageTitle = document.querySelector('.popup-image__title');

const inputName = formElem.querySelector('.popup__input_name');
const inputJob = formElem.querySelector('.popup__input_description');
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

const likeButton = event => {
    event.target.classList.toggle('element__like_active');
}
const removeCard = card => {
    card.target.closest('.element').remove();
}

const openImageCard = (name, link) => {
    fullImage.src = link;
    imageTitle.textContent = name;
    openPopup(popupImage);
}

const renderCards = (name, link) => {
    const templateItem = elementsTemplate.cloneNode(true);
    templateItem.querySelector('.element__image').src = link;
    templateItem.querySelector('.element__image').alt = name;
    templateItem.querySelector('.element__name').textContent = name;
    templateItem.querySelector('.element__like').addEventListener('click', likeButton);
    templateItem.querySelector('.element__trash').addEventListener('click', removeCard);
    templateItem.querySelector('.element__image').addEventListener('click', () => {openImageCard(name, link)});
    return templateItem;
}

initialCards.forEach( elem => elements.append(renderCards(elem.name, elem.link)));

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    inputPlace.value = '';
    inputPhoto.value = '';
}
const openPopup = (popup) => {
    popup.classList.add('popup_opened');

}
const openEditButton = () => {
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

const createImage = (event) => {
    event.preventDefault();
    elements.prepend(renderCards(inputPlace.value, inputPhoto.value));
    
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

addImageForm.addEventListener('submit', createImage);
formElem.addEventListener('submit', handleProfileFormSubmit);
addButton.addEventListener('click', () => { openPopup(popupAdd); });
editButton.addEventListener('click', openEditButton);
editPopup.addEventListener('click', closePopupByClickOnOverlay);
closeButton.forEach(elem => {
    elem.addEventListener('click',() => closePopup(elem.closest('.popup')));
})

