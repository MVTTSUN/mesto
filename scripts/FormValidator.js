export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputs = this._form.querySelectorAll(this._inputSelector);
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  _hasInvalidInput = () => {
    const inputList = Array.from(this._inputs);
  
    return inputList.some((input) => !input.validity.valid);
  }
  
  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputs)) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  };

  _showError = (input, message) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
  
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = message;
  };
  
  _hideError = (input) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
  
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _isValid = (input) => {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    };
  };

  _formValidate = () => {
    this._toggleButtonState();
  
    this._inputs.forEach(input => input.addEventListener('input', () => {
      this._isValid(input);
      this._toggleButtonState();
    }));
  };

  enableValidation = () => {
    this._formValidate();
  };

  resetValidateForm = () => {
    if (this._form.id === 'form-popup-add') {
      this._form.reset();
    }
  
    this._inputs.forEach((input) => this._hideError(input));
  
    this._toggleButtonState();
  };
}