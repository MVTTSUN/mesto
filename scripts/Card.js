export default class Card {
  constructor(data, templateId, openPopupImage) {
    this._templateId = templateId;
    this._title = data.name;
    this._linkImage = data.link;
    this._openPopupImage = openPopupImage;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateId)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  };

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', () => this._openPopupImage(this._linkImage, this._title));
    this._likeButton.addEventListener('click', this._like);
    this._element.querySelector('.card__trash-button').addEventListener('click', this._delete);
  };
  
  _like = () => this._likeButton.classList.toggle('card__like-button_active');
  
  _delete = () => this._element.remove();

  createCard = () => {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardImage = this._element.querySelector('.card__img');
  
    this._element.querySelector('.card__name').textContent = this._title;
    this._cardImage.src = this._linkImage;
    this._cardImage.alt = this._title;
  
    this._setEventListeners();
  
    return this._element;
  };
}