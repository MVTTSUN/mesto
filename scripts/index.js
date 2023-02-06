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

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.photos__cards-container');

const popupPicture = document.querySelector('#popup-picture');
const imgPopup = popupPicture.querySelector('.popup__img');
const captionPopup = popupPicture.querySelector('.popup__caption');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const openPopupPicture = (namePicture, link) => {
  imgPopup.src = link;
  imgPopup.alt = namePicture;
  captionPopup.textContent = namePicture;
  openPopup(popupPicture);
};

const likeButton = (evt) => {
  evt.target.classList.toggle('card__like-button_active');
};

const deletePicture = (evt) => {
  evt.target.closest('.card').remove();
};

const createCard = (namePicture, link) => {
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__img');

  cardClone.querySelector('.card__name').textContent = namePicture;
  cardImage.src = link;
  cardImage.alt = namePicture;

  cardImage.addEventListener('click', () => openPopupPicture(namePicture, link));
  cardClone.querySelector('.card__like-button').addEventListener('click', likeButton);
  cardClone.querySelector('.card__trash-button').addEventListener('click', deletePicture);

  return cardClone;
};

const renderCard = (card) => cardsContainer.prepend(card);

const initCards = () => {
  initialCards.forEach(({name, link}) => {
    const card = createCard(name, link);
    renderCard(card);
  });
};

const openEditProfile = () => {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  openPopup(popupEdit);
};

const openAddPicture = () => {
  openPopup(popupAdd);
  inputTitlePlace.value = '';
  inputSourceImage.value = '';
};

const sendFormEditProfile = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;

  closePopup(popupEdit);
};

const sendFormCreatePicture = (evt) => {
  evt.preventDefault();
  const card = createCard(inputTitlePlace.value, inputSourceImage.value);
  renderCard(card);
  closePopup(popupAdd);
};

initCards();

buttonEdit.addEventListener('click', openEditProfile);
buttonAdd.addEventListener('click', openAddPicture);
buttonsClose.forEach(el => {
  const popup = el.closest('.popup');
  el.addEventListener('click', () => closePopup(popup));
});

formPopupEdit.addEventListener('submit', sendFormEditProfile);
formPopupAdd.addEventListener('submit', sendFormCreatePicture);