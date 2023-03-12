import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, objectConfiguration } from './const.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const popupEdit = document.querySelector('#popup-edit');
const inputName = popupEdit.querySelector('#name-input');
const inputStatus = popupEdit.querySelector('#status-input');
const formPopupEdit = document.querySelector('#form-popup-edit');

const popupAdd = document.querySelector('#popup-add');
const inputTitlePlace = popupAdd.querySelector('#title-place-input');
const inputSourceImage = popupAdd.querySelector('#source-image-input');
const formPopupAdd = document.querySelector('#form-popup-add');

const cardsContainer = document.querySelector('.photos__cards-container');

const popups = document.querySelectorAll('.popup');

const formValidators = new Map();

const isEscape = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', isEscape);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', isEscape);
};

const openPopupImage = (linkImage, title) => {
  const popupPicture = document.querySelector('#popup-picture');
  const imgPopup = popupPicture.querySelector('.popup__img');
  const captionPopup = popupPicture.querySelector('.popup__caption');

  imgPopup.src = linkImage;
  imgPopup.alt = title;
  captionPopup.textContent = title;
  openPopup(popupPicture);
};

const renderCard = (card) => cardsContainer.prepend(card);

const initCards = () => {
  initialCards.forEach((data) => {
    const card = new Card(data, '#card-template', openPopupImage).createCard();
    renderCard(card);
  });
};

const openEditProfile = () => {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  formValidators.get(`form-${popupEdit.id}`).resetValidateForm();
  openPopup(popupEdit);
};

const openAddPicture = () => {
  formValidators.get(`form-${popupAdd.id}`).resetValidateForm();
  openPopup(popupAdd);
};

const sendFormEditProfile = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;

  closePopup(popupEdit);
};

const sendFormCreatePicture = (evt) => {
  evt.preventDefault();
  const card = new Card({ name: inputTitlePlace.value, link: inputSourceImage.value }, '#card-template', openPopupImage).createCard();
  renderCard(card);
  closePopup(popupAdd);
};

const isOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

initCards();

buttonEdit.addEventListener('click', openEditProfile);
buttonAdd.addEventListener('click', openAddPicture);
buttonsClose.forEach(el => {
  const popup = el.closest('.popup');
  el.addEventListener('click', () => closePopup(popup));
});

popups.forEach(popup => popup.addEventListener('click', isOverlay));

formPopupEdit.addEventListener('submit', sendFormEditProfile);
formPopupAdd.addEventListener('submit', sendFormCreatePicture);

Array.from(document.forms).forEach(form => {
  const formValidator = new FormValidator(objectConfiguration, form);

  formValidators.set(form.id, formValidator);
  formValidator.enableValidation();
});