import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
  constructor(popupId, handleDeleteCard) {
    super(popupId);
    this._popup = document.querySelector(popupId);
    this._deleteButton = this._popup.querySelector('.popup__submit-button');
    this._handleDeleteCard = handleDeleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', this._delete.bind(this));
  };

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  _delete() {
    this._handleDeleteCard(this._cardId)
      .then(() => {
        this._card.remove();
        this.close();
      });
  }
}