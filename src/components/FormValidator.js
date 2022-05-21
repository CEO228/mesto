export default class FormValidator {
    constructor(validationSettings, formElement) {
        this._validationSettings = validationSettings;
        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
        this._submitButtonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);

    }


    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationSettings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationSettings.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationSettings.inputErrorClass);
        errorElement.classList.remove(this._validationSettings.errorClass);
        errorElement.textContent = '';
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    disableButton() {
        this._submitButtonElement.classList.add(this._validationSettings.inactiveButtonClass);
        this._submitButtonElement.disabled = true;
    }

    enableButton() {
        this._submitButtonElement.classList.remove(this._validationSettings.inactiveButtonClass);
        this._submitButtonElement.disabled = false;
    }

    _toggleButtonState() {

        const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);

        if (hasInvalidInput) {
            this.disableButton();
        } else {
            this.enableButton();
        }
    }

    _setEventListeners() {

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        })
    }


    enableValidation() {
        this._setEventListeners();
    }
}