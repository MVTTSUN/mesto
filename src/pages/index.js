import '../pages/index.css';
import { initialCards, objectConfiguration } from '../scripts/utils/const.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const formValidators = new Map();

const createCard = (data) => {
  return new Card(data, '#card-template', (data) => popupWithImageComponent.open(data)).createCard();
};

const renderCard = (data) => {
  sectionPhotoComponent.addItem(createCard(data));
}

const openEditProfile = () => {
  popupEditComponent.setInputValues(userInfoComponent.getUserInfo());
  formValidators.get(popupEditComponent.getFormId()).resetValidateForm();
  popupEditComponent.open();
};

const openAddPicture = () => {
  formValidators.get(popupAddComponent.getFormId()).resetValidateForm();
  popupAddComponent.open();
};

const sectionPhotoComponent = new Section({ items: initialCards, renderer: (data) => renderCard(data)}, '.photos__cards-container');
const userInfoComponent = new UserInfo('.profile__name', '.profile__status');
const popupWithImageComponent = new PopupWithImage('#popup-picture');
const popupAddComponent = new PopupWithForm('#popup-add', (data) => {
  renderCard(data);
  popupAddComponent.close();
});
const popupEditComponent = new PopupWithForm('#popup-edit', (data) => {
  userInfoComponent.setUserInfo(data);
  popupEditComponent.close();
});

popupWithImageComponent.setEventListeners();
popupAddComponent.setEventListeners();
popupEditComponent.setEventListeners();

sectionPhotoComponent.render();

buttonEdit.addEventListener('click', openEditProfile);
buttonAdd.addEventListener('click', openAddPicture);

Array.from(document.forms).forEach((form) => {
  const formValidatorComponent = new FormValidator(objectConfiguration, form);

  formValidators.set(form.id, formValidatorComponent);
  formValidatorComponent.enableValidation();
});