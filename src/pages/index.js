import './index.css';

import { initialCards } from "../utils/initial-cards.js";
import { Card } from "../components/Card.js";
import { FormValidator, configElements } from "../components/FormValidator.js";
import  Section  from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  buttonEdit,
  buttonAdd,
  authorName,
  description,
  popupEdit,
  popupAdd,
  popupImage,
  profileForm,
  imageFormAdd,
  inputName,
  inputJob,
  elements,
  cardSelector
} from "../utils/constants.js"


const userInfo = new UserInfo ({
  nameSelector: authorName,
  infoSelector: description,
});

const popupEditProfile = new PopupWithForm(popupEdit,
  {
    handleSubmit: (data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    }
  }
)

const popupTypeImage = new PopupWithImage(popupImage);

const popupAddPlace = new PopupWithForm(popupAdd,
  {
    handleSubmit: (data) => {
      const card = createCard(data);
      cardList.addItem(card);
      popupAddPlace.close();
    }
  }
)
const openProfilePopup = () => {
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputJob.value = data.description;
  popupEditProfile.open()
}

const cardList = new Section({
  data:initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, elements);

const openImageCard = () => {
  popupAddPlace.open();
}

const createCard = (data) => {
  const card = new Card
  (
  data,
  cardSelector,
  () => {popupTypeImage.open(data)}
  );
  const newCard = card.generateCard();
  return newCard;
}
cardList.renderItems();

popupEditProfile.setEventListeners();
popupTypeImage.setEventListeners();
popupAddPlace.setEventListeners();

const imageFormValidation = new FormValidator(configElements, imageFormAdd);
imageFormValidation.enableValidation();
const profileFormValidation = new FormValidator(configElements, profileForm);
profileFormValidation.enableValidation();


buttonAdd.addEventListener('click', () => {
  openImageCard();
  imageFormValidation.resetValidationForm();
});
buttonEdit.addEventListener('click', () => {
  openProfilePopup();
  profileFormValidation.resetValidationForm();
});
