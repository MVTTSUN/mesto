const initialCards = [
  {
    name: 'Архыз',
    link: 'https://images.unsplash.com/photo-1638989280415-d58f7340b273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1828&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1591813009502-761ba948ac9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1573156667495-f14c98bc2ebc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1645016978367-5a81d12f915d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1630535879508-9a3a8967d9be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fCVEMCVBMSVEMCVCMCVEMCVCRCVEMCVCQSVEMSU4MiUyMCVEMCU5RiVEMCVCNSVEMSU4MiVEMCVCNSVEMSU4MCVEMCVCMSVEMSU4MyVEMSU4MCVEMCVCM3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1614000531402-74cca389903f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  }
];

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const buttonEdit = document.querySelector('.profile__edit-button');

const popupEdit = document.querySelector('#popup-edit');
const inputName = popupEdit.querySelector('#name-input');
const inputStatus = popupEdit.querySelector('#status-input');
const formPopupEdit = popupEdit.querySelector('#form-popup');

const buttonsClose = document.querySelectorAll('.popup__close-button');

const buttonAdd = document.querySelector('.profile__add-button');

const popupAdd = document.querySelector('#popup-add');
const formPopupAdd = popupAdd.querySelector('#form-popup');

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.photos__cards-container');

const initCards = () => {
  const fragment = document.createDocumentFragment();

  initialCards.forEach(({name, link}) => {
    const cardClone = cardTemplate.querySelector('.card').cloneNode(true);

    cardClone.querySelector('.card__name').textContent = name;
    cardClone.querySelector('.card__img').src = link;
    cardClone.querySelector('.card__img').alt = name;
    fragment.append(cardClone);
  });

  cardsContainer.append(fragment);
};

const openEditProfile = () => {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  popupEdit.classList.add('popup_opened');
};

const closePopup = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_opened');
  const inputsForm = evt.target.parentNode.querySelectorAll('.popup__input');
  inputsForm.forEach(el => el.value = '');
};

const sendFormEditProfile = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;

  closePopup(evt);
};

const openAddPicture = () => {
  popupAdd.classList.add('popup_opened');
};

const createPicture = (evt) => {
  evt.preventDefault();

  const inputTitlePlace = popupAdd.querySelector('#title-place-input');
  const inputSourceImage = popupAdd.querySelector('#source-image-input');
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);

  cardClone.querySelector('.card__name').textContent = inputTitlePlace.value;
  cardClone.querySelector('.card__img').src = inputSourceImage.value;
  cardClone.querySelector('.card__img').alt = inputTitlePlace.value;

  cardsContainer.prepend(cardClone);

  closePopup(evt);
};

const likeButton = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_active');
  }
};

const deletePicture = (evt) => {
  if (evt.target.classList.contains('card__trash-button')) {
    evt.target.closest('.card').remove();
  }
};

const openPopupPicture = (evt) => {
  const popupPicture = document.querySelector('#popup-picture');
  const picture = popupPicture.querySelector('.popup__img');

  if (evt.target.classList.contains('card__img')) {
    picture.src = evt.target.src;
    picture.alt = evt.target.alt;
    popupPicture.querySelector('.popup__caption').textContent = evt.target.parentNode.querySelector('.card__name').textContent;
    popupPicture.classList.add('popup_opened');
  }
};

initCards();

buttonEdit.addEventListener('click', openEditProfile);
buttonAdd.addEventListener('click', openAddPicture);
buttonsClose.forEach(el => el.addEventListener('click', closePopup));

formPopupEdit.addEventListener('submit', sendFormEditProfile);
formPopupAdd.addEventListener('submit', createPicture);

cardsContainer.addEventListener('click', likeButton);
cardsContainer.addEventListener('click', deletePicture);
cardsContainer.addEventListener('click', openPopupPicture)