export default class Popup {
  constructor(popupId) {
    this._popup = document.querySelector(popupId);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _isOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };

  setEventListeners() {
    const button = this._popup.querySelector('.popup__close-button');
    
    button.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._isOverlay.bind(this));
  };
}