export default class Card {
  constructor(data, templateId, handleCardClick, handleCardDelete, handleSendLike, handleDeleteLike, myUserInfo) {
    this._templateId = templateId;
    this._title = data.name;
    this._linkImage = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._idOwner = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._myUserInfo = myUserInfo;
    this._handleSendLike = handleSendLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateId)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick({ linkImage: this._linkImage, title: this._title }));
    this._likeButton.addEventListener('click', this._like.bind(this));
    this._buttonDelete.addEventListener('click', this._delete.bind(this));
  };
  
  _like() {
    if (this._likes.some((userInfo) => userInfo._id === this._myUserInfo.id)) {
      this._handleDeleteLike(this._cardId)
        .then((card) => {
          this._likeButton.classList.remove('card__like-button_active');
          this._likeCounter.textContent = card.likes.length;
        });
    } else {
      this._handleSendLike(this._cardId)
        .then((card) => {
          this._likeButton.classList.add('card__like-button_active');
          this._likeCounter.textContent = card.likes.length;
        });
    }
  }
  
  _delete() {
    this._handleCardDelete(this._element, this._cardId);
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardImage = this._element.querySelector('.card__img');
    this._likeCounter = this._element.querySelector('.card__like-counter');

    this._buttonDelete = this._element.querySelector('.card__trash-button');

    if(this._idOwner !== this._myUserInfo.id) this._buttonDelete.remove();
    if (this._likes.some((userInfo) => userInfo._id === this._myUserInfo.id)) {
      this._likeButton.classList.add('card__like-button_active');
    }
  
    this._likeCounter.textContent = this._likes.length;
    this._element.querySelector('.card__name').textContent = this._title;
    this._cardImage.src = this._linkImage;
    this._cardImage.alt = this._title;
  
    this._setEventListeners();
  
    return this._element;
  };
}