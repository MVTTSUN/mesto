const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__name-input');
const statusInput = document.querySelector('.popup__status-input');
const nameProfile = document.querySelector('.profile__name');
const statusProfile = document.querySelector('.profile__status');

nameInput.value = nameProfile.textContent;
statusInput.value = statusProfile.textContent;

editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  setTimeout(() => {
    document.querySelector('.popup_opened').style.opacity = 1;
  }, 1);
});

closeButton.addEventListener('click', () => {
  document.querySelector('.popup_opened').style.opacity = 0;
  setTimeout(() => {
    popup.classList.remove('popup_opened');
  }, 300);
  nameInput.value = nameProfile.textContent;
  statusInput.value = statusProfile.textContent;
});

popup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  document.querySelector('.popup_opened').style.opacity = 0;
  setTimeout(() => {
    popup.classList.remove('popup_opened');
  }, 300);
  nameProfile.textContent = nameInput.value;
  statusProfile.textContent = statusInput.value;
});