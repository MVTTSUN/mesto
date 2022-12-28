const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const inputName = document.querySelector('#name-input');
const inputStatus = document.querySelector('#status-input');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const formPopup = document.querySelector('#form-popup');

const openEditProfile = () => {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  popup.classList.add('popup_opened');
};

const closeEditProfile = () => {
  popup.classList.remove('popup_opened');
};

const sendFormEditProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closeEditProfile();
};

buttonEdit.addEventListener('click', openEditProfile);

buttonClose.addEventListener('click', closeEditProfile);

formPopup.addEventListener('submit', sendFormEditProfile);