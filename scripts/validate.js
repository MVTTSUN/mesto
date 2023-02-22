const hasInvalidInput = (inputs) => {
  const inputList = Array.from(inputs);

  return inputList.some((input) => !input.validity.valid);
}

const toggleButtonState = (inputs, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
};

const showError = (form, input, inputErrorClass, errorClass, message) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = message;
};

const hideError = (form, input, inputErrorClass, errorClass) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const isValid = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    showError(form, input, inputErrorClass, errorClass, input.validationMessage);
  } else {
    hideError(form, input, inputErrorClass, errorClass);
  };
};

const formValidate = (form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputs = form.querySelectorAll(inputSelector);
  const button = form.querySelector(submitButtonSelector);

  toggleButtonState(inputs, button, inactiveButtonClass);

  inputs.forEach(input => input.addEventListener('input', () => {
    isValid(form, input, inputErrorClass, errorClass);
    toggleButtonState(inputs, button, inactiveButtonClass);
  }));
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach(form => formValidate(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass));
};

const resetValidateForm = (popup) => {
  const form = popup.querySelector('.popup__form');
  const button = form.querySelector('.popup__submit-button');
  const inputs = form.querySelectorAll('.popup__input');

  if (popup.id === 'popup-add') {
    form.reset();
  }

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove('popup__error_visible');
    input.classList.remove('popup__input_type_error');
  });

  toggleButtonState(inputs, button, 'popup__submit-button_disabled');
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});