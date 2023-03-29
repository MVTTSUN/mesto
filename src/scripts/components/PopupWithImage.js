import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupId) {
    super(popupId);
    this._img = this._popup.querySelector('.popup__img');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open({ linkImage, title }) {
    super.open();
    this._img.src = linkImage;
    this._img.alt = title;
    this._caption.textContent = title;
  }
}