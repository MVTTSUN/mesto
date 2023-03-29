import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupId, handleSubmitForm) {
    super(popupId);
    this._handleSubmitForm = handleSubmitForm;
    this._inputs = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach((input) => inputValues[input.name] = input.value);
    return inputValues;
  };

  getFormId() {
    return this._popup.querySelector('.popup__form').id;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => input.value = data[input.name]);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  };
}