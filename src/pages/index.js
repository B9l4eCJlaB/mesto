import './index.css';

import { configElements } from "../utils/constants.js"
import { initialCards } from "../utils/initial-cards.js";
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
  profileForm,
  imageFormAdd,
  elements,
  cardSelector,
  profileAvatar,
  popupAvatar,
  checkAvatar,
  avatarForm,
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
deletePopup.setEventListeners()

const popupEditAvatar = new PopupWithForm(popupAvatar, newValues => {
  popupEditAvatar.renderLoading(true)
  api.handleAvatar(newValues)
    .then((data) => {
      userInfo.setUserAvatar(data)
      avatarFormValidation.toggleButtonState()
      popupEditAvatar.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => popupEditAvatar.renderLoading(false))
})


const userInfo = new UserInfo ({
  nameSelector: authorNameSelector,
  infoSelector: descriptionSelector,
  avatarSelector: profileAvatar
});

const popupEditProfile = new PopupWithForm(popupEdit,
  newValues => {
    popupEditProfile.renderLoading(true)
    api.setUserInfoApi(newValues)
      .then(data => {
        userInfo.setUserInfo(data)
        popupEditProfile.close()
      })
      .catch((err) => console.log(err))
      .finally( _ => popupEditProfile.renderLoading(false))
  }
)

const popupTypeImage = new PopupWithImage(popupImage);

const popupAddPlace = new PopupWithForm(popupAdd, newValue => {
  popupAddPlace.renderLoading(true)
  api.addUserCard(newValue)
    .then(data => {
      cardList.addItem(createCard(data))
      popupAddPlace.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => popupAddPlace.renderLoading(true))
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
      handleDeleteClick: _ => {
        deletePopup.setHandleSubmit( _ => {
          deletePopup.renderWhileLoading(true)
          api.delete(data._id)
            .then( _ => {
              card._removeCard()
              deletePopup.close()
            })
            .catch(err => console.log(err))
            .finally(_ => deletePopup.renderWhileLoading(false))
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


const imageFormValidation = new FormValidator(configElements, imageFormAdd);
imageFormValidation.enableValidation();
const profileFormValidation = new FormValidator(configElements, profileForm);
profileFormValidation.enableValidation();
const avatarFormValidation = new FormValidator(configElements, avatarForm);
avatarFormValidation.enableValidation()


buttonAdd.addEventListener('click', () => {
  imageFormValidation.resetValidationForm();
  openImageCard();
});
buttonEdit.addEventListener('click', () => {
  profileFormValidation.resetValidationForm();
  openProfilePopup();
});
checkAvatar.addEventListener('click', () => {
  avatarFormValidation.resetValidationForm();
  popupEditAvatar.open();
})

let userId

api.getAllData() 
  .then(( [cards, data] ) => {
    console.log(data)
    console.log(cards)
    userId = data._id
    userInfo.setUserInfo(data)
    cardList.renderItems(cards)


  })
  .catch((err) => console.log(err))
