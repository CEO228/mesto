export default class FormValidator {
    constructor(validationSettings, formElement) {
        this._validationSettings = validationSettings;
        this._formElement = formElement;
        this._submitButtonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
        this._inactiveButtonClass = this._validationSettings.inactiveButtonClass;

        this._inputErrorClass = this._validationSettings.inputErrorClass;
        this._errorClass = this._validationSettings.errorClass;
    }

    _getErrorElement(formElement, inputElement) {
        return formElement.querySelector(`.${inputElement.id}-error`);
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = this._getErrorElement(formElement, inputElement);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(formElement, inputElement) {
        const errorElement = this._getErrorElement(formElement, inputElement);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _isValid(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, this._inputErrorClass, this._errorClass);
        } else {
            this._hideInputError(formElement, inputElement, this._inputErrorClass, this._errorClass);
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

    _toggleButtonState(inputList) {

        const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);

        if (hasInvalidInput) {
            this.disableButton();
        } else {
            this.enableButton();
        }
    }

    _setEventListeners(formElement, validationObject) {
        const {
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            inputErrorClass,
            errorClass
        } = validationObject;

        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);


        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement, inputErrorClass, errorClass);
                this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
            });
        })
    }


    enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
        const formList = Array.from(document.querySelectorAll(formSelector));

        formList.forEach((formElement) => {
            this._setEventListeners(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass });
        });
    }
}