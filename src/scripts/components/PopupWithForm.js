import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupId, handleSubmitForm) {
    super(popupId);
    this._handleSubmitForm = handleSubmitForm;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.button');
    this.textButtonSubmit = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach((input) => inputValues[input.name] = input.value);
    return inputValues;
  };

  getFormId() {
    return this._form.id;
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
    this._form.reset();
  };

  renderLoading(isLoading, text = '') {
    if (isLoading) {
      this._buttonSubmit.textContent = text;
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.textContent = this.textButtonSubmit;
      this._buttonSubmit.disabled = false;
    }
  }
}