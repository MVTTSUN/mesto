import '../pages/index.css';
import { objectConfiguration, optionsApi } from '../scripts/utils/const.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupConfirmDelete from '../scripts/components/PopupConfirmDelete';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAvatar = document.querySelector('.profile__avatar-button');
const formValidators = new Map();
const api = new Api(optionsApi);

const createCard = (data) => {
  return new Card(
    data,
    '#card-template',
    (data) => popupWithImageComponent.open(data),
    (card, cardId) => popupConfirmDeleteComponent.open(card, cardId),
    (cardId) => api.sendLike(cardId),
    (cardId) => api.deleteLike(cardId),
    userInfoComponent.getUserInfo()).createCard();
};

const renderCard = (data) => {
  sectionPhotoComponent.addItem(createCard(data));
};

const openEditProfile = () => {
  popupEditComponent.setInputValues(userInfoComponent.getUserInfo());
  formValidators.get(popupEditComponent.getFormId()).resetValidateForm();
  popupEditComponent.open();
};

const openAddPicture = () => {
  formValidators.get(popupAddComponent.getFormId()).resetValidateForm();
  popupAddComponent.open();
};

const openEditAvatar = () => {
  popupEditAvatarComponent.setInputValues(userInfoComponent.getUserInfo());
  formValidators.get(popupEditAvatarComponent.getFormId()).resetValidateForm();
  popupEditAvatarComponent.open();
}

const sectionPhotoComponent = new Section((data) => renderCard(data), '.photos__cards-container');
const userInfoComponent = new UserInfo(
  '.profile__name',
  '.profile__status',
  '.profile__avatar'
);
const popupWithImageComponent = new PopupWithImage('#popup-picture');
const popupAddComponent = new PopupWithForm('#popup-add', (data) => {
  popupAddComponent.startSaving('Создание...');
  api.sendCard(data)
    .then((data) => {
      renderCard(data);
      popupAddComponent.endSaving();
      popupAddComponent.close();
    });
});
const popupEditComponent = new PopupWithForm('#popup-edit', (data) => {
  popupEditComponent.startSaving('Сохранение...');
  api.updateUserInfo(data)
    .then((data) => {
      userInfoComponent.setUserInfo(data);
      popupEditComponent.endSaving();
      popupEditComponent.close();
    });
});
const popupConfirmDeleteComponent = new PopupConfirmDelete(
  '#popup-confirm-delete',
  (cardId) => api.deleteCard(cardId)
);
const popupEditAvatarComponent = new PopupWithForm('#popup-avatar', (data) => {
  popupEditAvatarComponent.startSaving('Сохранение...');
  api.updateUserAvatar(data)
    .then((data) => {
      userInfoComponent.setUserInfo(data);
      popupEditAvatarComponent.endSaving();
      popupEditAvatarComponent.close();
    });
});

popupWithImageComponent.setEventListeners();
popupAddComponent.setEventListeners();
popupEditComponent.setEventListeners();
popupConfirmDeleteComponent.setEventListeners();
popupEditAvatarComponent.setEventListeners();

api.getUserInfo().then((userInfo) => userInfoComponent.setUserInfo(userInfo));
api.getCards().then((cards) => sectionPhotoComponent.render(cards.reverse()));

buttonEdit.addEventListener('click', openEditProfile);
buttonAdd.addEventListener('click', openAddPicture);
buttonAvatar.addEventListener('click', openEditAvatar);

Array.from(document.forms).forEach((form) => {
  const formValidatorComponent = new FormValidator(objectConfiguration, form);

  formValidators.set(form.id, formValidatorComponent);
  formValidatorComponent.enableValidation();
});