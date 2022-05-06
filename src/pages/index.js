import './index.css';

import { configElements } from "../utils/constants.js"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import  Section  from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  buttonEdit,
  buttonAdd,
  authorNameSelector,
  descriptionSelector,
  inputName,
  inputJob,
  popupEdit,
  popupAdd,
  popupImage,
  elements,
  cardSelector,
  profileAvatar,
  popupAvatar,
  checkAvatar
} from "../utils/constants.js";
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: 'a428200b-527d-46e6-b456-172268e0a0e6',
    'Content-Type': 'application/json'
  }
})

const deletePopup = new PopupWithConfirm('.popup-delete');

const popupEditAvatar = new PopupWithForm(popupAvatar, value => {
  popupEditAvatar.renderLoading(true)
  api.handleAvatar(value)
    .then((data) => {
      userInfo.setUserAvatar(data);
      popupEditAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally( () => popupEditAvatar.renderLoading(false))
})


const userInfo = new UserInfo ({
  nameSelector: authorNameSelector,
  infoSelector: descriptionSelector,
  avatarSelector: profileAvatar
});

const popupEditProfile = new PopupWithForm(popupEdit, value => {
    popupEditProfile.renderLoading(true)
    api.setUserInfoApi(value)
      .then(data => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally( () => popupEditProfile.renderLoading(false))
  }
)

const popupTypeImage = new PopupWithImage(popupImage);

const popupAddPlace = new PopupWithForm(popupAdd, value => {
  popupAddPlace.renderLoading(true)
  api.addUserCard(value)
    .then(data => {
      cardList.addItem(createCard(data));
      popupAddPlace.close();
    })
    .catch((err) => console.log(err))
    .finally( () => popupAddPlace.renderLoading(false))
}
)
const openProfilePopup = () => {
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputJob.value = data.description;
  popupEditProfile.open()
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, elements);

const openImageCard = () => {
  popupAddPlace.open();
}

const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => popupTypeImage.open(data),
      handleLikeClick: () => card.handleLikeCard(),
      handleDeleteClick: () => {
        deletePopup.setHandleSubmit( () => {
          deletePopup.renderWhileLoading(true)
          api.delete(data._id)
            .then( () => {
              card.removeCard()
              deletePopup.close()
            })
            .catch(err => console.log(err))
            .finally( () => deletePopup.renderWhileLoading(false))
        })
        deletePopup.open()
      }
    },
    cardSelector,
    api,
    userId
  )
  const newCard = card.generateCard();
  return newCard;
}


popupEditProfile.setEventListeners();
popupTypeImage.setEventListeners();
popupAddPlace.setEventListeners();
popupEditAvatar.setEventListeners();
deletePopup.setEventListeners();

let userId;

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach(formElement => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute('name');
      formValidators[formName] = validator;
      validator.enableValidation();
    })
}


enableValidation(configElements);


buttonAdd.addEventListener('click', () => {
  formValidators['form-profile'].resetValidationForm();
  openImageCard();
});
buttonEdit.addEventListener('click', () => {
  formValidators['form-profile'].resetValidationForm();
  openProfilePopup();
});
checkAvatar.addEventListener('click', () => {
  formValidators['avatar'].resetValidationForm();
  popupEditAvatar.open();
})


api.getAllData()
  .then(( [cards, data] ) => {
    console.log(data)
    console.log(cards)
    userId = data._id
    userInfo.setUserInfo(data)
    cardList.renderItems(cards)


  })
  .catch((err) => console.log(err))
